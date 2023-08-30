import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameActions } from "types/reduxStore.Types";
import { GameAction } from "types/volleyballTool.New.Types";

// initial stats
const initialState: GameActions = { byId: {}, allIds: [], byGameStateId: {} };

export const gameActionSlice = createSlice({
  initialState,
  name: "game actions",
  reducers: {
    create: (state: GameActions, action: PayloadAction<{ gameAction: GameAction; gameStateId: string }>) => {
      const {
        gameAction,
        gameAction: { id },
        gameStateId,
      } = action.payload;

      state.byId[id] = gameAction;
      state.byGameStateId[gameStateId] = gameAction;
      state.allIds.push(id);
    },
  },
});

export const { create } = gameActionSlice.actions;

export default gameActionSlice.reducer;
