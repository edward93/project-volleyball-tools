import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "../styles/tools.scss";

import { addPlayer } from "./VolleyballTool/team.Slice";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { MiddleBlocker, OppositeHitter, OutsideHitter, Setter } from "../types/volleyballTool.Types";
import { Player } from "../types/reduxStore.Types";

// const initPlayers = (dispatch: any) => {
//   console.log("init players");

//   dispatch(
//     addPlayer({
//       name: "A",
//       position: OutsideHitter,
//       averageScore: 0,
//       color: "white",
//       stats: [],
//       cx: 450,
//       cy: 190,
//       id: uuidv4(),
//       r: 40,
//     })
//   );
//   dispatch(
//     addPlayer({
//       name: "B",
//       position: OutsideHitter,
//       averageScore: 0,
//       color: "white",
//       stats: [],
//       cx: 800,
//       cy: 190,
//       id: uuidv4(),
//       r: 40,
//     })
//   );
//   dispatch(
//     addPlayer({
//       name: "C",
//       position: Setter,
//       averageScore: 0,
//       color: "white",
//       stats: [],
//       cx: 1130,
//       cy: 190,
//       id: uuidv4(),
//       r: 40,
//     })
//   );

//   dispatch(
//     addPlayer({
//       name: "D",
//       position: MiddleBlocker,
//       averageScore: 0,
//       color: "white",
//       stats: [],
//       cx: 450,
//       cy: 590,
//       id: uuidv4(),
//       r: 40,
//     })
//   );
//   dispatch(
//     addPlayer({
//       name: "E",
//       position: MiddleBlocker,
//       averageScore: 0,
//       color: "white",
//       stats: [],
//       cx: 800,
//       cy: 590,
//       id: uuidv4(),
//       r: 40,
//     })
//   );
//   dispatch(
//     addPlayer({
//       name: "F",
//       position: OppositeHitter,
//       averageScore: 0,
//       color: "white",
//       stats: [],
//       cx: 1130,
//       cy: 590,
//       id: uuidv4(),
//       r: 40,
//     })
//   );
// };

/**
 * SVG component that allows to have draggable circles
 * @returns React Element
 */
const SVGExample = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // initPlayers(dispatch);
  }, []);

  // initPlayers(dispatch);

  const players = useAppSelector((selector) => selector.teamReducer.players);

  // svg ref
  const svgRef = useRef<SVGSVGElement>(null);

  // all the circles
  // const [circles, setCircles] = useState<Circle[]>([
  //   { id: "circle1", cx: 450, cy: 190, r: 40, color: "red" },
  //   { id: "circle2", cx: 800, cy: 190, r: 40, color: "blue" },
  //   { id: "circle3", cx: 1130, cy: 190, r: 40, color: "green" },
  //   { id: "circle4", cx: 450, cy: 590, r: 40, color: "red" },
  //   { id: "circle5", cx: 800, cy: 590, r: 40, color: "blue" },
  //   { id: "circle6", cx: 1130, cy: 590, r: 40, color: "green" },
  // ]);
  const [active, setActive] = useState<Player | null>(null);

  const handleMouseDown = (player: Player) => {
    setActive(player);
  };

  // move the circles
  const handleMouseMove = (event: React.MouseEvent<SVGElement>) => {
    if (!active) return;

    const point = svgRef.current?.createSVGPoint();
    if (!point) return;

    point.x = event.clientX;
    point.y = event.clientY;

    const transformedPoint = point.matrixTransform(svgRef.current?.getScreenCTM()?.inverse());

    // calc new coordinates relative to the SVG itself
    const newX = transformedPoint.x;
    const newY = transformedPoint.y;

    // dispatch(updatePlayerPositionOnCourt({ playerId: active.id, newX, newY }));

    // update the circle coordinates
    // const updatedCircles = circles.map((circle) => {
    //   if (circle.id === activeCircle.id) {
    //     return { ...circle, cx: newX, cy: newY };
    //   } else {
    //     return circle;
    //   }
    // });

    // setCircles(updatedCircles);
  };

  const handleMouseUp = () => {
    setActive(null);
  };

  return (
    <div className="vt-svg-container">
      <svg
        viewBox="0 0 1600 1200"
        ref={svgRef}
        className="vt-svg"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <line className="vt-svg-net" strokeWidth={5} x1={200} y1={10} x2={1400} y2={10} />
        <g className="vt-svg-court-group" transform="translate(350, 10)">
          <rect className="vt-svg-court" strokeWidth={5} width={900} height={900} />
          <line className="vt-svg-10-ft-line" strokeWidth={5} x1={0} y1={300} x2={900} y2={300} />
        </g>

        {/* {Object.entries(players).map(([playerId, player]) => (
          <g key={player.id} onMouseDown={() => handleMouseDown(player)} className="vt-svg-player">
            <circle stroke="black" key={player.id} cx={player.cx} cy={player.cy} r={player.r} fill={player.color} />
            <text x={player.cx} y={player.cy} textAnchor="middle" alignmentBaseline="middle">
              {player.name}
            </text>
          </g>
        ))} */}
      </svg>
    </div>
  );
};

export default SVGExample;
