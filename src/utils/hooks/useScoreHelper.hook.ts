import { createNewScore } from "features/scoreboard/score.Slice";
import { useAppDispatch, useAppSelector } from "reduxTools/hooks";
import { Score } from "types/volleyballTool.New.Types";
import { v4 as uuidv4 } from "uuid";

/**
 * This hook provides a function to update the score of the game.
 *
 * @returns { updateScore }
 */
export const useScoreHelper = () => {
  // redux dispatch
  const dispatch = useAppDispatch();

  // all scores
  const scores = useAppSelector((selector) => selector.score);

  // current game state id
  const { currentStateId } = useAppSelector((selector) => selector.gameState);
  const currentState = useAppSelector((selector) => selector.gameState.byId[currentStateId ?? ""]);

  // current score id or the latest one
  const currentScoreId = currentState?.dependencies?.currentScoreId ?? scores.allIds[scores.allIds.length - 1];
  // current score
  const currentScore = scores.byId[currentScoreId];

  /**
   * This function updates the score of the game. It takes in two optional parameters:
   *
   * @param homeScoreChange - Change in home score (positive or negative)
   * @param awayScoreChange - Change in away score (positive or negative)
   * @returns boolean - Returns true if the score was updated successfully, false otherwise
   */
  const updateScore = (homeScoreChange?: number, awayScoreChange?: number) => {
    // init new score
    const newScore: Score = { ...currentScore };
    // check if home or away score change is provided
    if (homeScoreChange) {
      newScore.homePoints += homeScoreChange;
      // validate the score
      if (!validateScore(newScore.homePoints)) return false;
    } else if (awayScoreChange) {
      newScore.awayPoints += awayScoreChange;
      // validate the score
      if (!validateScore(newScore.awayPoints)) return false;
    } else {
      // no score change provided
      return false;
    }

    // update the score
    storeUpdatedScore(newScore);
  };

  /**
   * Updates the store with the new score
   *
   * @param score - Score to update
   */
  const storeUpdatedScore = (score: Score) => {
    score.id = uuidv4();
    score = checkSetWin(score);
    dispatch(createNewScore(score));
  };

  return { updateScore };
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
