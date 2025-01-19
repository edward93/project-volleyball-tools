import { configureStore } from "@reduxjs/toolkit";
import gameAction from "components/Inspector/gameAction.Slice";
import playersLocations from "components/Players/playerLocation.Slice";
import teams from "components/Players/teams.Slice";
import score from "components/Scoreboard/score.Slice";
import gameState from "components/Timeline/gameState.Slice";
import inspector from "../components/Inspector/inspector.Slice";
import players from "../components/Players/players.Slice";
import game from "../components/Scoreboard/game.Slice";
import points from "../components/Scoreboard/points.slice";
import sets from "../components/Scoreboard/sets.Slice";
import volleyballPosition from "../features/volleyball/volleyballPosition.Slice";

import listenerMiddleware from "./middlewares/actionListenerMiddleware";

/**
 * Loads the entire state from local storage
 *
 * @returns - deserialized state
 */
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("store");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    console.error("Could not load state:", err);
    return undefined;
  }
};

const preloadedState = loadState();
// TODO: question: should I save the entire store or part of it?
/**
 * Main store configuration
 */
export const store = configureStore({
  reducer: {
    inspector,
    players,
    playersLocations,
    game,
    teams,
    sets,
    points,
    score,
    gameState,
    gameAction,
    volleyballPosition,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
  preloadedState: preloadedState,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
