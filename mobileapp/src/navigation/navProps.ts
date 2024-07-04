// NavigationTypes.ts
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import * as Constants from '@utils/constants';

type RootStackParamList = {
  [Constants.KEY_LOGIN]: undefined;
  [Constants.KEY_SPLASH]: undefined;
  [Constants.KEY_MOVIEW]: undefined;
  [Constants.KEY_AD_EDIT_MOBIE]: undefined;
  // Add other screens as needed
};

export type NavigationProps<T extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
};
