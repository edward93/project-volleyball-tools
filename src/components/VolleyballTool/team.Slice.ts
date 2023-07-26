import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { Team } from "../../types/reduxStore.Types";
import { Player } from "types/volleyballTool.New.Types";

const initialState: Team = {
  id: uuidv4(),
  gameId: "",
  isHome: true,
  name: "",
  players: {},
};

export const teamSlice = createSlice({
  initialState,
  name: "team",
  reducers: {
    addPlayer: (state: Team, action: PayloadAction<Player>) => {
      state.players[action.payload.id] = action.payload;
    },
    removePlayer: (state: Team, action: PayloadAction<string>) => {
      delete state.players[action.payload];
    },
    updateName: (state: Team, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setIsHome: (state: Team) => {
      state.isHome = true;
    },
    unsetIsHome: (state: Team) => {
      state.isHome = false;
    }
  },
});

export const { addPlayer, removePlayer, updateName, setIsHome, unsetIsHome } = teamSlice.actions;

export default teamSlice.reducer;
