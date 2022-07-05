import { createSlice } from "@reduxjs/toolkit";
import { profileApi } from "../Profile/Profile";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    accountId: "",
    role: "",
    phone: "",
    jwt: "",
    fullName: "",
    avatar: "",
    userId: "",
    email: "",
    shortDescription: "",
    description: "",
  },
  reducers: {
    userLogin: (state, action) => {
      state.isLogin = true;
      state.accountId = action.payload.accountId;
      state.role = action.payload.role;
      state.phone = action.payload.phone;
      state.jwt = action.payload.jwt;
      state.fullName = action.payload.fullName;
      state.avatar = action.payload.avatar;
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.shortDescription = action.payload.shortDesc;
      state.description = action.payload.desc;
    },
    userLogout: (state) => {
      state.isLogin = false;
      state.accountId = "";
      state.role = "";
      state.phone = "";
      state.jwt = "";
      state.fullName = "";
      state.avatar = "";
      state.userId = "";
      state.email = "";
      state.shortDesc = "";
      state.desc = "";
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      profileApi.endpoints.updateRecruiterProfile.matchFulfilled,
      (state, { payload }) => {
        state.fullName = payload.fullname;
        state.avatar = payload.avatar;
        state.phone = payload.phone;
        state.shortDescription = payload.shortDescription;
        state.description = payload.description;
      }
    );
    builder.addMatcher(
      profileApi.endpoints.updateProfile.matchFulfilled,
      (state, { payload }) => {
        state.avatar = payload.avatar;
        state.phone = payload.phone;
        state.fullName = payload.freelancer.fullname;
        state.shortDescription = payload.freelancer.shortDescription;
        state.description = payload.freelancer.description;
      }
    );
  },
});

// Action creators are generated for each case reducer function
export const { userLogin, userLogout } = userSlice.actions;

export default userSlice.reducer;
