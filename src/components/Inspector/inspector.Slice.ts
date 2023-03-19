import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { id?: string; [key: string]: any } = {};

export const inspectorSlice = createSlice({
  initialState,
  name: "inspector",
  reducers: {
    select: (state: { id?: string; [key: string]: any }, action: PayloadAction<{ id: string; [key: string]: any }>) => {
      return action.payload;
    },
  },
});

export const { select } = inspectorSlice.actions;

export default inspectorSlice.reducer;
