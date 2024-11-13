import { Button, Stepper, createStyles } from "@mantine/core";
import { addLocations } from "components/Players/playerLocation.Slice";
import { addPlayers } from "components/Players/players.Slice";
import { addTeam } from "components/Players/teams.Slice";
import { newGame } from "components/Scoreboard/game.Slice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "reduxTools/hooks";
import {
  CourtPosition,
  Game,
  HalfCourt,
  Player,
  PlayerLocation,
  PositionType,
  Team,
} from "types/volleyballTool.New.Types";
import { useGameStateHelpers } from "utils/hooks/useGameStateHelpers.hook";
import { ROUTES } from "utils/router/routes";
import { v4 as uuidv4 } from "uuid";
import { AddPlayersComponent } from "./AddPlayers.Component";
import CreateTeamComponent from "./CreateTeam.Component";
import PlayerCompactComponent from "./PlayerInfoCard.Component";
import styles from "./gameSetup.module.scss";
import { DefaultRotationPositionsVertical } from "constants/courtPositions";
import { None } from "constants/playerPositions";

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

// TODO: Add the ability to select halfCourt (court layout before starting a new tracking)
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

  // game sate helper
  const [newGameState] = useGameStateHelpers();
  // list of players on the current team
  const [players, setPlayers] = useState<Player[]>([]);
  // team
  const [team, setTeam] = useState<Team>();
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
    if (!team) throw new Error(`Team cannot be null or undefined`);

    // dispatch team creation
    dispatch(addTeam(team));

    // add players
    dispatch(addPlayers(players));

    // TODO: handle 2 team scenario
    // add player locations
    const locations = players.map<PlayerLocation>((c) => ({
      id: uuidv4(),
      playerId: c.id,
      x: DefaultRotationPositionsVertical[c.currentRotationPosition ?? 6].x,
      y: DefaultRotationPositionsVertical[c.currentRotationPosition ?? 6].y,
    }));

    dispatch(addLocations(locations));

    // add the first game state
    newGameState();

    // add game
    const game: Game = {
      id: uuidv4(),
      hasEnded: false,
      workspaceId: uuidv4(),
      homeTeamId: team.id,
    };
    dispatch(newGame(game));

    // move to the tracking page
    navigate(ROUTES.GAME(game.id));
  };

  /**
   * Handles confirm btn clicks (for adding a new player)
   */
  const onAddPlayerClick = () => {
    if (!team) throw new Error(`Team cannot be null or undefined`);

    // create current player
    const player: Player = {
      id: uuidv4(),
      teamId: team.id,
      score: 0,
      color: "#03B5AA",
      isActive: isActive,
      name: currentPlayerName,
      jerseyNumber: currentPlayerNumber,
      positionId: currentPlayerPosition?.id,
      currentRotationPosition: currentCourtPosition,
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
   * Creates the new team
   */
  const createTeam = () => {
    const team: Team = {
      id: teamId,
      courtSide: HalfCourt.Left,
      isHome: true,
      name: teamName,
    };

    setTeam(team);

    // move the stepper
    setActive(1);
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
        <Stepper active={active} onStepClick={setActive} size="sm" classNames={classes}>
          <Stepper.Step label="Step 1" description="Create a team">
            <CreateTeamComponent teamName={teamName} updateTeamName={setTeamName} createTeam={createTeam} />
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
