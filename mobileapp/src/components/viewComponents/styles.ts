import {StyleSheet} from 'react-native';
import AppConfig from 'appConfig';
import Colors from '@utils/colors';

const styles = StyleSheet.create({
  btnContainer: {
    width: '100%',
    height: 54,
    borderRadius: 10,
    backgroundColor: Colors.BUTTON_BG,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },
  btnTextStyle: {
    lineHeight: 19.36,
    alignSelf: 'center',
    color: Colors.COLOR_WHITE,
  },
  textViewStyle: {
    color: Colors.COLOR_WHITE,
    fontFamily: AppConfig.MONTSERRAT_SEMI_BOLD_FONT,
    fontSize: AppConfig.PT48,
  },
  logoTextStyle: {
    color: Colors.COLOR_WHITE,
    alignSelf: 'center',
  },
  btnIcon: {
    width: 20,
    height: 20,
  },
  inputContainer: {
    width: '100%',
    marginLeft: 24,
    marginRight: 24,
    marginTop: 24,
  },
});

export default styles;
