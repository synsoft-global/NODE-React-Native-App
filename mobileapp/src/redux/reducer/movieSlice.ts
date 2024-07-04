// reducers/userSlice.js
import {createSlice} from '@reduxjs/toolkit';
import { getMovieList } from '../actions/getMovieList';

/**
 * Create Slice for User Reducer
 *
 * * */

const initialState = {
  data: {},
  isLoading: false,
  errorMessage: '',
};

const movieSlice = createSlice({
  name: 'getMovieList',
  initialState: initialState,
  reducers: {
    clearData: state => {
      state.data = {};
    },
  },

  extraReducers: (builder: any) => {
    builder.addCase(
        getMovieList.pending,
      (state: any) => {
        state.isLoading = true;
      },
    );

    builder.addCase(
        getMovieList.fulfilled,
      (state: any, action: any) => {
        state.isLoading = false;
        state.data = action.payload;
      },
    );

    builder.addCase(
        getMovieList.rejected,
      (state: any, action: any) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      },
    );
  },
});

export const {clearData} = movieSlice.actions;
export default movieSlice.reducer;
