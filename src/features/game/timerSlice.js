import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
        try {
            const response = await axios.post("http://localhost:5000/loadTimer", { data })
            return response.data;
        } catch (error) {
            console.log(error)
        }

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

            .addCase(controlAmountTime.fulfilled, (state, action) => {
                let { minutes, seconds } = state.time;
                let { newMin, newSec } = action.payload;

                minutes = newMin;
                seconds = newSec;
            })
    }
})

export default timerSlice.reducer