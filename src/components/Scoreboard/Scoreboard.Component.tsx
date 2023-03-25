import { useAppSelector } from "../../redux/hooks";
import "../../styles/scoreboard.scss";

const ScoreboardComponent = () => {
  const game = useAppSelector((selector) => selector.gameSlice);
  const gameStats = useAppSelector((selector) => selector.gameStatsSlice);
  const score = gameStats.byGameId[game.id];

  return (
    <section className="vt-tools-scoreboard-section">
      <section className="vt-tools-scoreboard-left-section scoreboard-half">
        <div className="vt-tool-scoreboard-left-section-team scoreboard-team">{game.home}</div>
        <div className="vt-tool-scoreboard-left-section-score scoreboard-score">{score.currentScore.home}</div>
        <div className="vt-tool-scoreboard-left-section-sets-won scoreboard-sets-won">2</div>
      </section>
      <section className="vt-tools-scoreboard-right-section scoreboard-half">
        <div className="vt-tool-scoreboard-right-section-sets-won scoreboard-sets-won">1</div>
        <div className="vt-tool-scoreboard-right-section-score scoreboard-score">{score.currentScore.away}</div>
        <div className="vt-tool-scoreboard-right-section-team scoreboard-team">{game.away}</div>
      </section>
    </section>
  );
};

export default ScoreboardComponent;
