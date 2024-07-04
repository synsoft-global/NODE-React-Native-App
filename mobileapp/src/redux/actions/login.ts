import {createAsyncThunk} from '@reduxjs/toolkit';
import {loginRequest} from '@src/types';
import {post} from '@utils/client';
import AppConfig from 'appConfig';

export const login: any = createAsyncThunk(
  'login',
  async (request: loginRequest, {rejectWithValue}) => {
    console.log('value', request);

    try {
      const {data}: any = await post(
        `${AppConfig.API_URL}/${AppConfig.LOGIN}`,
        request,
      );

      console.log('login---------', data);
      
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
