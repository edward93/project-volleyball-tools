import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { PlayersLocations } from "types/reduxStore.Types";
import { PlayerLocation } from "types/volleyballTool.New.Types";

// initial stats
const initialState: PlayersLocations = {
  byId: {},
  byPlayerId: {},
  allIds: [],
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
     * Adds new/update location
     *
     * @param state - main state
     * @param action payload containing the new location that needs to be added
     */
    addLocation: (state: PlayersLocations, action: PayloadAction<PlayerLocation>) => {
      const location = action.payload;

      // add each location object
      state.byId[location.id] = location;
      // add player location map
      state.byPlayerId[location.playerId] = location.id;

      // add to the list of all ids
      state.allIds.push(location.id);
    },
    deleteLocation: (state: PlayersLocations, action: PayloadAction<PlayerLocation>) => {
      const location = action.payload;

      // delete the location
      delete state.byPlayerId[location.playerId];
      delete state.byId[location.id];
      state.allIds.splice(state.allIds.indexOf(location.id), 1);
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

export const { updateLocation, updateLocations, addLocations, addLocation, deleteLocation } =
  playersLocationsSlice.actions;

export default playersLocationsSlice.reducer;
