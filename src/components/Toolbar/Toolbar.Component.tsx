import ScoreboardComponent from "components/Scoreboard/Scoreboard.Component";
import { useAppSelector } from "reduxTools/hooks";
import RotationToolComponent from "./Rotation.Tool.Component";

import SubsToolComponent from "./SubsTool.Component";
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

  return (
    <div className={styles.container}>
      <section className={styles.toolbarSection}>
        <section className={styles.rotateSection}>
          <RotationToolComponent teamId={teams.allIds[0]} gameId={game.id} />
        </section>
        <section className={styles.subSection}>
          <SubsToolComponent teamId={teams.allIds[0]} />
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
