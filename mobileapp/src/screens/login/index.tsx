/**
 * Define login screen functional component
 */
import React, {useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import {globalStyles} from '@globalStyle/index';
import {
  ButtonComponent,
  TextInputComponent,
  TextViewComponent,
} from '@components/viewComponents';
import * as Constants from '@utils/constants';
import colors from '@utils/colors';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '@src/redux/actions/login';
import {loginRequest} from '@src/types';
import {
  showSnackbarMessage,
  storeDataToAsyncStorage,
} from '@src/utils/apputils';
import {emptyTextValidation, validateEmail} from '@src/utils/validationsUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const bottomBg = require('@assets/img/bottom_bg.png');

const LoginScreen = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const {isLoading} = useSelector((state: any) => state.user);

  useEffect(() => {}, []);

  /**
   * Validate inputs
   * @returns true/false
   */
  const validateInput = () => {
    let isValid = true;
    if (!validateEmail(email)) {
      setEmailError(Constants.REQUIRED_EMAIL_MSG);
      isValid = false;
    } else {
      setEmailError('');
      isValid = true;
    }

    if (emptyTextValidation(password)) {
      setPasswordError(Constants.REQUIRED_PASSWORD_MSG);
      isValid = false;
    } else {
      setPasswordError('');
      isValid = true;
    }

    return isValid;
  };

  /**
   * Handle login button click
   */
  const handleLoginClick = () => {
    //navigation.navigate('movies');
    if (validateInput()) {
      let req: loginRequest = {
        email: email,
        password: password,
      };

      dispatch(login(req))
        .unwrap()
        .then(async (res: any) => {
          console.log('create account  res: -------------------', res);
          await storeDataToAsyncStorage('userToken', res.token);
          AsyncStorage.setItem('userInfo', JSON.stringify(res.user));
          showSnackbarMessage(res.message);
          navigation.navigate(Constants.KEY_MOVIEW);
        })
        .catch((err: any) => {
          console.log('err--', err);
        });
    }
  };
  return (
    <View style={globalStyles.safeAreaStyle}>
      <View style={globalStyles.mainContainer}>
        <TextViewComponent text={Constants.TEXT_SIGN_IN} />
        <TextInputComponent
          containerStyle={globalStyles.inputContainerStyle}
          inputStyle={globalStyles.inputTextStyle}
          placeholder={Constants.TEXT_EMAIL}
          placeholderTextColor={colors.COLOR_WHITE}
          value={email}
          error={emailError}
          onChangeText={(text: string) => {
            setEmail(text);
            if (!validateEmail(email)) {
              setEmailError(Constants.REQUIRED_EMAIL_MSG);
            } else {
              setEmailError('');
            }
          }}
        />
        <TextInputComponent
          containerStyle={globalStyles.inputContainerStyle}
          inputStyle={globalStyles.inputTextStyle}
          placeholder={Constants.TEXT_PASSWAORD}
          placeholderTextColor={colors.COLOR_WHITE}
          value={password}
          error={passwordError}
          secureTextEntry={true}
          onChangeText={(text: string) => {
            setPassword(text);
            if (emptyTextValidation(password)) {
              setPasswordError(Constants.REQUIRED_PASSWORD_MSG);
            } else {
              setPasswordError('');
            }
        
          }}
        />
        <ButtonComponent
          title={Constants.TEXT_LOGIN}
          textStyle={globalStyles.buttonTextStyle}
          onPress={handleLoginClick}
          isLoading={isLoading}
        />
      </View>
      <Image style={globalStyles.bottomCurveBg} source={bottomBg} />
    </View>
  );
};

export default LoginScreen;
