import { AnyAction, Dispatch as ReduxDispatch } from "@reduxjs/toolkit";
import { ListenerEffectAPI } from "@reduxjs/toolkit/dist/listenerMiddleware/types";
import { newGame } from "features/gameSetup/game.Slice";
import { debounce } from "lodash";

/**
 * Debounce state persistence
 */
const saveState = debounce((state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("store", serializedState);
  } catch (err) {
    console.error("Could not save state:", err);
  }
}, 1000);

/**
 * Store state effect
 * @param _action - Action
 * @param listenerApi API
 */
const storeStateEffect = <
  Action extends AnyAction,
  State,
  Dispatch extends ReduxDispatch<AnyAction>,
  ExtraArgument = unknown,
>(
  _action: Action,
  listenerApi: ListenerEffectAPI<State, Dispatch, ExtraArgument>,
) => {
  const currentState = listenerApi.getState();

  saveState(currentState);
};

/**
 * New game listener (update store upon change)
 */
export const createNewGameListener = {
  actionCreator: newGame,
  effect: storeStateEffect,
};
