import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    time: {
        minutes: 1,
        seconds: 0
    },
    isRunning: false
}
export const loadTimer = createAsyncThunk(
    'timer/load',
    async (data) => {
        try {
            const response = await axios.post("http://localhost:5000/loadTimer", { data })
            return response.data;
        } catch (error) {
            console.log(error)
        }

    }
)

export const saveTimerValue = createAsyncThunk(
    'timer/saveValue',
    async (data) => {
        try {
            const response = await axios.post("http://localhost:5000/saveTimerValue", { data })
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
)

export const timerControls = createAsyncThunk(
    'timer/controls',
    async (data) => {
        try {
            const response = await axios.post("http://localhost:5000/controls", {data})
            return response.data;
        } catch (error) {
            console.log(error)
        }
    }
)

export const controlAmountTime = createAsyncThunk(
    'timer/controlAmount',
    async (data, { dispatch }) => {
        try {
            const response = await axios.post("http://localhost:5000/controlAmountTime", { data })
            dispatch(loadTimer())
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
)

export const resetTimer = createAsyncThunk(
    'timer/reset',
    async(data) => {
        try {
            const response = await axios.post("http://localhost:5000/resetTimer", {data})
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
)

const timerSlice = createSlice({
    name: "timer",
    initialState,
    reducers: {
        startTimer: state => {
            state.isRunning = true;
        },
        stopTimer: state => {
            state.isRunning = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadTimer.fulfilled, (state, action) => {
                state.time = action.payload
            })

            .addCase(controlAmountTime.fulfilled, (state, action) => {
                let { minutes, seconds } = state.time;
                let { newMin, newSec } = action.payload;

                minutes = newMin;
                seconds = newSec;
            })

            .addCase(saveTimerValue.fulfilled, (state, action) => {
                state.time = action.payload
            })
            .addCase(timerControls.fulfilled, (state, action) => {
                state.isRunning = action.payload
            })
            .addCase(resetTimer.fulfilled, (state, action) => {
                state.time = action.payload;
            })
    }
})

export const { startTimer, stopTimer, tick } = timerSlice.actions

export default timerSlice.reducer