import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { Game } from "../../types/reduxStore.Types";
// TODO: remove this after refactoring this
export const gameId = uuidv4();
const workspaceId = uuidv4();

const initialState: Game = {
  id: gameId,
  workspaceId,
  home: "Home",
  away: "Away",
};

export const gameSlice = createSlice({
  initialState,
  name: "game",
  reducers: {},
});

export default gameSlice.reducer;
