const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect('mongodb+srv://admin:freetimenuzpcheesecode@mafiacluster.fvgwqjh.mongodb.net/mafiaDB');

const playerSchema = mongoose.Schema({
    number: Number,
    fouls: [String],
    role: String,
    chosen: Boolean,
    status: String
})

const timerSchema = mongoose.Schema({
    minutes: Number,
    seconds: Number,
    isRunning: Boolean
})

const candidateSchema = mongoose.Schema({
    number: Number,
    votes: Number
})

const Candidate = mongoose.model("Candidate", candidateSchema);
const Timer = mongoose.model("Timer", timerSchema);
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
                    chosen: player.chosen,
                    status: player.status
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
        if (player.status !== "kicked") {
            const index = player.fouls.findIndex((foul) => foul === null);
            player.fouls[index] = "F";
            player.save().then(() => {
                res.send(player);
            });
        } else {
            res.send(player);
        }

    })
})

app.post("/setRole", function (req, res) {
    Player.findOne({ number: req.body.data.player.number }).then(player => {
        if (player.status !== "kicked") {
            player.role = req.body.data.role;
            player.save().then(() => {
                res.send(player);
            })
        } else {
            res.send(player);
        }

    })
})

app.post("/reset", function (req, res) {
    Player.find({}).then(players => {
        players.forEach(player => {
            for (let i = 0; i < player.fouls.length; i++) {
                player.fouls[i] = null;
            }
            player.role = null;
            player.status = "in-game";
            player.save()
        })
        res.send(players.sort((a, b) => a.number - b.number));
    })
})

app.post("/choose", function (req, res) {

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

app.post("/kick", function (req, res) {
    Player.findOne({ chosen: true }).then(player => {
        player.status = "kicked";
        player.save().then(() => {
            res.send(player);
        })
    })
})

app.post("/loadTimer", function (req, res) {
    Timer.findOne({}).then((timer) => {
        if (!timer) {
            const newTimer = new Timer({
                minutes: req.body.data.minutes,
                seconds: req.body.data.seconds,
                isRunning: req.body.data.isRunning
            })

            newTimer.save().then(() => {
                res.send(newTimer);
            })
        } else {
            res.send(timer);
        }
    })
})

app.post("/controlAmountTime", function (req, res) {
    Timer.findOne({}).then((timer) => {
        if (req.body.data === "inc") {
            timer.seconds += 5;
            if (timer.seconds >= 60) {
                timer.seconds = 0 + (60 - timer.seconds);
                timer.minutes += 1;
                timer.save().then(() => {
                    res.send(timer);
                })

            } else {
                timer.save().then(() => {
                    res.send(timer);
                })
            }
        } else if (req.body.data === "dec") {
            timer.seconds -= 5;
            if (timer.seconds < 0) {
                if (timer.minutes === 0) {
                    res.send(timer);
                } else {
                    timer.minutes -= 1;
                    timer.seconds = 0 + (60 + timer.seconds);
                    timer.save().then(() => {
                        res.send(timer);
                    })
                }
            } else {
                timer.save().then(() => {
                    res.send(timer);
                })
            }
        }
    })
})

app.post("/saveTimerValue", function(req, res) {
    Timer.findOne({}).then((timer) => {
        if (timer.seconds > 0) {
            timer.seconds--;
        } else {
            timer.seconds = 59;
            if (timer.minutes > 0) {
                timer.minutes--;
            } else {
                timer.isRunning = false;
            }
        }
        timer.save().then(() => {
            res.send(timer);
        })
    })
})

app.post("/controls", function(req, res) {
    Timer.findOne({}).then((timer) => {
        if(req.body.data === "start"){
            timer.isRunning = true;
        } else if(req.body.data === "stop"){
            timer.isRunning = false;
        }
        timer.save().then(() => {
            res.send(timer.isRunning);
        })
    })
})

app.post("/setOnVoting", function(req, res) {

})

app.listen(5000, function () {
    console.log("App is listening on port 5000")
})