import {StyleSheet} from 'react-native';
import Colors from '@src/utils/colors';
import AppConfig from 'appConfig';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 20,
  },
  title: {
    fontFamily: AppConfig.MONTSERRAT_SEMI_BOLD_FONT,
    fontSize: AppConfig.PT32,
    color: Colors.COLOR_WHITE,
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  img: {
    marginLeft: 10,
    marginTop: 5,
  },
});

export default styles;
