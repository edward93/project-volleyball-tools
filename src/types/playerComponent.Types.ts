/** Player Component props */
export type PlayerComponentProps = {
  /** Unique id */
  id: string;
  /** SVG circle props, X,Y and radius */
  // circle: { x: number, y: number, r: number };
  radius: number;
  /** Circle color */
  color: string;
  /** Optional circle name */
  name?: string;
  /** onPressed */
  onPressed?: (id: string) => void;
  /** onReleased */
  onReleased?: () => void;
  /** SVG ref object */
  svgRef: React.RefObject<SVGSVGElement>;
}