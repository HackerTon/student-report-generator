import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StatusBar} from 'react-native';
import {ThemeProvider} from 'react-native-elements';
import {MenuProvider} from 'react-native-popup-menu';
import Form from './UI/Home/Form';
import HomeNavigator from './UI/Home/Home';
import ReportStudent from './UI/Home/ReportStudent';

const Stack = createStackNavigator();

const App = () => {
  const theme = {
    Text: {style: {color: '#FFFFFF', opacity: 0.87}},
  };

  return (
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
  );
};

export default App;
