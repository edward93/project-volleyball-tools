import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mantine/core";
import { useAppSelector, useAppDispatch } from "reduxTools/hooks";
import { v4 as uuidv4 } from "uuid";

import {
  GameState,
  HalfCourt,
  Player,
  RotationPositionNumber,
  RotationPositions,
} from "types/volleyballTool.New.Types";

import { addLocationToGameState, updateLocations } from "components/Players/playerLocation.Slice";
import { addActivePlayersToGameState, rotatePlayers } from "components/Players/players.Slice";
import { create as saveNewState } from "components/Timeline/gameState.Slice";

import styles from "./rotation.tool.module.scss";

/** Prop type */
type RotationToolProps = {
  teamId: string;
  gameId: string;
};

/**
 * Rotation Tool Component
 * @returns - Rotation Tool Component
 */
const RotationToolComponent = (props: RotationToolProps) => {
  const { teamId, gameId } = props;

  // team
  const team = useAppSelector((selector) => selector.teams.byId[teamId]);

  // team players
  const players = useAppSelector((selector) => Object.values(selector.players.byId).filter((c) => c.teamId === teamId));
  const dispatch = useAppDispatch();

  /**
   * Handles `Rotate` btn click event
   * @param event - Click event
   */
  const onRotateClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    rotate();
  };

  /**
   * Rotates all active players on the team, creates and saves a new game state
   */
  const rotate = () => {
    // find all active players of the team
    // change their rotations

    // active players
    const activePlayers: Player[] = players.filter((c) => c.isActive && c.currentRotationPosition !== undefined);

    // rotate (change) current rotation position of current players
    const rotatedActivePlayers = activePlayers.map((player: Player) => {
      // this formula `(x + 4) % 6 + 1` ensures the proper rotation
      return {
        ...player,
        currentRotationPosition: ((((player.currentRotationPosition as number) + 4) % 6) + 1) as RotationPositionNumber,
      };
    });

    // new player locations after the rotation
    const playerLocations = rotatedActivePlayers.map((c) => ({
      playerId: c.id,
      id: "",
      ...rotationCoordinates(c.currentRotationPosition, team.courtSide),
    }));

    // create a new game state
    const gameState: GameState = {
      gameId: gameId,
      id: uuidv4(),
    };

    // to fix the rotation bug (state change loads location associated with the state and not the current one,
    // while rotation changes the current one) we should save the game's state each time one of the teams rotates
    dispatch(updateLocations(playerLocations));
    dispatch(rotatePlayers(rotatedActivePlayers));

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
      <Button
        variant="outline"
        size="xs"
        fullWidth
        radius="xs"
        color="gray"
        leftIcon={<FontAwesomeIcon icon={faRotateRight} />}
        onClick={onRotateClick}
      >
        Rotate
      </Button>
    </div>
  );
};

export default RotationToolComponent;
