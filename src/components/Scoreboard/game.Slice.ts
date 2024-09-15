import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Game } from "types/volleyballTool.New.Types";
import { v4 as uuidv4 } from "uuid";
import { awayTeam, homeTeam } from "../Players/teams.Slice";

// TODO: remove this after refactoring this
const workspaceId = uuidv4();

const initialState: Game = {
  id: uuidv4(),
  workspaceId,
  hasEnded: false,

  homeTeamId: homeTeam.id,
  awayTeamId: awayTeam.id,
};

export const gameSlice = createSlice({
  initialState,
  name: "game",
  reducers: {
    /**
     * Creates a new game
     * @param state - state
     */
    newGame: (state: Game, action: PayloadAction<string>) => {
      const gameId = action.payload;
      
      state.id = gameId;
      state.workspaceId = workspaceId;
      state.hasEnded = false;

      state.awayTeamId = awayTeam.id;
      state.homeTeamId = homeTeam.id;
    },
    endTheGame: (state: Game, action: PayloadAction<string>) => {
      const gameId = action.payload;

      if (gameId === state.id) {
        state.hasEnded = true;
      }
    },
  },
});

export const { newGame } = gameSlice.actions;

export default gameSlice.reducer;
