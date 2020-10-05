import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useState} from 'react';
import {StatusBar, View} from 'react-native';
import {Button, ThemeProvider} from 'react-native-elements';
import GeneratorPage from './UI/GeneratorPage';
import Form from './UI/Home/Form';
import HomeNavigator from './UI/Home/Home';
import ReportStudent from './UI/Home/ReportStudent';

const Stack = createStackNavigator();

const App = () => {
  const [page, setPage] = useState('first');

  const theme = {
    Text: {style: {color: 'white'}},
    Button: {
      containerStyle: {
        borderColor: 'grey',
        borderWidth: 1,
        padding: 1,
        backgroundColor: 'black',
      },
      titleStyle: {color: 'white', fontSize: 20},
      type: 'clear',
    },
  };

  if (page == 'main') {
    return (
      <View>
        <Button title="first" onPress={() => setPage('first')} />
        <Button title="second" onPress={() => setPage('second')} />
      </View>
    );
  } else if (page == 'first') {
    return (
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <StatusBar backgroundColor="black" />
          <Stack.Navigator>
            <Stack.Screen name="Records" component={HomeNavigator} />
            <Stack.Screen name="Report" component={ReportStudent} />
            <Stack.Screen name="Form" component={Form} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    );
  } else {
    return <GeneratorPage />;
  }
};

export default App;
