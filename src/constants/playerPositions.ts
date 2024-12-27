import { PositionType } from "types/volleyballTool.New.Types";

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