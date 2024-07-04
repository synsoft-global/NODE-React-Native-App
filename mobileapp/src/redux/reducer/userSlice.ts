// reducers/userSlice.js
import {createSlice} from '@reduxjs/toolkit';
import { login } from '../actions/login';

/**
 * Create Slice for User Reducer
 *
 * * */

const initialState = {
  userData: {},
  isLoading: false,
  errorMessage: '',
};

const userSlice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
    },
    clearUser: state => {
      state.userData = {};
    },
  },

  extraReducers: (builder: any) => {
    builder.addCase(
      login.pending,
      (state: any) => {
        state.isLoading = true;
      },
    );

    builder.addCase(
      login.fulfilled,
      (state: any, action: any) => {
        state.isLoading = false;
        state.userData = action.payload.user;
      },
    );

    builder.addCase(
      login.rejected,
      (state: any, action: any) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      },
    );
  },
});

export const {setUser, clearUser} = userSlice.actions;
export default userSlice.reducer;
