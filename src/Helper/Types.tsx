import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {StyleProp, ViewStyle} from 'react-native';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export type Record = {
  timecode: FirebaseFirestoreTypes.Timestamp;
  id: string;
  data: Detail[];
};

export type Model = {
  index: Number;
  name: string;
};

export type Level = {
  title: string;
  data: Model[];
};

export type Student = {
  id: string;
  classday: string;
  name: string;
  progress?: string;
  index?: string;
};

export type StudentRegis = {
  id: string;
  classday: string;
  studentName: string;
  modelName: string;
  progress?: string;
  index?: string;
  level: string;
};

export type Detail = {
  id?: string;
  studentName?: string;
  modelName?: string;
  progress?: string;
  index?: Number;
  level?: Number;
};

export type regisState = {
  count: number;
  loading: boolean;
  query: string;
  student: Student[];
  models: Level[];
  detail: Detail;
};

export type Action =
  | {type: 'setdetail'; detail: Detail}
  | {type: 'setstudent'; student: Student[]}
  | {type: 'setquery'; query: string}
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

export type TabScreenNavProp = BottomTabNavigationProp<RootTabParamList>;

export type Props = {
  route: undefined;
  navigation: TabScreenNavProp;
};
