import { Libero, MiddleBlocker, None, OppositeHitter, OutsideHitter, Setter } from "constants/playerPositions";

/** Categories of unique game actions */
export enum GameActionCategory {
  Attack = "Attack",
  Block = "Block",
  Pass = "Pass",
  Serve = "Serve",
  Set = "Set",
  Dig = "Dig",
}

/** Game action type */
export type GameActionType = {
  /** Unique auto generated id */
  id: string;
  /** Category of the action */
  category: GameActionCategory;
  /** Name of the action */
  name: string;
  /** Score that describes this action, necessary for math calcs */
  score: number;
  /** Optional desc */
  desc?: string;
};

/** Player type */
export type Player = {
  /** Unique auto generated id */
  id: string;
  /** player's team id */
  teamId: string;
  /** Player's name */
  name: string;
  /** Jersey number */
  jerseyNumber: number;
  /** Player's position id */
  positionId: string;
  /** List of actions (action ids) */
  // actionIds: string[];
  /** Player's total score */
  score: number;
  /** Is this player playing or is benched */
  isActive: boolean;
  /** Current (by default latest) player's action id */
  // selectedActionId?: string;
  /** Current rotational position number */
  currentRotationPosition?: CourtPosition;
  /** Color of the circle */
  color: string;
};

/** Players' location on the court */
export type PlayerLocations = {
  /** Player */
  [playerId: string]: {
    /** X coordinate */
    x: number;
    /** Y coordinate */
    y: number;
  };
};

/** Player's location on the court */
export type PlayerLocation = {
  /** Unique auto generated id */
  id: string;
  /** Player */
  playerId: string;
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
};

/** Represents an event on a timeline */
export type GameState = {
  /** Unique auto generated id */
  id: string;
  /** Game id */
  gameId: string;
  /** Time (optional) */
  time?: string;
  /** all the necessary components that are associated with this state and can be recovered */
  dependencies: {
    /** all player ids snapshot by this state */
    activePlayerIds: string[];
    /** all locations of current players snapshot by this state [playerId][playerLocationId]*/
    playerLocationIds: Record<string, string>;
    /** game action associated with this state (only one action per state) */
    gameActionId?: string;
  };
};

/** Represents a game action, perfect set, perfect dig, etc. */
export type GameAction = {
  /** Unique auto generated id */
  id: string;
  /** Player performing the action */
  playerId: string;
  /** Timeline event id */
  // gameStateId: string;
  /** GameActionType id */
  type: string;
  /** Manual notes */
  notes?: string;
};

/** Volleyball game set */
export type Set = {
  /** Unique auto generated id */
  id: string;
  /** Game id */
  gameId: string;
  /** Set number */
  set: GameSet;
  /** Final or current score of this particular set for home team */
  homeScore: number;
  /** Final or current score of this particular set for away team */
  awayScore: number;
};

/** Volleyball game sets */
export type GameSet = 1 | 2 | 3 | 4 | 5;

/** Volleyball point type */
export type Point = {
  /** Unique auto generated id */
  id: string;
  /** Game id */
  gameId: string;
  /** set id */
  setId: string;
  //TODO: use team reference instead
  /** Whether or not this point was scored by the home team */
  scoredByHomeTeam: boolean;
  /** Current point that was scored */
  point: number;
};

/** Represents game's score at any given point in time */
export type Score = {
  /** Unique auto generated id */
  id: string;
  /** Game id */
  gameId: string;
  /** Current set id */
  // setId: string;
  /** Current set */
  set: GameSet | number;
  /** Current home ( >= 0) */
  homePoints: number;
  /** Current home sets won (0 - 5) */
  homeSetsWon: number;
  /** Current away points ( >= 0) */
  awayPoints: number;
  /** Current away sets won (0 - 5) */
  awaySetsWon: number;
};

/** Volleyball game type */
export type Game = {
  /** Unique auto generated id */
  id: string;
  /** Workspace Id */
  workspaceId: string;
  /** Home team id */
  homeTeamId?: string;
  /** Away team id */
  awayTeamId?: string;
  /** Has this game ended or not */
  hasEnded: boolean;
  /** Whether or not to use half court view */
  useHalfCourt: boolean;
};

/** Team type */
export type Team = {
  /** Unique auto generated id */
  id: string;
  /** name of the */
  name: string;
  /** is home team */
  isHome: boolean;

  // This is for internal use only
  /** Which side of the court this team is on */
  courtSide: HalfCourt;
};

/** Game subs */
export type Substitutions = {
  /** Unique auto generated id */
  id: string;
  /** game id */
  gameId: string;
  /** team id */
  teamId: string;
  /** player being subbed out */
  playerOutId: string;
  /** player being subbed in */
  playerInId: string;
  /** when the sub happened */
  SubstitutionTime?: Date;
};

/** Enum for half court. This assume the court orientation is always horizontal */
export enum HalfCourt {
  Left = 1,
  Right = 2,
}

/** Rotation position numbers type */
export type CourtPosition = 1 | 2 | 3 | 4 | 5 | 6;

/** Court position type */
export type CourtPositionCoordinates = {
  /** Rotation number */
  id: CourtPosition;
  /** Side */
  halfCourt: HalfCourt;
  /** X coordinate */
  x: number;
  /** Y Coordinate */
  y: number;
};

/** Map of all rotational positions */
export type RotationPositionType = Record<CourtPosition, Record<HalfCourt, CourtPositionCoordinates>>;

//#region Positions
export type PositionType = {
  id: string;
  name: string;
  shortName?: string;
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

//#endregion
