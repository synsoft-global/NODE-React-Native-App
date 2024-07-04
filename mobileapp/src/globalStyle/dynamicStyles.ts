// dynamicStyles.js
import {StyleSheet} from 'react-native';
//import * as Colors from 'utils/colors';
import Colors from '@utils/colors';
import AppConfig from 'appConfig';

/**
 * Create dynamic global styles based on props.
 * @param props style props
 * @returns dynamic style based on props
 */
// dynamicStyles.js
export const generateDynamicStyles = (props: any) => {
  const {
    fontSize,
    textColor,
    fontFamily,
    backgroundColor,
    radius,
    padding,
    marginBottom,
    marginTop,
    marginLeft,
    marginRight,
    alignItem,
    justifyContent,
    marginHorizontal,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    width,
    height,
    mLeft,
    mRight,
    mTop,
    mBottom,
    direction,
    flex,
    alignItems,
    textAlign,
    position,
    top,
    lineHeight,
    gap,
    maxWidth,
    minWidth,
    flexDirection,
    mVertical,
    resizeMode,
    borderRadius,
    tintColor,
  } = props;
  return StyleSheet.create({
    mainContainer: {
      flex: flex || 1,
      justifyContent: justifyContent || 'center',
      alignItems: alignItems || 'center',
      backgroundColor: backgroundColor || Colors.COLOR_WHITE,
      marginTop: marginTop || 0,
      marginBottom: marginBottom || 0,
      marginLeft: marginLeft || 0,
      marginRight: marginRight || 0,
      paddingTop: paddingTop || 0,
      paddingBottom: paddingBottom || 0,
      paddingLeft: paddingLeft || 0,
      paddingRight: paddingRight || 0,
      gap: gap || 0,
      width: width,
      flexDirection: flexDirection,
    },
    text: {
      fontSize: fontSize || AppConfig.PT16,
      color: textColor || Colors.BLACK_TEXT_COLOR,
      fontFamily: fontFamily || AppConfig.SATOSHI_MEDIUM_FONT,
      backgroundColor: backgroundColor || Colors.COLOR_TRAMSPARENT,
      marginTop: marginTop || 0,
      marginBottom: marginBottom || 0,
      marginLeft: marginLeft || 0,
      marginRight: marginRight || 0,
      paddingTop: paddingTop || 0,
      paddingBottom: paddingBottom || 0,
      paddingLeft: paddingLeft || 0,
      paddingRight: paddingRight || 0,
      marginHorizontal: marginHorizontal || 0,
      position: position,
      top: top,
      textAlign: textAlign,
      bottom: mBottom,
      lineHeight: lineHeight,
      maxWidth: maxWidth,
      minWidth: minWidth,
    },
    button: {
      backgroundColor: backgroundColor || Colors.BLUE_ONE,
      padding: padding || 0,
      borderRadius: radius || 0,
      alignItems: alignItem,
    },
    buttonText: {
      fontSize: fontSize || AppConfig.PT20,
      color: textColor || Colors.COLOR_WHITE,
      fontFamily: fontFamily || AppConfig.FRANK_BLACK_FONT,
    },

    viewTopLeftContainer: {
      position: 'absolute',
      width: width || 'auto',
      height: height || 'auto',
      top: mTop || 0,
      left: mLeft || undefined,
      textAlign: 'center',
    },
    viewTopRightContainer: {
      position: 'absolute',
      width: width || 'auto',
      height: height || 'auto',
      top: mTop || 0,
      right: mRight || 0,
      alignItems: alignItem || 'center',
    },
    viewBottomRightContainer: {
      position: 'absolute',
      width: width || 'auto',
      height: height || 'auto',
      bottom: mBottom || 0,
      right: mRight || 0,
      alignItems: alignItem || 'center',
    },
    viewBottomLeftContainer: {
      position: 'absolute',
      width: width || 'auto',
      height: height || 'auto',
      bottom: mTop || 0,
      left: mLeft || 0,
      alignItems: alignItem || 'center',
    },
    viewContainer: {
      flexDirection: direction || 'column',
      marginLeft: marginLeft || 0,
      marginRight: marginRight || 0,
      marginTop: marginTop || 0,
      marginBottom: marginBottom || 0,
      justifyContent: justifyContent,
      alignItems: alignItem,
    },
    mTop: {
      marginTop: mTop || 0,
    },
    mBottom: {
      marginBottom: mBottom || 0,
    },
    mleft: {
      marginLeft: mLeft || 0,
    },
    mRight: {
      marginRight: mRight || 0,
    },
    mVertical: {
      marginVertical: mVertical || 0,
    },
    image: {
      width: width,
      height: height,
      resizeMode: resizeMode || 'contain',
      borderRadius: borderRadius || 0,
      tintColor: tintColor,
    },
  });
};
