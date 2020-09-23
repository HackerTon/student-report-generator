import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useState} from 'react';
import {StatusBar, View} from 'react-native';
import {Button, ThemeProvider} from 'react-native-elements';
import GeneratorPage from './UI/GeneratorPage';
import HomeNavigator from './UI/Home/Home';

const Stack = createStackNavigator();


const App = () => {
  const [page, setPage] = useState('first');

  const theme = {
    Text: {style: {color: 'white'}},
    Button: {
      containerStyle: {
        width: '50%',
        borderColor: 'grey',
        borderWidth: 1,
        backgroundColor: 'black',
      },
      titleStyle: {color: 'white'},
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
          </Stack.Navigator>
        </NavigationContainer>
        {/* <NavigationContainer>
          <StatusBar backgroundColor="black" />
          <Tab.Navigator tabBarOptions={tabBarOptions}>
            <Tab.Screen
              name="Records"
              component={RecordNavigator}
              options={recordsOption}
            />
            <Tab.Screen name="Students" component={StudentsScreen} />
          </Tab.Navigator>
        </NavigationContainer> */}
      </ThemeProvider>
    );
  } else {
    return <GeneratorPage />;
  }
};

export default App;
