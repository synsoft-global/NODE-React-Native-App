import {createAsyncThunk} from '@reduxjs/toolkit';
import {ErrorResponse, LoginRequest, UserDataType} from 'src/types';
import {post} from 'service/index';
import AppConfig from 'appConfig';

export const login: any = createAsyncThunk(
  'login',
  async (request: LoginRequest, {rejectWithValue}) => {
    try {
      const data = await post<UserDataType>(
        `${AppConfig.API_URL}/${AppConfig.LOGIN}`,
        request,
      );
      return data;
    } catch (error) {
      if (error && typeof error === 'object' && 'message' in error) {
        return rejectWithValue((error as ErrorResponse).message);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  },
);
