import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TeamsSettings } from "types/reduxStore.Types";
import { TeamSettings } from "types/volleyballTool.New.Types";

const initialState: TeamsSettings = {
  byId: {},
  allIds: [],
};

export const teamSettingsSlice = createSlice({
  name: "TeamSettings",
  initialState,
  reducers: {
    /**
     * Adds new team settings
     * @param state - State
     * @param action - Action
     */
    addTeamSettings: (state, action: PayloadAction<TeamSettings>) => {
      const settings = action.payload;

      state.byId[settings.id] = settings;
      state.allIds.push(settings.id);
    },
  },
});

export const { addTeamSettings } = teamSettingsSlice.actions;

export default teamSettingsSlice.reducer;
