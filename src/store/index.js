import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import classReducer from './slices/classSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    classroom: classReducer,
  },
});

export default store;
