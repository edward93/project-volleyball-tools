import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon, Button, NumberInput, Select, SelectItem, TextInput } from "@mantine/core";
import { newGame } from "components/Scoreboard/game.Slice";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "reduxTools/hooks";
import { None, Player, PositionType, PositionsById } from "types/volleyballTool.New.Types";
import { ROUTES } from "utils/router/routes";
import { v4 as uuidv4 } from "uuid";
import styles from "./gameSetup.module.scss";

const selectPositions: SelectItem[] = Object.entries(PositionsById).map(([key, position]) => ({
  value: key,
  label: position.name,
}));

/**
 * Game Setup component for creating a new game to track
 * @returns Setup Component
 */
export const GameSetupComponent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const teamId = uuidv4();

  // list of players on the current team
  const [players, setPlayers] = useState<Player[]>([]);
  // current player name
  const [currentPlayerName, setCurrentPlayerName] = useState<string>("");
  // current player position
  const [currentPlayerPosition, setCurrentPlayerPosition] = useState<PositionType>(None);
  // current player number
  const [currentPlayerNumber, setCurrentPlayerNumber] = useState<number>(1);

  /**
   * Handles start tracking click events
   */
  const onStartTrackingClick = () => {
    const id = createNewGameAndTrack();

    // move to the tracking page
    navigate(ROUTES.GAME(id));
  };

  /**
   * Handles confirm btn clicks (for adding a new player)
   */
  const onConfirmClick = () => {
    // create current player
    const player: Player = {
      id: uuidv4(),
      teamId,
      score: 0,
      color: "#03B5AA",
      isActive: true,
      name: currentPlayerName,
      jerseyNumber: currentPlayerNumber,
      positionId: currentPlayerPosition?.id,
    };

    setPlayers([...players, player]);

    // reset the form
    setCurrentPlayerName("");
    setCurrentPlayerPosition(None);
  };

  /**
   * Handles current player name change events
   * @param event - input change event
   */
  const onCurrentPlayerNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setCurrentPlayerName(event.target.value);
  };

  /**
   * handles current player number change events
   */
  const onCurrentPlayerNumberChange = (value: number) => {
    setCurrentPlayerNumber(value);
  };

  /**
   * Handles position select component change events
   * @param value - current selected value (position id)
   */
  const onPositionChange = (value: string) => {
    const position = PositionsById[value];

    setCurrentPlayerPosition(position);
  };

  /**
   * Creates a new game to track
   * @returns - Newly created game id
   */
  const createNewGameAndTrack = (): string => {
    const gameId = uuidv4();
    // create a new game and add it to the store
    dispatch(newGame(gameId));

    return gameId;
  };

  /**
   * Removes player with the given id from the list
   *
   * @param id - player id to be removed
   */
  const deletePlayer = (id: string) => {
    const newPlayers = [...players];

    newPlayers.splice(
      players.findIndex((c) => c.id === id),
      1,
    );

    setPlayers(newPlayers);
  };

  /**
   * Edits player info
   *
   * @param id - id of the player that is being edited
   */
  const editPlayer = (id: string) => {};

  return (
    <div className={styles.container}>
      <section className={styles.header}>
        <h3>New Game</h3>
      </section>
      <section className={styles.content}>
        <section className={styles.teamSetupContainer}>
          <h4 className={styles.teamSetupHeader}>Setup Team</h4>
          <div className={styles.teamSetupContent}>
            <div className={styles.addNewPlayer}>
              <div className={styles.addNewPlayerForm}>
                <TextInput
                  label="Player Name"
                  name="player-name"
                  withAsterisk
                  placeholder="e.g. John Smith"
                  value={currentPlayerName}
                  onChange={onCurrentPlayerNameChange}
                />
                <NumberInput
                  label="Player Number"
                  name="player-number"
                  withAsterisk
                  placeholder="14"
                  value={currentPlayerNumber}
                  onChange={onCurrentPlayerNumberChange}
                />
                <Select
                  label="Position"
                  data={selectPositions}
                  searchable
                  withinPortal
                  variant="filled"
                  withAsterisk
                  value={currentPlayerPosition?.id}
                  onChange={onPositionChange}
                  placeholder="e.g. Setter"
                />
                <Button variant="filled" color="blue" onClick={onConfirmClick}>
                  Confirm
                </Button>
              </div>
            </div>
            <div className={styles.teamPlayers}>
              {players.map((c) => (
                <PlayerCompactComponent player={c} remove={deletePlayer} key={c.id} edit={editPlayer} />
              ))}
            </div>
          </div>
        </section>
      </section>
      <section className={styles.actions}>
        <Button variant="filled" color="teal" onClick={onStartTrackingClick}>
          Start Tracking
        </Button>
      </section>
    </div>
  );
};

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
        <ActionIcon variant="outline" onClick={onEditClick} title="Edit player">
          <FontAwesomeIcon icon={faPenToSquare} />
        </ActionIcon>
        <ActionIcon variant="outline" onClick={onDeleteClick} title="Delete player">
          <FontAwesomeIcon icon={faTrashCan} />
        </ActionIcon>
      </section>
    </div>
  );
};

export default GameSetupComponent;
