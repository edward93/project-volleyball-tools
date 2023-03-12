import React, { useRef, useState } from "react";
import "../styles/tools.scss";
import { Circle } from "../types/volleyballTool.Types";

/**
 * SVG component that allows to have draggable circles
 * @returns React Element
 */
const SVGExample = () => {
  // svg ref
  const svgRef = useRef<SVGSVGElement>(null);

  // all the circles
  const [circles, setCircles] = useState<Circle[]>([
    { id: "circle1", cx: 50, cy: 50, r: 40, color: "red" },
    { id: "circle2", cx: 100, cy: 100, r: 40, color: "blue" },
    { id: "circle3", cx: 150, cy: 150, r: 40, color: "green" },
  ]);
  const [activeCircle, setActiveCircle] = useState<Circle | null>(null);

  const handleMouseDown = (circle: Circle) => {
    setActiveCircle(circle);
  };

  // move the circles
  const handleMouseMove = (event: React.MouseEvent<SVGElement>) => {
    if (!activeCircle) return;

    const point = svgRef.current?.createSVGPoint();
    if (!point) return;

    point.x = event.clientX;
    point.y = event.clientY;

    const transformedPoint = point.matrixTransform(svgRef.current?.getScreenCTM()?.inverse());

    // calc new coordinates relative to the SVG itself
    const newX = transformedPoint.x;
    const newY = transformedPoint.y;

    // update the circle coordinates
    const updatedCircles = circles.map((circle) => {
      if (circle.id === activeCircle.id) {
        return { ...circle, cx: newX, cy: newY };
      } else {
        return circle;
      }
    });

    setCircles(updatedCircles);
  };

  const handleMouseUp = () => {
    setActiveCircle(null);
  };

  return (
    <div className="vt-svg-container">
      <svg
        viewBox="0 0 1600 1200"
        ref={svgRef}
        className="vt-svg"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <line className="vt-svg-net" strokeWidth={5} x1={200} y1={10} x2={1400} y2={10} />
        <g className="vt-svg-court-group" transform="translate(350, 10)">
          <rect className="vt-svg-court" strokeWidth={5} width={900} height={900} />
          <line className="vt-svg-10-ft-line" strokeWidth={5} x1={0} y1={300} x2={900} y2={300} />
        </g>

        {circles.map((circle) => (
          <circle
            className="vt-svg-player"
            stroke="black"
            key={circle.id}
            cx={circle.cx}
            cy={circle.cy}
            r={circle.r}
            fill={circle.color}
            onMouseDown={() => handleMouseDown(circle)}
          />
        ))}
      </svg>
    </div>
  );
};

export default SVGExample;
