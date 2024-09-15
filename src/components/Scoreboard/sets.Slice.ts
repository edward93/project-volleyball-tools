import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { GameSet, Set } from "types/volleyballTool.New.Types";
import { Sets } from "types/reduxStore.Types";

//#region test sets
// const set: Set = {
//   gameId,
//   id: uuidv4(),
//   set: 1,
//   homeScore: 25,
//   awayScore: 10,
// };

// const newSet: Set = {
//   gameId,
//   id: uuidv4(),
//   set: 2,
//   homeScore: 25,
//   awayScore: 26,
// };

// const initialState: Sets = {
//   byId: { [set.id]: set, [newSet.id]: newSet },
//   byGameId: { [gameId]: [set, newSet] },
//   allIds: [set.id, newSet.id],
// };
//#endregion

// TODO: game initializer should create this
const set: Set = {
  // gameId,
  gameId: "",
  id: uuidv4(),
  set: 1,
  homeScore: 0,
  awayScore: 0,
};

const initialState: Sets = {
  byId: { [set.id]: set },
  byGameId: { [""]: [set] },
  allIds: [set.id],
};

export const setsSlice = createSlice({
  initialState,
  name: "sets",
  reducers: {
    createNewSet: (state, action: PayloadAction<string>) => {
      // current game id
      const currentGameId = action.payload;

      // only 5 sets are allowed per game
      if (state.byGameId[currentGameId].length === 5) throw Error("There can only be 5 games per game");

      // construct new set object
      const newSet: Set = {
        gameId: currentGameId,
        id: uuidv4(),
        set: (state.byGameId[currentGameId].length + 1) as GameSet,
        homeScore: 0,
        awayScore: 0,
      };

      state.byId[newSet.id] = newSet;
      state.byGameId[currentGameId].push(newSet);
      state.allIds.push(newSet.id);
    },
  },
});

export default setsSlice.reducer;
