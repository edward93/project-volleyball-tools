/**
 * Transforms client X,Y coordinates to SVG coordinates
 *
 * @param svg - SVG element relative what you need new coordinates for
 * @param clientX - Mouse/touch coordinate X
 * @param clientY - Mouse/touch coordinate Y
 * @returns [newX, newY] or client coordinates if svg element is invalid
 */
export const getTransformedCoordinates = (
  svg: SVGSVGElement | null,
  clientX: number,
  clientY: number,
): [number, number] => {
  if (!svg) return [clientX, clientY];

  const point = svg.createSVGPoint();
  if (!point) return [clientX, clientY];

  point.x = clientX;
  point.y = clientY;

  const transformedPoint = point.matrixTransform(svg.getScreenCTM()?.inverse());

  // calc new coordinates relative to the SVG itself
  const newX = transformedPoint.x;
  const newY = transformedPoint.y;

  return [newX, newY];
};
