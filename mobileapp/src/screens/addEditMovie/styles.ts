import {StyleSheet} from 'react-native';
import Colors from 'utils/colors';
import AppConfig from 'appConfig';

// Declare styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 24,
  },

  inputView: {
    width: '100%',
    marginTop: 24,
    //marginBottom: 24,
  },
  title: {
    fontFamily: AppConfig.MONTSERRAT_SEMI_BOLD_FONT,
    fontSize: AppConfig.PT28,
    color: Colors.COLOR_WHITE,
    marginTop: 20,
    marginBottom: 30,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  uploadImageView: {
    marginTop: 30,
    height: 300,
    borderWidth: 2,
    borderRadius: 10,
    borderStyle: 'dashed',
    borderColor: Colors.COLOR_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImageView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 160,
    height: 54,
    borderRadius: 10,
    backgroundColor: Colors.BUTTON_BG,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },
  cancelButton: {
    width: 160,
    height: 54,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.COLOR_WHITE,
    backgroundColor: 'trancparent',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },
  img: {
    width: '100%',
    flex: 1,
    resizeMode: 'contain',
  },
  uploadIcon: {
    marginBottom: 10,
  },
});

export default styles;
