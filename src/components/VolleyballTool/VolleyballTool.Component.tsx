import SVGExample from "../Draggable.Circles.Svg.Component";
import "../../styles/tools.scss"


const Tools = () => {
  return (
    <div className="vt-tools-container">
      <section className="vt-tools-main-area">
        <SVGExample />
      </section>
      <section className="vt-tools-properties"></section>
    </div>
  );
};

export default Tools;
