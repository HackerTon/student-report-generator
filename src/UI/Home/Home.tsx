import firestore from '@react-native-firebase/firestore';
import {
  BottomTabBarOptions,
  BottomTabNavigationOptions,
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import {Button, Icon, Text} from 'react-native-elements';
import {State, TapGestureHandler} from 'react-native-gesture-handler';
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

const RenderItem = ({item}) => (
  <TapGestureHandler
    onHandlerStateChange={({nativeEvent}) => {
      if (nativeEvent.state === State.ACTIVE) {
        Alert.alert('Discard this history?', 'Do you still want to discard?', [
          {text: 'Cancel', style: 'cancel', onPress: () => {}},
          {
            text: 'Discard',
            style: 'destructive',
            onPress: () => WriteHistory(item),
          },
        ]);
      }
    }}>
    <View
      style={{
        marginHorizontal: 15,
        marginTop: 10,
        backgroundColor: '#191919',
        borderRadius: 7,
        elevation: 1,
      }}>
      <View style={{paddingLeft: 15, paddingTop: 5}}>
        <Text
          style={{
            fontSize: 32,
            fontWeight: 'bold',
            fontFamily: 'sans-serif-medium',
          }}>
          {moment(item.timecode).format('dddd ll')}
        </Text>
      </View>
      <View style={{paddingLeft: 15, paddingTop: 5}}>
        <Text style={{opacity: 0.75}}>{item.txt}</Text>
      </View>
    </View>
  </TapGestureHandler>
);

const WriteHistory = (item) => {
  firestore()
    .collection('history')
    .doc(item.id)
    .delete()
    .catch(() => Alert.alert('Warning', 'Write failure.'));
};

const Tab = createBottomTabNavigator();

const HomeScreen = ({navigation}: Props) => {
  const [history, setHistory] = useState([]);

  // first time initialized array
  useEffect(() => {
    firestore()
      .collection('history')
      .orderBy('timecode', 'desc')
      .onSnapshot((snapshot) => {
        let history: any[] = [];
        snapshot.forEach((document) => {
          history.push({...document.data(), id: document.id});
        });

        setHistory(history);
      });
  }, []);

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: '#121212',
        elevation: 0,
      }}>
      <View
        style={{
          flex: 0,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 35, fontWeight: 'bold', paddingTop: 10}}>
          History
        </Text>
      </View>
      <MyList data={history} rendererItem={RenderItem} />
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
