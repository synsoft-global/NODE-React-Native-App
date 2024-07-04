import React from 'react';
import {ActivityIndicator, Modal, View} from 'react-native';

import styles from './styles';

/**
 * Define loding view
 * @param {isVisible} props
 * @returns Loading indicator view
 */
const LoadingView = (props: any) => {
  return (
    <Modal
      transparent={true}
      visible={props.isVisible}
      onRequestClose={() => {
        !props.isVisible;
      }}>
      <View style={styles.container}>
        <ActivityIndicator size={'large'} color={'#E4C7E1'} />
      </View>
    </Modal>
  );
};

export default LoadingView;
