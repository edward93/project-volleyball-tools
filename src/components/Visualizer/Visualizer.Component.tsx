import { useRef } from "react";
import { Circle } from "../../types/reduxStore.Types";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { select } from "../Inspector/inspector.Slice";
import Player from "./Player.Component";

/**
 * SVG visualizer
 * @param props Component props
 * @returns React component
 */
const SvgVisualizerComponent = (props: { texts: Record<string, string> }) => {
  const dispatch = useAppDispatch();
  const circles = useAppSelector((selector) => selector.circlesReducer.byId);
  const players = useAppSelector((selector) => selector.playersReducer);

  const { texts } = props;

  // svg ref
  const svgRef = useRef<SVGSVGElement>(null);

  /**
   * Sets current circle as active when mouse is pressed
   * @param circle SVG circle
   */
  const handleMouseDown = (circle: Circle) => {
    // setActiveCircle(circle);
    const player = players.byId[circle.id];
    console.log(player);

    dispatch(select(player));
  };

  return (
    <div className="vt-svg-container">
      <svg viewBox="0 0 1600 1200" ref={svgRef} className="vt-svg" preserveAspectRatio="xMidYMin meet">
        <g className="vt-svg-court-group" transform="translate(350, 10)">
          <line className="vt-svg-net" strokeWidth={5} x1={-150} y1={0} x2={1050} y2={0} />
          <rect className="vt-svg-court" strokeWidth={5} width={900} height={900} />
          <line className="vt-svg-10-ft-line" strokeWidth={5} x1={0} y1={300} x2={900} y2={300} />
          <line
            className="vt-svg-10-ft-line-outside"
            strokeWidth={4}
            x1={-175}
            y1={300}
            x2={1075}
            y2={300}
            strokeDasharray={10}
          />
        </g>

        {Object.values(circles).map((circle) => (
          <Player
            circle={circle}
            key={circle.id}
            circleRadius={circle.r}
            color={circle.color}
            id={circle.id}
            x={circle.cx}
            y={circle.cy}
            name={texts[circle.id]}
            svgRef={svgRef}
            onPressed={handleMouseDown}
          />
        ))}
      </svg>
    </div>
  );
};

export default SvgVisualizerComponent;
