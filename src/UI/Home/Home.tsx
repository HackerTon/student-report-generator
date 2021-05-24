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
import {FlatList, TapGestureHandler} from 'react-native-gesture-handler';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {Props, Record} from '../../Helper/Types';
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
  // <TapGestureHandler
  // onHandlerStateChange={({nativeEvent}) => {
  //   if (nativeEvent.state === State.ACTIVE) {
  //   }
  // }}
  // >
  // </TapGestureHandler>
  <View
    key={item.id}
    style={{
      backgroundColor: '#191919',
      elevation: 1,
      flex: 1,
      borderRadius: 10,
      padding: 10,
      marginTop: 7.5,
      marginBottom: 7.5,
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
          fontSize: 30,
          fontWeight: 'bold',
          fontFamily: 'sans-serif-medium',
        }}>
        {moment(item.timecode).format('dddd ll')}
      </Text>
      {/* setting button */}
      <View style={{flex: 1}}>
        <Menu>
          <MenuTrigger>
            <Icon name="settings" type="Feather" size={20} color="white" />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption
              customStyles={{
                optionText: {color: 'black', fontSize: 17},
                optionWrapper: {
                  backgroundColor: 'white',
                  padding: 10,
                  elevation: 7,
                },
              }}
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
    </View>
    <View style={{flex: 1, flexDirection: 'column'}}>
      {item.data.map((value, index) => {
        return (
          <View key={value.id}>
            <Text style={{fontSize: 16}} key={'' + value.id}>
              {index + 1}. {value.studentName} Level {value.level}{' '}
              {value.modelName} {value.progress}
            </Text>
          </View>
        );
      })}
    </View>
  </View>
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
    <View
      style={{
        flex: 1,
        backgroundColor: '#121212',
      }}>
      <View style={{flex: 1}}>
        <FlatList
          data={history}
          renderItem={RenderItem}
          keyExtractor={item => item.id}
          style={{paddingHorizontal: 15}}
          ListFooterComponent={<View style={{height: 70}}></View>}
        />
      </View>
      <Button
        type="clear"
        containerStyle={{
          backgroundColor: '#03DAC5',
          position: 'absolute',
          right: 15,
          bottom: 15,
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
