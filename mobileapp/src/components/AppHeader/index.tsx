import React from 'react';
import { View } from 'react-native';
import { ImageComponent, TextViewComponent } from '../viewComponents';
import styles from './styles';
import { AppHeaderProps } from 'src/types';

// Imports images and icons
const addIcon = require('assets/img/add_icon.png');
const uploadIcon = require('assets/img/upload_icon.png');


/**
 * Define header view used in app
 * @param props 
 * @returns header view
 */
const AppHeader: React.FC<AppHeaderProps> = ({ title, rightIcon, onRightPress, onAddClick }) => {
  return (
    <View style={styles.container}>
      <View style={styles.centerContainer}>
        <TextViewComponent
          text={title}
          style={styles.title}
        />
        <ImageComponent
          source={addIcon}
          imageStyle={styles.img}
          onImageClicked={onAddClick}
        />
      </View>
      
      {rightIcon && (
        <ImageComponent
          source={uploadIcon}
          onImageClicked={onRightPress}
        />
      )}
    </View>
  );
};

export default AppHeader;
