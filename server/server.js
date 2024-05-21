const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect('mongodb+srv://admin:freetimenuzpcheesecode@mafiacluster.fvgwqjh.mongodb.net/mafiaDB');

const gameSchema = mongoose.Schema({
    winnerTeam: String,
    gameOver: Boolean,
    roles: [Object],
    votingCircles: Number
})

const playerSchema = mongoose.Schema({
    number: Number,
    fouls: [String],
    role: String,
    chosen: Boolean,
    status: String,
    onVoting: Boolean
})

const timerSchema = mongoose.Schema({
    minutes: Number,
    seconds: Number,
    isRunning: Boolean
})

const candidateSchema = mongoose.Schema({
    number: Number,
    votes: Number,
    isVoted: Boolean
})

const Candidate = mongoose.model("Candidate", candidateSchema);
const Timer = mongoose.model("Timer", timerSchema);
const Player = mongoose.model("Player", playerSchema);
const Game = mongoose.model("Game", gameSchema);


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
                    status: player.status,
                    onVoting: player.onVoting
                })
                newPlayer.save().then(() => {
                })
            });
        } else {
            res.send(players.sort((a, b) => a.number - b.number));
        }
    })

})

app.post("/setFoul", function (req, res) {
    let lastFoul = false;
    Player.findOne({ number: req.body.data.number }).then(player => {
        if (player.status !== "kicked") {
            const index = player.fouls.findIndex((foul) => foul === null);
            player.fouls[index] = "✔";
            if (index === 3) {
                lastFoul = true;
            }
            player.save().then(() => {
                res.send({ player: player, lastFoul: lastFoul });
            });
        } else {
            res.send({ player: player });
        }

    })
})

app.post("/setRole", function (req, res) {
    if (req.body.data.role === "Д" || req.body.data.role === "Ш") {
        Player.findOne({ role: req.body.data.role }).then((player) => {
            if (!player) {
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
            } else {
                player.role = null;
                player.save().then(() => {
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
            }
        })
    } else if (req.body.data.role === "М") {
        Player.find({ role: req.body.data.role }).then((players) => {
            if (players.length === 2) {
                players[0].role = null;
                players[0].save().then(() => {
                    Player.findOne({ number: req.body.data.player.number }).then((player) => {
                        if (player.status != "kicked") {
                            player.role = req.body.data.role;
                            player.save().then(() => {
                                res.send(player);
                            })
                        } else {
                            res.send(player);
                        }
                    })
                })
            } else {
                Player.findOne({ number: req.body.data.player.number }).then((player) => {
                    if (player.status != "kicked") {
                        player.role = req.body.data.role;
                        player.save().then(() => {
                            res.send(player);
                        })
                    } else {
                        res.send(player);
                    }
                })
            }
        })
    } else {
        Player.findOne({ number: req.body.data.player.number }).then(player => {
            if (player.status != "kicked") {
                player.role = req.body.data.role;
                player.save().then(() => {
                    res.send(player);
                })
            } else {
                res.send(player);
            }
        })
    }
})

app.post("/reset", function (req, res) {
    Player.find({}).then(players => {
        players.forEach(player => {
            for (let i = 0; i < player.fouls.length; i++) {
                player.fouls[i] = null;
            }
            player.role = null;
            player.status = "in-game";
            player.onVoting = false;
            player.save()
        })
        Candidate.deleteMany({}).then(() => {
            Game.findOne({}).then(game => {
                game.winnerTeam = null;
                game.gameOver = false;
                game.votingCircles = 0;
                game.save().then(() => {
                    Candidate.findOne({}).then(candidate => {
                        res.send({ players: players.sort((a, b) => a.number - b.number), candidates: candidate, votingCircles: game.votingCircles });
                    })

                })
            })
        })
    })
})

app.post("/choose", function (req, res) {
    Player.findOne({ chosen: true }).then(player => {
        if (!player) {
            Player.findOne({ number: 1 }).then((player) => {
                player.chosen = true;
                player.save().then(() => {
                    res.send(player);
                })
            })
        } else {
            player.chosen = false;
            player.save().then(() => {
                Player.findOne({ number: req.body.data }).then(player => {
                    const index = req.body.data - 1;
                    player.chosen = true;
                    player.save().then(() => {
                        res.send({ player: player, index: index });
                    })
                })
            });
        }

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
    let notFullRoles = false;

    Player.find({}).then(players => {
        players.forEach(player => {
            if (player.role === null) {
                notFullRoles = true;
                console.log(notFullRoles);
            }
        })
        if (!notFullRoles) {
            if (!req.body.data) {
                Player.find({}).then(players => {
                    players.forEach(player => {
                        if (player.chosen === true) {
                            player.status = "kicked";
                            player.save()
                        }
                    })
                    res.send({players: players.sort((a, b) => a.number - b.number), checkOver: true});
                })
            }
            else {
                Player.find({}).then(players => {
                    players.forEach(player => {
                        if (player.number === req.body.data) {
                            player.status = "kicked";
                            player.save();
                        }
                    })
                    res.send({players: players.sort((a, b) => a.number - b.number), checkOver: true});
                })
            }
        } else {
            res.send({players: players.sort((a, b) => a.number - b.number), checkOver: false});
        }
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

app.post("/saveTimerValue", function (req, res) {
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

app.post("/controls", function (req, res) {
    Timer.findOne({}).then((timer) => {
        if (req.body.data === "start") {
            timer.isRunning = true;
        } else if (req.body.data === "stop") {
            timer.isRunning = false;
        }
        timer.save().then(() => {
            res.send(timer.isRunning);
        })
    })
})

app.post("/loadCandidates", function (req, res) {
    Candidate.find({}).then(candidates => {
        res.send(candidates);
    })
})

app.post("/setOnVoting", function (req, res) {
    let candidateNumber;

    Player.findOne({ chosen: true }).then(player => {
        if (player.onVoting || player.status === "kicked") {
            return null
        } else {
            player.onVoting = true;
            player.save().then(() => {
                candidateNumber = player.number;
                Candidate.find({}).then(candidates => {
                    const newCandidate = new Candidate({
                        number: candidateNumber,
                        votes: null,
                        isVoted: false
                    })

                    newCandidate.save().then(() => {
                        res.send(candidates);
                    })
                })
            })

        }

    })
})

app.post("/checkOver", function (req, res) {
    Player.find({ status: "in-game" }).then((players) => {
        let blackTeamAmount = 0;
        let redTeamAmount = 0;
        players.forEach((player) => {
            if (player.role === "М" || player.role === "Д") {
                blackTeamAmount++;
            } else if (player.role === "К" || player.role === "Ш") {
                redTeamAmount++;
            }
        })
        Game.findOne({}).then(game => {
            if (blackTeamAmount === redTeamAmount) {
                game.winnerTeam = "Черные";
                game.gameOver = true;
                game.save().then(() => {
                    res.send(game);
                })
            } else if (blackTeamAmount === 0) {
                game.winnerTeam = "Красные";
                game.gameOver = true;
                game.save().then(() => {
                    res.send(game);
                })
            } else {
                res.send(game)
            }
        })

    })
})

app.post("/loadGame", function (req, res) {
    Game.findOne({}).then(game => {
        if (!game) {
            const newGame = new Game({
                winnerTeam: null,
                gameOver: false,
                playersInGame: 10,
                votingCircles: 0
            })
            newGame.save().then(() => {
                res.send(newGame);
            })
        } else {
            res.send(game);
        }
    })
})

app.post("/votePlayer", function (req, res) {
    const candidate = req.body.data.candidate;
    const votes = req.body.data.votes;
    Candidate.findOne({ number: candidate }).then(candidate => {
        candidate.votes = votes;
        candidate.isVoted = true;

        candidate.save().then(() => {
            Candidate.find({}).then(candidates => {
                res.send({ candidates: candidates, endVoting: req.body.data.endVoting });
            })
        })
    })
})

app.post("/countingVotes", function (req, res) {
    let newCandidates;
    Candidate.find({}).then(candidates => {
        let maxVotes = Math.max(...candidates.map(candidate => candidate.votes));
        let elementsWithMaxVotes = candidates.filter(candidate => candidate.votes === maxVotes);
        if (elementsWithMaxVotes.length === 1) {
            res.send({ candidates: null, playerToKick: elementsWithMaxVotes[0].number, resetVoting: true })
        } else {
            newCandidates = elementsWithMaxVotes.map(element => {
                element.isVoted = false;
                element.votes = 0;
                return element;
            })
            candidates = newCandidates;
            candidates.forEach(element => {
                element.save();
            });
            Game.findOne({}).then((game) => {
                game.votingCircles++;
                game.save().then(() => {
                    res.send({ candidates: newCandidates, votingCircles: game.votingCircles, resetVoting: false })
                })
            })
        }
    })
})

app.post("/resetVoting", function (req, res) {
    let votingCircles = 0;
    Game.findOne({}).then((game) => {
        game.votingCircles = votingCircles;
        game.save();
    })
    Candidate.find({}).then(candidates => {
        candidates.forEach(candidate => {
            Player.findOne({ number: candidate.number }).then(player => {
                player.onVoting = false;
                player.save();
            })
        })
    })
    Candidate.deleteMany({}).then(() => {
        res.send({ candidates: null, votingCircles: votingCircles })
    })
})

app.post("/resetTimer", function (req, res) {
    Timer.findOne({}).then(timer => {
        timer.minutes = 1;
        timer.seconds = 0;
        timer.save().then(() => {
            res.send(timer);
        })
    })
})

app.post("/sliceKick", async function (req, res) {
    const playersInGame = req.body.data.playersInGame;
    const votes = req.body.data.votes;

    const votesToKick = Math.ceil(playersInGame / 2);

    if (votes >= votesToKick) {
        try {
            const candidates = await Candidate.find({});
            for (const candidate of candidates) {
                const player = await Player.findOne({ number: candidate.number });
                if (player) {
                    player.status = "kicked";
                    await player.save();
                }
            }
            const players = await Player.find({});
            res.send(players.sort((a, b) => a.number - b.number));
        } catch (error) {
            console.error("Error occurred:", error);
            res.status(500).send("Internal server error");
        }
    } else {
        try {
            const players = await Player.find({});
            res.send(players.sort((a, b) => a.number - b.number));
        } catch (error) {
            console.error("Error occurred:", error);
            res.status(500).send("Internal server error");
        }
    }
})

app.post("/checkActiveRoles", function (req, res) {
    let don = false;
    let sheriff = false;
    let mafia = false;

    Player.findOne({ role: "Д" }).then(player => {
        if (player) {
            don = true;
            Player.findOne({ role: "Ш" }).then(player => {
                if (player) {
                    sheriff = true;
                    Player.find({ role: "М" }).then(players => {
                        if (players.length === 2) {
                            mafia = true;
                            Player.find({}).then(players => {
                                if (don && mafia && sheriff) {
                                    players.forEach(player => {
                                        if (player.role === null) {
                                            player.role = "К"
                                            player.save()
                                        }
                                    })
                                    res.send(players.sort((a, b) => a.number - b.number));
                                } else {
                                    res.send(players.sort((a, b) => a.number - b.number))
                                }
                            })
                        }
                    })
                }
            })
        }
    })    
})

app.listen(5000, function () {
    console.log("App is listening on port 5000")
})