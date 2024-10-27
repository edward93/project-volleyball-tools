import { Button, Stepper, createStyles } from "@mantine/core";
import { newGame } from "components/Scoreboard/game.Slice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "reduxTools/hooks";
import { CourtPosition, HalfCourt, None, Player, PositionType, Team } from "types/volleyballTool.New.Types";
import { ROUTES } from "utils/router/routes";
import { v4 as uuidv4 } from "uuid";
import { AddPlayersComponent } from "./AddPlayers.Component";
import CreateTeamComponent from "./CreateTeam.Component";
import PlayerCompactComponent from "./PlayerInfoCard.Component";
import styles from "./gameSetup.module.scss";

// custom styles for the stepper component
const useStyles = createStyles(() => ({
  root: {
    display: "grid",
    gridTemplate: "auto 1fr/ 1fr",
  },

  content: {
    display: "grid",
  },
}));

/**
 * Game Setup component for creating a new game to track
 * @returns Setup Component
 */
export const GameSetupComponent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const teamId = uuidv4();

  // stepper classes
  const { classes } = useStyles();

  // list of players on the current team
  const [players, setPlayers] = useState<Player[]>([]);
  // current player name
  const [currentPlayerName, setCurrentPlayerName] = useState<string>("");
  // current player position
  const [currentPlayerPosition, setCurrentPlayerPosition] = useState<PositionType>(None);
  // starting court position
  const [currentCourtPosition, setCurrentCourtPosition] = useState<CourtPosition | undefined>(undefined);
  // current player number
  const [currentPlayerNumber, setCurrentPlayerNumber] = useState<number>(1);
  // is active (part of starting 6)
  const [isActive, setIsActive] = useState(false);
  // team name
  const [teamName, setTeamName] = useState<string>("");
  // stepper active step
  const [active, setActive] = useState<number>(0);

  /**
   * Handles start tracking click events
   */
  const onStartTrackingClick = () => {
    const id = createNewGameAndTrack();

    // TODO: create team and players

    // move to the tracking page
    navigate(ROUTES.GAME(id));
  };

  /**
   * Handles confirm btn clicks (for adding a new player)
   */
  const onAddPlayerClick = () => {
    // TODO: this should be created only once (remove from here)
    const team: Team = {
      id: teamId,
      courtSide: HalfCourt.Left,
      isHome: true,
      name: teamName,
    };

    // create current player
    const player: Player = {
      id: uuidv4(),
      teamId: team.id,
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
    setCurrentPlayerNumber(1);
    setCurrentCourtPosition(undefined);
    setIsActive(false);
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

  // /**
  //  * Handles is active switch changes
  //  *
  //  * @param event - input event
  //  */
  // const onIsActiveChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   event.preventDefault();

  //   setIsActive(event.currentTarget.checked);
  // };

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
        <Stepper active={active} onStepClick={setActive} size="sm" classNames={classes}>
          <Stepper.Step label="Step 1" description="Create a team">
            <CreateTeamComponent teamName={teamName} updateTeamName={setTeamName} createTeam={() => setActive(1)} />
          </Stepper.Step>
          <Stepper.Step label="Step 2" description="Add players">
            <div className={styles.teamSetupContent}>
              <AddPlayersComponent
                addPlayer={onAddPlayerClick}
                courtPosition={currentCourtPosition}
                isActive={isActive}
                playerName={currentPlayerName}
                playerNumber={currentPlayerNumber}
                playerPosition={currentPlayerPosition}
                updateCourtPosition={setCurrentCourtPosition}
                updateIsActive={setIsActive}
                updatePlayerName={setCurrentPlayerName}
                updatePlayerNumber={setCurrentPlayerNumber}
                updatePlayerPosition={setCurrentPlayerPosition}
              />
              <div className={styles.teamPlayers}>
                {players.map((c) => (
                  <PlayerCompactComponent player={c} remove={deletePlayer} key={c.id} edit={editPlayer} />
                ))}
              </div>
            </div>
          </Stepper.Step>
        </Stepper>
      </section>
      <section className={styles.actions}>
        <Button variant="filled" color="teal" onClick={onStartTrackingClick}>
          Start Tracking
        </Button>
      </section>
    </div>
  );
};

export default GameSetupComponent;
