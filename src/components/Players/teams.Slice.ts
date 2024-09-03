import { createSlice } from "@reduxjs/toolkit";
import { Teams } from "types/reduxStore.Types";
import { HalfCourt, Team } from "types/volleyballTool.New.Types";
import { v4 as uuidv4 } from "uuid";

export const homeTeam: Team = {
  id: uuidv4(),
  isHome: true,
  name: "Home",
  courtSide: HalfCourt.Left,
};

export const awayTeam: Team = {
  id: uuidv4(),
  isHome: false,
  name: "Away",
  courtSide: HalfCourt.Right,
};

// default teams
export const defaultTeams: Record<string, Team> = {
  [homeTeam.id]: homeTeam,
  [awayTeam.id]: awayTeam,
};

const initialState: Teams = {
  byId: defaultTeams,
  allIds: [homeTeam.id, awayTeam.id],
};

export const teamsSlice = createSlice({
  initialState,
  name: "Teams",
  reducers: {},
});

export default teamsSlice.reducer;
