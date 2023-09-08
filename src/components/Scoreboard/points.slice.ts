import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { Points } from "../../types/reduxStore.Types";
import { GameSet, Point } from "types/volleyballTool.New.Types";

// import { setId } from "./sets.Slice";

const initialState: Points = {
  byId: {},
  byGameStateId: {},
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
    incrementHomeScore: (state, action: PayloadAction<{ gameStateId: string, gameId: string; setId: string; point: number }>) => {
      const { gameStateId, gameId, setId, point } = action.payload;
      const newPoint: Point = {
        id: uuidv4(),
        gameId,
        setId,
        scoredByHomeTeam: true,
        point,
      };

      state.allIds.push(newPoint.id);
      state.byId[newPoint.id] = newPoint;
      state.byGameStateId[gameStateId] = newPoint;
      // state.bySetId[setId] = [...state.bySetId[setId], newPoint];
      // state.byGameId[gameId] = [...state.byGameId[gameId], newPoint];
    },
    incrementAwayScore: (state, action: PayloadAction<{ gameStateId: string, gameId: string; setId: string; point: number }>) => {
      const { gameStateId, gameId, setId, point } = action.payload;
      const newPoint: Point = {
        id: uuidv4(),
        gameId,
        setId,
        scoredByHomeTeam: false,
        point,
      };

      state.allIds.push(newPoint.id);
      state.byId[newPoint.id] = newPoint;
      state.byGameStateId[gameStateId] = newPoint;
      // state.bySetId[setId] = [...state.bySetId[setId], newPoint];
      // state.byGameId[gameId] = [...state.byGameId[gameId], newPoint];
    },
  },
});

export const { incrementAwayScore, incrementHomeScore } = pointsSlice.actions;

export default pointsSlice.reducer;
