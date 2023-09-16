import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameAction, GameActionTypesById, Player } from "types/volleyballTool.New.Types";
import { v4 as uuidv4 } from "uuid";
import { Players } from "../../types/reduxStore.Types";
import { MiddleBlocker, OppositeHitter, OutsideHitter, Setter } from "../../types/volleyballTool.Types";

export const initialPlayers: Player[] = [
  {
    id: uuidv4(),
    score: 0,
    name: "Shoyo Hinata",
    positionId: MiddleBlocker.id,
    jerseyNumber: 10,
    actionIds: [],
    cx: 1055,
    cy: 350,
    r: 40,
    color: "#03B5AA",
  },
  {
    id: uuidv4(),
    score: 0,
    name: "Asahi Azumane",
    positionId: OutsideHitter.id,
    jerseyNumber: 3,
    actionIds: [],
    cx: 1055,
    cy: 700,
    r: 40,
    color: "#03B5AA",
  },
  {
    id: uuidv4(),
    score: 0,
    name: "Tobio Kageyama",
    positionId: Setter.id,
    jerseyNumber: 9,
    actionIds: [],
    cx: 1055,
    cy: 1040,
    r: 40,
    color: "#03B5AA",
  },
  {
    id: uuidv4(),
    score: 0,
    name: "Daichi Sawamura",
    positionId: OppositeHitter.id,
    jerseyNumber: 1,
    actionIds: [],
    cx: 600,
    cy: 350,
    r: 40,
    color: "#03B5AA",
  },
  {
    id: uuidv4(),
    score: 0,
    name: "Ryunosuke Tanaka",
    positionId: OutsideHitter.id,
    jerseyNumber: 5,
    actionIds: [],
    cx: 600,
    cy: 700,
    r: 40,
    color: "#03B5AA",
  },
  {
    id: uuidv4(),
    score: 0,
    name: "Kei Tsukishima",
    positionId: MiddleBlocker.id,
    jerseyNumber: 11,
    actionIds: [],
    cx: 600,
    cy: 1040,
    r: 40,
    color: "#03B5AA",
  },
];

const initialState: Players = {
  byId: initialPlayers.reduce((prev, curr) => ({ ...prev, [curr.id]: curr }), {}),
  allIds: initialPlayers.map((c) => c.id),
};

export const playersSlice = createSlice({
  initialState,
  name: "players",
  reducers: {
    addPlayer: (state: Players, action: PayloadAction<Player>) => {
      state.byId[action.payload.id] = action.payload;
      state.allIds.push(action.payload.id);
    },
    updatePlayerInfo: (state: Players, action: PayloadAction<Player>) => {
      const { score: averageScore, name, positionId, jerseyNumber } = action.payload;
      state.byId[action.payload.id] = {
        ...state.byId[action.payload.id],
        score: averageScore,
        name,
        positionId,
        jerseyNumber,
      };
    },
    selectPlayerAction: (state: Players, action: PayloadAction<{ playerId: string; actionId: string }>) => {
      const { playerId, actionId } = action.payload;
      // updated selected action id
      state.byId[playerId].selectedActionId = actionId;
    },
    updatePlayerName: (state: Players, action: PayloadAction<{ id: string; newName: string }>) => {
      state.byId[action.payload.id].name = action.payload.newName;
    },
    removePlayer: (state: Players, action: PayloadAction<string>) => {
      delete state.byId[action.payload];
      state.allIds.splice(state.allIds.indexOf(action.payload));
    },
    addGameAction: (state: Players, action: PayloadAction<{ playerId: string; gameAction: GameAction }>) => {
      const { playerId, gameAction } = action.payload;

      // add to the start of the array so actionIds[0] always points to the latest
      state.byId[playerId].actionIds.unshift(gameAction.id);

      // set newly created action as selected
      playersSlice.caseReducers.selectPlayerAction(state, {
        payload: { playerId, actionId: gameAction.id },
        type: action.type,
      });
      // state.byId[playerId].selectedActionId = gameAction.id;

      const gameActionType = GameActionTypesById?.[gameAction?.type];

      // update player's score
      state.byId[playerId].score += gameActionType.score;
    },
  },
});

export const { updatePlayerInfo, updatePlayerName, addGameAction, selectPlayerAction } = playersSlice.actions;

export default playersSlice.reducer;
