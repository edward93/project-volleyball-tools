import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Scores } from "types/reduxStore.Types";
import { Score } from "types/volleyballTool.New.Types";

const initialState: Scores = {
  byId: {},
  byGameStateId: {},
  allIdsByGameId: {},
  allIds: [],
};

export const scoresSlice = createSlice({
  initialState,
  name: "Scores",
  reducers: {
    createNewScore: (state: Scores, action: PayloadAction<{ score: Score; gameStateId: string }>) => {
      const {
        score,
        gameStateId,
        score: { gameId, id },
      } = action.payload;

      state.allIds.push(id);
      state.byId[id] = score;
      
      if (state.byGameStateId[gameId]) state.byGameStateId[gameId][gameStateId] = score;
      else state.byGameStateId[gameId] = { [gameStateId]: score };

      if (state.allIdsByGameId[gameId]) state.allIdsByGameId[gameId].push(id);
      else state.allIdsByGameId[gameId] = [id];
    },
  },
});

export const { createNewScore } = scoresSlice.actions;

export default scoresSlice.reducer;
