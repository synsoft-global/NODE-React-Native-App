import AppConfig from 'appConfig';
import Colors from '@src/utils/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  text: {
    margin: 10,
    color: Colors.THEME_COLOR,
    fontSize: AppConfig.PT15,
    fontFamily: AppConfig.MONTSERRAT_MEDIUM_FONT,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginVertical: 10,
  },
  container: {
    backgroundColor: Colors.COLOR_WHITE,
    padding: 10,
    paddingHorizontal: 20,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    //height: 200,
    textAlign: 'center',
    justifyContent: 'space-around',
    // alignContent: 'center',
    // alignItems: 'center',
  },
  titleText: {
    margin: 10,
    color: Colors.THEME_COLOR,
    fontSize: AppConfig.PT15,
    fontFamily: AppConfig.MONTSERRAT_BOLD_FONT,
  },
});

export default styles;
