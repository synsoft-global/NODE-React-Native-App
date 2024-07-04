/**
 * declare global stule used in app.
 */
import Colors from '@utils/colors';
 import AppConfig from 'appConfig';
import {StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Colors.THEME_COLOR,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 24,
  },
  bottomCurveBg: {
    position: 'absolute',
    bottom: 0,
    resizeMode: 'cover',
  },

  inputTextStyle: {
    color: Colors.COLOR_WHITE,
    fontFamily: AppConfig.MONTSERRAT_REGULAR_FONT,
    fontSize: AppConfig.PT14,
  },
  inputContainerStyle: {
    width: '100%',
    height: 45,
    borderRadius: 10,
    paddingLeft: 10,
    backgroundColor: Colors.LIGHT_THEME_COLOR,
  },
  buttonTextStyle: {
    color: Colors.COLOR_WHITE,
    fontFamily: AppConfig.MONTSERRAT_BOLD_FONT,
    fontSize: AppConfig.PT16,
  },
  errorViewStyle: {
    marginTop: 10,
    marginLeft: 5,
    color: Colors.RED_COLOR,
    fontFamily: AppConfig.MONTSERRAT_SEMI_BOLD_FONT,
    fontSize: AppConfig.PT12,
  },
});
