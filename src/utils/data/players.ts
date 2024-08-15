import { homeTeam, awayTeam } from "components/Players/teams.Slice";
import { Player } from "types/volleyballTool.New.Types";
import { Libero, MiddleBlocker, OppositeHitter, OutsideHitter, Setter } from "../../types/volleyballTool.New.Types";
import { v4 as uuidv4 } from "uuid";

const homeColor = "#03B5AA";
const awayColor = "#188aff";

/**
 * Some initial players for debugging/testing only
 * Players should be manually added in the beginning 
 */

// Japan
export const teamJapanPlayers: Player[] = [
  {
    id: uuidv4(),
    teamId: homeTeam.id,
    score: 0,
    name: "Kento Miyaura",
    positionId: OppositeHitter.id,
    jerseyNumber: 4,
    actionIds: [],
    isActive: true,
    currentRotationPosition: 5,

    color: homeColor,
  },
  {
    id: uuidv4(),
    teamId: homeTeam.id,
    score: 0,
    name: "Masahiro Sekita",
    positionId: Setter.id,
    jerseyNumber: 8,
    actionIds: [],
    isActive: true,
    currentRotationPosition: 2,

    color: homeColor,
  },
  {
    id: uuidv4(),
    teamId: homeTeam.id,
    score: 0,
    name: "Akihiro Yamauchi",
    positionId: MiddleBlocker.id,
    jerseyNumber: 6,
    actionIds: [],
    isActive: true,
    currentRotationPosition: 4,

    color: homeColor,
  },
  {
    id: uuidv4(),
    teamId: homeTeam.id,
    score: 0,
    name: "Kentaro Takahashi",
    positionId: MiddleBlocker.id,
    jerseyNumber: 10,
    actionIds: [],
    isActive: true,
    currentRotationPosition: 1,

    color: homeColor,
  },
  {
    id: uuidv4(),
    teamId: homeTeam.id,
    score: 0,
    name: "Ran Takahashi",
    positionId: OutsideHitter.id,
    jerseyNumber: 12,
    actionIds: [],
    isActive: true,
    currentRotationPosition: 3,

    color: homeColor,
  },
  {
    id: uuidv4(),
    teamId: homeTeam.id,
    score: 0,
    name: "Yuki Ishikawa",
    positionId: OutsideHitter.id,
    jerseyNumber: 14,
    actionIds: [],
    isActive: true,
    currentRotationPosition: 6,

    color: homeColor,
  },

  {
    id: uuidv4(),
    teamId: homeTeam.id,
    score: 0,
    name: "Tomohiro Yamamoto",
    positionId: Libero.id,
    jerseyNumber: 20,
    actionIds: [],
    isActive: false,

    color: homeColor,
  },
  {
    id: uuidv4(),
    teamId: homeTeam.id,
    score: 0,
    name: "Yuji Nishida",
    positionId: OppositeHitter.id,
    jerseyNumber: 1,
    actionIds: [],
    isActive: false,

    color: homeColor,
  },
];

// USA
export const teamUsaPlayers: Player[] = [
  {
    id: uuidv4(),
    teamId: awayTeam.id,
    score: 0,
    name: "Jake Hanse",
    positionId: OppositeHitter.id,
    jerseyNumber: 9,
    actionIds: [],
    isActive: true,
    currentRotationPosition: 5,

    color: awayColor,
  },
  {
    id: uuidv4(),
    teamId: awayTeam.id,
    score: 0,
    name: "Micah Christenson",
    positionId: Setter.id,
    jerseyNumber: 11,
    actionIds: [],
    isActive: true,
    currentRotationPosition: 2,

    color: awayColor,
  },
  {
    id: uuidv4(),
    teamId: awayTeam.id,
    score: 0,
    name: "David Smith",
    positionId: MiddleBlocker.id,
    jerseyNumber: 20,
    actionIds: [],
    isActive: true,
    currentRotationPosition: 4,

    color: awayColor,
  },
  {
    id: uuidv4(),
    teamId: awayTeam.id,
    score: 0,
    name: "Taylor Averill",
    positionId: MiddleBlocker.id,
    jerseyNumber: 19,
    actionIds: [],
    isActive: true,
    currentRotationPosition: 1,

    color: awayColor,
  },
  {
    id: uuidv4(),
    teamId: awayTeam.id,
    score: 0,
    name: "Aaron Russel",
    positionId: OutsideHitter.id,
    jerseyNumber: 2,
    actionIds: [],
    isActive: true,
    currentRotationPosition: 3,

    color: awayColor,
  },
  {
    id: uuidv4(),
    teamId: awayTeam.id,
    score: 0,
    name: "T.J. DeFalco",
    positionId: OutsideHitter.id,
    jerseyNumber: 9,
    actionIds: [],
    isActive: true,
    currentRotationPosition: 6,

    color: awayColor,
  },

  {
    id: uuidv4(),
    teamId: awayTeam.id,
    score: 0,
    name: "Erik Shoji",
    positionId: Libero.id,
    jerseyNumber: 22,
    actionIds: [],
    isActive: false,

    color: awayColor,
  },
  {
    id: uuidv4(),
    teamId: awayTeam.id,
    score: 0,
    name: "Maxwell Holt",
    positionId: MiddleBlocker.id,
    jerseyNumber: 12,
    actionIds: [],
    isActive: false,

    color: awayColor,
  },
];
