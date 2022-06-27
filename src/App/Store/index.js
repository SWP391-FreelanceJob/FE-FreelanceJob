import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import counterReducer from "@/App/Models/Counter/CounterSlice";
import { freelancersApi } from "../Models/Freelancer/Freelancer";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { jobApi } from "../Models/Job/Job";
import { skillApi } from "../Models/Skill/Skill";
// import thunkMiddleware from 'redux-thunk';

const persistConfig = {
  key: "root",
  storage,
  blacklist: [freelancersApi.reducer, jobApi.reducer, skillApi.reducer]
};

const rootReducer = combineReducers({
  counter: counterReducer,
  [freelancersApi.reducerPath]: freelancersApi.reducer,
  [jobApi.reducerPath]: jobApi.reducer,
  [skillApi.reducerPath]: skillApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(freelancersApi.middleware).concat(jobApi.middleware).concat(skillApi.middleware),
});

// setupListeners(store.dispatch);