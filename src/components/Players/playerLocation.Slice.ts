import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { PlayersLocations } from "types/reduxStore.Types";
import { PlayerLocation } from "types/volleyballTool.New.Types";

import { initialPlayers } from "./players.Slice";

// default initial locations
const initialLocations: PlayerLocation[] = initialPlayers.map((c) => ({
  id: uuidv4(),
  playerId: c.id,
  x: c.cx,
  y: c.cy,
}));

// initial stats
const initialState: PlayersLocations = {
  byId: initialLocations.reduce((a, v) => ({ ...a, [v.id]: v }), {}),
  byPlayerId: initialLocations.reduce((a, v) => ({ ...a, [v.playerId]: v }), {}),
  byGameStateId: {},
  allIds: initialLocations.map((c) => c.id),
};

export const playersLocationsSlice = createSlice({
  initialState,
  name: "player locations",
  reducers: {
    updateLocation: (state: PlayersLocations, action: PayloadAction<{ location: PlayerLocation }>) => {
      const { location } = action.payload;

      // add new location
      state.byId[location.id] = location;

      // update player's location
      state.byPlayerId[location.playerId] = location;
      // add to the list of ids
      state.allIds.push(location.id);
    },
    /**
     * Associates **ALL PLAYER LOCATIONS** with given state id
     * @param state - main State
     * @param action - payload
     */
    addLocationToGameState: (state: PlayersLocations, action: PayloadAction<{ gameStateId: string }>) => {
      const { gameStateId } = action.payload;

      state.byGameStateId[gameStateId] = Object.keys(state.byPlayerId)
        .map((playerId) => ({
          playerId,
          id: state.byPlayerId[playerId].id,
          x: state.byPlayerId[playerId].x,
          y: state.byPlayerId[playerId].y,
        }))
        .reduce((a, v) => ({ ...a, [v.playerId]: v }), {});
    },
  },
});

export const { updateLocation, addLocationToGameState } = playersLocationsSlice.actions;

export default playersLocationsSlice.reducer;
