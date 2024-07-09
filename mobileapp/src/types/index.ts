import {
  ImageSourcePropType,
  ImageStyle,
  TextStyle,
  ViewStyle,
} from 'react-native';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AddMovieRequest {
  title: string;
  publishingYear: string;
  image: string;
}

export interface AddMovieResponse {
  message: string;
  movie?: MoviesItemType;
}

export interface MoviesItemType {
  createdAt: string;
  id: string;
  image: string;
  publishingYear: string;
  title: string;
  updatedAt: string;
  userId: number;
}

export interface GetMovieListResponse {
  movies: MoviesItemType[];
  totalCount: number;
}

export interface AppHeaderProps {
  title: string;
  rightIcon?: boolean;
  onRightPress?: () => void;
  onAddClick: () => void;
}

export interface DropdownComponentProps {
  value: string;
  onChange: (value: string) => void;
}

export interface LoadingViewProps {
  isVisible: boolean;
}

export interface TextViewProps {
  text: string;
  style?: TextStyle;
  onPress?: () => void;
}

export interface ButtonProps {
  title: string;
  btnStyle?: ViewStyle;
  onPress: () => void;
  isLoading?: boolean;
  showLeftIcon?: boolean;
  leftIcon?: ImageSourcePropType;
  leftIconStyle?: ImageStyle;
  showRightIcon?: boolean;
  rightIcon?: ImageSourcePropType;
  textStyle?: TextStyle | ViewStyle; // Union type of TextStyle and ViewStyle
  disabled?: boolean;
}

export interface TextInputProps {
  inputContainer?: ViewStyle;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle | TextStyle;
  error?: string;
  placeholder?: string;
  placeholderTextColor?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
}

export interface ImageComponentProps {
  source: ImageSourcePropType;
  containerStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
  disabled?: boolean;
  onImageClicked?: () => void;
}

export interface ImageComponentNoPressProps {
  source: ImageSourcePropType;
  imageStyle?: ImageStyle;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
}

export interface DynamicStylesProps {
  fontSize?: number;
  textColor?: string;
  fontFamily?: string;
  backgroundColor?: string;
  marginBottom?: number;
  marginTop?: number;
  marginLeft?: number;
  marginRight?: number;
  marginHorizontal?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  mBottom?: number;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  position?: 'absolute' | 'relative';
  top?: number;
  lineHeight?: number;
  maxWidth?: number;
  minWidth?: number;
}

export interface MoviesState {
  isLoading: boolean;
  data: MoviesItemType[];
  error: string | null;
}

export interface GetMovieListPayload {
  page: number;
}

export interface UserDataType {
  message: string;
  user: UserType;
  token: string;
}

export interface UserType {
  id: number;
  name: string;
  email: string;
}

// Define the payload type for the rejected value
export interface ErrorResponse {
  message: string;
}
