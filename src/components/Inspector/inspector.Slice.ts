import { createSlice, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";
import { SelectedPlayer } from "../../types/reduxStore.Types";

// type State = SelectedPlayer | null;
const initialState: { selectedId?: string } = {};

// need to explicitly specify types otherwise redux infers them incorrectly when initial state is null
export const inspectorSlice = createSlice({
  initialState,
  name: "inspector",
  reducers: {
    select: (state, action: PayloadAction<string>) => {
      state.selectedId = action.payload;
    },
  },
});

export const { select } = inspectorSlice.actions;

export default inspectorSlice.reducer;
