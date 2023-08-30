import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { Workspace } from "../../types/reduxStore.Types";

const initialState: Workspace = {
  id: uuidv4(),
  name: "Main Workspace",
};

export const volleyballToolSlice = createSlice({
  initialState,
  name: "volleyballTool",
  reducers: {},
});
