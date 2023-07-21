import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { Circle, Circles } from "../../types/reduxStore.Types";

/** Ids */
const ids = [uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4()];

/** Initial circles */
export const circles: Circle[] = [
  { id: ids[0], cx: 450, cy: 190, r: 40, color: "#03B5AA", playerId: ids[0] },
  { id: ids[1], cx: 800, cy: 190, r: 40, color: "#03B5AA", playerId: ids[1] },
  { id: ids[2], cx: 1130, cy: 190, r: 40, color: "#03B5AA", playerId: ids[2] },
  { id: ids[3], cx: 450, cy: 590, r: 40, color: "#03B5AA", playerId: ids[3] },
  { id: ids[4], cx: 800, cy: 590, r: 40, color: "#03B5AA", playerId: ids[4] },
  { id: ids[5], cx: 1130, cy: 590, r: 40, color: "#03B5AA", playerId: ids[5] },
];

/** Map of circles */
export const circlesById = circles.reduce((prev, curr) => ({ ...prev, [curr.id]: curr }), {});

/** Initial state */
const initialState: Circles = {
  byId: circlesById,
  allIds: circles.map((c) => c.id),
};

/** Circles Slice */
export const circlesSlice = createSlice({
  initialState,
  name: "circles",
  reducers: {
    updatePosition: (state: Circles, action: PayloadAction<{ id: string; newX: number; newY: number }>) => {
      const { id, newX, newY } = action.payload;

      state.byId[id].cx = newX;
      state.byId[id].cy = newY;
    },
  },
});

export const { updatePosition } = circlesSlice.actions;

export default circlesSlice.reducer;
