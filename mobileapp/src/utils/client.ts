import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {getTokenFromAsyncStorage} from '@utils/apputils'

const getToken = async () => {
  // Retrieve the token from localStorage or any other storage mechanism
  const token: any = await getTokenFromAsyncStorage();
  return token;
};

// Function to handle HTTP GET request
export const get = async (url: string) => {
  const token = await getToken();
  console.log('Get method---', url, token);

  return new Promise(async (resolve, reject) => {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
      timeout: 20000,
    };
    try {
      const response: AxiosResponse = await axios.get(url, config);
      //console.log('AxiosResponse-', response)
      resolve(response);
    } catch (error: any) {
      console.log('AxiosError-', error);
      if (error.response) {
        reject(error.response.data.message);
      } else if (error.request) {
        reject('No response received from the server');
      } else {
        reject(error.message);
      }
    }
  });
};

// Function to handle HTTP POST request
export const post = async (url: string, postData: any, contentType?: any) => {
  const content = contentType ? contentType : 'application/json';
  const token = await getToken();
  console.log('postData -- ', postData, url, token);
  return new Promise(async (resolve, reject) => {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        'Content-Type': content,
      },
      // timeout: 20000,
    };
    try {
      const response: AxiosResponse = await axios.post(url, postData, config);
      //console.log('AxiosResponse-', response)
      resolve(response);
    } catch (error: any) {
      console.log('AxiosEror-', error);
      if (error.response) {
        console.log('errroro3', error.response.data);
        if (error.response.data.message) {
          reject(error.response.data.message);
        } else {
          reject(error.response.data);
        }
      } else if (error.request) {
        console.log('errroro2', error);
        reject('No response received from the server');
      } else {
        console.log('errroro1', error);
        reject(error.message);
      }
    }
  });
};

// Function to handle HTTP Put request
export const put = async (url: string, postData: any) => {
  const token = await getToken();
  return new Promise(async (resolve, reject) => {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
      timeout: 20000,
    };
    try {
      const response: AxiosResponse = await axios.put(url, postData, config);
      resolve(response);
    } catch (error: any) {
      if (error.response) {
        reject(error.response.data.message);
      } else if (error.request) {
        reject('No response received from the server');
      } else {
        reject(error.message);
      }
    }
  });
};

export const deleteRequest = async (
  url: string,
  params?: any,
  contentType?: any,
) => {
  const content = contentType ? contentType : 'application/json';
  const token = await getToken();
  console.log('deleteData -- ', params, url, token);
  return new Promise(async (resolve, reject) => {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        'Content-Type': content,
      },
      timeout: 20000,
      data: JSON.stringify(params),
    };
    try {
      const response: AxiosResponse = await axios.delete(url, config);
      // console.log('AxiosResponse-', response)
      resolve(response);
    } catch (error: any) {
      console.log('AxiosEror-', error);
      if (error.response) {
        console.log('errroro3', error.response.data);
        if (error.response.data.message) {
          reject(error.response.data.message);
        } else {
          reject(error.response.data);
        }
      } else if (error.request) {
        console.log('errroro2', error);
        reject('No response received from the server');
      } else {
        console.log('errroro1', error);
        reject(error.message);
      }
    }
  });
};

export default {
  get,
  post,
  put,
  deleteRequest,
};
