import {
  BottomTabBarOptions,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Text} from 'react-native';
import {Icon} from 'react-native-elements';
import Form from '../UI/Home/Form';
import {HomeScreen} from '../UI/Home/Home';
import ReportStudent from '../UI/Home/ReportStudent';
import RegistrationScreen from '../UI/Regis/Registration';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const homeOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({focused}) => {
    return (
      <Icon
        name="home"
        type="feather"
        color={focused ? '#BB86FC' : '#8E8E8F'}></Icon>
    );
  },
  tabBarLabel: ({focused}) => {
    return <Text style={{color: focused ? '#BB86FC' : '#8E8E8F'}}>Home</Text>;
  },
};

const regisOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({focused}) => {
    return (
      <Icon
        name="user"
        type="feather"
        color={focused ? '#BB86FC' : '#8E8E8F'}></Icon>
    );
  },
  tabBarLabel: ({focused}) => {
    return <Text style={{color: focused ? '#BB86FC' : '#8E8E8F'}}>User</Text>;
  },
};

const tabBarOptions: BottomTabBarOptions = {
  style: {
    backgroundColor: '#191919',
    borderTopWidth: 1,
    borderTopColor: 'grey',
  },
};

const HomeNavigator = () => {
  return (
    <Tab.Navigator tabBarOptions={tabBarOptions}>
      <Tab.Screen name="Home" component={HomeScreen} options={homeOptions} />
      <Tab.Screen
        name="Registration"
        component={RegistrationScreen}
        options={regisOptions}
      />
    </Tab.Navigator>
  );
};

export const Router = () => {
  return (
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
  );
};
