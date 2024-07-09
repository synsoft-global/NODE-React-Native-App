/**
 * Define movies list screen functional component
 */
import React, {useEffect, useState} from 'react';
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import {globalStyles} from 'globalStyle/index';
import {
  ButtonComponent,
  ImageComponentNoPress,
  TextViewComponent,
} from 'components/viewComponents';
import * as Constants from 'utils/constants';
import Colors from 'utils/colors';
import AppConfig from 'appConfig';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import AppHeader from 'components/AppHeader';
import {generateDynamicStyles} from 'globalStyle/dynamicStyles';
import LoadingView from 'components/LoadingView';
import {useDispatch, useSelector} from 'react-redux';
import {getMovieList} from 'src/redux/actions/getMovieList';
import {MoviesItemType} from 'src/types';
import {showMessageAlert} from 'utils/apputils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import {clearData} from 'src/redux/reducer/movieSlice';

const bottomBg = require('assets/img/bottom_bg.png');
const numColumns = 2;

/**
 * Define movie list screen functional component
 * @returns Movie list view
 */
const MovieListScreen = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const dispatch = useDispatch();
  const {isLoading, data, totalCount} = useSelector(
    (state: any) => state.movies,
  );
  const [pageNo, setPagNo] = useState(1);

  useEffect(() => {
    getMoviewList(pageNo);
  }, []);

  /**
   * Get moview list from server
   */
  const getMoviewList = (page: number) => {
    dispatch(getMovieList(page));
  };

  /**
   * Handle add button click
   */
  const handleAddNewMovieClick = (item: MoviesItemType | null) => {
    navigation.navigate(Constants.KEY_AD_EDIT_MOBIE, {movieInfo: item});
  };

  /**
   * Render list items view
   * @returns list items view
   */
  const renderListItems = ({item}: {item: MoviesItemType}) => {
    return (
      <TouchableOpacity
        style={styles.listItemView}
        onPress={() => handleAddNewMovieClick(item)}>
        <ImageComponentNoPress
          source={{uri: item.image}}
          //resizeMode={'contain'}
          imageStyle={styles.img}
        />
        <TextViewComponent
          style={
            generateDynamicStyles({
              fontSize: AppConfig.PT16,
              textColor: Colors.COLOR_WHITE,
              fontFamily: AppConfig.MONTSERRAT_BOLD_FONT,
              marginTop: 10,
              marginLeft: 10,
            }).text
          }
          text={item.title}
        />
        <TextViewComponent
          style={
            generateDynamicStyles({
              fontSize: AppConfig.PT14,
              textColor: Colors.COLOR_WHITE,
              fontFamily: AppConfig.MONTSERRAT_REGULAR_FONT,
              marginTop: 15,
              marginLeft: 10,
            }).text
          }
          text={new Date(item.publishingYear).getFullYear().toString()}
        />
      </TouchableOpacity>
    );
  };

  /**
   * Render empty view
   * @returns empty view
   */
  const renderListEmptyView = () => {
    if (isLoading) {
      return;
    }
    return (
      <View style={styles.emptyView}>
        <TextViewComponent
          style={styles.noItemText}
          text={Constants.EMPTY_LIST}
        />
        <ButtonComponent
          title={Constants.ADD_MOVIE}
          textStyle={globalStyles.buttonTextStyle}
          onPress={() => handleAddNewMovieClick(null)}
        />
      </View>
    );
  };

  /**
   * Event called on end reached of list
   */
  const onEndReachedList = () => {
    if (data?.length < totalCount * AppConfig.pageSize) {
      let newPage = pageNo + 1;
      setPagNo(newPage);
      getMoviewList(newPage);
    }
  };

  /**
   * Handle Logout from app
   */
  const onLogout = () => {
    console.log('onLogout');
    dispatch(clearData());
    AsyncStorage.clear();
    setTimeout(() => {
      navigation.navigate(Constants.KEY_LOGIN);
    }, 100);
  };

  /**
   * Show log out alert
   */
  const onLogoutUser = async () => {
    showMessageAlert(Constants.LOGOUT_ALERT_MSG, onLogout);
  };

  return (
    <View style={globalStyles.safeAreaStyle}>
      {data && data.length > 0 && (
        <AppHeader
          title={Constants.TEXT_MY_MOVIE}
          rightIcon={true}
          onAddClick={() => handleAddNewMovieClick(null)}
          onRightPress={onLogoutUser}
        />
      )}

      <FlatList
        data={data}
        numColumns={numColumns}
        contentContainerStyle={styles.flatListContentContainer}
        renderItem={renderListItems}
        ListEmptyComponent={renderListEmptyView}
        onEndReached={onEndReachedList}
        onEndReachedThreshold={0.3}
      />
      <Image style={globalStyles.bottomCurveBg} source={bottomBg} />
      <LoadingView isVisible={isLoading} />
    </View>
  );
};

export default MovieListScreen;
