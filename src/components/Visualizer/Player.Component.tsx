import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import useFontFaceObserver from "utils/hooks/useFontFaceObserver.hook";
import { PositionsById } from "types/volleyballTool.Types";
import { useAppDispatch, useAppSelector } from "reduxTools/hooks";
import { PlayerComponentProps } from "types/playerComponent.Types";
import { select } from "../Inspector/inspector.Slice";
import { updatePosition } from "./circles.Slice";
import { updateLocation } from "./playerLocation.Slice";
import { PlayerLocation } from "types/volleyballTool.New.Types";

/**
 * Player component (renders as SVG circles with player's name under it)
 *
 * @param props - Component props
 * @returns React component
 */
const PlayerComponent = (props: PlayerComponentProps) => {
  const dispatch = useAppDispatch();
  // players
  const players = useAppSelector((selector) => selector.playersReducer);
  // player locations
  const playersLocations = useAppSelector((selector) => selector.playersLocationsSlice);
  // current game state
  const { currentState } = useAppSelector((selector) => selector.gameStateSlice);

  const isFontLoaded = useFontFaceObserver([{ family: "Roboto-Mono" }]);

  /** Destructuring props */
  const { id, radius, color, name, onPressed, onReleased, svgRef } = props;

  const location = playersLocations.byGameStateId[currentState ?? ""]?.[id] ?? playersLocations.byPlayerId[id];
  // current player location
  const [playerLocation, setPlayerLocation] = useState<PlayerLocation>(location);

  // update local position when store changes
  useEffect(() => {
    setPlayerLocation(playersLocations.byGameStateId[currentState ?? ""]?.[id] ?? playersLocations.byPlayerId[id]);
  }, [currentState]);

  // extract player's name
  const playerName = players.byId[id].name;

  /** is this player/circle pressed/touched or not */
  const [isPressed, setIsPressed] = useState(false);
  /** Width of the text's bg rect */
  const [rectWidth, setRectWidth] = useState(220);

  /** Text element's ref */
  const textRef = useRef<SVGTextElement>(null);

  // update rectWidth when player name changes or when font loads
  useEffect(() => {
    updateTextRectWidth();
  }, [playerName, isFontLoaded]);

  // TODO: move to a separate hook
  //#region framework handlers
  /**
   * Handles mouse down event
   * @param event Mouse event
   */
  const onMouseDown = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    press(id);
  };

  /**
   * Handles touch start event
   * @param event Touch event
   */
  const onTouchStart = (event: React.TouchEvent<SVGSVGElement>) => {
    event.preventDefault();
    press(id);
  };

  /**
   * Handles events when player is no longer being pressed (touch end, mouse up)
   */
  const onStopPressing = () => {
    release();

    // update position in the store
    dispatch(updatePosition({ id: playerLocation.playerId, newX: playerLocation.x, newY: playerLocation.y }));
    dispatch(
      updateLocation({
        location: { id: uuidv4(), playerId: playerLocation.playerId, x: playerLocation.x, y: playerLocation.y },
      })
    );
  };

  /**
   * Handles mouse move event
   * @param event Mouse event
   */
  const onMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    movePlayer(event.clientX, event.clientY);
  };

  /**
   * Handles touch move event
   * @param event Touch event
   */
  const onTouchMove = (event: React.TouchEvent<SVGSVGElement>) => {
    movePlayer(event.touches[0].clientX, event.touches[0].clientY);
  };
  //#endregion

  /** Update player's name bg rect width */
  const updateTextRectWidth = () => {
    if (textRef.current) setRectWidth(textRef.current.getComputedTextLength() + 20);
  };
  /**
   * Press (actively select [mouse down/touch start] ) this player
   * @param id - Current circle id
   */
  const press = (id: string) => {
    setIsPressed(true);

    // select current player
    dispatch(select(id));

    // TODO: log

    // call onPressed if exists
    onPressed && onPressed(id);
  };

  /**
   * Release (stop selecting [mouse up/touch end] ) this player
   */
  const release = () => {
    setIsPressed(false);
    // TODO: log
    // if onReleased is provided, call it
    onReleased && onReleased();
  };

  /**
   * Moves circles when dragged
   * @param event Mouse move event
   */
  const movePlayer = (x: number, y: number) => {
    if (!isPressed) return;

    //#region find transformed coordinates
    const point = svgRef.current?.createSVGPoint();
    if (!point) return;

    point.x = x;
    point.y = y;

    const transformedPoint = point.matrixTransform(svgRef.current?.getScreenCTM()?.inverse());

    // calc new coordinates relative to the SVG itself
    const newX = transformedPoint.x;
    const newY = transformedPoint.y;
    //#endregion

    // update player location (local state)
    // this improves the performance compared to updating the store every time
    setPlayerLocation({ ...playerLocation, x: newX, y: newY });
  };

  return (
    <g
      onMouseDown={onMouseDown}
      onMouseUp={onStopPressing}
      onTouchStart={onTouchStart}
      onTouchEnd={onStopPressing}
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
      className="vt-svg-player"
      id={id}
    >
      <circle stroke="black" cx={playerLocation.x} cy={playerLocation.y} r={radius} fill={color} />
      <g transform={`translate(${playerLocation.x}, ${playerLocation.y})`}>
        <text textAnchor="middle" alignmentBaseline="middle" fill="white">
          {PositionsById[players.byId[id].positionId].shortName}
        </text>
      </g>
      <g transform={`translate(${playerLocation.x}, ${playerLocation.y + 1.6 * radius})`}>
        <rect strokeWidth={2} width={rectWidth} height={30} fill="black" x={-rectWidth / 2} y={-15} rx={5} />
        <text ref={textRef} textAnchor="middle" alignmentBaseline="middle" fill="white">
          {name || playerName}
        </text>
      </g>
    </g>
  );
};

export default PlayerComponent;
