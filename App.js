/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useState} from 'react';
import {StatusBar, View} from 'react-native';
import {Icon, Text, ThemeProvider, Button} from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MarkingScreen = () => {
  const [marks, setMarks] = useState([]);
  const [db, setDb] = useState([1, 2, 3, 4]);
  const [count, setCount] = useState(false);

  const EmptyList = () => (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
        EMPTY
      </Text>
    </View>
  );

  return (
    <FlatList
      style={{backgroundColor: '$black'}}
      ListEmptyComponent={EmptyList}
      contentContainerStyle={{backgroundColor: '#191919', minHeight: '100%'}}
    />
  );
};

const RecordsScreen = () => {
  return (
    <View style={{backgroundColor: '#070707', minHeight: '100%'}}>
      <Text>Records Screen</Text>
    </View>
  );
};

const RecordNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#191919'},
        headerTitleStyle: {color: 'white'},
      }}>
      <Stack.Screen name="Records" component={RecordsScreen} />
    </Stack.Navigator>
  );
};

const StudentsScreen = function StudentsScreen({style}) {
  return (
    <View style={style}>
      <Text>Students Screen</Text>
    </View>
  );
};

const App = () => {
  const tabBarOptions = {
    labelStyle: {fontSize: 13, marginTop: -6},
    style: {
      backgroundColor: '#191919',
      borderTopColor: 'transparent',
      height: 55,
    },
  };

  const recordsOption = {
    tabBarIcon: ({focused, color, size}) => {
      let iconName;
      return <Icon name="home" type="feather" color={color} size={30}></Icon>;
    },
  };

  const theme = {
    Text: {style: {color: 'white'}},
  };

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StatusBar backgroundColor="black" />
        <Tab.Navigator tabBarOptions={tabBarOptions}>
          <Tab.Screen
            name="Records"
            component={RecordNavigator}
            options={recordsOption}
          />
          <Tab.Screen name="Students" component={StudentsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
