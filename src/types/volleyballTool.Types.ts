

/** Game results */
export type GameResult = {
  /** Game id that his result belongs to */
  gameId: string;
  /** Set number */
  set: GameSet;
  /** Final score of the set */
  score: GameScore;
};

/** Volleyball game sets */
export type GameSet = 1 | 2 | 3 | 4 | 5;

/**
 * Game info, set, rally, score
 */
export type GameInfo = {
  /**
   * Unique auto generated id
   */
  id: string;
  gameId: string;
  set: number;
  rally?: number;
  currentScore: GameScore;
};

/**
 * Game score! Sides don't switch
 */
export type GameScore = {
  home: number;
  away: number;
};

type PositionType = {
  id: number;
  name: string;
  shortName?: string;
};

export const OutsideHitter: PositionType = {
  id: 1,
  name: "Outside Hitter",
  shortName: "OH",
};

export const OppositeHitter: PositionType = {
  id: 2,
  name: "Opposite Hitter",
  shortName: "Oppo",
};

export const MiddleBlocker: PositionType = {
  id: 3,
  name: "Middle Blocker",
  shortName: "Middle",
};

export const Setter: PositionType = {
  id: 4,
  name: "Setter",
  shortName: "Setter",
};

export const Libero: PositionType = {
  id: 5,
  name: "Libero",
  shortName: "Lib",
};

export const None: PositionType = {
  id: 6,
  name: "None",
  shortName: "None",
};

/**
 * Position type (major positions only)
 */
export type Position =
  | typeof OutsideHitter
  | typeof OppositeHitter
  | typeof MiddleBlocker
  | typeof Setter
  | typeof Libero
  | typeof None;

/**
 * Detailed description of a certain action and how well it was performed
 */
export type Statistic = {
  /** Unique auto generated id */
  id: string;
  /** Player id */
  playerId: string;
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
  score: ActionScore;
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
};

export type ActionScore = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export enum GameAction {
  Serve,
  ServeReceive,
  Set,
  Spike,
  Block,
  Dig,
  Pass,
}

/**
 * Players position on the SVG
 */
export type PlayerLocation = {
  x: number;
  y: number;
};

/**
 * Key - time
 * Value - statistic
 */
export type PlayerStats = Map<number, Statistic>;
