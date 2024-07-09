import {Dimensions, StyleSheet} from 'react-native';
import Colors from 'utils/colors';
import AppConfig from 'appConfig';
const numColumns = 2;
const screenWidth = Dimensions.get('window').width;
const padding = 30;
const itemWidth = (screenWidth - padding * (numColumns + 1)) / numColumns;
// Declare styles
const styles = StyleSheet.create({
  flatListContentContainer: {
    flexGrow: 1,
    marginLeft: 24,
    marginRight: 24,
  },
  emptyView: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noItemText: {
    color: Colors.COLOR_WHITE,
    fontFamily: AppConfig.MONTSERRAT_SEMI_BOLD_FONT,
    fontSize: AppConfig.PT32,
    textAlign: 'center',
  },
  listItemView: {
    height: 334,
    borderRadius: 12,
    backgroundColor: Colors.DARK_THEME_COLOR,
    width: itemWidth,
    margin: 10,
    marginBottom: 20,
  },
  img: {
    width: itemWidth,
    height: 246,
    resizeMode: 'cover',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
});

export default styles;
