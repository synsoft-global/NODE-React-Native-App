import {globalStyles} from 'globalStyle/index';
import Colors from 'utils/colors';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {emptyTextValidation} from 'utils/validationsUtils';
import styles from './styles';
import {ButtonProps, ImageComponentNoPressProps, ImageComponentProps, TextInputProps, TextViewProps} from 'src/types';

/**
 * Define App TextViewComponent to show text on views
 * @returns Text View
 */

export const TextViewComponent: React.FC<TextViewProps> = ({
  text,
  style,
  onPress,
}) => {
  return (
    <Text style={[styles.textViewStyle, style]} onPress={onPress}>
      {text}
    </Text>
  );
};

export const ButtonComponent: React.FC<ButtonProps> = ({
  title,
  btnStyle,
  onPress,
  isLoading,
  showLeftIcon,
  leftIcon,
  leftIconStyle,
  showRightIcon,
  rightIcon,
  textStyle,
  disabled,
}) => {
  return (
    <TouchableOpacity
      style={[styles.btnContainer, btnStyle]}
      onPress={onPress}
      disabled={disabled}>
      {isLoading ? (
        <ActivityIndicator size={'small'} color={Colors.COLOR_WHITE} />
      ) : (
        <>
          {showLeftIcon && leftIcon && (
            <Image source={leftIcon} style={[styles.btnIcon, leftIconStyle]} resizeMode="contain" />
          )}
          <TextViewComponent text={title} style={textStyle} />
          {showRightIcon && rightIcon && (
            <Image source={rightIcon} style={styles.btnIcon} resizeMode="contain" />
          )}
        </>
      )}
    </TouchableOpacity>
  );
};
/**
 * Define TextInputComponent for user input
 */
export const TextInputComponent: React.FC<TextInputProps> = ({
  inputContainer,
  containerStyle,
  inputStyle,
  error,
  ...restProps
}) => {
  return (
    <View style={[styles.inputContainer, inputContainer]}>
      <View style={containerStyle}>
        <TextInput style={inputStyle} {...restProps} />
      </View>
      {error &&!emptyTextValidation(error) && (
        <TextViewComponent text={error} style={globalStyles.errorViewStyle} />
      )}
    </View>
  );
};

/**
 * Define ImageComponent for image view
 * @param ImageComponentProps Image props
 * @returns Image view
 */
export const ImageComponent: React.FC<ImageComponentProps> = ({
  source,
  containerStyle,
  imageStyle,
  resizeMode,
  disabled,
  onImageClicked,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={containerStyle}
      onPress={onImageClicked}
      hitSlop={{ top: 10, right: 10, left: 10, bottom: 10 }}>
      <Image source={source} style={imageStyle} resizeMode={resizeMode} />
    </TouchableOpacity>
  );
};

/**
 * Define ImageComponent for image view
 * @param props Image props
 * @returns Image view
 */
export const ImageComponentNoPress: React.FC<ImageComponentNoPressProps> = ({
  source,
  imageStyle,
  resizeMode,
}) => {
  return (
    <Image source={source} style={imageStyle} resizeMode={resizeMode} />
  );
};