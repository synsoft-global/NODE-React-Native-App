// reducers/userSlice.js
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {login} from '../actions/login';
import {UserDataType} from 'src/types'; // Adjust as per your types file

interface UserState {
  userData: UserDataType | undefined;
  isLoading: boolean;
  errorMessage: string;
}

const initialState: UserState = {
  userData: undefined,
  isLoading: false,
  errorMessage: '',
};

const userSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserDataType>) => {
      state.userData = action.payload;
    },
    clearUser: state => {
      state.userData = undefined;
      state.errorMessage = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(login.pending, state => {
      state.isLoading = true;
      state.errorMessage = '';
    });

    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<{user: UserDataType}>) => {
        state.isLoading = false;
        state.userData = action.payload.user;
      },
    );

    builder.addCase(login.rejected, (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errorMessage = action.payload || 'Unknown error occurred.';
    });
  },
});

export const {setUser, clearUser} = userSlice.actions;
export default userSlice.reducer;
