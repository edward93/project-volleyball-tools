import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import styles from "./subs.tool.module.scss";

/**
 * Subs Tool Component
 * @returns - Subs Tool Component
 */
const SubsToolComponent = () => {
  // modal controls
  const [opened, { open, close }] = useDisclosure(false);

  /**
   * Handles `Rotate` btn click event
   * @param event - Click event
   */
  const onSubsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    open();
  };

  return (
    <div className={styles.container}>
      <Modal opened={opened} onClose={close} title="Substitution" centered>
        {/* Modal content */}
      </Modal>
      <Button
        variant="outline"
        size="xs"
        fullWidth
        radius="xs"
        color="gray"
        leftIcon={<FontAwesomeIcon icon={faArrowRightArrowLeft} />}
        onClick={onSubsClick}
      >
        Subs
      </Button>
    </div>
  );
};

export default SubsToolComponent;
