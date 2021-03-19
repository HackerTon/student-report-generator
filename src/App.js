import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useState} from 'react';
import {StatusBar, View, Text} from 'react-native';
import {Button, ThemeProvider} from 'react-native-elements';
import GeneratorPage from './UI/GeneratorPage';
import Form from './UI/Home/Form';
import HomeNavigator from './UI/Home/Home';
import ReportStudent from './UI/Home/ReportStudent';
import tailwind from 'tailwind-rn';
import {SafeAreaView} from 'react-native-safe-area-context';

const Stack = createStackNavigator();

const App = () => {
  const theme = {
    Text: {style: {color: '#FFFFFF', opacity: 0.87}},
  };

  return (
    <ThemeProvider theme={theme}>
      <StatusBar backgroundColor="black" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {backgroundColor: '#191919'},
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {color: '#FFFFFF', opacity: 0.87},
            animationTypeForReplace: 'push',
            animationEnabled: false,
          }}>
          <Stack.Screen name="Records" component={HomeNavigator} />
          <Stack.Screen name="Report" component={ReportStudent} />
          <Stack.Screen name="Form" component={Form} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );

  // if (page === 'main') {
  //   return (
  //     <View>
  //       <Button title="first" onPress={() => setPage('first')} />
  //       <Button title="second" onPress={() => setPage('second')} />
  //     </View>
  //   );
  // } else if (page === 'first') {

  // }
};

export default App;
