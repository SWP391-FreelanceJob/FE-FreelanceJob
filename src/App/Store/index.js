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
  ],
};

const rootReducer = combineReducers({
  counter: counterReducer,
  [freelancersApi.reducerPath]: freelancersApi.reducer,
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
    ]),
});

// setupListeners(store.dispatch);
