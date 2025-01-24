import { Button } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Game } from "types/volleyballTool.New.Types";
import { ROUTES } from "utils/router/routes";
import styles from "./homePage.module.scss";

/**
 * HomePage component
 * @returns HomePage component
 */
const HomePage = () => {
  const navigate = useNavigate();
  const [storedGames, setStoredGames] = useState<Record<string, Game>>({});

  useEffect(() => {
    const storedState = localStorage.getItem("store");
    // currently there's only one game per stored sate
    const game = JSON.parse(storedState || "{}")?.game;

    if (game) {
      if (!(game.id in storedGames)) {
        const updatedStoredGames = { ...storedGames, [game.id]: game };
        setStoredGames(updatedStoredGames);
      }
    }
  }, []);

  /**
   * Handles the click event for creating a new game.
   * Navigates the user to the game setup page.
   */
  const onCreateNewGameClick = () => {
    navigate(ROUTES.GAME_SETUP);
  };

  // TODO: modernize the UI
  return (
    <div className={styles.container}>
      <section className={styles.header}>
        <h3>Welcome to Volleyball Stats Tracker</h3>
      </section>
      <section className={styles.actions}>
        <Button variant="filled" color="teal" onClick={onCreateNewGameClick}>
          Create New Game
        </Button>
      </section>
      <section className={styles.storedGames}>
        <h4>Stored Games</h4>
        {Object.keys(storedGames).length > 0 ? (
          <ul>
            {Object.entries(storedGames).map(([_, game]) => (
              <li key={game.id} onClick={() => navigate(`${ROUTES.GAME(game.id)}`)}>
                <span>{game.id}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No stored games found.</p>
        )}
      </section>
    </div>
  );
};

export default HomePage;
