import { GameActionCategory, GameActionType } from "types/volleyballTool.New.Types";
import { v4 as uuidv4 } from "uuid";

//#region Actions
export const Kill: GameActionType = {
  id: uuidv4(),
  category: GameActionCategory.Attack,
  gameScoreChange: 1,
  name: "Kill",
  score: 3,
  desc: "Attack that resulted in a kill: opponent wasn't able to pick it up, attack or made an error",
};

export const AttackError: GameActionType = {
  id: uuidv4(),
  category: GameActionCategory.Attack,
  gameScoreChange: -1,
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
  gameScoreChange: 1,
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
  gameScoreChange: -1,
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
  gameScoreChange: -1,
  name: "Passing Error",
  score: 0,
  desc: "Resulted in opponents point",
};

export const ServiceAce: GameActionType = {
  id: uuidv4(),
  category: GameActionCategory.Serve,
  gameScoreChange: 1,
  name: "Service Ace",
  score: 3,
  desc: "Service Ace",
};

export const ServiceError: GameActionType = {
  id: uuidv4(),
  category: GameActionCategory.Serve,
  gameScoreChange: -1,
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
  gameScoreChange: -1,
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

export const DigError: GameActionType = {
  id: uuidv4(),
  category: GameActionCategory.Dig,
  gameScoreChange: -1,
  name: "Missed",
  score: 0,
  desc: "Ball hit the ground without a contact or was contacted but was unrecoverable",
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
  [DigError.id]: DigError,
};
//#endregion