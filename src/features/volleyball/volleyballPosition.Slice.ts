import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VolleyballPosition } from "types/volleyballTool.New.Types";

/** Initial state for the volleyball position */
const initialState: VolleyballPosition = {
  id: "",
  x: 500,
  y: 400,
};

/** Slice to manage volleyball position state */
export const volleyballPositionSlice = createSlice({
  name: "volleyballPosition",
  initialState,
  reducers: {
    /**
     * Adds a new volleyball position.
     *
     * @param state - Current state
     * @param action - Payload containing the new position
     */
    updateVolleyballPosition: (state, action: PayloadAction<VolleyballPosition>) => {
      state.id = action.payload.id;
      state.x = action.payload.x;
      state.y = action.payload.y;
    },
  },
});

export const { updateVolleyballPosition } = volleyballPositionSlice.actions;

export default volleyballPositionSlice.reducer;