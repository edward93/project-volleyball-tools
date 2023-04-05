import { useAppSelector } from "../../redux/hooks";
import "../../styles/scoreboard.scss";

const ScoreboardComponent = () => {
  const game = useAppSelector((selector) => selector.gameSlice);
  const sets = [...useAppSelector((selector) => selector.setsSlice.byGameId[game.id])];
  // const points = useAppSelector((selector) => selector.pointsSlice.byGameId[game.id]);

  const calculateScore = () => {
    // sort in the asc order of sets
    sets.sort((a, b) => a.set - b.set);

    // final result
    const score = { homeSetsWon: 0, homeScore: 0, awaySetsWon: 0, awayScore: 0 };

    // calculate scores per set
    // TODO: move this logic to the reducer
    sets.forEach((s) => {
      if (s.set === 5) {
        if ((s.homeScore >= 15 || s.awayScore >= 15) && Math.abs(s.homeScore - s.awayScore) >= 2) {
          // set has ended
          if (s.homeScore > s.awayScore) {
            score.homeSetsWon++;
          } else {
            score.awaySetsWon++;
          }
        }
      } else {
        if ((s.homeScore >= 25 || s.awayScore >= 25) && Math.abs(s.homeScore - s.awayScore) >= 2) {
          // set has ended
          if (s.homeScore > s.awayScore) {
            score.homeSetsWon++;
          } else {
            score.awaySetsWon++;
          }
        }
      }
      // set scores regardless if the set is over or not
      score.homeScore = s.homeScore;
      score.awayScore = s.awayScore;
    });

    return score;
  };

  // calculate the current score
  const score = calculateScore();

  // const gameStats = useAppSelector((selector) => selector.gameStatsSlice);
  // const score = gameStats.byGameId[game.id];

  return (
    <section className="vt-tools-scoreboard-section">
      <section className="vt-tools-scoreboard-left-section scoreboard-half">
        <div className="vt-tool-scoreboard-left-section-team scoreboard-team">{game.home}</div>
        <div className="vt-tool-scoreboard-left-section-score scoreboard-score">{score.homeScore}</div>
        <div className="vt-tool-scoreboard-left-section-sets-won scoreboard-sets-won">{score.homeSetsWon}</div>
      </section>
      <section className="vt-tools-scoreboard-middle-section">-</section>
      <section className="vt-tools-scoreboard-right-section scoreboard-half">
        <div className="vt-tool-scoreboard-right-section-sets-won scoreboard-sets-won">{score.awaySetsWon}</div>
        <div className="vt-tool-scoreboard-right-section-score scoreboard-score">{score.awayScore}</div>
        <div className="vt-tool-scoreboard-right-section-team scoreboard-team">{game.away}</div>
      </section>
    </section>
  );
};

export default ScoreboardComponent;
