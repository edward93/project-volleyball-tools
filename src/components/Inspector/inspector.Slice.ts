import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { selectedId?: string } = {};

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
