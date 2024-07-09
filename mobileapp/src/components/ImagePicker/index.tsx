/***
 *
 * Custom Image Picker Component
 *
 */
import React from 'react';
import {
  View,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
  CameraOptions,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import styles from './style';
import {TextViewComponent} from '../viewComponents';
import * as Constants from 'utils/constants';
import {showMessageAlert} from 'src/utils/apputils';

interface IProps {
  ref: React.RefObject<ActionSheetRef>;
  selectedImage: (value: ImagePickerResponse) => void;
  showHideView: (value: boolean) => void;
}

const ImagePicker = (props: IProps) => {
  // Handle camera click
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

  // Open Camera
  const openCamera = () => {
    const options: CameraOptions = {
      mediaType: Constants.MEDIA_TYPE,
      quality: 0.6,
      maxWidth: 380,
      maxHeight: 560,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        return;
      }
      if (response.errorCode && response.errorMessage) {
        showMessageAlert(response.errorMessage);
        return;
      }
      props.showHideView(false);
      props.selectedImage(response);
    });
  };

  // Open Gallery & Image Picker
  const openImagePicker = () => {
    
    const options: ImageLibraryOptions = {
      maxWidth: 256,
      maxHeight: 256,
      mediaType: Constants.MEDIA_TYPE,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        return;
      }
      if (response.errorCode && response.errorMessage) {
        showMessageAlert(response.errorMessage);
        return;
      }
      props.showHideView(false);
      props.selectedImage(response);
    });
  };

  return (
    <ActionSheet ref={props.ref}>
      <View style={styles.container}>
        <TextViewComponent
          style={styles.titleText}
          text={Constants.IMAGE_PICKER_HEADING}
        />
        <TouchableOpacity onPress={openImagePicker}>
          <TextViewComponent
            text={Constants.TEXT_GALLERY}
            style={styles.text}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={_onCameraClick}>
          <TextViewComponent text={Constants.TAKE_CAMERA} style={styles.text} />
        </TouchableOpacity>
      </View>
    </ActionSheet>
  );
};

export default ImagePicker;
