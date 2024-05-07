import { createSlice } from "@reduxjs/toolkit";

let players = [
    {number: 1, fouls: [null, null, null, null], role: null, chosen: false},
    {number: 2, fouls: [null, null, null, null], role: null, chosen: false},
    {number: 3, fouls: [null, null, null, null], role: null, chosen: false},
    {number: 4, fouls: [null, null, null, null], role: null, chosen: false},
    {number: 5, fouls: [null, null, null, null], role: null, chosen: false},
    {number: 6, fouls: [null, null, null, null], role: null, chosen: true},
    {number: 7, fouls: [null, null, null, null], role: null, chosen: false},
    {number: 8, fouls: [null, null, null, null], role: null, chosen: false},
    {number: 9, fouls: [null, null, null, null], role: null, chosen: false},
    {number: 10, fouls: [null, null, null, null], role: null, chosen: false}]

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
        setRole(state, action) {
            let {role} = action.payload
            let chosenIndex = state.players.findIndex(player => player.chosen === true);
            state.players[chosenIndex].role = role;
        },

        setFoul(state, action) {
            let chosenIndex = state.players.findIndex(player => player.chosen === true);
            
            let foulIndex = state.players[chosenIndex].fouls.findIndex(foul => foul === null);

            state.players[chosenIndex].fouls[foulIndex] = "F";
        },
    }
})

export const {setFoul, setRole} = gameSlice.actions

export default gameSlice.reducer