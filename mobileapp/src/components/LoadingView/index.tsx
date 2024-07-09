import React from 'react';
import {ActivityIndicator, Modal, View} from 'react-native';

import styles from './styles';
import {LoadingViewProps} from 'src/types';

/**
 * Define loading view
 * @param {LoadingViewProps} props
 * @returns Loading indicator view
 */
const LoadingView: React.FC<LoadingViewProps> = ({isVisible}) => {
  return (
    <Modal transparent={true} visible={isVisible} onRequestClose={() => {}}>
      <View style={styles.container}>
        <ActivityIndicator size={'large'} color={'#E4C7E1'} />
      </View>
    </Modal>
  );
};

export default LoadingView;
