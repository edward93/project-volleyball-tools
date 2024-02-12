import ScoreboardComponent from "components/Scoreboard/Scoreboard.Component";

import styles from "./toolbar.module.scss";

const ToolbarComponent = () => {
  return (
    <div className={styles.container}>
      <section>Left toolbar</section>
      <section className={styles.scoreBoardContainer}>
        <ScoreboardComponent />
      </section>
      <section>Right toolbar</section>
    </div>
  );
};

export default ToolbarComponent;
