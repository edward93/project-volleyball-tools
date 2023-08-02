import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameStates } from "types/reduxStore.Types";
import { GameState } from "types/volleyballTool.New.Types";

// initial stats
const initialState: GameStates = { byId: {}, allIds: [] };

export const gameStates = createSlice({
  initialState,
  name: "game states",
  reducers: {
    create: (state: GameStates, action: PayloadAction<GameState>) => {
      const { id } = action.payload;
      
      state.byId[id] = action.payload;
      state.allIds.push();
    }
  },
});

export const { create } = gameStates.actions;

export default gameStates.reducer;