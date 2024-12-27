import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { gameId } from "components/Scoreboard/game.Slice";
import { GameStates } from "types/reduxStore.Types";
import { GameState } from "types/volleyballTool.New.Types";
// import { v4 as uuidv4 } from "uuid";
// import { initialPlayers } from "components/Players/players.Slice";

// initial game state
// TODO: this should be removed from the future releases, when we setup a new game (game Id is created then we press start/initialize button which will
// transition us to the main page, then we will create this initial state)
// const initialGameState: GameState = {
//   id: uuidv4(),
//   gameId: gameId,
//   dependencies: { activePlayerIds: [], playerLocationIds: {} },
// };
// TODO: make sure the initial state is stored in the game state
// initial stats
const initialState: GameStates = { byId: {}, allIds: [], currentStateId: undefined };

export const gameStates = createSlice({
  initialState,
  name: "game states",
  reducers: {
    create: (state: GameStates, action: PayloadAction<GameState>) => {
      const { id } = action.payload;

      state.byId[id] = action.payload;
      state.allIds.push(id);
      // select this as the current state
      state.currentStateId = id;
    },

    selectCurrentGameState: (state: GameStates, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;

      state.currentStateId = id;
    },
  },
});

export const { create, selectCurrentGameState } = gameStates.actions;

export default gameStates.reducer;
