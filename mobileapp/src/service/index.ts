import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {AddMovieRequest, LoginRequest} from 'src/types';
import {getTokenFromAsyncStorage} from 'utils/apputils';

/**
 * get auth token from storage
 * @returns Authorize token
 */
const getToken = async () => {
  const token: string | null = await getTokenFromAsyncStorage();
  return token;
};

// // Function to handle HTTP GET request
export const get = async <T>(url: string): Promise<T> => {
  const token = await getToken();
  console.log('Get method---', url, token);

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    timeout: 20000,
  };

  try {
    const response: AxiosResponse<T> = await axios.get(url, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else if (error.request) {
        throw new Error('No response received from the server');
      } else {
        throw new Error(error.message);
      }
    } else {
      throw new Error('Unknown error occurred during GET request');
    }
  }
};

// Function to handle HTTP POST request
export const post = async <T>(
  url: string,
  postData: LoginRequest | AddMovieRequest | FormData,
  contentType?: string,
): Promise<T> => {
  const content = contentType || 'application/json';
  const token = await getToken();

  try {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        'Content-Type': content,
      },
    };

    const response: AxiosResponse<T> = await axios.post(url, postData, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else if (error.request) {
        throw new Error('No response received from the server');
      } else {
        throw new Error(error.message);
      }
    } else {
      throw new Error('Unknown error occurred during GET request');
    }
  }
};

// Function to handle HTTP PUT request
export const put = async <T>(
  url: string,
  postData: AddMovieRequest,
): Promise<T> => {
  const token = await getToken();

  try {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        'Content-Type': 'application/json', // Default content type, adjust if necessary
      },
      timeout: 20000,
    };

    const response: AxiosResponse<T> = await axios.put(url, postData, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else if (error.request) {
        throw new Error('No response received from the server');
      } else {
        throw new Error(error.message);
      }
    } else {
      throw new Error('Unknown error occurred during GET request');
    }
  }
};

export default {
  get,
  post,
  put,
};
