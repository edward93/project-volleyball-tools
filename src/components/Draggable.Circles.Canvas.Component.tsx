import React, { useState, useRef, useEffect } from 'react';

type Circle = {
  id: string;
  x: number;
  y: number;
  r: number;
  color: string;
}

const CanvasExample = () => {
  const [circles, setCircles] = useState<Circle[]>([
    { id: 'circle1', x: 50, y: 50, r: 20, color: 'red' },
    { id: 'circle2', x: 100, y: 100, r: 20, color: 'blue' },
    { id: 'circle3', x: 150, y: 150, r: 20, color: 'green' }
  ]);
  const [activeCircle, setActiveCircle] = useState<Circle | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (context) {
      context.clearRect(0, 0, canvas?.width || 500, canvas?.height || 500);
      circles.forEach(circle => {
        context.beginPath();
        context.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);
        context.fillStyle = circle.color;
        context.fill();
        context.closePath();
      });
    }
  }, [circles]);

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    for (let i = circles.length - 1; i >= 0; i--) {
      const circle = circles[i];
      const dx = x - circle.x;
      const dy = y - circle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance <= circle.r) {
        setActiveCircle(circle);
        break;
      }
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!activeCircle) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const newX = event.clientX - rect.left;
    const newY = event.clientY - rect.top;

    const updatedCircles = circles.map(circle => {
      if (circle.id === activeCircle.id) {
        return { ...circle, x: newX, y: newY };
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
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ height: '300px', width: '300px', border: '1px solid black' }}
    />
  );
};

export default CanvasExample;