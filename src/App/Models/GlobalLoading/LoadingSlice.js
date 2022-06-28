import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    isLoading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setNotLoading: (state, action) => {
      state.isLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoading, setNotLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
