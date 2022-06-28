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
import userReducer from "@/App/Models/User/UserSlice";
import { freelancersApi } from "../Models/Freelancer/Freelancer";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { jobApi } from "../Models/Job/Job";
import { skillApi } from "../Models/Skill/Skill";
import { paymentApi } from "../Models/Payment/Payment";
import { messageApi } from "../Models/Message/Message";
// import thunkMiddleware from 'redux-thunk';

const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    freelancersApi.reducerPath,
    paymentApi.reducerPath,
    messageApi.reducerPath,
    jobApi.reducerPath,
    skillApi.reducerPath
  ],
};

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
  [freelancersApi.reducerPath]: freelancersApi.reducer,
  [jobApi.reducerPath]: jobApi.reducer,
  [skillApi.reducerPath]: skillApi.reducer,
  [paymentApi.reducerPath]: paymentApi.reducer,
  [messageApi.reducerPath]: messageApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([
      freelancersApi.middleware,
      paymentApi.middleware,
      messageApi.middleware,
      jobApi.middleware,
      skillApi.middleware
    ]),
});

// setupListeners(store.dispatch);
