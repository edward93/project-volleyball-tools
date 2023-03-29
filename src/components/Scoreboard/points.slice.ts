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
  reducers: {
    // addPoint: (state, action: PayloadAction<Point>) => {
    //   const { id, point, scoredByHomeTeam, setId } = action.payload;

    //   state.allIds.push(id);
    //   state.byId[id] = action.payload;
    //   state.bySetId =
    // },
    incrementHomeScore: (state, action: PayloadAction<{ gameId: string; setId: string; point: number }>) => {
      const { gameId, setId, point } = action.payload;
      const newPoint: Point = {
        id: uuidv4(),
        point,
        scoredByHomeTeam: true,
        setId,
      };

      state.allIds.push(newPoint.id);
      state.byId[newPoint.id] = newPoint;
      state.bySetId[setId] = [...state.bySetId[setId], newPoint];
      state.byGameId[gameId] = [...state.byGameId[gameId], newPoint];
    },
    incrementAwayScore: (state, action: PayloadAction<{ gameId: string; setId: string; point: number }>) => {
      const { gameId, setId, point } = action.payload;
      const newPoint: Point = {
        id: uuidv4(),
        point,
        scoredByHomeTeam: false,
        setId,
      };

      state.allIds.push(newPoint.id);
      state.byId[newPoint.id] = newPoint;
      state.bySetId[setId] = [...state.bySetId[setId], newPoint];
      state.byGameId[gameId] = [...state.byGameId[gameId], newPoint];
    },
  },
});

export const { incrementAwayScore, incrementHomeScore } = pointsSlice.actions;

export default pointsSlice.reducer;
