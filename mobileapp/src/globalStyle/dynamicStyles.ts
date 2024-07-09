import { StyleSheet } from 'react-native';
import Colors from 'utils/colors';
import AppConfig from 'appConfig';
import { DynamicStylesProps } from 'src/types';

/**
 * Create dynamic global styles based on props.
 * @param props style props
 * @returns dynamic style based on props
 */
export const generateDynamicStyles = (props: DynamicStylesProps) => {
  const {
    fontSize,
    textColor,
    fontFamily,
    backgroundColor,
    marginBottom,
    marginTop,
    marginLeft,
    marginRight,
    marginHorizontal,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    mBottom,
    textAlign,
    position,
    top,
    lineHeight,
    maxWidth,
    minWidth,
  } = props;

  return StyleSheet.create({
    text: {
      fontSize: fontSize || AppConfig.PT16,
      color: textColor || Colors.COLOR_WHITE,
      fontFamily: fontFamily || AppConfig.MONTSERRAT_MEDIUM_FONT,
      backgroundColor: backgroundColor || 'transparent',
      marginTop: marginTop || 0,
      marginBottom: marginBottom || 0,
      marginLeft: marginLeft || 0,
      marginRight: marginRight || 0,
      paddingTop: paddingTop || 0,
      paddingBottom: paddingBottom || 0,
      paddingLeft: paddingLeft || 0,
      paddingRight: paddingRight || 0,
      marginHorizontal: marginHorizontal || 0,
      position: position || 'relative',
      top: top || 0,
      textAlign: textAlign || 'left',
      bottom: mBottom || 0,
      lineHeight: lineHeight || 0,
      maxWidth: maxWidth || 0,
      minWidth: minWidth || 0,
    },
  });
};
