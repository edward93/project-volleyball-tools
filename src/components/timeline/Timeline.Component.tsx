import { useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "reduxTools/hooks";
import { selectPlayerAction } from "components/Players/players.Slice";
import "styles/timeline.scss";

/**
 * Timeline component
 * @returns Timeline component
 */
const TimelineComponent = () => {
  const dispatch = useAppDispatch();

  // currently selected player
  const { selectedId } = useAppSelector((selector) => selector.inspectorSlice);

  // current game state
  const [gameState, setGameState] = useState<string>();

  // get all states
  const gameStates = useAppSelector((selector) => selector.gameStateSlice);

  // game actions
  const gameActions = useAppSelector((selector) => selector.gameActionSlice);

  const hashMarks = gameStates.allIds.length;
  const distance = 50;
  const svgWidth = 1000;

  //#region slider position and state mapping helpers
  /**
   * Maps uniformly hash map range on to the svg
   *
   * @param index Mark index
   * @returns New position on the larger space
   */
  const posFromIndex = (index: number): number => {
    const space = svgWidth - distance * 2; // 50 away from each side
    return (index * space) / (hashMarks - 1);
  };

  // map position to the game state
  const posToGameStateMap = Array.from<number, number>({ length: hashMarks }, (_: number, k: number) => k)
    .map((index: number) => ({
      [distance + posFromIndex(index)]: gameStates.byId[gameStates.allIds[index]],
    }))
    .reduce((a, v) => ({ ...a, ...v }), {});

  // map game state id to slider pos (backwards of posToGameStateMap)
  const gameStateIdToPosMap = Array.from<number, number>({ length: hashMarks }, (_: number, k: number) => k)
    .map((index: number) => ({
      [gameStates.byId[gameStates.allIds[index]].id]: distance + posFromIndex(index),
    }))
    .reduce((a, v) => ({ ...a, ...v }), {});
  //#endregion

  //#region slider props and functions
  const markWidth = 1;
  const markHeight = 10;
  // svg dimensions
  const svgHeight = 40;

  const sliderHeadRadius = 5;
  const needleHeight = markHeight * 2 + 5;

  // slider x coordinate
  const [sliderPosition, setSliderPosition] = useState<number>(
    gameState ? gameStateIdToPosMap[gameState] : distance + posFromIndex(hashMarks - 1)
  );
  // slider is pressed or not (for movement)
  const [isDragging, setIsDragging] = useState<boolean>(false);
  // svg ref
  const svgRef = useRef<SVGSVGElement>(null);

  /**
   * Handles mouse down event
   * @param event Mouse event
   */
  const onMouseDown = (event: React.MouseEvent<SVGCircleElement>) => {
    event.preventDefault();

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
    moveSlider(event.clientX, event.clientY, true);
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

  /**
   * Moves the slider on the X axis (y is fixed, only horizontal movements)
   *
   * @param x Mouse x coordinate
   * @param y Mouse y coordinate
   * @param snap snap to marks or not (false by default)
   */
  const moveSlider = (x: number, y: number, snap = false) => {
    // make sure the slider is pressed
    if (!isDragging) return;
    //#region find transformed coordinates
    const point = svgRef.current?.createSVGPoint();
    if (!point) return;

    point.x = x;
    point.y = y;

    // snap increments
    const snapIncrement = (svgWidth - distance * 2) / (hashMarks - 1);

    const transformedPoint = point.matrixTransform(svgRef.current?.getScreenCTM()?.inverse());
    //#endregion

    // calc new coordinates relative to the SVG itself
    const newX = snap
      ? distance + Math.round((transformedPoint.x - distance) / snapIncrement) * snapIncrement
      : transformedPoint.x;

    setSliderPosition(newX);
    // call slider change function
    onSliderChange(newX);
  };
  //#endregion

  /**
   * Handle what happens when slider is moved to a position "pos"
   *
   * @param pos Slider position, which corresponds to one game state
   */
  const onSliderChange = (pos: number) => {
    const state = posToGameStateMap[pos];

    // select action
    if (selectedId) dispatch(selectPlayerAction({ playerId: selectedId, actionId: state.gameActionId }));

    setGameState(state.id);
  };

  console.log(posToGameStateMap)

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
          {hashMarks > 1 && (
            <>
              {Object.entries(posToGameStateMap).map(([pos, _], index: number) => {
                return (
                  <line
                    key={pos}
                    className="vt-timeline-hash-mark"
                    x1={pos}
                    y1={2}
                    x2={pos}
                    y2={index % 10 === 0 ? markHeight * 2 : markHeight}
                    strokeWidth={markWidth}
                  />
                );
              })}
              <g
                transform={`translate(${sliderPosition}, ${1})`}
                onMouseDown={onMouseDown}
                onMouseUp={onStopPressing}
                className="vt-timeline-slider"
              >
                <circle
                  className="vt-timeline-slider-head"
                  stroke="black"
                  cx={0}
                  cy={needleHeight + sliderHeadRadius}
                  r={sliderHeadRadius}
                />
                <line x1={0} y1={needleHeight} x2={0} y2={0} className="vt-timeline-slider-needle" />
              </g>
            </>
          )}
        </svg>
      </div>
    </section>
  );
};

export default TimelineComponent;
