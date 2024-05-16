import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, Select, SelectItem, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useAppSelector } from "reduxTools/hooks";

import { forwardRef } from "react";
import { PositionsById } from "types/volleyballTool.Types";
import styles from "./subs.tool.module.scss";

/** Subs tool props */
type SubsToolProps = {
  teamId: string;
};

/** Select item props */
type CustomSelectItemProps = {
  image: string;
  label: string;
  description: string;
};

/**
 * Subs Tool Component
 * @returns - Subs Tool Component
 */
const SubsToolComponent = (props: SubsToolProps) => {
  // props deconstruct
  const { teamId } = props;

  // modal controls
  const [opened, { open, close }] = useDisclosure(false);

  // team
  const team = useAppSelector((selector) => selector.teams.byId[teamId]);

  // team players
  const players = useAppSelector((selector) => Object.values(selector.players.byId).filter((c) => c.teamId === teamId));

  // active and inactive players
  const inactivePlayers = players.filter((c) => !c.isActive);
  const activePlayers = players.filter((c) => c.isActive);

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
      <Modal opened={opened} onClose={close} title="Substitution" centered size="md">
        <div className={styles.modalContent}>
          <section className={styles.subIn}>
            <Select
              withinPortal
              searchable
              itemComponent={CustomSelectItem}
              placeholder="Player"
              label="Substitute In"
              data={inactivePlayers.map<SelectItem>((c) => ({
                value: c.id,
                label: c.name,
                description: `# ${c.jerseyNumber} - ${PositionsById[c.positionId].name}`,
              }))}
            />
          </section>
          <section>
            <Select
              withinPortal
              searchable
              itemComponent={CustomSelectItem}
              placeholder="Player"
              label="Substitute Out"
              data={activePlayers.map<SelectItem>((c) => ({
                value: c.id,
                label: c.name,
                description: `# ${c.jerseyNumber} - ${PositionsById[c.positionId].name}`,
              }))}
            />
          </section>
          <section className={styles.actions}> Actions</section>
        </div>
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

/** Custom select item */
const CustomSelectItem = forwardRef<HTMLDivElement, CustomSelectItemProps>(
  ({ label, description, ...others }: CustomSelectItemProps, ref) => (
    <div ref={ref} {...others}>
      <div>
        <Text size="sm">{label}</Text>
        <Text size="xs" opacity={0.65}>
          {description}
        </Text>
      </div>
    </div>
  ),
);

export default SubsToolComponent;
