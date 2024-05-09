const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect('mongodb://127.0.0.1:27017/mafiaDB');

const playerSchema = mongoose.Schema({
    number: Number,
    fouls: [String],
    role: String,
    chosen: Boolean
})

const Player = mongoose.model("Player", playerSchema);



app.post("/load", function (req, res) {
    Player.find({}).then((players) => {
        if (!players.length) {
            const sortedPlayers = req.body.players.sort((a, b) => a.number - b.number)
            sortedPlayers.forEach(player => {
                const newPlayer = new Player({
                    number: player.number,
                    fouls: player.fouls,
                    role: player.role,
                    chosen: player.chosen
                })
                console.log(newPlayer);
                newPlayer.save().then(() => {
                })
            });
        } else {
            res.send(players.sort((a, b) => a.number - b.number));
        }
    })

})

app.post("/setFoul", function (req, res) {
    Player.findOne({ number: req.body.data.number }).then(player => {
        const index = player.fouls.findIndex((foul) => foul === null);
        player.fouls[index] = "F";
        player.save().then(() => {
            res.send(player);
        });
    })
})

app.post("/setRole", function (req, res) {
    Player.findOne({ number: req.body.data.player.number }).then(player => {
        player.role = req.body.data.role;
        player.save().then(() => {
            res.send(player);
        })
    })
})

app.post("/reset", function (req, res) {
    Player.find({}).then(players => {
        players.forEach(player => {
            for (let i = 0; i < player.fouls.length; i++) {
                player.fouls[i] = null;
            }
            player.role = null;
            player.save()
        })
        res.send(players.sort((a, b) => a.number - b.number));
    })
})

app.post("/choose", function (req, res) {
    console.log(req.body.data);

    Player.findOne({ chosen: true }).then(player => {
        player.chosen = false;
        player.save();
    })

    Player.findOne({ number: req.body.data }).then(player => {
        const index = req.body.data - 1;
        player.chosen = true;
        player.save().then(() => {
            res.send({ player: player, index: index });
        })
    })
})

app.post("/switch", function (req, res) {
    Player.find({}).then(players => {
        const sortedPlayers = players.sort((a, b) => a.number - b.number)
        if (req.body.data.dir === "prev" && req.body.data.index != 0) {
            sortedPlayers[req.body.data.index].chosen = false;
            sortedPlayers[req.body.data.index - 1].chosen = true;
            sortedPlayers.forEach(player => {
                player.save()
            })
        } else if (req.body.data.dir === "next" && req.body.data.index != 9) {
            sortedPlayers[req.body.data.index].chosen = false;
            sortedPlayers[req.body.data.index + 1].chosen = true;
            sortedPlayers.forEach(player => {
                player.save()
            })
        }
        res.send(sortedPlayers);
    })
})

app.listen(5000, function () {
    console.log("App is listening on port 5000")
})