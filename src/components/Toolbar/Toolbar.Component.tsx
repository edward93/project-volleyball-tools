import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mantine/core";

import ScoreboardComponent from "components/Scoreboard/Scoreboard.Component";
import { useAppDispatch, useAppSelector } from "reduxTools/hooks";

import { updateLocations } from "components/Players/playerLocation.Slice";
import { rotatePlayers } from "components/Players/players.Slice";
import { HalfCourt, Player, RotationPositionNumber, RotationPositions } from "types/volleyballTool.New.Types";
import styles from "./toolbar.module.scss";

/**
 * Toolbar react component
 * @returns - Toolbar react component
 */
const ToolbarComponent = () => {
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
   * Rotates all active players on the team
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

    dispatch(updateLocations(playerLocations));
    dispatch(rotatePlayers(activePlayers));
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
