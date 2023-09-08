import React from "react";
import { useAppDispatch, useAppSelector } from "reduxTools/hooks";
import { v4 as uuidv4 } from "uuid";

import { create as createNewState } from "components/Timeline/gameState.Slice";
import { createNewScore } from "./score.Slice";

import { GameState, Score } from "types/volleyballTool.New.Types";
import "../../styles/scoreboard.scss";

/**
 * Scoreboard component
 * @returns Scoreboard Component
 */
const ScoreboardComponent = () => {
  const dispatch = useAppDispatch();
  // game states
  const { currentState } = useAppSelector((selector) => selector.gameStateSlice);
  // current game
  const game = useAppSelector((selector) => selector.gameSlice);

  // all teams
  const teams = useAppSelector((selector) => selector.teamSlice);
  // home and away teams
  const homeTeam = teams.byId[game.homeTeamId];
  const awayTeam = teams.byId[game.awayTeamId];
  // const sets = [...useAppSelector((selector) => selector.setsSlice.byGameId[game.id])];

  // initial score
  const initialScore: Score = {
    id: uuidv4(),
    awayPoints: 0,
    awaySetsWon: 0,
    gameId: game.id,
    homePoints: 0,
    homeSetsWon: 0,
    set: 1,
  };

  // all scores
  const scores = useAppSelector((selector) => selector.scoreSlice);

  // current score
  const currentScore =
    scores.byGameStateId[game.id]?.[currentState ?? ""] ??
    scores.byId[scores.allIdsByGameId[game.id]?.[scores.allIdsByGameId[game.id].length - 1]] ??
    initialScore;

  /**
   * Handles home score click events
   * @param event - Click event
   */
  const onHomeScoreClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    pointIsScored();
  };

  /**
   * Handles away score click events
   * @param event - Click event
   */
  const onAwayScoreClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    pointIsScored(false);
  };

  /**
   * Calculates and creates new score (along with a state)
   *
   * @param byHome - True if the point was scored by home
   */
  const pointIsScored = (byHome: boolean = true) => {
    const state: GameState = {
      id: uuidv4(),
      gameId: game.id,
    };

    // save this onto the store
    dispatch(createNewState(state));

    // new score
    const newScore: Score = {
      ...currentScore,
    };

    // TODO: refactor & simplify
    if (byHome) {
      newScore.homePoints += 1;

      if (newScore.homePoints >= (newScore.set === 5 ? 15 : 25)) {
        if (newScore.homePoints - newScore.awayPoints > 1) {
          // this set is won by the home team
          newScore.homeSetsWon += 1;

          // save onto the store
          dispatch(createNewScore({ score: newScore, gameStateId: state.id }));
          console.log("SET IS WON BY HOME TEAM");

          // check if the game is over
          if (newScore.homeSetsWon < 3) {
            // game isn't over just yet
            const newSet: GameState = {
              id: uuidv4(),
              gameId: game.id,
            };

            // save this onto the store
            dispatch(createNewState(newSet));

            const newSetInitialScore: Score = {
              id: uuidv4(),
              awayPoints: 0,
              awaySetsWon: newScore.awaySetsWon,
              gameId: game.id,
              homePoints: 0,
              homeSetsWon: newScore.homeSetsWon,
              set: newScore.set + 1,
            };

            // save onto the store
            dispatch(createNewScore({ score: newSetInitialScore, gameStateId: newSet.id }));
          } else {
            // this was a wining point, the game is over
            // TODO: set game is over to true
            console.log("GAME IS OVER: HOME TEAM WON");
          }
        } else {
          // save onto the store
          dispatch(createNewScore({ score: newScore, gameStateId: state.id }));
        }
      } else {
        // save onto the store
        dispatch(createNewScore({ score: newScore, gameStateId: state.id }));
      }
    } else {
      newScore.awayPoints += 1;

      if (newScore.awayPoints >= (newScore.set === 5 ? 15 : 25)) {
        if (newScore.awayPoints - newScore.homePoints > 1) {
          // this set is won by the home team
          newScore.homeSetsWon += 1;

          // save onto the store
          dispatch(createNewScore({ score: newScore, gameStateId: state.id }));
          console.log("SET IS WON BY AWAY TEAM");

          // check if the game is over
          if (newScore.homeSetsWon < 3) {
            // game isn't over just yet
            const newSet: GameState = {
              id: uuidv4(),
              gameId: game.id,
            };

            // save this onto the store
            dispatch(createNewState(newSet));

            const newSetInitialScore: Score = {
              id: uuidv4(),
              awayPoints: 0,
              awaySetsWon: newScore.awaySetsWon,
              gameId: game.id,
              homePoints: 0,
              homeSetsWon: newScore.homeSetsWon,
              set: newScore.set + 1,
            };

            // save onto the store
            dispatch(createNewScore({ score: newSetInitialScore, gameStateId: newSet.id }));
          } else {
            // this was a wining point, the game is over
            // TODO: set game is over to true
            console.log("GAME IS OVER: AWAY TEAM WON");
          }
        } else {
          // save onto the store
          dispatch(createNewScore({ score: newScore, gameStateId: state.id }));
        }
      } else {
        // save onto the store
        dispatch(createNewScore({ score: newScore, gameStateId: state.id }));
      }
    }
  };

  return (
    <section className="vt-tools-scoreboard-section">
      <section className="vt-tools-scoreboard-left-section scoreboard-half">
        <div className="vt-tool-scoreboard-left-section-team scoreboard-team">{homeTeam.name}</div>
        <div onClick={onHomeScoreClick} className="vt-tool-scoreboard-left-section-score scoreboard-score">
          {currentScore.homePoints}
        </div>
        <div className="vt-tool-scoreboard-left-section-sets-won scoreboard-sets-won">{currentScore.homeSetsWon}</div>
      </section>
      <section className="vt-tools-scoreboard-middle-section">-</section>
      <section className="vt-tools-scoreboard-right-section scoreboard-half">
        <div className="vt-tool-scoreboard-right-section-sets-won scoreboard-sets-won">{currentScore.awaySetsWon}</div>
        <div onClick={onAwayScoreClick} className="vt-tool-scoreboard-right-section-score scoreboard-score">
          {currentScore.awayPoints}
        </div>
        <div className="vt-tool-scoreboard-right-section-team scoreboard-team">{awayTeam.name}</div>
      </section>
    </section>
  );
};

export default ScoreboardComponent;
