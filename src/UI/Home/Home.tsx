import firestore from '@react-native-firebase/firestore';
import {
  BottomTabBarOptions,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import {Button, Icon, Text} from 'react-native-elements';
import {TapGestureHandler} from 'react-native-gesture-handler';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuProvider,
  MenuTrigger,
} from 'react-native-popup-menu';
import {Props, Record} from '../../Types';
import {MyList} from '../List';
import RegistrationScreen from '../Regis/Registration';

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

const tabBarOptions: BottomTabBarOptions = {
  style: {
    backgroundColor: '#191919',
    borderTopWidth: 1,
    borderTopColor: 'grey',
  },
};

const WriteHistory = (item: Record) => {
  firestore()
    .collection('history')
    .doc(item.id + '')
    .delete()
    .catch(() => Alert.alert('Warning', 'Write failure.'));
};

const RenderItem = ({item}: {item: Record}) => (
  <TapGestureHandler
  // onHandlerStateChange={({nativeEvent}) => {
  //   if (nativeEvent.state === State.ACTIVE) {

  //   }
  // }}
  >
    <View
      style={{
        backgroundColor: '#191919',
        elevation: 1,
        flex: 1,
      }}>
      {/* title header */}
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 32,
            fontWeight: 'bold',
            fontFamily: 'sans-serif-medium',
          }}>
          {moment(item.timecode).format('dddd ll')}
        </Text>
        <Menu>
          <MenuTrigger>
            <Icon name="settings" type="Feather" size={20} color="white" />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption
              onSelect={() => {
                Alert.alert(
                  'Discard this history?',
                  'Do you still want to discard?',
                  [
                    {text: 'Cancel', style: 'cancel', onPress: () => {}},
                    {
                      text: 'Discard',
                      style: 'destructive',
                      onPress: () => WriteHistory(item),
                    },
                  ],
                );
              }}
              text="Delete"
            />
          </MenuOptions>
        </Menu>
      </View>
      <View style={{paddingHorizontal: 15, paddingTop: 5}}>
        <Text>
          {item.data.map(value => {
            return (
              <Text key={'' + value.id}>
                {value.studentName} {value.level} {value.modelName}
                {value.progress}
              </Text>
            );
          })}
        </Text>
      </View>
    </View>
  </TapGestureHandler>
);

const Tab = createBottomTabNavigator();

const HomeScreen = ({navigation}: Props) => {
  const [history, setHistory] = useState<Record[]>([]);

  // first time initialized array
  useEffect(() => {
    return firestore()
      .collection('history')
      .orderBy('timecode', 'desc')
      .onSnapshot(snapshot => {
        let history: Record[] = [];
        snapshot.forEach(doc =>
          history.push({
            id: doc.id,
            timecode: doc.data().timecode,
            data: doc.data().record,
          }),
        );
        setHistory([...history]);
      });
  }, []);

  return (
    <MenuProvider>
      <View
        style={{
          flex: 1,
          backgroundColor: '#121212',
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
        <View style={{flex: 1}}>
          <MyList data={history} rendererItem={RenderItem} />
        </View>
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
    </MenuProvider>
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
