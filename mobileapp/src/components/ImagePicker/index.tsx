/***
 *
 * Custom Image Picker Component
 *
 */
import {
  View,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import React from 'react';
import ActionSheet from 'react-native-actions-sheet';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import styles from './style';
import {TextViewComponent} from '../viewComponents';
import * as Constants from '@utils/constants';

interface IProps {
  refs: any;
  selectedImage: (value: any) => any;
  showHideView: (value: boolean) => any;
}

const ImagePicker = (props: IProps) => {
  // Handle on camera click
  const _onCameraClick = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: Constants.CAMERA_PERMISSION_TITLE,
            message: Constants.CAMERA_PERMISSION_MESSAGE,
            buttonNeutral: Constants.ASK_ME_LATER,
            buttonNegative: Constants.TEXT_CANCEL,
            buttonPositive: Constants.TEXT_OK,
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          openCamera();
        } else {
          console.log('Camera permission denied');
        }
      } else {
        openCamera();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  //Open Camera
  const openCamera = () => {
    // actionSheetRef.current?.hide();
    const options: any = {quality: 0.6, maxWidth: 380, maxHeight: 560};
    launchCamera(options, (response: any) => {
      if (response.didCancel) {
        return;
      }
      if (response.errorCode) {
        // AlertUtils.showMessageAlert(response.errorMessage)
        return;
      }

      props.showHideView(false);
      props.selectedImage(response);
    });
  };

  //Open Gallery & Image Picker
  const openImagePicker = async () => {
    const options: any = {
      title: '',
      maxWidth: 256,
      maxHeight: 256,
      storageOptions: {
        skipBackup: true,
      },
      noData: true,
      mediaType: 'photo',
    };
    launchImageLibrary(options, (response: any) => {
      // if (response.didCancel) {
      //   console.log('User cancelled image picker');
      // } else if (response.error) {
      //   console.log('Image picker error: ', response.error);
      // } else {
      //   let imageUri = response.uri || response.assets?.[0]?.uri;
      //   setSelectedImage(imageUri);
      // }

      props.showHideView(false);
      if (response.didCancel) {
        return;
      }

      if (response.errorCode) {
        // AlertUtils.showMessageAlert(response.errorMessage)
        return;
      }

      props.showHideView(false);
      props.selectedImage(response);
    });
  };

  return (
    <>
      <ActionSheet ref={props.refs}>
        <View style={styles.container}>
          <TextViewComponent style={styles.titleText} text={Constants.IMAGE_PICKER_HEADING} />
          <TouchableOpacity onPress={() => openImagePicker()}>
            <TextViewComponent
              text={Constants.TEXT_GALLERY}
              style={styles.text}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={_onCameraClick}>
            <TextViewComponent
              text={Constants.TAKE_CAMERA}
              style={styles.text}
            />
          </TouchableOpacity>
        </View>
      </ActionSheet>
    </>
  );
};

export default ImagePicker;
