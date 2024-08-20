import { create as saveNewState } from "components/Timeline/gameState.Slice";
import { useAppDispatch } from "reduxTools/hooks";
import { store } from "reduxTools/store";
import { GameState } from "types/volleyballTool.New.Types";
import { v4 as uuidv4 } from "uuid";

/** Game state helpers hook return type */
type GameStateHelpersReturnType = [
  /**
   * Creates and save a new game state
   */
  () => void,
];

// TODO: game state hook to create a game state

/**
 *
 * @param gameId - current game id
 * @returns {GameStateHelpersReturnType} - [function to create new game state]
 */
export const useGameStateHelpers = (gameId: string): GameStateHelpersReturnType => {
  // redux dispatch
  const dispatch = useAppDispatch();

  /**
   * Creates and save a new game state
   */
  const newGameState = () => {
    // get updated state
    const state = store.getState();
    // get current active player ids
    const playerIds = Object.values(state.players.byId)
      .filter((c) => c.isActive)
      .map((c) => c.id);

    // get current player locations
    // We assume that playerLocations.byPlayerId contains the the latest mapping
    // and when player is subbed new player id is added and the old one is removed from this list
    const playerLocationIds = state.playersLocations.byPlayerId;

    // game state object
    const gameState: GameState = {
      id: uuidv4(),
      gameId: gameId,
      dependencies: {
        activePlayerIds: playerIds,
        playerLocationIds,
        gameActionId: undefined, // TODO: populate this
      },
    };

    // update the store
    dispatch(saveNewState(gameState));
  };

  return [newGameState];
};
