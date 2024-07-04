import {globalStyles} from '@globalStyle/index';
import Colors from '@utils/colors';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {emptyTextValidation} from '@src/utils/validationsUtils';
import styles from './styles';

/**
 * Define App TextViewComponent to show text on views
 * @param props Text props
 * @returns Text View
 */
export const TextViewComponent = (props: any) => {
  return (
    <Text
      style={[props.style ? props.style : styles.textViewStyle]}
      onPress={props.onPress}
      {...props}>
      {props.text}
    </Text>
  );
};

export const ButtonComponent = (props: any) => {
  return (
    <TouchableOpacity
      style={[props.btnStyle ? props.btnStyle : styles.btnContainer]}
      onPress={props.onPress}
      disabled={props.disabled}>
      {props.isLoading ? (
        <ActivityIndicator size={'small'} color={Colors.COLOR_WHITE} />
      ) : (
        <>
          {props.showLeftIcon && (
            <Image
              source={props.leftIcon}
              style={[styles.btnIcon, props.leftIconStyle]}
              resizeMode="contain"
            />
          )}
          <TextViewComponent text={props.title} style={[props.textStyle]} />
          {props.showRightIcon && (
            <Image
              source={props.rightIcon}
              style={styles.btnIcon}
              resizeMode="contain"
            />
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

/**
 * Define TextInputComponent for user input
 */
export const TextInputComponent = (props: any) => {
  return (
    <View style = {props.inputContainer ? props.inputContainer : styles.inputContainer}>
      <View style={props.containerStyle}>
        <TextInput style={props.inputStyle} {...props} />
      </View>
      {!emptyTextValidation(props.error) && (
        <TextViewComponent text={props.error} style={[globalStyles.errorViewStyle]} />
      )}
    </View>
  );
};

/**
 * Define ImageComponent for image view
 * @param props Image props
 * @returns Image view
 */
export const ImageComponent = (props: any) => {
  return (
    <TouchableOpacity
      disabled={props.disabled}
      style={props.containerStyle}
      onPress={props.onImageClicked}
      hitSlop={{top: 10, right: 10, left: 10, bottom: 10}}>
      <Image
        source={props.source}
        style={props.imageStyle}
        resizeMode={props.resizeMode}
      />
    </TouchableOpacity>
  );
};

/**
 * Define ImageComponent for image view
 * @param props Image props
 * @returns Image view
 */
export const ImageComponentNoPress = (props: any) => {
  return (
    <Image
      source={props.source}
      style={props.imageStyle}
      resizeMode={props.resizeMode}
    />
  );
};


