import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, Select, SelectItem, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useAppSelector } from "reduxTools/hooks";
import { v4 as uuidv4 } from "uuid";

import { addLocation } from "components/Players/playerLocation.Slice";
import { subPlayers } from "components/Players/players.Slice";
import { forwardRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Player, PlayerLocation } from "types/volleyballTool.New.Types";
import { useGameStateHelpers } from "utils/hooks/useGameStateHelpers.hook";
import styles from "./subs.tool.module.scss";
import { PositionsById } from "constants/playerPositions";

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
  const dispatch = useDispatch();
  // game sate helper
  const [saveCurrentGameState] = useGameStateHelpers();

  // current sub in/out
  const [subIn, setSubIn] = useState<Player>();
  const [subOut, setSubOut] = useState<Player>();

  // modal controls
  const [opened, { open, close }] = useDisclosure(false);

  // team players
  const players = useAppSelector((selector) => Object.values(selector.players.byId).filter((c) => c.teamId === teamId));
  // TODO: get only current team's players
  const playersById = useAppSelector((selector) => selector.players.byId);

  // player locations
  const playerLocations = useAppSelector((selector) => selector.playersLocations);

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

  /**
   * Changes current selected sub in
   * @param value - new value
   */
  const onSubInChange = (value: string) => {
    setSubIn(playersById[value]);
  };

  /**
   * Changes current selected sub out
   * @param value - new value
   */
  const onSubOutChange = (value: string) => {
    setSubOut(playersById[value]);
  };

  /**
   * Handles "Confirm" sub button clicks
   * @param event - Mouse click event
   */
  const onSubConfirmClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    if (subIn && subOut) {
      dispatch(subPlayers({ subInId: subIn.id, subOutId: subOut.id }));

      // subbed out player location (should be deleted)
      const subbedOutPlayerLocation = playerLocations.byId[playerLocations.byPlayerId[subOut.id]];
      // should be added
      const subbedInPlayerLocation: PlayerLocation = { ...subbedOutPlayerLocation, id: uuidv4(), playerId: subIn.id };
      dispatch(addLocation(subbedInPlayerLocation));

      // update the game state
      saveCurrentGameState();
      close();
    }
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
              value={subIn?.id}
              onChange={onSubInChange}
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
              value={subOut?.id}
              onChange={onSubOutChange}
              data={activePlayers.map<SelectItem>((c) => ({
                value: c.id,
                label: c.name,
                description: `# ${c.jerseyNumber} - ${PositionsById[c.positionId].name}`,
              }))}
            />
          </section>
          <section className={styles.actions}>
            <Button variant="outline" color="gray" onClick={close}>
              Cancel
            </Button>
            <Button variant="filled" color="" onClick={onSubConfirmClick}>
              Confirm
            </Button>
          </section>
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
