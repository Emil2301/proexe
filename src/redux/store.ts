import { configureStore } from '@reduxjs/toolkit';
import usersStateReducer from './usersState';

const store = configureStore({
  reducer: usersStateReducer.reducer,
});

export default store;

export type AppDispatch = typeof store.dispatch;
