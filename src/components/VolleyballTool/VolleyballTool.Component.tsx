import "../../styles/tools.scss";
import PlayersComponent from "../Players/Players.Component";

const Tools = () => {
  return (
    <div className="vt-tools-container">
      <section className="vt-tools-main-area">
        <PlayersComponent />
      </section>
      <section className="vt-tools-inspector">
        <div className="vt-tools-properties-title">Properties</div>
      </section>
    </div>
  );
};

export default Tools;
