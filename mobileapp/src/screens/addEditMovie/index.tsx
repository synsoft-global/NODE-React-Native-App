/**
 * Define Add Edit Movie screen functional component
 */
import React, {useEffect, useRef, useState} from 'react';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import {globalStyles} from 'globalStyle/index';
import {
  ButtonComponent,
  ImageComponentNoPress,
  TextInputComponent,
  TextViewComponent,
} from 'components/viewComponents';
import * as Constants from 'utils/constants';
import colors from 'utils/colors';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {emptyTextValidation} from 'src/utils/validationsUtils';

import {
  addMovie,
  editMovie,
  uploadImage,
} from 'src/redux/actions/getMovieList';
import ImagePicker from 'components/ImagePicker';
import {showSnackbarMessage} from 'utils/apputils';
import DropDownComponent from 'components/dropDownComponent';
import styles from './styles';
import {ActionSheetRef} from 'react-native-actions-sheet';
import {MoviesItemType} from 'src/types';
import {ImagePickerResponse} from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import { updateMovieList } from 'src/redux/reducer/movieSlice';

//Imports images and icons
const bottomBg = require('assets/img/bottom_bg.png');
const uploadIcon = require('assets/img/upload.png');

/**
 * Define add edit movie functional component
 * @returns Add Edit Movie View
 */
const AddEditMovie = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const route = useRoute();
  const {movieInfo} = route?.params as {movieInfo: MoviesItemType};
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [titleError, setTitleError] = useState('');
  const [imgUri, setImgUri] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const actionSheetRef = useRef<ActionSheetRef>(null);

  useEffect(() => {
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
          .then((result:any) => {
            console.log('result---', result);
            setIsLoading(false);
            dispatch(updateMovieList(result.movie));
            navigation.goBack();
          })
          .catch(error => {
            setIsLoading(false);
            console.log('error---', error);
          });
      } else {
        editMovie(request, movieInfo.id.toString())
          .then((result: any) => {
            console.log('result---', result);
            setIsLoading(false);
            dispatch(updateMovieList(result.movie));
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
    uri: string,
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
        <DropDownComponent
          onChange={(value: string) => setYear(value)}
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
        ref={actionSheetRef}
        selectedImage={(response: ImagePickerResponse) => {
          if (response) {
            console.log('response----', response);
            const {assets} = response;

            if (assets && assets.length > 0) {
              const {uri, type, fileName} = assets[0];
              if (uri && type && fileName) {
                uploadImagetoServer(uri, type, fileName);
              } else {
                setImgUri('');
              }
            } else {
              setImgUri('');
            }
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
