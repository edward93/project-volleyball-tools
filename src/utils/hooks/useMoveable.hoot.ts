import { useRef, useState } from "react";
import { getTransformedCoordinates } from "utils/svg/svgHelpers";

export type Moveable2dComp = {
  x: number;
  y: number;
};

type MoveableReturnType = [boolean, () => void, () => void, (x: number, y: number, svg: SVGSVGElement | null) => void];

export const useMoveable = <T extends Moveable2dComp>(
  location: T,
  setLocation: (newVal: T) => void,
): MoveableReturnType => {
  /** readonly state */
  const [isPressed, setIsPressed] = useState<boolean>(false);
  // capture isPressed to be used inside a listener callback
  const dragging = useRef(isPressed);

  /**
   * Updates dragging value to true or false
   *
   * @param value - true of false
   */
  const isDragging = (value: boolean) => {
    dragging.current = value;
    // sync ref and the state
    setIsPressed(value);
  };

  /**
   * When pressed sets `dragging: true`
   */
  const press = (): void => {
    isDragging(true);
  };

  /**
   * When released sets `dragging: false`
   */
  const release = (): void => {
    isDragging(false);
  };

  /**
   * Moves the element to the new location relative to `svg`
   *
   * @param x - new X coordinate
   * @param y - new Y coordinate
   * @param svg - SVG element that renders those elements
   */
  const move = (x: number, y: number, svg: SVGSVGElement | null): void => {
    if (!dragging.current) return;

    // get new coordinates
    const [newX, newY] = getTransformedCoordinates(svg, x, y);

    // update the location
    setLocation({ ...location, x: newX, y: newY });
  };

  return [isPressed, press, release, move];
};
