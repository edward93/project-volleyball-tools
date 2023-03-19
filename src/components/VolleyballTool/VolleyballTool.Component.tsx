import "../../styles/tools.scss";
import PlayersComponent from "../Players/Players.Component";
import InspectorComponent from "../Inspector/Inspector.Component";

const Tools = () => {
  return (
    <div className="vt-tools-container">
      <section className="vt-tools-main-area">
        <PlayersComponent />
      </section>
      <section className="vt-tools-inspector">
        <InspectorComponent />
      </section>
    </div>
  );
};

export default Tools;
