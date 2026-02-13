import { useEffect, useState } from "react";
import { VolleyballPosition } from "types/volleyballTool.New.Types";
import { useGameStateHelpers } from "utils/hooks/useGameStateHelpers.hook";
import { useMoveable } from "utils/hooks/useMoveable.hook";

/**
 * Custom hook to manage the position of a volleyball element within an SVG.
 *
 * @param volleyballPosition - The initial position of the volleyball element.
 * @param svgRef - A reference to the SVG element containing the volleyball element.
 * @param moveFinished - Callback function to be called when the move action is finished.
 *
 * @returns An object containing:
 * - `position`: The current position of the volleyball element.
 * - `isPressed`: A boolean indicating whether the element is currently being pressed.
 * - `onMouseDown`: Function to handle the mouse down event on the SVG circle element.
 * - `onTouchStart`: Function to handle the touch start event on the SVG circle element.
 * - `onStopPressing`: Function to handle the stop pressing event.
 */
export const useVolleyballHook = (
  volleyballPosition: VolleyballPosition,
  svgRef: React.RefObject<SVGSVGElement>,
  moveFinished: () => void,
) => {
  const [position, setPosition] = useState<VolleyballPosition>(volleyballPosition);

  // moveable hook
  const [isPressed, press, release, move] = useMoveable<VolleyballPosition>(position, setPosition);

  // current game state
  const [_, currentState] = useGameStateHelpers();

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

  useEffect(() => {
    if (currentState && currentState.dependencies.volleyballPosition) {
      setPosition(currentState.dependencies.volleyballPosition!);
    }
  }, [currentState]);

  /**
   * Handles the mouse down event on an SVG circle element.
   *
   * @param event - The mouse event triggered by pressing down on the SVG circle element.
   */
  const onMouseDown = (event: React.MouseEvent<SVGCircleElement>) => {
    press();
    event.preventDefault();
  };

  /**
   * Handles the touch start event on an SVG circle element.
   *
   * @param event - The touch event triggered on the SVG circle element.
   */
  const onTouchStart = (event: React.TouchEvent<SVGCircleElement>) => {
    event.preventDefault();
    press();
  };

  /**
   * Handles the stop pressing event.
   * Releases the current action and dispatches an action to add a new volleyball position.
   * The new position includes a unique identifier and the current x and y coordinates.
   */
  const onStopPressing = () => {
    release();
    moveFinished();
  };

  /**
   * Handles the mouse move event.
   *
   * @param event - The mouse event containing the coordinates of the mouse pointer.
   */
  const onMouseMove = (event: MouseEvent) => {
    move(event.clientX, event.clientY, svgRef.current);
  };

  /**
   * Handles the touch move event.
   *
   * @param {TouchEvent} event - The touch event object.
   */
  const onTouchMove = (event: TouchEvent) => {
    move(event.touches[0].clientX, event.touches[0].clientY, svgRef.current);
  };

  return {
    position,
    isPressed,
    onMouseDown,
    onTouchStart,
    onStopPressing,
  };
};
