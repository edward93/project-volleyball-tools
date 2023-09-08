import { configureStore } from "@reduxjs/toolkit";
import circlesReducer from "../components/Visualizer/circles.Slice";
import playersReducer from "../components/Players/players.Slice";
import inspectorSlice from "../components/Inspector/inspector.Slice";
import gameSlice from "../components/Scoreboard/game.Slice";
import teamSlice from "components/Scoreboard/team.Slice";
import setsSlice from "../components/Scoreboard/sets.Slice";
import pointsSlice from "../components/Scoreboard/points.slice";
import gameStateSlice from "components/Timeline/gameState.Slice";
import gameActionSlice from "components/Inspector/gameAction.Slice";
import playersLocationsSlice from "components/Visualizer/playerLocation.Slice";
import scoreSlice from "components/Scoreboard/score.Slice";

/**
 * Main store configuration
 */
export const store = configureStore({
  reducer: {
    inspectorSlice,
    circlesReducer,
    playersReducer,
    playersLocationsSlice,
    gameSlice,
    teamSlice,
    setsSlice,
    pointsSlice,
    scoreSlice,
    gameStateSlice,
    gameActionSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
