import { createSlice } from "@reduxjs/toolkit";
import { Teams } from "types/reduxStore.Types";
import { Team } from "types/volleyballTool.New.Types";
import { v4 as uuidv4 } from "uuid";

export const homeTeam: Team = {
  id: uuidv4(),
  isHome: true,
  name: "Home",
};

export const awayTeam: Team = {
  id: uuidv4(),
  isHome: false,
  name: "Away",
};

const initialState: Teams = {
  byId: { [homeTeam.id]: homeTeam, [awayTeam.id]: awayTeam },
  allIds: [homeTeam.id, awayTeam.id],
};

export const teamsSlice = createSlice({
  initialState,
  name: "Teams",
  reducers: {},
});

export default teamsSlice.reducer;
