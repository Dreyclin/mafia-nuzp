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
        if (!players) {
            req.body.players.forEach(player => {
                const newPlayer = new Player({
                    number: player.number,
                    fouls: player.fouls,
                    role: player.role,
                    chosen: player.chosen
                })

                newPlayer.save().then(() => {
                    console.log("Successfully saved!");
                })
            });
        } else {
            res.send(players.sort((a, b) => a.number - b.number));
        }
    })

})

app.listen(5000, function () {
    console.log("App is listening on port 5000")
})