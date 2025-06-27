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

// TODO: helper method that will return the entity associated wit the latest game state
// TODO: when subbing players, update the team settings (substitutions made, etc.)
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
  const saveCurrentGameState = () => {
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

    // Get the last two team settings by teamId
    const allTeamSettingsIds = state.teamSettings.allIds;
    const teamSettingsIds: Record<string, string> = {};

    // Iterate from the end to get the last two records
    for (let i = allTeamSettingsIds.length - 1; i >= Math.max(0, allTeamSettingsIds.length - 2); i--) {
      const settingId = allTeamSettingsIds[i];
      const setting = state.teamSettings.byId[settingId];
      if (setting) {
        teamSettingsIds[setting.teamId] = setting.id;
      }
    }

    // get current score id
    const currentScoreId = state.score.allIds[state.score.allIds.length - 1];
    
    // game state object
    const gameState: GameState = {
      id: uuidv4(),
      gameId: game.id,
      dependencies: {
        activePlayerIds: playerIds,
        playerLocationIds,
        gameActionId: latestActionId,
        currentScoreId,
        teamSettingsIds,
      },
    };

    // update the store
    dispatch(saveNewState(gameState));
  };

  return [saveCurrentGameState];
};
