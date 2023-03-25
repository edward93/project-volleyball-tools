import { configureStore } from "@reduxjs/toolkit";
import teamReducer from "../components/VolleyballTool/team.Slice";
import circlesReducer from "../components/Visualizer/circles.Slice";
import playersReducer from "../components/Players/players.Slice";
import inspectorSlice from "../components/Inspector/inspector.Slice";
import gameSlice from "../components/Scoreboard/game.Slice";
import gameStatsSlice from "../components/Scoreboard/gameStats.Slice";

/**
 * Main store configuration
 */
export const store = configureStore({
  reducer: {
    teamReducer,
    inspectorSlice,
    circlesReducer,
    playersReducer,
    gameSlice,
    gameStatsSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
