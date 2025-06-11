import { createSlice } from "@reduxjs/toolkit";

interface IThemeMode {
  mode: string;
}

const initialState: IThemeMode = {
  mode: "",
};

export const themeMode = createSlice({
  name: "themeMode",
  initialState: initialState,
  reducers: {
    setThemeMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { setThemeMode } = themeMode.actions;
export default themeMode.reducer;
