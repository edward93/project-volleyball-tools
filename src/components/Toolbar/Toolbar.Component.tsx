import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mantine/core";

import ScoreboardComponent from "components/Scoreboard/Scoreboard.Component";
import { useAppDispatch, useAppSelector } from "reduxTools/hooks";
import RotationToolComponent from "./Rotation.Tool.Component";

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

  return (
    <div className={styles.container}>
      <section className={styles.toolbarSection}>
        <section className={styles.rotateSection}>
          <RotationToolComponent teamId={teams.allIds[0]} gameId={game.id} />
        </section>
        <section className={styles.subSection}>
          <Button
            variant="outline"
            size="xs"
            radius="xs"
            color="gray"
            leftIcon={<FontAwesomeIcon icon={faArrowRightArrowLeft} />}
          >
            Subs
          </Button>
        </section>
      </section>
      <section className={styles.scoreBoardContainer}>
        <ScoreboardComponent />
      </section>
      <section>Right toolbar</section>
    </div>
  );
};

export default ToolbarComponent;
