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

      // update player's location
      state.byPlayerId[location.playerId].x = location.x;
      state.byPlayerId[location.playerId].y = location.y;
    },
    /**
     * Associates **ALL PLAYER LOCATIONS** with given state id
     * @param state - main State
     * @param action - payload
     */
    addLocationToGameState: (state: PlayersLocations, action: PayloadAction<{ gameStateId: string }>) => {
      const { gameStateId } = action.payload;

      // init
      state.byGameStateId[gameStateId] = {};

      // TODO: save only the diff locations, if players location hasn't changed from the last state don't create a new one
      Object.keys(state.byPlayerId).forEach((playerId: string) => {
        const location: PlayerLocation = {
          playerId,
          id: uuidv4(),
          x: state.byPlayerId[playerId].x,
          y: state.byPlayerId[playerId].y,
        };

        // add location for the specific player
        state.byGameStateId[gameStateId][playerId] = location;

        // add the location to the state
        state.byId[location.id] = location;
        state.byPlayerId[playerId].id = location.id;
        state.allIds.push(location.id);
      });
    },
  },
});

export const { updateLocation, addLocationToGameState } = playersLocationsSlice.actions;

export default playersLocationsSlice.reducer;
