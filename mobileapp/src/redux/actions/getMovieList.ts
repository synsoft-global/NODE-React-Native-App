import {createAsyncThunk} from '@reduxjs/toolkit';
import {showSnackbarMessage} from 'utils/apputils';
import {get, post, put} from 'service/index';
import AppConfig from 'appConfig';
import {
  AddMovieRequest,
  AddMovieResponse,
  ErrorResponse,
  GetMovieListResponse,
} from 'src/types';

export const getMovieList: any = createAsyncThunk(
  'getMovieList',
  async (page, {rejectWithValue}) => {
    try {
      const data = await get<GetMovieListResponse>(
        `${AppConfig.API_URL}${AppConfig.GET_MOVIES}page=${page}&limit=${AppConfig.pageSize}`,
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

// Add movie api call request
export const addMovie = async (request: AddMovieRequest) => {
  try {
    const data = await post<AddMovieResponse>(
      `${AppConfig.API_URL}${AppConfig.ADD_MOVIES}`,
      request,
    );

    showSnackbarMessage(data.message);
    return data;
  } catch (error) {
    if (error && typeof error === 'object' && 'message' in error) {
      return showSnackbarMessage((error as ErrorResponse).message);
    } else {
      return showSnackbarMessage('An unknown error occurred');
    }
  }
};

// Add movie api call request
export const editMovie = async (request: AddMovieRequest, id: string) => {
  try {
    const data = await put<AddMovieResponse>(
      `${AppConfig.API_URL}${AppConfig.EDIT_MOVIES}${id}`,
      request,
    );

    showSnackbarMessage(data.message);
    return data;
  } catch (error) {
    if (error && typeof error === 'object' && 'message' in error) {
      return showSnackbarMessage((error as ErrorResponse).message);
    } else {
      return showSnackbarMessage('An unknown error occurred');
    }
  }
};

// Upload image request
export const uploadImage = (uri: string, type: string, fileName: string) => {
  const formdata = new FormData();
  formdata.append('file', {
    uri: uri,
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
