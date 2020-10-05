import React from 'react';
import {View, FlatList} from 'react-native';
import {ListItem, Icon, Button} from 'react-native-elements';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import RegistrationScreen from '../Regis/Registration';
import {ReadData, WriteData} from '../../Helper';

const Demo = [
  [
    {
      name: 'alan',
      level: '2',
      model: '3',
      status: 'programming',
      selected: false,
    },
  ],
  [
    {
      name: 'alan',
      level: '2',
      model: '3',
      status: 'programming',
      selected: false,
    },
  ],
  [
    {
      name: 'alan',
      level: '2',
      model: '3',
      status: 'programming',
      selected: false,
    },
  ],
  [
    {
      name: 'alan',
      level: '2',
      model: '3',
      status: 'programming',
      selected: false,
    },
  ],
  [
    {
      name: 'alan',
      level: '2',
      model: '3',
      status: 'programming',
      selected: false,
    },
  ],
  [
    {
      name: 'alan',
      level: '2',
      model: '3',
      status: 'programming',
      selected: false,
    },
  ],
];

const Tab = createBottomTabNavigator();

const HomeScreen = ({navigation}) => {
  const keyExtractor = (_, index) => index.toString();

  const RenderItem = ({}) => (
    <ListItem
      containerStyle={{
        backgroundColor: 'black',
        borderColor: 'white',
        borderWidth: 2,
        margin: 10,
      }}>
      <ListItem.Content>
        <ListItem.Title h4>{'Date'}</ListItem.Title>
        <ListItem.Subtitle style={{color: 'white'}}>
          {`1. Monday \n2. Tuesday`}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );

  return (
    <>
      <View style={{flex: 1}}>
        <FlatList
          style={{backgroundColor: 'black'}}
          keyExtractor={keyExtractor}
          data={Demo}
          renderItem={RenderItem}
        />
      </View>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'flex-end',
          backgroundColor: 'black',
        }}>
        <Button
          containerStyle={{margin: 10}}
          title="Create"
          onPress={() => navigation.navigate('Report')}
        />
      </View>
    </>
  );
};

const HomeNavigator = () => {
  const tabBarOptions = {
    labelStyle: {fontSize: 13, marginTop: -6},
    style: {
      backgroundColor: '#191919',
      borderTopColor: 'transparent',
      height: 55,
    },
  };

  const homeOptions = {
    tabBarIcon: ({color}) => {
      return <Icon name="home" type="feather" color={color} size={30}></Icon>;
    },
  };

  const registrationOptions = {
    tabBarIcon: ({color}) => {
      return <Icon name="user" type="feather" color={color} size={30}></Icon>;
    },
  };

  return (
    <Tab.Navigator tabBarOptions={tabBarOptions}>
      <Tab.Screen name="Home" component={HomeScreen} options={homeOptions} />
      <Tab.Screen
        name="Registration"
        component={RegistrationScreen}
        options={registrationOptions}
      />
    </Tab.Navigator>
  );
};

export default HomeNavigator;
