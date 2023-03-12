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

type PositionType = {
  id: number;
  name: string;
  shortName?: string;
}

export const OutsideHitter: PositionType = {
  id: 1,
  name: "Outside Hitter",
  shortName: "OH"
}

export const OppositeHitter: PositionType = {
  id: 2,
  name: "Opposite Hitter",
  shortName: "Oppo"
}

export const MiddleBlocker: PositionType = {
  id: 3,
  name: "Middle Blocker",
  shortName: "Middle"
}

export const Setter: PositionType = {
  id: 4,
  name: "Setter",
  shortName: "Setter"
}

export const Libero: PositionType = {
  id: 5,
  name: "Libero",
  shortName: "Lib"
}

/**
 * Position type (major positions only)
 */
export type Position =
  | typeof OutsideHitter
  | typeof OppositeHitter
  | typeof MiddleBlocker
  | typeof Setter
  | typeof Libero
  ;

/**
 * Player type
 */
export interface Player extends Circle {
  name: string;
  jerseyNumber?: number;
  position: Position;
  stats: PlayerStats;
  averageScore: number;
}

/**
 * Detailed description of a certain action and how well it was performed
 */
export type Statistic = {
  /**
   * What happened
   */
  event: GameAction;
  /**
   * More detailed description
   */
  desc?: string;
  /**
   * How well the said action was performed: 1 - worst, 10 - best score
   */
  score: Score;
  /**
   * Extra notes if applicable
   */
  notes?: string;
  /**
   * Where the action was performed
   */
  location?: PlayerLocation;
  /**
   * Current game info
   */
  gameInfo?: GameInfo;
}

export type Score = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export enum GameAction {
  Serve,
  ServeReceive,
  Set,
  Spike,
  Block,
  Dig,
  Pass
}

/**
 * Players position on the SVG
 */
export type PlayerLocation = {
  x: number;
  y: number;
}

/**
 * Game info, set, rally, score
 */
export type GameInfo = {
  id: number;
  set: number;
  rally?: number;
  currentScore: GameScore;
}

/**
 * Game score! Sides don't switch
 */
export type GameScore = {
  home: number;
  away: number;
}

/**
 * Key - time
 * Value - statistic
 */
export type PlayerStats = Map<number, Statistic>;