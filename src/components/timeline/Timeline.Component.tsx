// import { Slider } from "@mantine/core";
import { useRef, useState } from "react";
import { useAppSelector } from "reduxTools/hooks";
import "styles/timeline.scss";

/**
 * Timeline component
 * @returns Timeline component
 */
const TimelineComponent = () => {
  const hashMarks = 101;
  const markWidth = 1;
  const distance = 50;
  const markHeight = 10;
  // svg dimensions
  const svgHeight = 40;
  const svgWidth = 1000;
  // get all states
  const gameStates = useAppSelector((selector) => selector.gameStateSlice);

  const [gameState, setGameState] = useState(10);

  // slider x coordinate
  const [sliderPosition, setSliderPosition] = useState<number>(distance);
  // slider is pressed or not (for movement)
  const [isDragging, setIsDragging] = useState<boolean>(false);
  // svg ref
  const svgRef = useRef<SVGSVGElement>(null);

  const onTimelineChange = (newGameState: number) => {
    setGameState(newGameState);
  };

  /**
   * Handles mouse down event
   * @param event Mouse event
   */
  const onMouseDown = (event: React.MouseEvent<SVGCircleElement>) => {
    setIsDragging(true);
  };

  /**
   * Handles events when player is no longer being pressed (touch end, mouse up)
   */
  const onStopPressing = () => {
    setIsDragging(false);
  };

  /**
   * Handles mouse move event
   * @param event Mouse event
   */
  const onMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    moveSlider(event.clientX, event.clientY);
  };

  /**
   * Called when mouse leaves the SVG element
   * @param event Mouse event
   */
  const onMouseLeave = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    // reset tracking
    setIsDragging(false);
  };

  const moveSlider = (x: number, y: number) => {
    // make sure the slider is pressed
    if (!isDragging) return;
    //#region find transformed coordinates
    const point = svgRef.current?.createSVGPoint();
    if (!point) return;

    point.x = x;
    point.y = y;

    // TODO: fix the snapping
    const snapIncrement = (svgWidth - distance * 2) / hashMarks;

    const transformedPoint = point.matrixTransform(svgRef.current?.getScreenCTM()?.inverse());
    //#endregion
    // calc new coordinates relative to the SVG itself
    const newX = transformedPoint.x;
    const snappedX = Math.round(newX / snapIncrement) * snapIncrement;

    setSliderPosition(snappedX);
  };

  const markPos = (mark: number): number => {
    const space = svgWidth - distance * 2; // 50 away from each side
    return (mark * space) / hashMarks;
  };

  return (
    <section className="vt-tools-timeline-section">
      <div className="vt-timeline-svg-container">
        <svg
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          ref={svgRef}
          className="timeline-svg"
          preserveAspectRatio="xMidYMin meet"
        >
          {Array.from<number, number>({ length: hashMarks }, (_: number, k: number) => k).map((mark: number) => {
            return (
              <line
                key={mark}
                className="vt-timeline-hash-mark"
                x1={distance + markPos(mark)}
                y1={2}
                x2={distance + markPos(mark)}
                y2={mark % 10 === 0 ? markHeight * 2 : markHeight}
                strokeWidth={markWidth}
              />
            );
          })}
          <line
            x1={distance / 2}
            y1={markHeight * 2 + 4}
            x2={svgWidth - distance / 2}
            y2={markHeight * 2 + 4}
            strokeWidth={0.5}
            // strokeDasharray="5,5"
            className="vt-timeline-gauge-separator"
          />
          <g
            transform={`translate(${sliderPosition}, ${1})`}
            onMouseDown={onMouseDown}
            onMouseUp={onStopPressing}
            className="vt-timeline-slider"
          >
            <circle className="vt-timeline-slider-head" stroke="black" cx={0} cy={markHeight * 2 + 4 + 6} r={5} />
            <line
              x1={0}
              y1={markHeight * 2 + 4 + 2.5 - 2}
              x2={0}
              y2={0}
              className="vt-timeline-slider-needle"
              // strokeWidth={2}
            />
          </g>
        </svg>
      </div>
    </section>
  );
};

export default TimelineComponent;
