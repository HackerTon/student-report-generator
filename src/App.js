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
import React, {useEffect, useState} from 'react';
import {StatusBar, View, TextInput, FlatList} from 'react-native';
import {
  Button,
  Icon,
  ListItem,
  Text,
  ThemeProvider,
} from 'react-native-elements';
import GeneratorPage from './UI/GeneratorPage';
import {WriteData, ReadData} from './Helper';
import {MyList, SpecialList} from './UI/List';

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
  const [students, setStudents] = useState([]);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    ReadData((data) => setStudents(data));
  }, []);

  const SetSlides = (index) => {
    if (index in slides) {
      setSlides(slides.filter((value) => value !== index));
    } else {
      setSlides([...slides, index]);
    }
  };

  console.log(students);
  return (
    <SpecialList
      data={students}
      style={{backgroundColor: 'black'}}
      selection={SetSlides}
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
  const [students, setStudents] = useState(null);
  const [name, setName] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    Read();
  }, []);

  const Write = () => {
    if (name !== '') {
      WriteData([...students, name]);
      Read();
    }
  };

  const Read = () => {
    ReadData((data) => setStudents(data));
  };

  const Delete = () => {
    const arr = students
      .splice(0, selectedId)
      .concat(students.splice(selectedId + 1, students.length));

    WriteData(arr);
    Read();
  };

  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        flexDirection: 'column',
      }}>
      <TextInput
        placeholder="Name"
        placeholderTextColor="white"
        onChangeText={(text) => setName(text)}
      />
      <MyList data={students} selection={setSelectedId} />
      <View style={{padding: 5, flexDirection: 'row'}}>
        <Button title="Add Students" onPress={() => Write()} />
        <Button title="Remove Students" onPress={() => Delete()} />
      </View>
    </View>
  );
};

const App = () => {
  const [page, setPage] = useState('first');

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

  if (page == 'main') {
    return (
      <View>
        <Button title="first" onPress={() => setPage('first')} />
        <Button title="second" onPress={() => setPage('second')} />
      </View>
    );
  } else if (page == 'first') {
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
  } else {
    return <GeneratorPage />;
  }
};

export default App;
