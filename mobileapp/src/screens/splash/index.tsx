import { globalStyles } from '@src/globalStyle';
import React, { useEffect } from 'react';
import {Image, View} from 'react-native';
import styles from './styles';
import { TextViewComponent } from '@components/viewComponents';
import * as Constants from '@utils/constants'
import { useNavigation } from '@react-navigation/native';
import { getDataFromAsyncStorage } from '@src/utils/apputils';

const bottomBg = require('@assets/img/bottom_bg.png');

const SplashScreen = () => {
    const navigation: any = useNavigation();

    useEffect(()=> {
    setTimeout(() => {
        goToNext();
    }, 2000);
    },[])

    /**
     * Handle Redurect to next screen
     */
    const goToNext = async () => {
       let userData: any = await getDataFromAsyncStorage('userInfo');
       console.log('userInfo--', userData);
       
       if(userData){
        navigation.navigate(Constants.KEY_MOVIEW);
       } else {
        navigation.navigate(Constants.KEY_LOGIN);
       }
    }
    return(
        <View style={styles.container}>
            <TextViewComponent text={Constants.TEXT_DEMO_APP} />
            <Image style={globalStyles.bottomCurveBg} source={bottomBg} />
        </View>
    )
}

export default SplashScreen;

