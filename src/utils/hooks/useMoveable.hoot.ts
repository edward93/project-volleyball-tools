import { useRef, useState } from "react";
import { getTransformedCoordinates } from "utils/svg/svgHelpers";

export type Moveable2dComp = {
  x: number;
  y: number;
};

export const useMoveable = <T extends Moveable2dComp>(id: string, location: T, setLocation: (newVal: T) => void) => {
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
   *
   * @param id - draggable component id
   */
  const press = (id: string, callback: (() => void) | undefined) => {
    isDragging(true);

    // if callback is defined call it
    if (callback) callback();
  };

  const release = (callback: (() => void) | undefined) => {
    isDragging(false);

    // if callback is defined call it
    if (callback) callback();
  };

  const move = (x: number, y: number, svg: SVGSVGElement) => {
    if (!dragging.current) return;

    // get new coordinates
    const [newX, newY] = getTransformedCoordinates(svg, x, y);

    // update the location
    setLocation({ ...location, x: newX, y: newY });
  };

  return [isPressed, dragging, press, release, move];
};
