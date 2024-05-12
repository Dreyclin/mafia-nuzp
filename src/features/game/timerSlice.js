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

const timerSlice = createSlice({
    name: "timer",
    initialState,
    reducers: {
        tick: state => {
            if (state.seconds > 0) {
                state.seconds--;
            } else {
                state.seconds = 59;
                if (state.minutes > 0) {
                    state.minutes--;
                } else {
                    state.isRunning = false;
                }
            }
        },
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
    }
})

export const {startTimer, stopTimer, tick} = timerSlice.actions

export default timerSlice.reducer