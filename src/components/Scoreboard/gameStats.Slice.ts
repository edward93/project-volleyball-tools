import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { GameStats } from "../../types/reduxStore.Types";
import { gameId } from "./game.Slice";

const statId = uuidv4();

const gameInfo = {
  id: statId,
  // TODO: use real game id
  gameId: gameId,
  set: 1,
  currentScore: { home: 0, away: 0 },
};

const initialState: GameStats = {
  byId: {
    [statId]: gameInfo,
  },
  allIds: [statId],
  byGameId: {
    [gameId]: gameInfo,
  },
};

export const gameStatsSlice = createSlice({
  initialState,
  name: "gameStats",
  reducers: {},
});

export default gameStatsSlice.reducer;
