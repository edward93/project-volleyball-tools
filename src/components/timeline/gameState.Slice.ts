import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameStates } from "types/reduxStore.Types";
import { GameState } from "types/volleyballTool.New.Types";

// initial stats
const initialState: GameStates = { byId: {}, allIds: [], currentState: undefined };

export const gameStates = createSlice({
  initialState,
  name: "game states",
  reducers: {
    create: (state: GameStates, action: PayloadAction<GameState>) => {
      const { id } = action.payload;

      state.byId[id] = action.payload;
      state.allIds.push(id);
      // select this as the current state
      state.currentState = id;
    },

    selectCurrentGameState: (state: GameStates, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;

      state.currentState = id;
    },
  },
});

export const { create, selectCurrentGameState } = gameStates.actions;

export default gameStates.reducer;
