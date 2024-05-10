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
    async (data) => {
        try {
            const response = await axios.post("http://localhost:5000/setRole", { data })
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
            const response = await axios.post("http://localhost:5000/switch", {data})
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
)

export const kickPlayer = createAsyncThunk(
    'player/kick',
    async (data) => {
        try {
            const response = await axios.post("http://localhost:5000/kick", {data})
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
)

let players = [
    { number: 1, fouls: [null, null, null, null], role: null, chosen: true, status: "in-game" },
    { number: 2, fouls: [null, null, null, null], role: null, chosen: false, status: "in-game" },
    { number: 3, fouls: [null, null, null, null], role: null, chosen: false, status: "in-game" },
    { number: 4, fouls: [null, null, null, null], role: null, chosen: false, status: "in-game" },
    { number: 5, fouls: [null, null, null, null], role: null, chosen: false, status: "in-game" },
    { number: 6, fouls: [null, null, null, null], role: null, chosen: false, status: "in-game" },
    { number: 7, fouls: [null, null, null, null], role: null, chosen: false, status: "in-game" },
    { number: 8, fouls: [null, null, null, null], role: null, chosen: false, status: "in-game" },
    { number: 9, fouls: [null, null, null, null], role: null, chosen: false, status: "in-game" },
    { number: 10, fouls: [null, null, null, null], role: null, chosen: false, status: "in-game" }]

let admin = {

}

const initialState = {
    players: players,
    adminPanel: admin
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
                state.players = action.payload
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
    }
})

export default gameSlice.reducer