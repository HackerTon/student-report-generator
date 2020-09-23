import React from 'react';
import {View, FlatList} from 'react-native';
import {TextInput, Text, ListItem, Icon, Button} from 'react-native-elements';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RegistrationScreen} from '../Registration/Registration';

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

const HomeScreen = ({route, navigation}) => {
  const keyExtractor = (_, index) => index.toString();

  const RenderItem = ({item, _}) => (
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
          flex: 0,
          flexDirection: 'column',
          alignItems: 'flex-end',
          backgroundColor: 'black',
        }}>
        <Button containerStyle={{margin: 10}} title="Create" />
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

  const recordsOption = {
    tabBarIcon: ({focused, color, size}) => {
      return <Icon name="home" type="feather" color={color} size={30}></Icon>;
    },
  };

  return (
    <Tab.Navigator tabBarOptions={tabBarOptions}>
      <Tab.Screen name="Home" component={HomeScreen} options={recordsOption} />
      {/* <Tab.Screen name="Student Registration" component={RegistrationScreen} /> */}
    </Tab.Navigator>

    // <Stack.Navigator
    //   screenOptions={{
    //     headerStyle: {backgroundColor: '#191919'},
    //     headerTitleStyle: {color: 'white'},
    //   }}
    //   initialRouteName="Records">
    //   <Stack.Screen name="Records" component={RecordsScreen} />
    //   <Stack.Screen name="StudentPerformance" component={StudentPerformance} />
    //   <Stack.Screen name="CreatePage" component={MarkingScreen} />
    // </Stack.Navigator>
  );
};

export default HomeNavigator;
