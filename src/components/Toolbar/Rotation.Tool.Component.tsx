import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "reduxTools/hooks";
import { v4 as uuidv4 } from "uuid";

import { CourtPosition, HalfCourt, Player } from "types/volleyballTool.New.Types";

import { addLocations } from "components/Players/playerLocation.Slice";
import { rotatePlayers } from "components/Players/players.Slice";

import { useGameStateHelpers } from "utils/hooks/useGameStateHelpers.hook";
import styles from "./rotation.tool.module.scss";
import { DefaultRotationPositionsVertical, RotationPositions } from "constants/courtPositions";

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
  const { teamId } = props;

  const [saveCurrentGameState] = useGameStateHelpers();

  // team
  const team = useAppSelector((selector) => selector.teams.byId[teamId]);

  // team players
  const teamPlayers = useAppSelector((selector) =>
    Object.values(selector.players.byId).filter((c) => c.teamId === teamId),
  );

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
    const activePlayers: Player[] = teamPlayers.filter((c) => c.isActive && c.currentRotationPosition !== undefined);

    // rotate (change) current rotation position of current players
    const rotatedActivePlayers = activePlayers.map((player: Player) => {
      // this formula `(x + 4) % 6 + 1` ensures the proper rotation
      return {
        ...player,
        currentRotationPosition: ((((player.currentRotationPosition as number) + 4) % 6) + 1) as CourtPosition,
      };
    });

    // new player locations after the rotation
    const playerLocations = rotatedActivePlayers.map((c) => ({
      playerId: c.id,
      id: uuidv4(),
      ...rotationCoordinates(c.currentRotationPosition, team.courtSide),
    }));

    // adds new player locations to the store
    dispatch(addLocations(playerLocations));
    dispatch(rotatePlayers(rotatedActivePlayers));

    // should be called after all the actions were dispatched
    // save the state to the store
    saveCurrentGameState();
  };

  /**
   * Returns coordinates based on the position number and court side
   *
   * @param posNumber - position number 1 - 6
   * @param teamId - id of the team
   * @param halfCourtLayout - whether or not half court layout is being used (true by default)
   * @returns {x, y} Coordinates
   */
  const rotationCoordinates = (
    posNumber: CourtPosition | undefined,
    courtSide: HalfCourt,
    halfCourtLayout: boolean = true,
  ): { x: number; y: number } => {
    const coordinates = halfCourtLayout
      ? {
          x: DefaultRotationPositionsVertical[posNumber ?? 6].x,
          y: DefaultRotationPositionsVertical[posNumber ?? 6].y,
        }
      : {
          x: RotationPositions[posNumber ?? 6][courtSide].x,
          y: RotationPositions[posNumber ?? 6][courtSide].y,
        };

    return coordinates;
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
