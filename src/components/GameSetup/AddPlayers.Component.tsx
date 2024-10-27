import { Button, NumberInput, Select, SelectItem, Switch, TextInput } from "@mantine/core";
import { ChangeEvent } from "react";
import { CourtPosition, CourtPositions, PositionType, PositionsById } from "types/volleyballTool.New.Types";
import styles from "./gameSetup.module.scss";

const selectPositions: SelectItem[] = Object.entries(PositionsById).map(([key, position]) => ({
  value: key,
  label: position.name,
}));

/** Court position select options */
const selectCourtPositions: SelectItem[] = CourtPositions.map((c) => ({ value: c.toString(), label: c.toString() }));

/**
 * Component for adding players to the team
 * @param props
 * @returns
 */
export const AddPlayersComponent = (props: {
  playerName: string;
  playerNumber: number;
  playerPosition: PositionType;
  courtPosition?: CourtPosition;
  isActive: boolean;

  updatePlayerName: (value: string) => void;
  updatePlayerNumber: (value: number) => void;
  updatePlayerPosition: (value: PositionType) => void;
  updateCourtPosition: (value: CourtPosition) => void;
  updateIsActive: (value: boolean) => void;

  addPlayer: () => void;
}) => {
  const {
    playerName,
    playerNumber,
    playerPosition,
    courtPosition,
    isActive,
    updatePlayerName,
    updatePlayerNumber,
    updatePlayerPosition,
    updateCourtPosition,
    updateIsActive,
    addPlayer,
  } = props;

  /**
   * Handles current player name change events
   * @param event - input change event
   */
  const onCurrentPlayerNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    updatePlayerName(event.target.value);
  };

  /**
   * handles current player number change events
   */
  const onCurrentPlayerNumberChange = (value: number) => {
    updatePlayerNumber(value);
  };

  /**
   * Handles position select component change events
   * @param value - current selected value (position id)
   */
  const onPositionChange = (value: string) => {
    const position = PositionsById[value];

    updatePlayerPosition(position);
  };

  /**
   * Selects current court position
   *
   * @param value - selected court position
   */
  const onCurrentCourtPositionChange = (value: string) => {
    const courtPosition = +value as CourtPosition;

    updateCourtPosition(courtPosition);
  };

  /**
   * Handles confirm btn clicks (for adding a new player)
   */
  const onAddPlayerClick = () => {
    addPlayer();
  };

  return (
    <div className={styles.addNewPlayer}>
      <div className={styles.addNewPlayerForm}>
        <TextInput
          label="Player Name"
          name="player-name"
          withAsterisk
          placeholder="e.g. John Smith"
          value={playerName}
          onChange={onCurrentPlayerNameChange}
        />
        <NumberInput
          label="Player Number"
          name="player-number"
          withAsterisk
          placeholder="14"
          value={playerNumber}
          onChange={onCurrentPlayerNumberChange}
        />
        <Select
          label="Position"
          data={selectPositions}
          searchable
          withinPortal
          variant="filled"
          withAsterisk
          value={playerPosition?.id}
          onChange={onPositionChange}
          placeholder="e.g. Setter"
        />
        <Select
          label="Starting Position"
          data={selectCourtPositions}
          searchable
          withinPortal
          variant="filled"
          // withAsterisk={isActive}
          disabled={!isActive}
          value={courtPosition?.toString()}
          onChange={onCurrentCourtPositionChange}
          placeholder="1 or 6"
        />
        <Switch
          label="Is Active"
          checked={isActive}
          labelPosition="left"
          onChange={(event) => updateIsActive(event.currentTarget.checked)}
          description="Is this player part of the starting 6"
        />
        <Button variant="filled" color="blue" onClick={onAddPlayerClick}>
          Add Player
        </Button>
      </div>
    </div>
  );
};
