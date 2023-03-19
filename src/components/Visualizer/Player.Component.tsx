import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { Circle } from "../../types/reduxStore.Types";
import { updatePosition } from "./circles.Slice";

/**
 * Player component (renders as SVG circles with player's name under it)
 *
 * @param props - Component props
 * @returns React component
 */
const PlayerComponent = (props: {
  id: string;
  x: number;
  y: number;
  circleRadius: number;
  color: string;
  name: string;
  /** This should be removed and instead id should be passed */
  circle: Circle;
  onPressed: (circle: Circle) => void;
  onReleased?: () => void;
  svgRef: React.RefObject<SVGSVGElement>;
}) => {
  const dispatch = useAppDispatch();
  /** Deconstruct props */
  const { id, x, y, circleRadius, color, name, circle, onPressed, onReleased, svgRef } = props;

  /** is this player/circle pressed/touched or not */
  const [isPressed, setIsPressed] = useState(false);
  /** Width of the text's bg rect */
  const [rectWidth, setRectWidth] = useState(200);
  /** Text element's ref */
  const textRef = useRef<SVGTextElement>(null);

  // TODO: update rectWidth
  // useEffect(() => {
  //   if (textRef.current) {
  //     console.log("text length - ", textRef.current.getComputedTextLength());
  //     console.log("text - ", textRef.current.textContent);

  //     setRectWidth(textRef.current.getComputedTextLength() + 20);
  //   }
  // }, []);

  // TODO: move to a separate hook
  //#region framework handlers
  /**
   * Handles mouse down event
   * @param event Mouse event
   */
  const onMouseDown = (event: React.MouseEvent<SVGSVGElement>) => {
    press(circle);
  };

  /**
   * Handles touch start event
   * @param event Touch event
   */
  const onTouchStart = (event: React.TouchEvent<SVGSVGElement>) => {
    press(circle);
  };

  /**
   * Handles events when player is no longer being pressed (touch end, mouse up)
   */
  const onStopPressing = () => {
    release();
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

  /**
   * Press (actively select [mouse down/touch start] ) this player
   * @param circle - Current circle
   */
  const press = (circle: Circle) => {
    setIsPressed(true);
    // TODO: log
    onPressed(circle);
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

    const point = svgRef.current?.createSVGPoint();
    if (!point) return;

    point.x = x;
    point.y = y;

    const transformedPoint = point.matrixTransform(svgRef.current?.getScreenCTM()?.inverse());

    // calc new coordinates relative to the SVG itself
    const newX = transformedPoint.x;
    const newY = transformedPoint.y;

    dispatch(updatePosition({ id, newX, newY }));
  };

  return (
    <g
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
      onMouseUp={onStopPressing}
      onTouchEnd={onStopPressing}
      onContextMenu={(event) => {
        event.preventDefault();
        console.log("right click for ", id);
      }}
      className="vt-svg-player"
    >
      <circle stroke="black" cx={x} cy={y} r={circleRadius} fill={color} />
      <g transform={`translate(${x}, ${y + 1.6 * circleRadius})`}>
        <rect strokeWidth={2} width={rectWidth} height={30} fill="black" x={-rectWidth / 2} y={-15} rx={5} />
        <text ref={textRef} textAnchor="middle" alignmentBaseline="middle" fill="white">
          {name}
        </text>
      </g>
    </g>
  );
};

export default PlayerComponent;
