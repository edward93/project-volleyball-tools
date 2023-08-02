import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Players } from "../../types/reduxStore.Types";
import { GameAction, GameActionTypesById, Player } from "types/volleyballTool.New.Types";
import { MiddleBlocker, OppositeHitter, OutsideHitter, Setter } from "../../types/volleyballTool.Types";

import { circles } from "../Visualizer/circles.Slice";

const initialPlayers: Player[] = [
  {
    id: circles[0].id,
    score: 0,
    circleId: circles[0].id,
    name: "Shoyo Hinata",
    positionId: MiddleBlocker.id,
    actionIds: [],
  },
  {
    id: circles[1].id,
    score: 0,
    circleId: circles[1].id,
    name: "Asahi Azumane",
    positionId: OutsideHitter.id,
    actionIds: [],
  },
  {
    id: circles[2].id,
    score: 0,
    circleId: circles[2].id,
    name: "Tobio Kageyama",
    positionId: Setter.id,
    actionIds: [],
  },
  {
    id: circles[3].id,
    score: 0,
    circleId: circles[3].id,
    name: "Daichi Sawamura",
    positionId: OppositeHitter.id,
    actionIds: [],
  },
  {
    id: circles[4].id,
    score: 0,
    circleId: circles[4].id,
    name: "Ryunosuke Tanaka",
    positionId: OutsideHitter.id,
    actionIds: [],
  },
  {
    id: circles[5].id,
    score: 0,
    circleId: circles[5].id,
    name: "Kei Tsukishima",
    positionId: MiddleBlocker.id,
    actionIds: [],
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

      const gameActionType = GameActionTypesById?.[gameAction?.type];

      // update player's score
      state.byId[playerId].score += gameActionType.score;
    },
  },
});

export const { updatePlayerInfo, updatePlayerName, addGameAction } = playersSlice.actions;

export default playersSlice.reducer;
