import {createAsyncThunk} from '@reduxjs/toolkit';
import { showSnackbarMessage } from '@src/utils/apputils';
import {get, post, put} from '@utils/client';
import AppConfig from 'appConfig';

export const getMovieList: any = createAsyncThunk(
  'getMovieList',
  async (page, {rejectWithValue}) => {
    try {
      const {data}: any = await get(
        `${AppConfig.API_URL}${AppConfig.GET_MOVIES}page=${page}&limit=10`,
      );
      
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);


// Add movie api call request
export const addMovie = async (request: any) => {
  try {
    const {data}: any = await post(
      `${AppConfig.API_URL}${AppConfig.ADD_MOVIES}`,
      request,
    );

    showSnackbarMessage(data.message);
    return data;
  } catch (error: any) {
    showSnackbarMessage(error.message);
  }
};

// Add movie api call request
export const editMovie = async (request: any, id: string) => {
  try {
    const {data}: any = await put(
      `${AppConfig.API_URL}${AppConfig.EDIT_MOVIES}${id}`,
      request,
    );

    showSnackbarMessage(data.message);
    return data;
  } catch (error: any) {
    showSnackbarMessage(error.message);
  }
};

// Upload image request
export const uploadImage = (data: any, type: string, fileName: string) => {
  console.log('final sddta: ', data, type);

  const formdata = new FormData();
  formdata.append('file', {
    uri: data,
    type: type,
    name: fileName,
  });
  const contentType = 'multipart/form-data';
  return post(
    `${AppConfig.API_URL}${AppConfig.IMAGE_UPLOAD}`,
    formdata,
    contentType,
  );
};
