import { useRef } from "react";
import { useAppSelector } from "reduxTools/hooks";
import Player from "./Player.Component";

import "styles/visualizer.scss";

/**
 * SVG visualizer
 * @param props Component props
 * @returns React component
 */
const SvgVisualizerComponent = () => {
  const circles = useAppSelector((selector) => selector.circlesReducer.byId);
  // const { selectedId } = useAppSelector((selector) => selector.inspectorSlice);

  // svg ref
  const svgRef = useRef<SVGSVGElement>(null);

  return (
    <div className="vt-svg-container">
      <svg viewBox="0 0 1600 1200" ref={svgRef} className="vt-svg" preserveAspectRatio="xMidYMin meet">
        <g className="vt-svg-court-group" transform="translate(350, 10)">
          <line className="vt-svg-net" strokeWidth={6} x1={-150} y1={0} x2={1050} y2={0} />
          <rect className="vt-svg-court" strokeWidth={5} width={900} height={900} />
          <rect className="vt-svg-court-front" strokeWidth={5} width={900} height={300} />
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
            key={circle.id}
            id={circle.id}
            color={circle.color}
            circle={{ x: circle.cx, y: circle.cy, r: circle.r }}
            svgRef={svgRef}
          />
        ))}
        {/* <use xlinkHref={`#${selectedId || ""}`} /> */}
      </svg>
    </div>
  );
};

export default SvgVisualizerComponent;
