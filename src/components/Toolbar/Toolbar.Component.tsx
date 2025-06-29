import ScoreboardComponent from "features/scoreboard/Scoreboard.Component";
import { useAppSelector } from "reduxTools/hooks";
import RotationToolComponent from "./Rotation.Tool.Component";

import SubsToolComponent from "features/subs/SubsTool.Component";
import TeamSettingsComponent from "features/team-settings/TeamSettings.Component";
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
        {teams.allIds[0] && (
          <>
            <section className={styles.rotateSection}>
              <RotationToolComponent teamId={teams.allIds[0]} gameId={game.id} />
            </section>
            <section className={styles.subSection}>
              <SubsToolComponent teamId={teams.allIds[0]} />
            </section>
            <section className={styles.subSection}>
              <TeamSettingsComponent teamId={teams.allIds[0]} />
            </section>
          </>
        )}
      </section>
      <section className={styles.scoreBoardContainer}>
        <ScoreboardComponent />
      </section>
      <section className={styles.rightToolbar}>
        {teams.allIds[1] && (
          <>
            <section className={styles.subSection}>
              <TeamSettingsComponent teamId={teams.allIds[1]} />
            </section>
            <section className={styles.subSection}>
              <SubsToolComponent teamId={teams.allIds[1]} />
            </section>
            <section className={styles.rotateSection}>
              <RotationToolComponent teamId={teams.allIds[1]} gameId={game.id} />
            </section>
          </>
        )}
      </section>
    </div>
  );
};

export default ToolbarComponent;
