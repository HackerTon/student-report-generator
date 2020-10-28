import firestore from '@react-native-firebase/firestore';
import {
  BottomTabNavigationOptions,
  BottomTabNavigationProp,
  createBottomTabNavigator,
  BottomTabBarOptions,
} from '@react-navigation/bottom-tabs';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import {Button, Icon, ListItem, Text} from 'react-native-elements';
import {LongPressGestureHandler, State} from 'react-native-gesture-handler';
import {MyList} from '../List';
import RegistrationScreen from '../Regis/Registration';

type RootTabParamList = {
  Home: undefined;
  Report: undefined;
};

type TabScreenNavProp = BottomTabNavigationProp<RootTabParamList, 'Home'>;

type Props = {
  route: undefined;
  navigation: TabScreenNavProp;
};

const Tab = createBottomTabNavigator();

const HomeScreen = ({navigation}: Props) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const subscribe = firestore()
      .collection('history')
      .orderBy('timecode', 'desc')
      .onSnapshot((snapshot) => {
        let history: any[] = [];
        snapshot.forEach((document) => {
          history.push({...document.data(), id: document.id});
          setHistory(history);
        });
      });

    return () => subscribe();
  }, []);

  const WriteHistory = (item) => {
    firestore()
      .collection('history')
      .doc(item.id)
      .delete()
      .catch(() => Alert.alert('Warning', 'Write failure.'));
  };

  const RenderItem = ({item}) => (
    <LongPressGestureHandler
      onHandlerStateChange={({nativeEvent}) => {
        if (nativeEvent.state === State.ACTIVE) {
          WriteHistory(item);
        }
      }}>
      <ListItem
        containerStyle={{
          margin: 10,
          backgroundColor: '#191919',
          borderRadius: 8,
          elevation: 1,
        }}>
        <ListItem.Content>
          <ListItem.Title h4>
            {moment(item.timecode).format('ll')}
          </ListItem.Title>
          <ListItem.Subtitle style={{color: 'white'}}>
            {item.txt}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </LongPressGestureHandler>
  );

  return (
    <View style={{flex: 1, backgroundColor: '#121212', elevation: 0}}>
      <Text style={{fontSize: 20, paddingLeft: 20, paddingTop: 15}}>
        History
      </Text>
      <MyList
        data={history}
        rendererItem={RenderItem}
        style={{marginTop: 10}}
      />
      <Button
        type="clear"
        containerStyle={{
          backgroundColor: '#03DAC5',
          position: 'absolute',
          right: 10,
          bottom: 10,
          borderRadius: 100,
        }}
        icon={<Icon name="add" size={40} color="black" />}
        onPress={() => {
          navigation.navigate('Report');
        }}
      />
    </View>
  );
};

const HomeNavigator = () => {
  const tabBarOptions: BottomTabBarOptions = {
    style: {
      backgroundColor: '#191919',
      borderTopWidth: 1,
      borderTopColor: 'grey',
    },
  };

  const homeOptions: BottomTabNavigationOptions = {
    tabBarIcon: ({focused}) => {
      let color = focused ? '#BB86FC' : '#8E8E8F';
      return <Icon name="home" type="feather" color={color}></Icon>;
    },
    tabBarLabel: ({focused}) => {
      let color = focused ? '#BB86FC' : '#8E8E8F';
      return <Text style={{color}}>Home</Text>;
    },
  };

  const regisOptions: BottomTabNavigationOptions = {
    tabBarIcon: ({focused}) => {
      let color = focused ? '#BB86FC' : '#8E8E8F';
      return <Icon name="user" type="feather" color={color}></Icon>;
    },
    tabBarLabel: ({focused}) => {
      let color = focused ? '#BB86FC' : '#8E8E8F';
      return <Text style={{color}}>User</Text>;
    },
  };

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

export default HomeNavigator;
