import firestore from '@react-native-firebase/firestore';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Button, Icon, ListItem} from 'react-native-elements';
import {MyList} from '../List';
import RegistrationScreen from '../Regis/Registration';

const Tab = createBottomTabNavigator();

const HomeScreen = ({navigation}) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const subscribe = firestore()
      .collection('history')
      .orderBy('timecode', 'asc')
      .onSnapshot((snapshot) => {
        let history = [];
        snapshot.forEach((document) => {
          history.push({...document.data(), id: document.id});
          setHistory(history);
        });
      });

    return () => subscribe();
  }, []);

  const RenderItem = ({item}) => (
    <ListItem
      containerStyle={{
        backgroundColor: 'black',
        borderColor: 'white',
        borderWidth: 1.5,
        margin: 10,
      }}>
      <ListItem.Content>
        <ListItem.Title h4>{moment(item.timecode).format('ll')}</ListItem.Title>
        <ListItem.Subtitle style={{color: 'white'}}>
          {item.txt}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );

  return (
    <>
      <View style={{flex: 1, backgroundColor: 'black'}}>
        <MyList data={history} rendererItem={RenderItem} />
      </View>
      <Button
        icon={<Icon name="add" size={40} color="white" />}
        onPress={() => {
          navigation.navigate('Report');
        }}
        containerStyle={{
          position: 'absolute',
          right: 10,
          bottom: 10,
          borderRadius: 100,
        }}
      />
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
