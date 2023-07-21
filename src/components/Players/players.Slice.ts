import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player, Players } from "../../types/reduxStore.Types";
import { MiddleBlocker, OppositeHitter, OutsideHitter, Setter } from "../../types/volleyballTool.Types";

import { circles} from "../Visualizer/circles.Slice";

const initialPlayers: Player[] = [
  {
    id: circles[0].id,
    averageScore: 0,
    circleId: circles[0].id,
    name: "Shoyo Hinata",
    positionId: MiddleBlocker.id,
    stats: [],
  },
  {
    id: circles[1].id,
    averageScore: 0,
    circleId: circles[1].id,
    name: "Asahi Azumane",
    positionId: OutsideHitter.id,
    stats: [],
  },
  {
    id: circles[2].id,
    averageScore: 0,
    circleId: circles[2].id,
    name: "Tobio Kageyama",
    positionId: Setter.id,
    stats: [],
  },
  {
    id: circles[3].id,
    averageScore: 0,
    circleId: circles[3].id,
    name: "Daichi Sawamura",
    positionId: OppositeHitter.id,
    stats: [],
  },
  {
    id: circles[4].id,
    averageScore: 0,
    circleId: circles[4].id,
    name: "Ryunosuke Tanaka",
    positionId: OutsideHitter.id,
    stats: [],
  },
  {
    id: circles[5].id,
    averageScore: 0,
    circleId: circles[5].id,
    name: "Kei Tsukishima",
    positionId: MiddleBlocker.id,
    stats: [],
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
      const { averageScore, name, positionId, jerseyNumber } = action.payload;
      state.byId[action.payload.id] = {
        ...state.byId[action.payload.id],
        averageScore,
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
  },
});

export const { updatePlayerInfo, updatePlayerName } = playersSlice.actions;

export default playersSlice.reducer;
