import CourtComponent from "components/Court/Court.Component";
import InspectorComponent from "components/Inspector/Inspector.Component";
import TimelineComponent from "components/Timeline/Timeline.Component";

import ToolbarComponent from "components/Toolbar/Toolbar.Component";
import "styles/tools.scss";

// TODO: move this `halfCourt` to the store which will be set from GameSetupComponent
const Tools = () => {
  return (
    <div className="vt-tools-container">
      <section className="vt-tools-main-area">
        <ToolbarComponent />
        <CourtComponent halfCourt />
        <TimelineComponent />
      </section>
      <section className="vt-tools-inspector">
        <InspectorComponent />
      </section>
    </div>
  );
};

export default Tools;
