import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const updatePlayersData = createAsyncThunk(
    'players/updateData',
    async () => {
        try {
            const response = await axios.post("http://localhost:5000/load", {players})
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
            const response = await axios.post("http://localhost:5000/setFoul", {data})
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
            const response = await axios.post("http://localhost:5000/setRole", {data})
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
)

let players = [
    { number: 1, fouls: [null, null, null, null], role: null, chosen: false },
    { number: 2, fouls: [null, null, null, null], role: null, chosen: false },
    { number: 3, fouls: [null, null, null, null], role: null, chosen: false },
    { number: 4, fouls: [null, null, null, null], role: null, chosen: false },
    { number: 5, fouls: [null, null, null, null], role: null, chosen: false },
    { number: 6, fouls: [null, null, null, null], role: null, chosen: true },
    { number: 7, fouls: [null, null, null, null], role: null, chosen: false },
    { number: 8, fouls: [null, null, null, null], role: null, chosen: false },
    { number: 9, fouls: [null, null, null, null], role: null, chosen: false },
    { number: 10, fouls: [null, null, null, null], role: null, chosen: false }]

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
    }
})

// export const { setFoul, setRole } = gameSlice.actions

export default gameSlice.reducer