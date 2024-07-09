/**
 * Define splash screen functional component
 */
import {globalStyles} from 'src/globalStyle';
import React, {useEffect} from 'react';
import {Image, View} from 'react-native';
import styles from './styles';
import {TextViewComponent} from 'components/viewComponents';
import * as Constants from 'utils/constants';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {getDataFromAsyncStorage} from 'utils/apputils';

//Impots images and icons
const bottomBg = require('assets/img/bottom_bg.png');

/**
 * Define splash screen functional component
 * @returns Splash view
 */
const SplashScreen = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  useEffect(() => {
    setTimeout(() => {
      goToNext();
    }, 2000);
  }, []);

  /**
   * Function used to handle redirect to next screen
   */
  const goToNext = async () => {
    let userData = await getDataFromAsyncStorage(Constants.KEY_USER_INFO);

    if (userData) {
      navigation.navigate(Constants.KEY_MOVIEW);
    } else {
      navigation.navigate(Constants.KEY_LOGIN);
    }
  };

  return (
    <View style={styles.container}>
      <TextViewComponent text={Constants.TEXT_DEMO_APP} />
      <Image style={globalStyles.bottomCurveBg} source={bottomBg} />
    </View>
  );
};

export default SplashScreen;
