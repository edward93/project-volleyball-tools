import { updateLocation } from "components/Players/playerLocation.Slice";
import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "reduxTools/hooks";
import { v4 as uuidv4 } from "uuid";
import Player from "../Players/Player.Component";

import "styles/court.scss";

/**
 * SVG visualizer
 * @param props Component props
 * @returns React component
 */
const CourtComponent = () => {
  const dispatch = useAppDispatch();

  const players = useAppSelector((selector) => selector.playersSlice.byId);
  // currently selected player
  // const { selectedId } = useAppSelector((selector) => selector.inspectorSlice);

  //#region attempt at smooth dragging
  // // currently pressed player (different from selected, used for moving the players)
  // const [pressedPlayer, setPressedPlayer] = useState("");

  // /**
  //  * Handles mouse move event
  //  * @param event Mouse event
  //  */
  // const onMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
  //   movePlayer(event.clientX, event.clientY);
  // };

  // const onPressed = (id: string) => {
  //   // console.log("pressed ID: ", id, " selected ID: ", selectedId);
  //   setPressedPlayer(id);
  //   console.log("Pressed: ", id);
  // };

  // const onReleased = () => {
  //   setPressedPlayer("");
  //   console.log("Released: ", pressedPlayer);
  // };

  // /**
  //  * Handles events when player is no longer being pressed (touch end, mouse up)
  //  */
  // const onStopPressing = () => {
  //   onReleased();
  // };

  // /**
  //  * Moves circles when dragged
  //  * @param event Mouse move event
  //  */
  // const movePlayer = (x: number, y: number) => {
  //   if (!pressedPlayer) return;

  //   //#region find transformed coordinates
  //   const point = svgRef.current?.createSVGPoint();
  //   if (!point) return;

  //   point.x = x;
  //   point.y = y;

  //   const transformedPoint = point.matrixTransform(svgRef.current?.getScreenCTM()?.inverse());

  //   // calc new coordinates relative to the SVG itself
  //   const newX = transformedPoint.x;
  //   const newY = transformedPoint.y;
  //   //#endregion

  //   // update player location (local state)
  //   // this improves the performance compared to updating the store every time
  //   // setPlayerLocation({ ...playerLocation, x: newX, y: newY });
  //   // update position in the store
  //   // dispatch(updatePosition({ id: pressedPlayer, newX, newY }));
  //   dispatch(
  //     updateLocation({
  //       location: { id: uuidv4(), playerId: pressedPlayer, x: newX, y: newY },
  //     }),
  //   );
  // };
  //#endregion
  // const { byId: gameStates, currentState } = useAppSelector((selector) => selector.gameStateSlice);

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

        {Object.values(players).map((player) => (
          <Player
            key={player.id}
            id={player.id}
            color={player.color}
            radius={player.r}
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
