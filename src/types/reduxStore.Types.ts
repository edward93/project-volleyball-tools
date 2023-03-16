import { GameResult, GameSet, Position, Statistic } from "./volleyballTool.Types";

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
  away?: string;
  /** Results per set, score, violations, etc */
  results: Record<GameSet, GameResult>;
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
export interface Player {
  /** Unique auto generated id */
  id: string;
  /** Circle id that represents this player on the rendered SVG */
  circleId: string;
  /** Player's name */
  name: string;
  /** Jersey number */
  jerseyNumber?: number;
  /** Player's position */
  position: Position;
  /** Player's stats */
  stats: Statistic[];
  /** Player's average ranking based on stats */
  averageScore: number;
}

export type Players = {
  /** Players by id */
  byId: Record<string, Player>;
  /** List of all ids */
  allIds: string[];
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
