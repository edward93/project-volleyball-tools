import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { Game } from "types/volleyballTool.New.Types";
import { homeTeam, awayTeam } from "../Players/teams.Slice";

// TODO: remove this after refactoring this
export const gameId = uuidv4();
const workspaceId = uuidv4();

const initialState: Game = {
  id: gameId,
  workspaceId,
  hasEnded: false,

  homeTeamId: homeTeam.id,
  awayTeamId: awayTeam.id,
};

export const gameSlice = createSlice({
  initialState,
  name: "game",
  reducers: {
    endTheGame: (state: Game, action: PayloadAction<string>) => {
      const gameId = action.payload;

      if (gameId === state.id) {
        state.hasEnded = true;
      }
    },
  },
});

export default gameSlice.reducer;
