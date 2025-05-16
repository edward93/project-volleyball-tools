import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useAppSelector } from "reduxTools/hooks";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ActionIcon } from "@mantine/core";
import { useGameStateHelpers } from "utils/hooks/useGameStateHelpers.hook";
import { useScoreHelper } from "utils/hooks/useScoreHelper.hook";
import styles from "./scoreboard.module.scss";

/**
 * Scoreboard component
 * @returns Scoreboard Component
 */
const ScoreboardComponent = () => {
  // current game
  const game = useAppSelector((selector) => selector.game);
  // all teams
  const teams = useAppSelector((selector) => selector.teams);

  // current game state id
  const { currentStateId } = useAppSelector((selector) => selector.gameState);
  const currentState = useAppSelector((selector) => selector.gameState.byId[currentStateId ?? ""]);

  // home and away teams
  const homeTeam = teams.byId[game.homeTeamId || ""];
  const awayTeam = teams.byId[game.awayTeamId || ""];

  // all scores
  const scores = useAppSelector((selector) => selector.score);

  // current score id or the latest one
  const currentScoreId = currentState?.dependencies?.currentScoreId ?? scores.allIds[scores.allIds.length - 1];
  // current score
  const currentScore = scores.byId[currentScoreId];

  // game state helper (saves the current state)
  const [saveCurrentGameState] = useGameStateHelpers();

  // updating score helper
  const { updateScore } = useScoreHelper();

  /**
   * Handles home score up click event
   * @param event - Click event
   */
  const onHomeScoreUpClick = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();

    changeScore(1);
  };

  /**
   * Handles home score down click event
   * @param event - Click event
   */
  const onHomeScoreDownClick = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();

    changeScore(-1);
  };

  /**
   * Handles away score up click event
   * @param event - Click event
   */
  const onAwayScoreUpClick = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();

    changeScore(undefined, 1);
  };

  /**
   * Handles away score down click event
   * @param event - Click event
   */
  const onAwayScoreDownClick = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();

    changeScore(undefined, -1);
  };

  /**
   * Updates the store with the new score
   *
   * @param score - Score to update
   */
  const changeScore = (homeScoreChange?: number, awayScoreChange?: number) => {
    updateScore(homeScoreChange, awayScoreChange);

    // update the game state
    saveCurrentGameState();
  };

  return (
    <section className={styles.vtToolsScoreboardSection}>
      <section className={styles.scoreboardHalf}>
        <div className={styles.scoreboardTeam}>{homeTeam?.name}</div>
        <div className={styles.scoreboardScore}>{currentScore.homePoints}</div>
        <div className={styles.scoreboardControls}>
          <ActionIcon variant="subtle" size="xs">
            <FontAwesomeIcon icon={faCaretUp} onClick={onHomeScoreUpClick} />
          </ActionIcon>
          <ActionIcon variant="subtle" size="xs">
            <FontAwesomeIcon icon={faCaretDown} onClick={onHomeScoreDownClick} />
          </ActionIcon>
        </div>
        <div className={styles.scoreboardSetsWon}>{currentScore.homeSetsWon}</div>
      </section>
      <section className={styles.vtToolsScoreboardMiddleSection}>-</section>
      <section className={styles.scoreboardHalf}>
        <div className={styles.scoreboardSetsWon}>{currentScore.awaySetsWon}</div>
        <div className={styles.scoreboardControls}>
          <ActionIcon variant="subtle" size="xs">
            <FontAwesomeIcon icon={faCaretUp} onClick={onAwayScoreUpClick} />
          </ActionIcon>
          <ActionIcon variant="subtle" size="xs">
            <FontAwesomeIcon icon={faCaretDown} onClick={onAwayScoreDownClick} />
          </ActionIcon>
        </div>
        <div className={styles.scoreboardScore}>{currentScore.awayPoints}</div>
        <div className={styles.scoreboardTeam}>{awayTeam?.name}</div>
      </section>
    </section>
  );
};

export default ScoreboardComponent;
