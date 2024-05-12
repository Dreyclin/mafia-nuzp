import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    time: {
        minutes: 1,
        seconds: 0
    }
}

const increaseTime = createAsyncThunk(
    'timer/increase',
    async (data) => {
        const response = axios.post("http://localhost:5000/increase", {data})
        return response.data
    }
)

const timerSlice = createSlice({
    name: "timer",
    initialState,
    extraReducers: (builder) => {
        
    }
})

export default timerSlice.reducer