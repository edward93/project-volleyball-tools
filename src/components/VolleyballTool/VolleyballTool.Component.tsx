import InspectorComponent from "components/Inspector/Inspector.Component";
import TimelineComponent from "components/Timeline/Timeline.Component";
import CourtComponent from "components/Court/Court.Component";

import "styles/tools.scss";
import ToolbarComponent from "components/Toolbar/Toolbar.Component";

const Tools = () => {
  return (
    <div className="vt-tools-container">
      <section className="vt-tools-main-area">
        <ToolbarComponent />
        <CourtComponent />
        <TimelineComponent />
      </section>
      <section className="vt-tools-inspector">
        <InspectorComponent />
      </section>
    </div>
  );
};

export default Tools;
