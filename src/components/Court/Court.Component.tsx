import { useRef } from "react";
import { useAppSelector } from "reduxTools/hooks";
import Player from "../Players/Player.Component";

import "styles/court.scss";

/** Circle radius */
const radius = 40;

/**
 * SVG visualizer
 * @param props Component props
 * @returns React component
 */
const CourtComponent = () => {
  const players = useAppSelector((selector) => selector.players.byId);
  
  // current game state
  const { currentState } = useAppSelector((selector) => selector.gameState);

  // player ids that are on the court
  const activePlayerIds = useAppSelector((selector) => selector.players.activePlayerIdsByGameStateId[currentState ?? ""]);

  // svg ref
  const svgRef = useRef<SVGSVGElement>(null);

  return (
    <div className="vt-svg-container">
      <svg
        viewBox="0 0 2400 1400"
        ref={svgRef}
        className="vt-svg"
        preserveAspectRatio="xMidYMin meet"
        // onMouseUp={onStopPressing}
        // onMouseMove={onMouseMove}
      >
        <g className="vt-svg-court-group" transform="translate(300, 100)">
          <line className="vt-svg-net" strokeWidth={6} x1={900} y1={0} x2={900} y2={1200} />
          <g className="vt-svg-home-court-group">
            <rect className="vt-svg-court" strokeWidth={5} width={900} height={900} y={150} />
            <rect className="vt-svg-court-front" strokeWidth={5} width={300} height={900} x={600} y={150} />
            <line className="vt-svg-10-ft-line" strokeWidth={5} x1={600} y1={150} x2={600} y2={1050} />
            <line
              className="vt-svg-10-ft-line-outside"
              strokeWidth={4}
              x1={600}
              y1={50}
              x2={600}
              y2={1150}
              strokeDasharray={10}
            />
          </g>
          <g className="vt-svg-away-court-group">
            <rect className="vt-svg-court" strokeWidth={5} width={900} height={900} y={150} x={900} />
            <rect className="vt-svg-court-front" strokeWidth={5} width={300} height={900} x={900} y={150} />
            <line className="vt-svg-10-ft-line" strokeWidth={5} x1={1200} y1={150} x2={1200} y2={1050} />
          </g>
          <line
            className="vt-svg-10-ft-line-outside"
            strokeWidth={4}
            x1={1200}
            y1={50}
            x2={1200}
            y2={1150}
            strokeDasharray={10}
          />
        </g>

        {activePlayerIds.map((playerId) => (
          <Player
            key={playerId}
            id={playerId}
            color={players[playerId].color}
            radius={radius}
            svgRef={svgRef}
            // onPressed={onPressed}
            // onReleased={onReleased}
          />
        ))}
        {/* <use xlinkHref={`#${selectedId || ""}`} /> */}
      </svg>
    </div>
  );
};

export default CourtComponent;
