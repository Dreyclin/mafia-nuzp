import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    time: {
        minutes: 1,
        seconds: 0
    }
}
export const loadTimer = createAsyncThunk(
    'timer/load',
    async (data) => {
        const response = await axios.post("http://localhost:5000/loadTimer", {data})
        return response.data;
    }
)

export const increaseTime = createAsyncThunk(
    'timer/increase',
    async (data) => {
        const response = await axios.post("http://localhost:5000/increase", {data})
        return response.data
    }
)

const timerSlice = createSlice({
    name: "timer",
    initialState,
    extraReducers: (builder) => {
        builder
        
        .addCase(loadTimer.fulfilled, (state, action) => {
            state.time = action.payload
        })

        .addCase(increaseTime.fulfilled, (state, action) => {
            let {minutes, seconds} = state.time;
            let {newMin, newSec} = action.payload;

            minutes = newMin;
            seconds = newSec;
        })
    }
})

export default timerSlice.reducer