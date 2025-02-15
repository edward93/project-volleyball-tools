import { Fragment, useRef } from "react";
import { useAppSelector } from "reduxTools/hooks";
import Player from "../Players/Player.Component";

import VolleyballComponent from "features/volleyball/VolleyballComponent";
import "styles/court.scss";

/** Circle radius */
const radius = 40;
/** SVG props */
const svgWidth = 2400;
const svgHeight = 1400;

// TODO: move to a separate file/object
const COURT_DIMENSIONS = {
  FULL: {
    NET: { X1: 1200, Y1: 100, X2: 1200, Y2: 1300 },
    LEFT_COURT: {
      WIDTH: 900,
      X: 300,
      Y: 250,
      FRONT_ROW: { WIDTH: 300, HEIGHT: 900, X: 900, Y: 250 },
      TEN_FT_LINE: { X1: 900, Y1: 250, X2: 900, Y2: 1150 },
      TEN_FT_LINE_DASHED: { X1: 900, Y1: 150, X2: 900, Y2: 1250 },
    },
  },
  HALF: {
    NET: { X1: 600, Y1: 100, X2: 1800, Y2: 100 },
    COURT: {
      WIDTH: 900,
      X: 750,
      Y: 100,
      FRONT_ROW: { WIDTH: 900, HEIGHT: 300, X: 750, Y: 100 },
      TEN_FT_LINE: { X1: 750, Y1: 400, X2: 1650, Y2: 400 },
      TEN_FT_LINE_DASHED: { X1: 650, Y1: 400, X2: 1750, Y2: 400 },
    },
  },
};

/**
 * SVG visualizer
 * @param props Component props
 * @returns React component
 */
const CourtComponent = (props: { halfCourt?: boolean }) => {
  // props destructure
  const { halfCourt } = props;
  const players = useAppSelector((selector) => selector.players.byId);

  // current game state
  const { currentStateId } = useAppSelector((selector) => selector.gameState);
  const currentState = useAppSelector((selector) => selector.gameState.byId[currentStateId ?? ""]);

  // player ids that are on the court
  const activePlayerIds =
    currentState?.dependencies?.activePlayerIds ??
    Object.values(players)
      .filter((c) => c.isActive && c.currentRotationPosition !== undefined)
      .map((c) => c.id);

  // svg ref
  const svgRef = useRef<SVGSVGElement>(null);

  return (
    <div className="vt-svg-container">
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        ref={svgRef}
        className="vt-svg"
        preserveAspectRatio="xMidYMin meet"
        // onMouseUp={onStopPressing}
        // onMouseMove={onMouseMove}
      >
        <SvgGrid />
        <g className="vt-svg-court-group">
          {halfCourt ? (
            <>
              <line
                className="vt-svg-net"
                strokeWidth={6}
                x1={COURT_DIMENSIONS.HALF.NET.X1}
                y1={COURT_DIMENSIONS.HALF.NET.Y1}
                x2={COURT_DIMENSIONS.HALF.NET.X2}
                y2={COURT_DIMENSIONS.HALF.NET.Y2}
              />
              <g className="vt-svg-home-court-group">
                <rect
                  className="vt-svg-court"
                  strokeWidth={5}
                  width={COURT_DIMENSIONS.HALF.COURT.WIDTH}
                  height={COURT_DIMENSIONS.HALF.COURT.WIDTH}
                  y={COURT_DIMENSIONS.HALF.COURT.Y}
                  x={COURT_DIMENSIONS.HALF.COURT.X}
                />
                <rect
                  className="vt-svg-court-front"
                  strokeWidth={5}
                  width={COURT_DIMENSIONS.HALF.COURT.FRONT_ROW.WIDTH}
                  height={COURT_DIMENSIONS.HALF.COURT.FRONT_ROW.HEIGHT}
                  x={COURT_DIMENSIONS.HALF.COURT.FRONT_ROW.X}
                  y={COURT_DIMENSIONS.HALF.COURT.FRONT_ROW.Y}
                />
                
                {/* Custom court overlay images 
                <image
                  href={logo}
                  y={COURT_DIMENSIONS.HALF.COURT.Y}
                  x={COURT_DIMENSIONS.HALF.COURT.X}
                  width={COURT_DIMENSIONS.HALF.COURT.FRONT_ROW.WIDTH}
                /> */}
                <line
                  className="vt-svg-10-ft-line"
                  strokeWidth={5}
                  x1={COURT_DIMENSIONS.HALF.COURT.TEN_FT_LINE.X1}
                  y1={COURT_DIMENSIONS.HALF.COURT.TEN_FT_LINE.Y1}
                  x2={COURT_DIMENSIONS.HALF.COURT.TEN_FT_LINE.X2}
                  y2={COURT_DIMENSIONS.HALF.COURT.TEN_FT_LINE.Y2}
                />
                <line
                  className="vt-svg-10-ft-line-outside"
                  strokeWidth={4}
                  x1={COURT_DIMENSIONS.HALF.COURT.TEN_FT_LINE_DASHED.X1}
                  y1={COURT_DIMENSIONS.HALF.COURT.TEN_FT_LINE_DASHED.Y1}
                  x2={COURT_DIMENSIONS.HALF.COURT.TEN_FT_LINE_DASHED.X2}
                  y2={COURT_DIMENSIONS.HALF.COURT.TEN_FT_LINE_DASHED.Y2}
                  strokeDasharray={10}
                />
              </g>
            </>
          ) : (
            <>
              <line
                className="vt-svg-net"
                strokeWidth={6}
                x1={COURT_DIMENSIONS.FULL.NET.X1}
                y1={COURT_DIMENSIONS.FULL.NET.Y1}
                x2={COURT_DIMENSIONS.FULL.NET.X2}
                y2={COURT_DIMENSIONS.FULL.NET.Y2}
              />
              <g className="vt-svg-home-court-group">
                <rect
                  className="vt-svg-court"
                  strokeWidth={5}
                  width={COURT_DIMENSIONS.FULL.LEFT_COURT.WIDTH}
                  height={COURT_DIMENSIONS.FULL.LEFT_COURT.WIDTH}
                  y={COURT_DIMENSIONS.FULL.LEFT_COURT.Y}
                  x={COURT_DIMENSIONS.FULL.LEFT_COURT.X}
                />
                <rect
                  className="vt-svg-court-front"
                  strokeWidth={5}
                  width={COURT_DIMENSIONS.FULL.LEFT_COURT.FRONT_ROW.WIDTH}
                  height={COURT_DIMENSIONS.FULL.LEFT_COURT.FRONT_ROW.HEIGHT}
                  x={COURT_DIMENSIONS.FULL.LEFT_COURT.FRONT_ROW.X}
                  y={COURT_DIMENSIONS.FULL.LEFT_COURT.FRONT_ROW.Y}
                />
                <line
                  className="vt-svg-10-ft-line"
                  strokeWidth={5}
                  x1={COURT_DIMENSIONS.FULL.LEFT_COURT.TEN_FT_LINE.X1}
                  y1={COURT_DIMENSIONS.FULL.LEFT_COURT.TEN_FT_LINE.Y1}
                  x2={COURT_DIMENSIONS.FULL.LEFT_COURT.TEN_FT_LINE.X2}
                  y2={COURT_DIMENSIONS.FULL.LEFT_COURT.TEN_FT_LINE.Y2}
                />
                <line
                  className="vt-svg-10-ft-line-outside"
                  strokeWidth={4}
                  x1={COURT_DIMENSIONS.FULL.LEFT_COURT.TEN_FT_LINE_DASHED.X1}
                  y1={COURT_DIMENSIONS.FULL.LEFT_COURT.TEN_FT_LINE_DASHED.Y1}
                  x2={COURT_DIMENSIONS.FULL.LEFT_COURT.TEN_FT_LINE_DASHED.X2}
                  y2={COURT_DIMENSIONS.FULL.LEFT_COURT.TEN_FT_LINE_DASHED.Y2}
                  strokeDasharray={10}
                />
              </g>
              <g className="vt-svg-away-court-group">
                <rect className="vt-svg-court" strokeWidth={5} width={900} height={900} y={150} x={900} />
                <rect className="vt-svg-court-front" strokeWidth={5} width={300} height={900} x={900} y={150} />
                <line className="vt-svg-10-ft-line" strokeWidth={5} x1={1200} y1={150} x2={1200} y2={1050} />
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
            </>
          )}
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
        <VolleyballComponent svgRef={svgRef} />
      </svg>
    </div>
  );
};

/**
 * SVG Grid
 * @returns - React component
 */
const SvgGrid = () => {
  // Grid resolution
  const resolution = 100;

  return (
    <>
      {/* Coordinate grid */}
      {[...Array(50)].map((_, i) => (
        <Fragment key={i}>
          {/* Vertical grid lines */}
          <line x1={i * resolution} y1="0" x2={i * resolution} y2="1450" stroke="#eee" strokeWidth="0.5" />
          {/* Horizontal grid lines */}
          <line x1="0" y1={i * resolution} x2="2400" y2={i * resolution} stroke="#eee" strokeWidth="0.5" />
          {/* Labels */}
          <text x={i * resolution} y="20" fontSize="20" fill="#eee">
            {i * resolution}
          </text>
          <text x="0" y={i * resolution + 3} fontSize="20" fill="#eee">
            {i * resolution}
          </text>
        </Fragment>
      ))}
    </>
  );
};

export default CourtComponent;
