import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { globalStyles } from 'src/globalStyle';
import * as Constants from 'utils/constants';
import { DropdownComponentProps } from 'src/types';
/**
 * DropdownComponent - A custom dropdown component
 * @param {DropdownComponentProps} props - The props for the component including value and onChange callback
 * @returns {JSX.Element} The rendered component
 */
const DropdownComponent: React.FC<DropdownComponentProps> = ({ value, onChange }) => {
  return (
    <View style={styles.container}>
      <Dropdown
        style={globalStyles.inputContainerStyle} 
        placeholderStyle={globalStyles.inputTextStyle} 
        selectedTextStyle={globalStyles.inputTextStyle} 
        data={Constants.yearDropDownData}
        maxHeight={300}
        labelField="label" 
        valueField="value"
        placeholder={Constants.TEXT_PUBLISH_YEAR}
        value={value}
        onChange={item => {
          onChange(item.value);
        }}
      />
    </View>
  );
};

export default DropdownComponent;

// Styles specific to the DropdownComponent
const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
});
