import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameAction, GameActionTypesById, Player } from "types/volleyballTool.New.Types";
import { teamJapanPlayers, teamUsaPlayers } from "utils/data/players";
import { Players } from "../../types/reduxStore.Types";

// TODO: Tmp, list of players will be provided in the beginning of the app
export const initialPlayers: Player[] = [...teamJapanPlayers, ...teamUsaPlayers];

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
    subPlayers: (state: Players, action: PayloadAction<{ subInId: string; subOutId: string }>) => {
      const { subInId, subOutId } = action.payload;

      // update active players
      state.byId[subInId].isActive = true;
      state.byId[subInId].currentRotationPosition = state.byId[subOutId].currentRotationPosition;
      
      state.byId[subOutId].isActive = false;
      state.byId[subOutId].currentRotationPosition = undefined;
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
    /**
     * Rotates all active (on the court) player's court position after a side-out
     * @param state - Current state
     */
    rotatePlayers: (state: Players, action: PayloadAction<Player[]>) => {
      const players = action.payload;
      // iterate over active players and change their court position
      players.forEach((player: Player) => {
        state.byId[player.id].currentRotationPosition = player.currentRotationPosition;
      });
    },
  },
});

export const { updatePlayerInfo, updatePlayerName, subPlayers, addGameAction, selectPlayerAction, rotatePlayers } =
  playersSlice.actions;

export default playersSlice.reducer;
