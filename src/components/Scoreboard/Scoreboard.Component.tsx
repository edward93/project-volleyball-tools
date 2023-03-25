import "../../styles/scoreboard.scss";

const ScoreboardComponent = () => {
  return (
    <section className="vt-tools-scoreboard-section">
      <section className="vt-tools-scoreboard-left-section scoreboard-half">
        <div className="vt-tool-scoreboard-left-section-team scoreboard-team">Home</div>
        <div className="vt-tool-scoreboard-left-section-score scoreboard-score">12</div>
        <div className="vt-tool-scoreboard-left-section-sets-won scoreboard-sets-won">2</div>
      </section>
      <section className="vt-tools-scoreboard-right-section scoreboard-half">
        <div className="vt-tool-scoreboard-right-section-sets-won scoreboard-sets-won">1</div>
        <div className="vt-tool-scoreboard-right-section-score scoreboard-score">9</div>
        <div className="vt-tool-scoreboard-right-section-team scoreboard-team">Guest</div>
      </section>
    </section>
  );
};

export default ScoreboardComponent;
