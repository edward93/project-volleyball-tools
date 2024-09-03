import { create as saveNewState } from "components/Timeline/gameState.Slice";
import { useAppDispatch, useAppSelector } from "reduxTools/hooks";
import { store } from "reduxTools/store";
import { GameState } from "types/volleyballTool.New.Types";
import { v4 as uuidv4 } from "uuid";

/** Game state helpers hook return type */
type GameStateHelpersReturnType = [
  /**
   * Creates a new game state and stores it
   */
  () => void,
];

/**
 * Game state helper hook
 *
 * @returns {GameStateHelpersReturnType} - [function to create new game state]
 */
export const useGameStateHelpers = (): GameStateHelpersReturnType => {
  // redux dispatch
  const dispatch = useAppDispatch();

  // current game
  const game = useAppSelector((selector) => selector.game);

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

    // TODO: this is likely incorrect, latest game action id may not be associated with this game state
    // latest game action id
    const latestActionId = state.gameAction.byId[state.gameAction.allIds[state.gameAction.allIds.length - 1]]?.id;

    // game state object
    const gameState: GameState = {
      id: uuidv4(),
      gameId: game.id,
      dependencies: {
        activePlayerIds: playerIds,
        playerLocationIds,
        gameActionId: latestActionId,
      },
    };

    // update the store
    dispatch(saveNewState(gameState));
  };

  return [newGameState];
};
