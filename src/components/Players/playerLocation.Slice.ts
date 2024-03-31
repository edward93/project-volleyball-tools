import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { PlayersLocations } from "types/reduxStore.Types";
import { PlayerLocation, RotationPositions } from "types/volleyballTool.New.Types";

import { initialPlayers } from "./players.Slice";
import { defaultTeams } from "./teams.Slice";

// default initial locations
const initialLocations: PlayerLocation[] = initialPlayers
  .filter((c) => c.isActive)
  .map((c) => ({
    id: uuidv4(),
    playerId: c.id,
    x: RotationPositions[c.currentRotationPosition ?? 6][defaultTeams[c.teamId].courtSide].x,
    y: RotationPositions[c.currentRotationPosition ?? 6][defaultTeams[c.teamId].courtSide].y,
  }));

// initial stats
const initialState: PlayersLocations = {
  byId: initialLocations.reduce((a, v) => ({ ...a, [v.id]: v }), {}),
  byPlayerId: initialLocations.reduce((a, v) => ({ ...a, [v.playerId]: v.id }), {}),
  // currentLocationIdByPlayerId: initialLocations.reduce((a, v) => ({ ...a, [v.playerId]: v.id }), {}),
  byGameStateId: {},
  allIds: initialLocations.map((c) => c.id),
};

export const playersLocationsSlice = createSlice({
  initialState,
  name: "player locations",
  reducers: {
    updateLocation: (state: PlayersLocations, action: PayloadAction<{ location: PlayerLocation }>) => {
      const { location } = action.payload;

      const locationId = state.byPlayerId[location.playerId];

      state.byId[locationId].x = location.x;
      state.byId[locationId].y = location.y;

      // update player's location
      // state.byPlayerId[location.playerId].x = location.x;
      // state.byPlayerId[location.playerId].y = location.y;
    },
    /**
     * Updates location for given players
     * @param state - main state
     * @param action - payload containing all locations that need to be updated
     */
    updateLocations: (state: PlayersLocations, action: PayloadAction<PlayerLocation[]>) => {
      const locations = action.payload;

      // update locations
      // TODO: handle state related updates too
      locations.forEach((location: PlayerLocation) => {
        const locationId = state.byPlayerId[location.playerId];

        state.byId[locationId].x = location.x;
        state.byId[locationId].y = location.y;
        // state.byPlayerId[location.playerId].x = location.x;
        // state.byPlayerId[location.playerId].y = location.y;
      });
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
        // create new location object
        const location: PlayerLocation = {
          playerId,
          id: uuidv4(),
          x: state.byId[state.byPlayerId[playerId]].x,
          y: state.byId[state.byPlayerId[playerId]].y,
        };

        // add location for the specific player
        state.byGameStateId[gameStateId][playerId] = location.id;

        // add the location to the state
        state.byId[location.id] = location;
        // state.byPlayerId[playerId] = location.id;
        state.allIds.push(location.id);
      });
    },
  },
});

export const { updateLocation, addLocationToGameState, updateLocations } = playersLocationsSlice.actions;

export default playersLocationsSlice.reducer;
