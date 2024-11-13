import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon } from "@mantine/core";
import { Player} from "types/volleyballTool.New.Types";

import styles from "./gameSetup.module.scss";
import { PositionsById } from "constants/playerPositions";

/**
 * Compact component to display newly created
 *
 * @param props - player
 * @returns Player Compact Component
 */
const PlayerCompactComponent = (props: {
  player: Player;
  remove: (id: string) => void;
  edit: (id: string) => void;
}) => {
  const {
    player: { id, jerseyNumber, name, positionId },
    remove,
    edit,
  } = props;

  /**
   * Handles delete button click events
   *
   * @param event - Btn click event
   */
  const onDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // call remove method from the props
    remove(id);
  };

  /**
   * Handles edit button click events
   *
   * @param event - Btn click event
   */
  const onEditClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // call edit method from the props
    edit(id);
  };
  return (
    <div className={styles.playerContainer}>
      <section>
        {jerseyNumber} - {name} / {PositionsById[positionId].shortName}
      </section>
      <section className={styles.playerActions}>
        <ActionIcon variant="outline" onClick={onEditClick} title="Edit player" size="sm">
          <FontAwesomeIcon icon={faPenToSquare} size="xs" />
        </ActionIcon>
        <ActionIcon variant="outline" onClick={onDeleteClick} title="Delete player" size="sm" color="red">
          <FontAwesomeIcon icon={faTrashCan} size="xs" />
        </ActionIcon>
      </section>
    </div>
  );
};

export default PlayerCompactComponent;
