import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { Point, Points } from "../../types/reduxStore.Types";

// import { setId } from "./sets.Slice";

const initialState: Points = {
  byId: {},
  bySetId: {},
  byGameId: {},
  allIds: [],
};

export const pointsSlice = createSlice({
  initialState,
  name: "points",
  reducers: {},
});

export default pointsSlice.reducer;
