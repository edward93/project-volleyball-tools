import { useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "reduxTools/hooks";
import { selectCurrentGameState } from "./gameState.Slice";
import { select } from "components/Inspector/inspector.Slice";

import "styles/timeline.scss";
import { GameState } from "types/volleyballTool.New.Types";

/**
 * Timeline component
 * @returns Timeline component
 */
const TimelineComponent = () => {
  const dispatch = useAppDispatch();

  // current game state
  const [gameState, setGameState] = useState<string>();

  // get all states
  const gameStates = useAppSelector((selector) => selector.gameState);
  // all game actions
  const gameActions = useAppSelector((selector) => selector.gameAction);

  const hashMarks = gameStates.allIds.length;
  // for testing
  // const hashMarks = 5;
  const svgWidth = 1000;
  const maxIntervalLength = 100;
  const availableWidth = Math.min(svgWidth - 100, (hashMarks - 1) * maxIntervalLength);
  // available space boundaries
  const availableWidthMax = svgWidth / 2 + availableWidth / 2;
  const availableWidthMin = svgWidth / 2 - availableWidth / 2;
  // calc max available width
  const margin = svgWidth / 2 - availableWidth / 2;

  //#region slider position and state mapping helpers
  /**
   * Calculates positions of the lines on the SVG and returns 2 maps (position to state id & state id to position)
   * @returns Array containing 2 items, first one is position to game state map second one game state id to position
   */
  const markPositions = (): [{ [x: string]: GameState }, { [x: string]: number }] => {
    const positionToGameState: { [x: string]: GameState } = {};
    const gameStateToPosition: { [x: string]: number } = {};

    for (let i = 0; i < hashMarks; i++) {
      const position = hashMarks === 1 ? margin : margin + i * (availableWidth / (hashMarks - 1));
      const gameState = gameStates.byId[gameStates.allIds[i]];

      positionToGameState[position.toFixed(8)] = gameState;
      gameStateToPosition[gameState.id] = position;
    }

    return [positionToGameState, gameStateToPosition];
  };

  const [posToGameStateMap, gameStateIdToPosMap] = markPositions();
  //#endregion

  //#region slider props and functions
  const markWidth = 1;
  const markHeight = 10;
  // svg dimensions
  const svgHeight = 40;

  const sliderHeadRadius = 5;
  const needleHeight = markHeight * 2 + 5;

  // slider x coordinate
  const [sliderPosition, setSliderPosition] = useState<number>(0);

  // update slider position
  useEffect(() => {
    if (gameState) setSliderPosition(gameStateIdToPosMap[gameState]);
    else setSliderPosition(+Object.keys(posToGameStateMap)[Object.keys(posToGameStateMap).length - 1]);
  }, [posToGameStateMap]);

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

    // snap increments (edge case div by 0)
    const snapIncrement = hashMarks === 1 ? 0 : availableWidth / (hashMarks - 1);

    // availableWidthBoundaries

    const transformedPoint = point.matrixTransform(svgRef.current?.getScreenCTM()?.inverse());
    //#endregion

    // calc new coordinates relative to the SVG itself (don't let it go out of bounds of the available space)
    const newX = Math.max(
      availableWidthMin,
      Math.min(
        availableWidthMax,
        snap ? margin + Math.round((transformedPoint.x - margin) / snapIncrement) * snapIncrement : transformedPoint.x
      )
    );

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
    const state = posToGameStateMap[pos.toFixed(8)];
    // ignore if state didn't change
    if (state.id === gameState) return;

    // select current game state
    dispatch(selectCurrentGameState({ id: state.id }));

    const selectedAction = gameActions.byId[state?.dependencies?.gameActionId ?? ""];
    // select current player
    if (selectedAction) dispatch(select(selectedAction.playerId));

    // update local selected state
    setGameState(state.id);
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
          {hashMarks > 1 && (
            <>
              {Object.entries(posToGameStateMap).map(([pos], index: number) => {
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
              {sliderPosition && (
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
              )}
            </>
          )}
        </svg>
      </div>
    </section>
  );
};

export default TimelineComponent;
