import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameActions } from "types/reduxStore.Types";
import { GameAction } from "types/volleyballTool.New.Types";

// initial stats
const initialState: GameActions = { byId: {}, allIds: [] };

export const gameActionSlice = createSlice({
  initialState,
  name: "game actions",
  reducers: {
    create: (state: GameActions, action: PayloadAction<GameAction>) => {
      const gameAction = action.payload;

      state.byId[gameAction.id] = gameAction;
      state.allIds.push(gameAction.id);
    },
  },
});

export const { create } = gameActionSlice.actions;

export default gameActionSlice.reducer;
