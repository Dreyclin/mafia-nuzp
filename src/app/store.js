import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "../features/game/gameSlice";
import timerSlice from "../features/game/timerSlice";

export const store = configureStore({
    reducer: {
        gameReducer: gameSlice,
        timerReducer: timerSlice
    }
})