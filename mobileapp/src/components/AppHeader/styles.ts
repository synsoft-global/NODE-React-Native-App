import { StyleSheet } from 'react-native';
import Colors from 'utils/colors';
import AppConfig from 'appConfig';

const MARGINS = {
  marginTop: 30,
  marginHorizontal: 24,
  marginBottom: 20,
  marginLeft: 10,
  marginTop5: 5,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: MARGINS.marginTop,
    marginLeft: MARGINS.marginHorizontal,
    marginRight: MARGINS.marginHorizontal,
    marginBottom: MARGINS.marginBottom,
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontFamily: AppConfig.MONTSERRAT_SEMI_BOLD_FONT,
    fontSize: AppConfig.PT32,
    color: Colors.COLOR_WHITE,
  },
  img: {
    marginLeft: MARGINS.marginLeft,
    marginTop: MARGINS.marginTop5,
  },
});

export default styles;
