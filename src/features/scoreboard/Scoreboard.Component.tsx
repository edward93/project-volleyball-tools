import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useAppDispatch, useAppSelector } from "reduxTools/hooks";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { v4 as uuidv4 } from "uuid";
import { createNewScore } from "./score.Slice";

import { ActionIcon } from "@mantine/core";
import { Score } from "types/volleyballTool.New.Types";
import { useGameStateHelpers } from "utils/hooks/useGameStateHelpers.hook";
import styles from "./scoreboard.module.scss";

/**
 * Scoreboard component
 * @returns Scoreboard Component
 */
const ScoreboardComponent = () => {
  const dispatch = useAppDispatch();
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

  /**
   * Handles home score up click event
   * @param event - Click event
   */
  const onHomeScoreUpClick = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();

    const newScore = currentScore.homePoints + 1;
    if (!validateScore(newScore)) return;

    updateScore({ ...currentScore, homePoints: newScore });
  };

  /**
   * Handles home score down click event
   * @param event - Click event
   */
  const onHomeScoreDownClick = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();

    const newScore = currentScore.homePoints - 1;
    if (!validateScore(newScore)) return;

    updateScore({ ...currentScore, homePoints: newScore });
  };

  /**
   * Handles away score up click event
   * @param event - Click event
   */
  const onAwayScoreUpClick = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();

    const newScore = currentScore.awayPoints + 1;
    if (!validateScore(newScore)) return;

    updateScore({ ...currentScore, awayPoints: newScore });
  };

  /**
   * Handles away score down click event
   * @param event - Click event
   */
  const onAwayScoreDownClick = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();

    const newScore = currentScore.awayPoints - 1;
    if (!validateScore(newScore)) return;

    updateScore({ ...currentScore, awayPoints: newScore });
  };

  /**
   * Updates the store with the new score
   *
   * @param score - Score to update
   */
  const updateScore = (score: Score) => {
    score.id = uuidv4();
    score = checkSetWin(score);
    dispatch(createNewScore(score));

    // update the game state
    saveCurrentGameState();
  };

  /**
   * Validates the score
   *
   * @param score Score to validate
   * @returns True if the score is valid false otherwise
   */
  const validateScore = (score: number): boolean => {
    if (score < 0) return false;
    return true;
  };

  /**
   * Checks if the score is a winning score and updates the sets won
   *
   * @param score - Score to check
   * @param maxSets - Maximum number of sets
   * @returns - Updated score with sets won
   */
  const checkSetWin = (score: Score, maxSets: number = 5): Score => {
    const setsToWin = Math.ceil(maxSets / 2);
    const isFinalSet = score.set === maxSets;
    const setPoint = isFinalSet ? 15 : 25;
    const leadByTwo = Math.abs(score.homePoints - score.awayPoints) >= 2;

    if (score.homePoints >= setPoint && leadByTwo) {
      score.homeSetsWon += 1;
      if (score.homeSetsWon < setsToWin) {
        score.set += 1; // Only update the set if the match isn't won
        score.homePoints = 0;
        score.awayPoints = 0;
      }
    } else if (score.awayPoints >= setPoint && leadByTwo) {
      score.awaySetsWon += 1;
      if (score.awaySetsWon < setsToWin) {
        score.set += 1; // Only update the set if the match isn't won
        score.homePoints = 0;
        score.awayPoints = 0;
      }
    }

    return score;
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
