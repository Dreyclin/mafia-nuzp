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

app.post("/setRole", function(req, res) {
    Player.findOne({number: req.body.data.player.number}).then(player => {
        player.role = req.body.data.role;
        player.save().then(() => {
            res.send(player);
        })
    })
})

app.listen(5000, function () {
    console.log("App is listening on port 5000")
})