import { createSlice } from "@reduxjs/toolkit";

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
});

// Action creators are generated for each case reducer function
export const { userLogin, userLogout } = userSlice.actions;

export default userSlice.reducer;
