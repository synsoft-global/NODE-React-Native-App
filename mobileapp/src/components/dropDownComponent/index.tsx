import React from 'react';
import {StyleSheet, View} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { globalStyles } from '@src/globalStyle';
import * as Constants from '@utils/constants';


const DropdownComponent = (props: any) => {


  return (
    <View style={styles.container}>
      {/* {renderLabel()} */}
      <Dropdown
        style={globalStyles.inputContainerStyle}
        placeholderStyle={globalStyles.inputTextStyle}
         selectedTextStyle={globalStyles.inputTextStyle}
        data={Constants.yearDropDownData}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={Constants.TEXT_PUBLISH_YEAR}
        value={props.value}
        onChange={item => {
          props.onChange(item.value)
        }}
        
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
});
