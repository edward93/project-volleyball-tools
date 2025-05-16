import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Game } from "types/volleyballTool.New.Types";
import { v4 as uuidv4 } from "uuid";
// import { awayTeam, homeTeam } from "../Players/teams.Slice";

// TODO: remove this after refactoring this
const workspaceId = uuidv4();

const initialState: Game = {
  id: uuidv4(),
  workspaceId,
  hasEnded: false,
  useHalfCourt: true,

  // homeTeamId: homeTeam.id,
  // awayTeamId: awayTeam.id,
};

export const gameSlice = createSlice({
  initialState,
  name: "game",
  reducers: {
    /**
     * Creates a new game
     * @param state - state
     */
    newGame: (state: Game, action: PayloadAction<Game>) => {
      const game = action.payload;

      state.id = game.id;
      state.workspaceId = workspaceId;
      state.hasEnded = false;
      state.useHalfCourt = game.useHalfCourt;

      state.awayTeamId = game.awayTeamId;
      state.homeTeamId = game.homeTeamId;
    },
    endTheGame: (state: Game, action: PayloadAction<string>) => {
      const gameId = action.payload;

      if (gameId === state.id) {
        state.hasEnded = true;
      }
    },
    /**
     * TMP: Updates half court flag
     * @param state - state
     * @param action Action
     */
    updateHalfCourt: (state: Game, action: PayloadAction<boolean>) => {
      state.useHalfCourt = action.payload;
    },
  },
});

export const { newGame, updateHalfCourt } = gameSlice.actions;

export default gameSlice.reducer;
