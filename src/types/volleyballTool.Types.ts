/** Game results */
// export type GameResult = {
//   /** Game id that his result belongs to */
//   gameId: string;
//   /** Set number */
//   set: GameSet;
//   /** Final score of the set */
//   score: GameScore;
// };


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
  homeSet: number;
  away: number;
  awaySet: number;
};

type PositionType = {
  id: string;
  name: string;
  shortName?: string;
};

//TODO: move to a new folder called static data (along with enums)
export const OutsideHitter: PositionType = {
  id: "1",
  name: "Outside Hitter",
  shortName: "OH",
};

export const OppositeHitter: PositionType = {
  id: "2",
  name: "Opposite Hitter",
  shortName: "Oppo",
};

export const MiddleBlocker: PositionType = {
  id: "3",
  name: "Middle Blocker",
  shortName: "MB",
};

export const Setter: PositionType = {
  id: "4",
  name: "Setter",
  shortName: "Set",
};

export const Libero: PositionType = {
  id: "5",
  name: "Libero",
  shortName: "Lib",
};

export const None: PositionType = {
  id: "6",
  name: "None",
  shortName: "None",
};

export const PositionsById = {
  [OutsideHitter.id]: OutsideHitter,
  [MiddleBlocker.id]: MiddleBlocker,
  [Setter.id]: Setter,
  [OppositeHitter.id]: OppositeHitter,
  [Libero.id]: Libero,
  [None.id]: None,
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

// /**
//  * Detailed description of a certain action and how well it was performed
//  */
// export type Statistic = {
//   /** Unique auto generated id */
//   id: string;
//   /** Player id */
//   playerId: string;
//   /** Id of the event */
//   eventId: string;
//   /** More detailed description */
//   desc?: string;
//   /** How well the said action was performed: 1 - worst, 10 - best score */
//   score: ActionScore;
//   /** Extra notes if applicable */
//   notes?: string;
//   /** Where the action was performed */
//   // location?: PlayerLocation;
//   /** Current game info */
//   gameInfo?: GameInfo;
// };

export type ActionScore = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

/** Game event type */
export type GameEventType = {
  /** Unique id */
  id: string;
  /** Name of the event */
  name: string;
};

export const Serve: GameEventType = {
  id: "1",
  name: "Serve",
};

export const ServeReceive: GameEventType = {
  id: "2",
  name: "ServeReceive",
};

export const Set: GameEventType = {
  id: "3",
  name: "Serve",
};

export const Spike: GameEventType = {
  id: "4",
  name: "Spike",
};

export const Block: GameEventType = {
  id: "5",
  name: "Block",
};

export const Dig: GameEventType = {
  id: "6",
  name: "Dig",
};

export const Pass: GameEventType = {
  id: "7",
  name: "Pass",
};

export type GameEvent =
  | typeof Serve
  | typeof ServeReceive
  | typeof Set
  | typeof Spike
  | typeof Block
  | typeof Dig
  | typeof Pass;


export const GameEventById = {
  [Serve.id]: Serve,
  [ServeReceive.id]: ServeReceive,
  [Set.id]: Set,
  [Spike.id]: Spike,
  [Block.id]: Block,
  [Dig.id]: Dig,
  [Pass.id]: Pass,
}

// /**
//  * Key - time
//  * Value - statistic
//  */
// export type PlayerStats = Map<number, Statistic>;
