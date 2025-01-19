import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { useAppDispatch, useAppSelector } from "reduxTools/hooks";
import { PlayerComponentProps } from "types/playerComponent.Types";
import { PlayerLocation } from "types/volleyballTool.New.Types";
import useFontFaceObserver from "utils/hooks/useFontFaceObserver.hook";
import { useMoveable } from "utils/hooks/useMoveable.hook";
import { select } from "../Inspector/inspector.Slice";
import { addLocation } from "./playerLocation.Slice";

/**
 * Player component (renders as SVG circles with player's name under it)
 *
 * @param props - Component props
 * @returns React component
 */
const PlayerComponent = (props: PlayerComponentProps) => {
  /** Destructuring props */
  const { id, radius, color, name, svgRef } = props;
  const dispatch = useAppDispatch();
  // players
  const players = useAppSelector((selector) => selector.players);
  // player locations
  const playersLocations = useAppSelector((selector) => selector.playersLocations);
  // current game state id
  const { currentStateId } = useAppSelector((selector) => selector.gameState);
  const currentState = useAppSelector((selector) => selector.gameState.byId[currentStateId ?? ""]);

  // selected player id
  const { selectedId } = useAppSelector((selector) => selector.inspector);
  // is current player selected or not
  const isPlayerSelected = selectedId === id;

  const isFontLoaded = useFontFaceObserver([{ family: "Roboto-Mono" }]);

  // location
  const locationId = currentState?.dependencies?.playerLocationIds[id] ?? playersLocations.byPlayerId[id];
  const location = playersLocations.byId[locationId];

  // current player location
  const [playerLocation, setPlayerLocation] = useState<PlayerLocation>(location);

  // movable hook
  const [isPressed, press, release, move] = useMoveable<PlayerLocation>(playerLocation, setPlayerLocation);

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
  }, [currentStateId, location]);

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

    press();
    dispatch(select(id));
  };

  /**
   * Handles touch start event
   * @param event Touch event
   */
  const onTouchStart = (event: React.TouchEvent<SVGSVGElement>) => {
    event.preventDefault();

    press();
    dispatch(select(id));
  };

  /**
   * Handles events when player is no longer being pressed (touch end, mouse up)
   */
  const onStopPressing = () => {
    release();

    // TODO: this works with the new game state system but it creates lots of new location objects
    // update position in the store
    dispatch(
      addLocation({
        id: uuidv4(),
        playerId: playerLocation.playerId,
        x: playerLocation.x,
        y: playerLocation.y,
      }),
    );
  };

  /**
   * Handles mouse move event
   * @param event Mouse event
   */
  const onMouseMove = (event: MouseEvent) => {
    move(event.clientX, event.clientY, svgRef.current);
  };

  /**
   * Handles touch move event
   * @param event Touch event
   */
  const onTouchMove = (event: TouchEvent) => {
    move(event.touches[0].clientX, event.touches[0].clientY, svgRef.current);
  };
  //#endregion

  /** Update player's name bg rect width */
  const updateTextRectWidth = () => {
    if (textRef.current) setRectWidth(textRef.current.getComputedTextLength() + 20);
  };

  // calculate the final radius of the player circle element
  const effectiveRadius = isPlayerSelected ? radius * 1.1 : radius;
  // effective stroke width
  const strokeWidth = isPlayerSelected ? 5 : 1;

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
        <circle stroke="black" r={effectiveRadius} fill={color} strokeWidth={strokeWidth} />
        <text x={0.2} y={2.5} className="player-circle-txt" fill="white" textAnchor="middle" alignmentBaseline="middle">
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
