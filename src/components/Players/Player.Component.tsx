import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { useAppDispatch, useAppSelector } from "reduxTools/hooks";
import { PlayerComponentProps } from "types/playerComponent.Types";
import { PlayerLocation } from "types/volleyballTool.New.Types";
import useFontFaceObserver from "utils/hooks/useFontFaceObserver.hook";
import { getTransformedCoordinates } from "utils/svg/svgHelpers";
import { select } from "../Inspector/inspector.Slice";
import { updateLocation } from "./playerLocation.Slice";

/**
 * Player component (renders as SVG circles with player's name under it)
 *
 * @param props - Component props
 * @returns React component
 */
const PlayerComponent = (props: PlayerComponentProps) => {
  /** Destructuring props */
  const { id, radius, color, name, onPressed, onReleased, svgRef } = props;
  const dispatch = useAppDispatch();
  // players
  const players = useAppSelector((selector) => selector.playersSlice);
  // player locations
  const playersLocations = useAppSelector((selector) => selector.playersLocationsSlice);
  // current game state
  const { currentState } = useAppSelector((selector) => selector.gameStateSlice);
  // selected player id
  const { selectedId } = useAppSelector((selector) => selector.inspectorSlice);
  // is current player selected or not
  const isPlayerSelected = selectedId === id;

  const isFontLoaded = useFontFaceObserver([{ family: "Roboto-Mono" }]);

  const location = playersLocations.byGameStateId[currentState ?? ""]?.[id] ?? playersLocations.byPlayerId[id];
  // current player location
  const [playerLocation, setPlayerLocation] = useState<PlayerLocation>(location);
  /** is this player/circle pressed/touched or not */
  const [isPressed, setIsPressed] = useState(false);
  // capture isPressed to be used inside a listener callback
  const dragging = useRef<boolean>(isPressed);

  /** set `dragging` value */
  const isDragging = (value: boolean) => {
    dragging.current = value;
    setIsPressed(value);
  };

  /** Register movement event listeners on the parent SVG element */
  useEffect(() => {
    if (svgRef.current) {
      svgRef.current.addEventListener("mousemove", onMouseMove);
      svgRef.current.addEventListener("touchmove", onTouchMove);
    }

    return () => {
      svgRef.current?.removeEventListener("mousemove", onMouseMove);
      svgRef.current?.removeEventListener("touchmove", onTouchMove);
    };
  }, [svgRef]);

  // update local position when store changes
  useEffect(() => {
    setPlayerLocation(location);
  }, [currentState]);

  // extract player's name
  const playerName = players.byId[id].name;

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
    dispatch(
      updateLocation({
        location: { id: uuidv4(), playerId: playerLocation.playerId, x: playerLocation.x, y: playerLocation.y },
      }),
    );
  };

  /**
   * Handles mouse move event
   * @param event Mouse event
   */
  const onMouseMove = (event: MouseEvent) => {
    movePlayer(event.clientX, event.clientY);
  };

  /**
   * Handles touch move event
   * @param event Touch event
   */
  const onTouchMove = (event: TouchEvent) => {
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
    isDragging(true);

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
    isDragging(false);
    // TODO: log
    // if onReleased is provided, call it
    onReleased && onReleased();
  };

  /**
   * Moves circles when dragged
   * @param event Mouse move event
   */
  const movePlayer = (x: number, y: number) => {
    if (!dragging.current) return;

    // get new coordinates
    const [newX, newY] = getTransformedCoordinates(svgRef.current, x, y);
    // update player location (local state)
    // this improves the performance compared to updating the store every time
    setPlayerLocation({ ...playerLocation, x: newX, y: newY });
  };

  // calculate the final radius of the player circle element
  const effectiveRadius = isPlayerSelected ? radius * 1.1 : radius;

  return (
    <g
      id={id}
      onMouseDown={onMouseDown}
      onMouseUp={onStopPressing}
      onTouchStart={onTouchStart}
      onTouchEnd={onStopPressing}
      className="vt-svg-player"
      transform={`translate(${playerLocation.x}, ${playerLocation.y})`}
      style={!isPressed ? { transition: "transform 0.3s" } : {}}
    >
      <g>
        <circle stroke="black" r={effectiveRadius} fill={color} strokeWidth={isPlayerSelected ? 5 : 1} />
        <text className="player-circle-txt" textAnchor="middle" alignmentBaseline="middle" fill="white">
          {players.byId[id].jerseyNumber}
        </text>
      </g>
      <g transform={`translate(${0}, ${1.6 * effectiveRadius})`}>
        <rect strokeWidth={2} width={rectWidth} height={30} fill="black" x={-rectWidth / 2} y={-15} rx={5} />
        <text ref={textRef} textAnchor="middle" alignmentBaseline="middle" fill="white">
          {name || playerName}
        </text>
      </g>
    </g>
  );
};

export default PlayerComponent;
