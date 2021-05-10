import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {StyleProp, ViewStyle} from 'react-native';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export type Record = {
  timecode: FirebaseFirestoreTypes.Timestamp;
  id: String;
  data: Detail[];
};

export type Model = {
  index: Number;
  name: String;
};

export type Level = {
  title: String;
  data: Model[];
};

export type Student = {
  id: string;
  classday: String;
  name: String;
  progress?: String;
  index?: String;
};

export type Detail = {
  id?: String;
  studentName?: String;
  modelName?: String;
  progress?: String;
  index?: Number;
  level?: Number;
};

export type Action =
  | {type: 'setdetail'; detail: Detail}
  | {type: 'setstudent'; student: Student[]}
  | {type: 'setquery'; query: String}
  | {type: 'setmodel'; models: Level[]}
  | {type: 'setloading'; loading: Boolean};

export type mylistProp = {
  data: any[];
  style: StyleProp<ViewStyle>;
  selection: (...args: any[]) => any;
  rendererItem: any;
};

export type RootTabParamList = {
  Home: undefined;
  Report: undefined;
};

export type TabScreenNavProp = BottomTabNavigationProp<
  RootTabParamList,
  'Home'
>;

export type Props = {
  route: undefined;
  navigation: TabScreenNavProp;
};
