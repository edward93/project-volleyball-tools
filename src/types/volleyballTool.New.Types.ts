import { v4 as uuidv4 } from "uuid";

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

//#region Actions
export const Kill: GameActionType = {
  id: uuidv4(),
  category: GameActionCategory.Attack,
  name: "Kill",
  score: 3,
  desc: "Attack that resulted in a kill: opponent wasn't able to pick it up, attack or made an error",
};

export const AttackError: GameActionType = {
  id: uuidv4(),
  category: GameActionCategory.Attack,
  name: "Attack Error",
  score: 0,
  desc: "Attack that went out of bounds or into the net, blocks do not count",
};

export const AttackAttempt: GameActionType = {
  id: uuidv4(),
  category: GameActionCategory.Attack,
  name: "Attack Attempt",
  score: 1,
  desc: "Attacks that weren't kills or errors",
};

export const PerfectBlock: GameActionType = {
  id: uuidv4(),
  category: GameActionCategory.Block,
  name: "Perfect Block",
  score: 3,
  desc: "A block that was resulted in the end of the rally",
};

export const Block: GameActionType = {
  id: uuidv4(),
  category: GameActionCategory.Block,
  name: "Block",
  score: 2,
  desc: "Ball didn't cross over but was picked or recycled by the opponent",
};

export const BlockTouch: GameActionType = {
  id: uuidv4(),
  category: GameActionCategory.Block,
  name: "Touch",
  score: 1,
  desc: "Ball crossed over but was picked up by teammates",
};

export const BlockError: GameActionType = {
  id: uuidv4(),
  category: GameActionCategory.Block,
  name: "Block Error",
  score: 0,
  desc: "Touch that wasn't picked up by teammates",
};

export const PerfectPass: GameActionType = {
  id: uuidv4(),
  category: GameActionCategory.Pass,
  name: "Perfect Pass",
  score: 3,
  desc: "Setter has at least 3 options",
};

export const RegularPass: GameActionType = {
  id: uuidv4(),
  category: GameActionCategory.Pass,
  name: "Regular Pass",
  score: 2,
  desc: "Setter has 2 good and possible 1 hard/impossible (middle) options",
};

export const BadPass: GameActionType = {
  id: uuidv4(),
  category: GameActionCategory.Pass,
  name: "Bad Pass",
  score: 1,
  desc: "Very bad pass where setter had only one option or no option at all",
};

export const PassError: GameActionType = {
  id: uuidv4(),
  category: GameActionCategory.Pass,
  name: "Passing Error",
  score: 0,
  desc: "Resulted in opponents point",
};

export const ServiceAce: GameActionType = {
  id: uuidv4(),
  category: GameActionCategory.Serve,
  name: "Service Ace",
  score: 3,
  desc: "Service Ace",
};

export const ServiceError: GameActionType = {
  id: uuidv4(),
  category: GameActionCategory.Serve,
  name: "Service Error",
  score: 0,
  desc: "Serve went out of bounds, into the net or other fault was committed during the serve",
};

export const ServeAttempt: GameActionType = {
  id: uuidv4(),
  category: GameActionCategory.Serve,
  name: "Serve Attempt",
  score: 1,
  desc: "A serve that is neither an error nor an ace",
};

export const PerfectSet: GameActionType = {
  id: uuidv4(),
  category: GameActionCategory.Set,
  name: "Perfect Set",
  score: 3,
  desc: "Set that is perfect distance off the net and in the perfect position for the hitter",
};

export const SetError: GameActionType = {
  id: uuidv4(),
  category: GameActionCategory.Set,
  name: "Setting Error",
  score: 0,
  desc: "A faulty set (double) that resulted in opponent winning the point",
};

export const Set: GameActionType = {
  id: uuidv4(),
  category: GameActionCategory.Set,
  name: "Set",
  score: 1,
  desc: "A set that is either perfect one or an error",
};

export const PerfectDig: GameActionType = {
  id: uuidv4(),
  category: GameActionCategory.Dig,
  name: "Perfect Dig",
  score: 3,
  desc: "Ball went up in the general setting area. Doesn't need to be very precise",
};

export const DigTouch: GameActionType = {
  id: uuidv4(),
  category: GameActionCategory.Dig,
  name: "Touch",
  score: 1,
  desc: "Ball was contacted but either wasn't enough or was a bad dig",
};

export const DigMiss: GameActionType = {
  id: uuidv4(),
  category: GameActionCategory.Dig,
  name: "Missed",
  score: 0,
  desc: "Ball hit the ground without a contact",
};

/** Helper obj */
export const GameActionTypesById = {
  [Kill.id]: Kill,
  [AttackError.id]: AttackError,
  [AttackAttempt.id]: AttackAttempt,

  [PerfectBlock.id]: PerfectBlock,
  [Block.id]: Block,
  [BlockTouch.id]: BlockTouch,
  [BlockError.id]: BlockError,

  [PerfectPass.id]: PerfectPass,
  [RegularPass.id]: RegularPass,
  [BadPass.id]: BadPass,
  [PassError.id]: PassError,

  [ServiceAce.id]: ServiceAce,
  [ServiceError.id]: ServiceError,
  [ServeAttempt.id]: ServeAttempt,

  [PerfectSet.id]: PerfectSet,
  [Set.id]: Set,
  [SetError.id]: SetError,

  [PerfectDig.id]: PerfectDig,
  [DigTouch.id]: DigTouch,
  [DigMiss.id]: DigMiss,
};
//#endregion

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

// TODO: static data should be moved to static/data folder
/** All court positions */
export const CourtPositions: CourtPosition[] = [1, 2, 3, 4, 5, 6];

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

//#region Court rotation position const values
// half court constants
const HALF_COURT_LEFT_X = 900;
const HALF_COURT_MIDDLE_X = 1200;
const HALF_COURT_RIGHT_X = 1500;
const HALF_COURT_FRONT_ROW_Y = 250;
const HALF_COURT_BACK_ROW_Y = 700;

// TODO: positions for half court (vertical)
export const FrontLeft: CourtPositionCoordinates = {
  id: 4,
  halfCourt: HalfCourt.Left,
  x: HALF_COURT_LEFT_X,
  y: HALF_COURT_FRONT_ROW_Y,
};

export const FrontMiddle: CourtPositionCoordinates = {
  id: 3,
  halfCourt: HalfCourt.Left,
  x: HALF_COURT_MIDDLE_X,
  y: HALF_COURT_FRONT_ROW_Y,
};

export const FrontRight: CourtPositionCoordinates = {
  id: 2,
  halfCourt: HalfCourt.Left,
  x: HALF_COURT_RIGHT_X,
  y: HALF_COURT_FRONT_ROW_Y,
};

export const BackLeft: CourtPositionCoordinates = {
  id: 5,
  halfCourt: HalfCourt.Left,
  x: HALF_COURT_LEFT_X,
  y: HALF_COURT_BACK_ROW_Y,
};

export const BackMiddle: CourtPositionCoordinates = {
  id: 6,
  halfCourt: HalfCourt.Left,
  x: HALF_COURT_MIDDLE_X,
  y: HALF_COURT_BACK_ROW_Y,
};

export const BackRight: CourtPositionCoordinates = {
  id: 1,
  halfCourt: HalfCourt.Left,
  x: HALF_COURT_RIGHT_X,
  y: HALF_COURT_BACK_ROW_Y,
};

/** Default location of positions for half court vertical view */
export const DefaultRotationPositionsVertical = {
  1: BackRight,
  2: FrontRight,
  3: FrontMiddle,
  4: FrontLeft,
  5: BackLeft,
  6: BackMiddle,
};

//some constants
const BACK_ROW_X_HZ = 600;
const FRONT_ROW_X_HZ = 950;
export const LeftCourtPos1: CourtPositionCoordinates = {
  id: 1,
  halfCourt: HalfCourt.Left,
  x: BACK_ROW_X_HZ,
  y: 940,
};
export const RightCourtPos1: CourtPositionCoordinates = {
  id: 1,
  halfCourt: HalfCourt.Right,
  x: 1800,
  y: 250,
};

export const LeftCourtPos2: CourtPositionCoordinates = {
  id: 2,
  halfCourt: HalfCourt.Left,
  x: FRONT_ROW_X_HZ,
  y: 940,
};
export const RightCourtPos2: CourtPositionCoordinates = {
  id: 2,
  halfCourt: HalfCourt.Right,
  x: 1345,
  y: 250,
};

export const LeftCourtPos3: CourtPositionCoordinates = {
  id: 3,
  halfCourt: HalfCourt.Left,
  x: FRONT_ROW_X_HZ,
  y: 600,
};
export const RightCourtPos3: CourtPositionCoordinates = {
  id: 3,
  halfCourt: HalfCourt.Right,
  x: 1345,
  y: 600,
};

export const LeftCourtPos4: CourtPositionCoordinates = {
  id: 4,
  halfCourt: HalfCourt.Left,
  x: FRONT_ROW_X_HZ,
  y: 250,
};
export const RightCourtPos4: CourtPositionCoordinates = {
  id: 4,
  halfCourt: HalfCourt.Right,
  x: 1345,
  y: 940,
};

export const LeftCourtPos5: CourtPositionCoordinates = {
  id: 5,
  halfCourt: HalfCourt.Left,
  x: BACK_ROW_X_HZ,
  y: 250,
};
export const RightCourtPos5: CourtPositionCoordinates = {
  id: 5,
  halfCourt: HalfCourt.Right,
  x: 1800,
  y: 940,
};

export const LeftCourtPos6: CourtPositionCoordinates = {
  id: 6,
  halfCourt: HalfCourt.Left,
  x: BACK_ROW_X_HZ,
  y: 600,
};
export const RightCourtPos6: CourtPositionCoordinates = {
  id: 6,
  halfCourt: HalfCourt.Right,
  x: 1800,
  y: 600,
};

/** Map of all rotational positions */
type RotationPositionType = Record<CourtPosition, Record<HalfCourt, CourtPositionCoordinates>>;

/** Rotation positional coordinates */
export const RotationPositions: RotationPositionType = {
  1: {
    [HalfCourt.Left]: LeftCourtPos1,
    [HalfCourt.Right]: RightCourtPos1,
  },
  2: {
    [HalfCourt.Left]: LeftCourtPos2,
    [HalfCourt.Right]: RightCourtPos2,
  },
  3: {
    [HalfCourt.Left]: LeftCourtPos3,
    [HalfCourt.Right]: RightCourtPos3,
  },
  4: {
    [HalfCourt.Left]: LeftCourtPos4,
    [HalfCourt.Right]: RightCourtPos4,
  },
  5: {
    [HalfCourt.Left]: LeftCourtPos5,
    [HalfCourt.Right]: RightCourtPos5,
  },
  6: {
    [HalfCourt.Left]: LeftCourtPos6,
    [HalfCourt.Right]: RightCourtPos6,
  },
};
//#endregion

//#region Positions
export type PositionType = {
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

//#endregion
