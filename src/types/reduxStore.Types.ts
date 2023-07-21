import { GameAction, GameState } from "./volleyballTool.New.Types";
import {
  ActionScore,
  GameEvent,
  GameInfo,
  GameResult,
  GameSet,
  PlayerLocation,
  Statistic,
} from "./volleyballTool.Types";

/**
 * This is the workspace type! Root level type that contains everything regarding the workspace
 */
export type Workspace = {
  /** Unique auto generated id */
  id: string;
  /** Workspace name */
  name: string;
  /** List of games, each game can have up to 5 sets */
  // games: Map<string, Game>;
  //TODO: enable the ability to create multiple sessions
  // session: {}
};

/**
 * Volleyball game
 */
export type Game = {
  /** Unique auto generated id */
  id: string;
  /** Workspace Id */
  workspaceId: string;
  /** Home team name*/
  home: string;
  /** Away team name */
  away: string;
  /** Results per set, score, violations, etc */
  results?: Record<GameSet, GameResult>;
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

/** Sets type for redux store */
export type Sets = {
  /** Sets by ids */
  byId: Record<string, Set>;
  /** Sets by game id */
  byGameId: Record<string, Set[]>;
  /** All set ids */
  allIds: string[];
};

/** Volleyball point type */
export type Point = {
  /** Unique auto generated id */
  id: string;
  /** Game id */
  setId: string;
  //TODO: use team reference instead
  /** Whether or not this point was scored by the home team */
  scoredByHomeTeam: boolean;
  /** Current point that was scored */
  point: number;
};

/** Points type for redux store */
export type Points = {
  /** Points by ids */
  byId: Record<string, Point>;
  /** Points by set id */
  bySetId: Record<string, Point[]>;
  /** Sets by game id */
  byGameId: Record<string, Point[]>;
  /** All point ids */
  allIds: string[];
};

/** Volleyball team */
export type Team = {
  /** Unique auto generated id */
  id: string;
  /** Game id */
  gameId: string;
  /** All 6 players, currently no subs are allowed */
  players: Record<string, Player>;
  /** Name of the team */
  name: string;
  /** Is the home team */
  isHome: boolean;
  /** Name of the coach */
  coach?: string;
};

/** Player type */
export type Player = {
  /** Unique auto generated id */
  id: string;
  /** Circle id that represents this player on the rendered SVG */
  circleId: string;
  /** Player's name */
  name: string;
  /** Jersey number */
  jerseyNumber?: number;
  /** Player's position id */
  positionId: string;
  /** Player's stats */
  stats: Statistic[];
  /** Player's average ranking based on stats */
  averageScore: number;
};

export type Players = {
  /** Players by id */
  byId: Record<string, Player>;
  /** List of all ids */
  allIds: string[];
};

/** GameStats slice type */
export type GameStats = {
  /** Game info by id */
  byId: Record<string, GameInfo>;
  /** All ids */
  allIds: string[];
  /** Game info by game id */
  byGameId: Record<string, GameInfo>;
};

/** SVG circle */
export type Circle = {
  /** Player Id that this circle is attached to */
  playerId: string;
  /** Unique auto generated id */
  id: string;
  /** Center x coordinate */
  cx: number;
  /** Center y coordinate */
  cy: number;
  /** Radius */
  r: number;
  /** Color of the circle */
  color: string;
};

/** SVG circles store type */
export type Circles = {
  /** Circles by id */
  byId: Record<string, Circle>;
  /** List of all ids */
  allIds: string[];
};

/** Type that represents selected element, usually a player */
export type SelectedPlayer = {
  /** Represents internal props that are not very important */
  internal: { id: string; x: number; y: number; r: number; color: string };
  /** Those properties may be more important than internal ones but are not very critical */
  visual: { name: string; position: string; jerseyNumber?: number; avgScore: number };
  /** Array of stats. These props are the most critical ones */
  stats: {
    event: string;
    description?: string;
    score: ActionScore;
    notes?: string;
    locationOnCourt: PlayerLocation;
  }[];
};

/** Type that represents stat */
export type Stat = {
  /** Unique auto generated id */
  id: string;
  /** Player id */
  playerId: string;
  /** Id of the event */
  eventId: string;
  /** More detailed description */
  desc?: string;
  /** How well the said action was performed: 1 - worst, 10 - best score */
  score: ActionScore;
  /** Extra notes if applicable */
  notes?: string;
};

/** List of stats */
export type Stats = {
  /** Players by id */
  byId: Record<string, Stat>;
  /** List of all ids */
  allIds: string[];
};

/** List of Game actions */
export type GameActions = {
  /** Actions by id */
  byId: Record<string, GameAction>;
  /** List of all ids */
  allIds: string[];
};

/** List of game states */
export type GameStates = {
  /** States by id */
  byId: Record<string, GameState>;
  /** List of all ids */
  allIds: string[];
};
