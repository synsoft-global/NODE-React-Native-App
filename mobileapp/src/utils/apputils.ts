import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';
import Colors from '@utils/colors';
import * as Constants from '@utils/constants';
import {Alert} from 'react-native';

/**
 * get token fron local storage
 * @returns token
 */
const getTokenFromAsyncStorage = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    return token;
  } catch (error) {
    console.log('Error getting token from AsyncStorage:', error);
    return null;
  }
};

/**
 * get token fron local storage
 * @returns token
 */
const getDataFromAsyncStorage = async (key: string) => {
  try {
    const token = await AsyncStorage.getItem(key);
    return token;
  } catch (error) {
    console.log('Error getting token from AsyncStorage:', error);
    return null;
  }
};

const storeDataToAsyncStorage = async (key: string, data: any) => {
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

const showMessageAlert = (message: string, onLogout: any) => {
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
            onLogout();
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
