import { useRef, useState } from "react";
import { Circle } from "../../types/reduxStore.Types";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { updatePosition } from "./circles.Slice";

/**
 * SVG visualizer
 * @param props Component props
 * @returns React component
 */
const SvgVisualizerComponent = (props: { texts: Record<string, string> }) => {
  const dispatch = useAppDispatch();
  const circles = useAppSelector((selector) => selector.circlesReducer.byId);

  const { texts } = props;

  const [activeCircle, setActiveCircle] = useState<Circle | null>(null);

  // svg ref
  const svgRef = useRef<SVGSVGElement>(null);

  /**
   * Sets current circle as active when mouse is pressed
   * @param circle SVG circle
   */
  const handleMouseDown = (circle: Circle) => {
    setActiveCircle(circle);
  };

  /**
   * Deselects current circle when mouse is released
   */
  const handleMouseUp = () => {
    setActiveCircle(null);
  };

  const onTouchMove = (event: React.TouchEvent<SVGSVGElement>) => {
    // event.preventDefault();

    moveCircle(event.touches[0].clientX, event.touches[0].clientY);
  };

  const onMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    moveCircle(event.clientX, event.clientY);
  };

  /**
   * Moves circles when dragged
   * @param event Mouse move event
   */
  const moveCircle = (x: number, y: number) => {
    if (!activeCircle) return;

    const point = svgRef.current?.createSVGPoint();
    if (!point) return;

    point.x = x;
    point.y = y;

    const transformedPoint = point.matrixTransform(svgRef.current?.getScreenCTM()?.inverse());

    // calc new coordinates relative to the SVG itself
    const newX = transformedPoint.x;
    const newY = transformedPoint.y;

    dispatch(updatePosition({ id: activeCircle.id, newX, newY }));
  };

  return (
    <div className="vt-svg-container">
      <svg
        viewBox="0 0 1600 1200"
        ref={svgRef}
        className="vt-svg"
        onMouseMove={onMouseMove}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleMouseUp}
        onTouchMove={onTouchMove}
        preserveAspectRatio="xMidYMin meet"
      >
        <line className="vt-svg-net" strokeWidth={5} x1={200} y1={10} x2={1400} y2={10} />
        <g className="vt-svg-court-group" transform="translate(350, 10)">
          <rect className="vt-svg-court" strokeWidth={5} width={900} height={900} />
          <line className="vt-svg-10-ft-line" strokeWidth={5} x1={0} y1={300} x2={900} y2={300} />
        </g>

        {Object.values(circles).map((circle) => (
          <g
            key={circle.id}
            onMouseDown={() => handleMouseDown(circle)}
            onTouchStart={(event) => handleMouseDown(circle)}
            className="vt-svg-player"
          >
            <circle stroke="black" key={circle.id} cx={circle.cx} cy={circle.cy} r={circle.r} fill={circle.color} />
            <text x={circle.cx} y={circle.cy + 1.4 * circle.r} textAnchor="middle" alignmentBaseline="middle">
              {texts[circle.id]}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default SvgVisualizerComponent;
