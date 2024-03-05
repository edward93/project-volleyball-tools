import ScoreboardComponent from "components/Scoreboard/Scoreboard.Component";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mantine/core";

import styles from "./toolbar.module.scss";

const ToolbarComponent = () => {
  return (
    <div className={styles.container}>
      <section className={styles.toolbarSection}>
        <Button variant="outline" size="xs" radius="xs" color="gray" leftIcon={<FontAwesomeIcon icon={faRotateRight} />}>
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
