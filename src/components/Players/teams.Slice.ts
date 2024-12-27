import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Teams } from "types/reduxStore.Types";
import { Team } from "types/volleyballTool.New.Types";

const initialState: Teams = {
  byId: {},
  allIds: [],
};

/** */
export const teamsSlice = createSlice({
  initialState,
  name: "Teams",
  reducers: {
    /**
     * Adds new team
     * @param state - State
     * @param action - Action
     */
    addTeam: (state: Teams, action: PayloadAction<Team>) => {
      const team = action.payload;

      state.byId[team.id] = team;
      state.allIds.push(team.id);
    },
  },
});

export const { addTeam } = teamsSlice.actions;

export default teamsSlice.reducer;
