// reducer file: reducers.js
import {combineReducers} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import movieSlice from './movieSlice';

const rootReducer = combineReducers({
  user: userReducer,
  movies: movieSlice,
  // Add other reducers here
});

export default rootReducer;
