import { GameAction, GameState, Player, PlayerLocation, Point, Score, Set, Team } from "./volleyballTool.New.Types";
// import { ActionScore, GameInfo } from "./volleyballTool.Types";

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
// export type Game = {
//   /** Unique auto generated id */
//   id: string;
//   /** Workspace Id */
//   workspaceId: string;
//   /** Home team name*/
//   home: string;
//   /** Away team name */
//   away: string;
// };

/** Sets type for redux store */
export type Sets = {
  /** Sets by ids */
  byId: Record<string, Set>;
  /** Sets by game id */
  byGameId: Record<string, Set[]>;
  /** All set ids */
  allIds: string[];
};

/** Points type for redux store */
export type Points = {
  /** Points by ids */
  byId: Record<string, Point>;
  // /** Points by set id */
  // bySetId: Record<string, Point[]>;
  // /** Sets by game id */
  // byGameId: Record<string, Point[]>;

  /** Point by the state id */
  byGameStateId: Record<string, Point>;
  /** All point ids */
  allIds: string[];
};

/** Volleyball team */
// export type Team = {
//   /** Unique auto generated id */
//   id: string;
//   /** Game id */
//   gameId: string;
//   /** All 6 players, currently no subs are allowed */
//   players: Record<string, Player>;
//   /** Name of the team */
//   name: string;
//   /** Is the home team */
//   isHome: boolean;
//   /** Name of the coach */
//   coach?: string;
// };

/** Players slice type */
export type Players = {
  /** Players by id */
  byId: Record<string, Player>;
  /** Active player ids by game state id */
  activePlayerIdsByGameStateId: Record<string, string[]>;
  /** List of all ids */
  allIds: string[];
};

// /** GameStats slice type */
// export type GameStats = {
//   /** Game info by id */
//   byId: Record<string, GameInfo>;
//   /** All ids */
//   allIds: string[];
//   /** Game info by game id */
//   byGameId: Record<string, GameInfo>;
// };

/** Type that represents selected element, usually a player */
export type SelectedPlayer = {
  /** Represents internal props that are not very important */
  internal: { id: string; x: number; y: number; r: number; color: string };
  /** Those properties may be more important than internal ones but are not very critical */
  visual: { name: string; position: string; jerseyNumber?: number; avgScore: number };
  /** Array of stats. These props are the most critical ones */
  // stats: {
  //   event: string;
  //   description?: string;
  //   score: ActionScore;
  //   notes?: string;
  // }[];
};

/** List of Game actions */
export type GameActions = {
  /** Actions by id */
  byId: Record<string, GameAction>;
  /** Actions by game state id */
  byGameStateId: Record<string, GameAction>;
  /** List of all ids */
  allIds: string[];
};

/** List of game states */
export type GameStates = {
  /** States by id */
  byId: Record<string, GameState>;
  /** List of all ids */
  allIds: string[];
  /** Current, selected game state */
  currentState?: string;
};

/** List of all players' locations */
export type PlayersLocations = {
  /** Player locations by location id */
  byId: Record<string, PlayerLocation>;
  /** Player location ids by player id - only fixed number of those exist (6 - 13) */
  byPlayerId: Record<string, string>;
  /** All location ids */
  allIds: string[];
  /** Location id by game state id - [gameStateId][playerId] */
  byGameStateId: Record<string, Record<string, string>>;
};

/** List of all game scores */
export type Scores = {
  /** Scores by score id */
  byId: Record<string, Score>;
  /** Scores by game id by game state id [gameId][gameStateId] */
  byGameStateId: Record<string, Record<string, Score>>;
  /** All score ids per game */
  allIdsByGameId: Record<string, string[]>;
  /** All scores */
  allIds: string[];
};

/** List of all teams */
export type Teams = {
  /** Scores by score id */
  byId: Record<string, Team>;
  /** ALl teams */
  allIds: string[];
};
