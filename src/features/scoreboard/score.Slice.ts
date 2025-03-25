import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Scores } from "types/reduxStore.Types";
import { Score } from "types/volleyballTool.New.Types";

const initialState: Scores = {
  byId: {},
  allIds: [],
};

export const scoresSlice = createSlice({
  initialState,
  name: "Scores",
  reducers: {
    createNewScore: (state: Scores, action: PayloadAction<Score>) => {
      const score = action.payload;

      state.allIds.push(score.id);
      state.byId[score.id] = score;
    },
  },
});

export const { createNewScore } = scoresSlice.actions;

export default scoresSlice.reducer;
