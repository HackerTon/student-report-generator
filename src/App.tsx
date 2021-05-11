import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {createContext, useReducer, Dispatch} from 'react';
import {StatusBar} from 'react-native';
import {ThemeProvider} from 'react-native-elements';
import {MenuProvider} from 'react-native-popup-menu';
import {Action, Detail, regisState} from './Helper/Types';
import Form from './UI/Home/Form';
import HomeNavigator from './UI/Home/Home';
import ReportStudent from './UI/Home/ReportStudent';

const Stack = createStackNavigator();

// Definition of reducer for use in useContext
const initialState = {
  count: 0,
  loading: true,
  query: '',
  student: [],
  models: [],
  prevModel: -1,
  detail: {
    id: '',
    index: 0,
    level: 0,
    progress: '',
    studentName: '',
    modelName: '',
  },
};

const reducer = (state: regisState, action: Action) => {
  switch (action.type) {
    case 'setdetail':
      const thisdetail = {...state.detail, ...action.detail};
      return {
        ...state,
        count: state.count + 1,
        detail: thisdetail,
      };
    case 'setstudent':
      return {...state, student: action.student};
    case 'setquery':
      return {...state, query: action.query};
    case 'setmodel':
      return {...state, models: action.models};
    case 'setloading':
      return {...state, loading: action.loading};
    case 'setprevmodel':
      return {...state, prevModel: action.prevmodel};
    case 'resetcount':
      return {...state, count: 0};
    default:
      throw new Error('no type for this ' + action);
  }
};

export const DetailDispatch = createContext<{
  state: regisState;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

export const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const theme = {
    Text: {style: {color: '#FFFFFF', opacity: 0.87}},
  };

  return (
    <DetailDispatch.Provider value={{state, dispatch}}>
      <ThemeProvider theme={theme}>
        <StatusBar backgroundColor="black" />
        <MenuProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: {backgroundColor: '#191919'},
                headerTintColor: '#FFFFFF',
                headerTitleStyle: {color: '#FFFFFF', opacity: 0.87},
                animationEnabled: false,
              }}>
              <Stack.Screen name="History" component={HomeNavigator} />
              <Stack.Screen name="Report" component={ReportStudent} />
              <Stack.Screen name="Form" component={Form} />
            </Stack.Navigator>
          </NavigationContainer>
        </MenuProvider>
      </ThemeProvider>
    </DetailDispatch.Provider>
  );
};
