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
     * Adds new/updated locations (instead of updating x,y coords we create a new entry)
     * 
     * @param state - main state
     * @param action payload containing all locations that need to be added
     */
    addLocations: (state: PlayersLocations, action: PayloadAction<PlayerLocation[]>) => {
      const locations = action.payload;
      locations.forEach((location: PlayerLocation) => {
        // add each location object
        state.byId[location.id] = location;
        // add player location map
        state.byPlayerId[location.playerId] = location.id;

        // add to the list of all ids
        state.allIds.push(location.id);
      });
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
  },
});

export const { updateLocation, updateLocations, addLocations } = playersLocationsSlice.actions;

export default playersLocationsSlice.reducer;
