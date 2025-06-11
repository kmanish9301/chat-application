import { createSlice } from "@reduxjs/toolkit";

interface IUsersDetails {
  userData: any;
}

const initialState: IUsersDetails = {
  userData: {},
};

export const userDetails = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { setUserDetails } = userDetails.actions;
export default userDetails.reducer;
