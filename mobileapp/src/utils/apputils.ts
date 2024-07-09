import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';
import Colors from 'utils/colors';
import * as Constants from 'utils/constants';
import {Alert} from 'react-native';

/**
 * get token from local storage
 * @returns token
 */
const getTokenFromAsyncStorage = async () => {
  try {
    const token = await AsyncStorage.getItem(Constants.KEY_USER_TOKEN);
    return token;
  } catch (error) {
    console.log('Error getting token from AsyncStorage:', error);
    return null;
  }
};

/**
 * get stored data from local storage by key
 * @returns data
 */
const getDataFromAsyncStorage = async (key: string) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data;
  } catch (error) {
    console.log('Error getting token from AsyncStorage:', error);
    return null;
  }
};

/**
 *
 * @param key unique key for data to be stored
 * @param data info to be stored by give key
 */
const storeDataToAsyncStorage = async (key: string, data: string) => {
  try {
    await AsyncStorage.setItem(key, data);
  } catch (error) {
    console.log('Error saving data to AsyncStorage:', error);
  }
};

/**
 * Define Snackbar message
 * @param {*} message - message show on Snackbar.
 */
const showSnackbarMessage = (message: string) => {
  setTimeout(() => {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_LONG,
      backgroundColor: Colors.LIGHT_THEME_COLOR,
    });
  }, 500);
};

/**
 *
 * @param message to be show
 * @param onLogout callback function
 */
const showMessageAlert = (message: string, onLogout?: () => void) => {
  setTimeout(() => {
    Alert.alert(
      Constants.ALERT_TITLE,
      message,
      [
        {
          text: Constants.TEXT_NO,
        },
        {
          text: Constants.TEXT_YES,
          onPress: () => {
            if (onLogout) {
              onLogout();
            }
          },
        },
      ],
      {cancelable: false},
    );
  }, 100);
};

export {
  getTokenFromAsyncStorage,
  storeDataToAsyncStorage,
  showSnackbarMessage,
  showMessageAlert,
  getDataFromAsyncStorage,
};
