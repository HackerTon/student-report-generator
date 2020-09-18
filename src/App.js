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
import GeneratorPage from './UI/GeneratorPage';
import {
  Icon,
  Text,
  ThemeProvider,
  Button,
  ListItem,
} from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
];

const MarkingScreen = ({navigation}) => {
  const [master, setMaster] = useState([]);

  const keyExtractor = (item, index) => index.toString();

  const EmptyList = () => (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
        EMPTY
      </Text>
    </View>
  );

  const RenderItem = ({item}) => {
    const {name} = item[0];

    return (
      <View>
        <Button
          title={name}
          onPress={() =>
            navigation.navigate('StudentPerformance', {name: name})
          }
        />
      </View>
    );
  };

  return (
    <FlatList
      keyExtractor={keyExtractor}
      data={Demo}
      style={{backgroundColor: 'black'}}
      ListEmptyComponent={EmptyList}
      renderItem={RenderItem}
      contentContainerStyle={{backgroundColor: '#191919', minHeight: '100%'}}
    />
  );
};

const RecordsScreen = ({route, navigation}) => {
  const keyExtractor = (item, index) => index.toString();

  const RenderItem = ({item, index}) => (
    <ListItem bottomDivider containerStyle={{backgroundColor: 'black'}}>
      <ListItem.Content>
        <ListItem.Title>{item[0].name}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );

  return (
    <View>
      <View style={{minHeight: '93.3%'}}>
        <FlatList
          style={{backgroundColor: 'black'}}
          keyExtractor={keyExtractor}
          data={Demo}
          renderItem={RenderItem}
        />
      </View>
      <View>
        <Button
          title="Create"
          onPress={() => navigation.navigate('CreatePage')}
        />
      </View>
    </View>
  );
};

const StudentPerformance = ({route, navigation}) => {
  const {name} = route.params;

  return (
    <View
      style={{
        backgroundColor: 'black',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>{name}</Text>
      <Button
        title="goback"
        onPress={() => {
          navigation.navigate('Records', {done: true});
        }}
      />
    </View>
  );
};

const RecordNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#191919'},
        headerTitleStyle: {color: 'white'},
      }}
      initialRouteName="Records">
      <Stack.Screen name="Records" component={RecordsScreen} />
      <Stack.Screen name="StudentPerformance" component={StudentPerformance} />
      <Stack.Screen name="CreatePage" component={MarkingScreen} />
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

  return <GeneratorPage />;
};

export default App;
