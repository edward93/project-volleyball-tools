/**
 * Abstract Circle type what will be the bases of 
 */
export type Circle = {
  /**
   * unique id
   */
  id: string;
  /**
   * Center X coordinate
   */
  cx: number,
  /**
   * Center Y coordinate
   */
  cy: number,
  /**
   * Radius
   */
  r: number,
  /**
   * Color
   */
  color: string
}