import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mantine/core";
import { v4 as uuidv4 } from "uuid";

import ScoreboardComponent from "components/Scoreboard/Scoreboard.Component";
import { useAppDispatch, useAppSelector } from "reduxTools/hooks";

import { addLocationToGameState, updateLocations } from "components/Players/playerLocation.Slice";
import { addActivePlayersToGameState, rotatePlayers } from "components/Players/players.Slice";
import { create as saveNewState } from "components/Timeline/gameState.Slice";
import {
  GameState,
  HalfCourt,
  Player,
  RotationPositionNumber,
  RotationPositions,
} from "types/volleyballTool.New.Types";
import styles from "./toolbar.module.scss";

/**
 * Toolbar react component
 * @returns - Toolbar react component
 */
const ToolbarComponent = () => {
  // current game
  const game = useAppSelector((selector) => selector.game);
  // all teams
  const teams = useAppSelector((selector) => selector.teams);

  // all players
  const players = useAppSelector((selector) => selector.players);

  const dispatch = useAppDispatch();

  /**
   * Handles `Rotate` btn click event
   * @param event - Click event
   */
  const onRotateClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // TODO: fix this, should not be hard coded
    rotate(teams.allIds[0]);
  };

  /**
   * Rotates all active players on the team, creates and saves a new game state
   *
   * @param teamId - team players of which should be rotated
   */
  const rotate = (teamId: string) => {
    // find all active players of the team
    // change their rotations
    const activePlayers = Object.values(players.byId)
      .filter((c) => c.teamId === teamId && c.isActive && c.currentRotationPosition !== undefined)
      .map((player: Player) => {
        // this formula `(x + 4) % 6 + 1` ensures the proper rotation
        return {
          ...player,
          currentRotationPosition: ((((player.currentRotationPosition as number) + 4) % 6) +
            1) as RotationPositionNumber,
        };
      });

    // new player locations after the rotation
    const playerLocations = activePlayers.map((c) => ({
      playerId: c.id,
      id: "",
      ...rotationCoordinates(c.currentRotationPosition, teams.byId[teamId].courtSide),
    }));

    // create a new game state
    const gameState: GameState = {
      gameId: game.id,
      id: uuidv4(),
    };

    // to fix the rotation bug (state change loads location associated with the state and not the current one,
    // while rotation changes the current one) we should save the game's state each time one of the teams rotates
    dispatch(updateLocations(playerLocations));
    dispatch(rotatePlayers(activePlayers));

    saveGameState(gameState);
  };

  /**
   * Returns coordinates based on the position number and court side
   *
   * @param posNumber - position number 1 - 6
   * @param teamId - id of the team
   * @returns {x, y} Coordinates
   */
  const rotationCoordinates = (
    posNumber: RotationPositionNumber | undefined,
    courtSide: HalfCourt,
  ): { x: number; y: number } => {
    const coordinates = {
      x: RotationPositions[posNumber ?? 6][courtSide].x,
      y: RotationPositions[posNumber ?? 6][courtSide].y,
    };

    return coordinates;
  };

  /**
   * Saves the new game state to the store and associates all dependant entities
   * 
   * @param gameState - game state
   */
  const saveGameState = (gameState: GameState) => {
    // save the state to the store
    dispatch(saveNewState(gameState));

    // associate all the entities that are state dependant
    dispatch(addLocationToGameState({ gameStateId: gameState.id }));
    dispatch(addActivePlayersToGameState(gameState.id));
  };

  return (
    <div className={styles.container}>
      <section className={styles.toolbarSection}>
        <Button
          variant="outline"
          size="xs"
          radius="xs"
          color="gray"
          leftIcon={<FontAwesomeIcon icon={faRotateRight} />}
          onClick={onRotateClick}
        >
          Rotate
        </Button>
      </section>
      <section className={styles.scoreBoardContainer}>
        <ScoreboardComponent />
      </section>
      <section>Right toolbar</section>
    </div>
  );
};

export default ToolbarComponent;
