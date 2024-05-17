import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const updatePlayersData = createAsyncThunk(
    'players/updateData',
    async () => {
        try {
            const response = await axios.post("http://localhost:5000/load", { players })
            return response.data
        } catch (error) {
            console.log(error);
        }
    }
)

export const setFoul = createAsyncThunk(
    'players/setFoul',
    async (data) => {
        try {
            const response = await axios.post("http://localhost:5000/setFoul", { data })
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
)

export const setRole = createAsyncThunk(
    'players/setRole',
    async (data, { dispatch }) => {
        try {
            const response = await axios.post("http://localhost:5000/setRole", { data })
            dispatch(updatePlayersData());
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
)

export const resetGame = createAsyncThunk(
    'players/reset',
    async () => {
        try {
            const response = await axios.post("http://localhost:5000/reset")
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
)

export const choosePlayer = createAsyncThunk(
    'players/choose',
    async (data) => {
        try {
            const response = await axios.post("http://localhost:5000/choose", { data })
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
)

export const switchPlayers = createAsyncThunk(
    'players/switch',
    async (data) => {
        try {
            const response = await axios.post("http://localhost:5000/switch", { data })
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
)

export const kickPlayer = createAsyncThunk(
    'player/kick',
    async (data, {dispatch}) => {
        try {
            const response = await axios.post("http://localhost:5000/kick", { data })
            dispatch(checkGameOver());
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
)

export const loadCandidates = createAsyncThunk(
    'vote/loadCandidates',
    async (data) => {
        try {
            const response = await axios.post('http://localhost:5000/loadCandidates')
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
)

export const setOnVoting = createAsyncThunk(
    'vote/setOnVoting',
    async (data, {dispatch}) => {
        try {
            const response = await axios.post("http://localhost:5000/setOnVoting", { data })
            dispatch(loadCandidates());
            return response.data;
        } catch (error) {
            console.log(error)
        }
    }
)

export const checkGameOver = createAsyncThunk(
    'game/over',
    async (data, {dispatch}) => {
        try {
            const response = await axios.post('http://localhost:5000/checkOver', { data });
            dispatch(loadGame());
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
)

export const loadGame = createAsyncThunk(
    'game/load',
    async (data) => {
        try {
            const response = await axios.post('http://localhost:5000/loadGame', { data });
            return response.data;
        } catch (error) {
            console.log(error)
        }
    }
)

export const voteForPlayer = createAsyncThunk(
    'vote/votePlayer',
    async (data, {dispatch}) => {
        try {
            const response = await axios.post('http://localhost:5000/votePlayer', {data});
            console.log(response.data);
            if(response.data.endVoting){
                dispatch(countingVotes());
            }
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
)

export const countingVotes = createAsyncThunk(
    'vote/counting',
    async(data) => {
        try {
            const response = await axios.post("http://localhost:5000/countingVotes", {data})
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
)

let players = [
    { number: 1, fouls: [null, null, null, null], role: null, chosen: true, status: "in-game", onVoting: false },
    { number: 2, fouls: [null, null, null, null], role: null, chosen: false, status: "in-game", onVoting: false },
    { number: 3, fouls: [null, null, null, null], role: null, chosen: false, status: "in-game", onVoting: false },
    { number: 4, fouls: [null, null, null, null], role: null, chosen: false, status: "in-game", onVoting: false },
    { number: 5, fouls: [null, null, null, null], role: null, chosen: false, status: "in-game", onVoting: false  },
    { number: 6, fouls: [null, null, null, null], role: null, chosen: false, status: "in-game", onVoting: false  },
    { number: 7, fouls: [null, null, null, null], role: null, chosen: false, status: "in-game", onVoting: false  },
    { number: 8, fouls: [null, null, null, null], role: null, chosen: false, status: "in-game", onVoting: false  },
    { number: 9, fouls: [null, null, null, null], role: null, chosen: false, status: "in-game", onVoting: false  },
    { number: 10, fouls: [null, null, null, null], role: null, chosen: false, status: "in-game", onVoting: false  }]

let candidates = [
]

const initialState = {
    players: players,
    candidates: candidates,
    gameOver: false,
    winnerTeam: null,
    votesCircles: 0
}

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(updatePlayersData.fulfilled, (state, action) => {
                state.players = action.payload
            })
            .addCase(setFoul.fulfilled, (state, action) => {
                const chosenIndex = state.players.findIndex((player) => player.chosen === true);
                state.players[chosenIndex] = action.payload
            })
            .addCase(setRole.fulfilled, (state, action) => {
                const chosenIndex = state.players.findIndex((player) => player.chosen === true);
                state.players[chosenIndex] = action.payload
            })
            .addCase(resetGame.fulfilled, (state, action) => {
                state.players = action.payload.players;
                state.candidates = action.payload.candidates;
            })
            .addCase(choosePlayer.fulfilled, (state, action) => {
                const chosenIndex = state.players.findIndex((player) => player.chosen === true);
                state.players[chosenIndex].chosen = false;

                const { player, index } = action.payload
                state.players[index] = player;
            })
            .addCase(switchPlayers.fulfilled, (state, action) => {
                state.players = action.payload
            })
            .addCase(kickPlayer.fulfilled, (state, action) => {
                const chosenIndex = state.players.findIndex((player) => player.chosen === true);
                state.players[chosenIndex] = action.payload
            })
            .addCase(setOnVoting.fulfilled, (state, action) => {
                state.candidates = action.payload;
            })
            .addCase(loadCandidates.fulfilled, (state, action) => {
                state.candidates = action.payload;
            })
            .addCase(loadGame.fulfilled, (state, action) => {
                const {gameOver, winnerTeam} = action.payload;

                state.winnerTeam = winnerTeam;
                state.gameOver = gameOver;
            })
            .addCase(checkGameOver.fulfilled, (state, action) => {
                const {gameOver, winnerTeam} = action.payload;

                state.winnerTeam = winnerTeam;
                state.gameOver = gameOver;
            })
            .addCase(voteForPlayer.fulfilled, (state, action) => {
                state.candidates = action.payload.candidates;
            })
    }
})

export default gameSlice.reducer