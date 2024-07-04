/**
 * Define login screen functional component
 */
import React, {createRef, useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {globalStyles} from '@globalStyle/index';
import {
  ButtonComponent,
  ImageComponentNoPress,
  TextInputComponent,
  TextViewComponent,
} from '@components/viewComponents';
import * as Constants from '@utils/constants';
import colors from '@utils/colors';
import {useNavigation, useRoute} from '@react-navigation/native';
import {emptyTextValidation} from '@src/utils/validationsUtils';

import {
  addMovie,
  editMovie,
  uploadImage,
} from '@src/redux/actions/getMovieList';
import ImagePicker from '@src/components/ImagePicker';
import {showSnackbarMessage} from '@src/utils/apputils';
import DropDownComponent from '@src/components/dropDownComponent';
import styles from './styles';

const bottomBg = require('@assets/img/bottom_bg.png');
const uploadIcon = require('@assets/img/upload.png');

const AddEditMovie = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {movieInfo}: any = route.params;
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [titleError, setTitleError] = useState('');
  const [imgUri, setImgUri] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const actionSheetRef: any = createRef();

  useEffect(() => {
    console.log('movieInfo----', movieInfo);
    if (movieInfo !== null) {
      setTitle(movieInfo.title);
      setYear(new Date(movieInfo.publishingYear).getFullYear().toString());
      setImgUri(movieInfo.image);
    }
  }, []);

  /**
   * Handle submit button click
   */
  const handleSubmit = () => {
    if (validateInput()) {
      setIsLoading(true);
      let request = {
        title: title,
        publishingYear: year,
        image: imgUri,
      };

      if (movieInfo === null) {
        addMovie(request)
          .then(result => {
            console.log('result---', result);
            setIsLoading(false);
            navigation.goBack();
          })
          .catch(error => {
            setIsLoading(false);
            console.log('error---', error);
          });
      } else {
        editMovie(request, movieInfo.id.toString())
          .then(result => {
            console.log('result---', result);
            setIsLoading(false);
            navigation.goBack();
          })
          .catch(error => {
            setIsLoading(false);
            console.log('error---', error);
          });
      }
    }
  };

  /**
   * Validate inputs
   * @returns true/false
   */
  const validateInput = () => {
    let isValid = true;
    if (emptyTextValidation(title)) {
      setTitleError(Constants.REQUIRED_MOVIE_TITLE);
      return false;
    } else {
      setTitleError('');
      isValid = true;
    }

    if (emptyTextValidation(year)) {
      showSnackbarMessage(Constants.REQUIRED_MOVIE_YEAR);
      return false;
    } else {
      isValid = true;
    }

    if (emptyTextValidation(imgUri)) {
      showSnackbarMessage(Constants.REQUIRED_MOVIE_IMAGE);
      return false;
    } else {
      isValid = true;
    }

    return isValid;
  };

  /**
   * Event Called on Image Upload
   */
  const onImageUpload = () => {
    showHideImagePickerDialog(true);
  };

  /**
   * Show & Hide Image Picker
   * @param isShow
   */
  const showHideImagePickerDialog = (isShow: boolean) => {
    if (isShow) {
      actionSheetRef.current?.show();
    } else {
      actionSheetRef.current?.hide();
    }
  };

  /**
   * Upload Image to Server API Called
   * @param uri
   * @param type
   */
  const uploadImagetoServer = async (
    uri: any,
    type: string,
    fileName: string,
  ) => {
    // setLoading(true);
    const uploadImg: any = await uploadImage(uri, type, fileName);
    console.log('uploadImg---', uploadImg);

    if (uploadImg?.status === 201 && uploadImg?.data) {
      setImgUri(uploadImg?.data?.filePath);
      //   setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={globalStyles.safeAreaStyle}>
      <View style={styles.container}>
        <TextViewComponent
          style={styles.title}
          text={Constants.TEXT_CRATE_MOVIE}
        />
        <TextInputComponent
          inputContainer={styles.inputView}
          containerStyle={globalStyles.inputContainerStyle}
          inputStyle={globalStyles.inputTextStyle}
          placeholder={Constants.TEXT_TITLE}
          placeholderTextColor={colors.COLOR_WHITE}
          value={title}
          error={titleError}
          onChangeText={(text: string) => {
            setTitle(text);
          }}
        />
        {/* <TextInputComponent
          inputContainer={styles.inputView}
          containerStyle={globalStyles.inputContainerStyle}
          inputStyle={globalStyles.inputTextStyle}
          placeholder={Constants.TEXT_PUBLISH_YEAR}
          placeholderTextColor={colors.COLOR_WHITE}
          value={year}
          error={yearError}
          onChangeText={(text: string) => {
            setYear(text);
          }}
        /> */}
        <DropDownComponent
           onChange={(value: string) =>setYear(value)}
           value={year}
        />
        <TouchableOpacity
          style={styles.uploadImageView}
          onPress={onImageUpload}>
          {emptyTextValidation(imgUri) ? (
            <View style={styles.emptyImageView}>
              <ImageComponentNoPress
                source={uploadIcon}
                imageStyle={styles.uploadIcon}
              />
              <TextViewComponent
                style={globalStyles.inputTextStyle}
                text={Constants.TEXT_UPLOAD_IMAGE}
              />
            </View>
          ) : (
            <ImageComponentNoPress
              imageStyle={styles.img}
              source={{uri: imgUri}}
            />
          )}
        </TouchableOpacity>
        <View style={styles.buttonRow}>
          <ButtonComponent
            title={Constants.TEXT_CANCEL}
            textStyle={globalStyles.buttonTextStyle}
            btnStyle={styles.cancelButton}
            onPress={() => navigation.goBack()}
            // isLoading={isLoading}
          />
          <ButtonComponent
            title={Constants.TEXT_SUBMIT}
            textStyle={globalStyles.buttonTextStyle}
            btnStyle={styles.button}
            onPress={handleSubmit}
            isLoading={isLoading}
          />
        </View>
      </View>
      <Image style={globalStyles.bottomCurveBg} source={bottomBg} />
      <ImagePicker
        refs={actionSheetRef}
        selectedImage={(response: any) => {
          if (response) {
            console.log('response----', response);

            uploadImagetoServer(
              response?.assets[0]?.uri,
              response?.assets[0]?.type,
              response?.assets[0]?.fileName,
            );
          } else {
            setImgUri('');
          }
        }}
        showHideView={(value: boolean) => showHideImagePickerDialog(value)}
      />
    </ScrollView>
  );
};

export default AddEditMovie;
