import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useReducer} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-elements';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {models, progress} from '../../Helper';
import {MyList, MySectionList} from '../List';

const initialState = {
  count: 0,
  student: [],
  name: null,
  model: null,
  query: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'setname':
      return {...state, name: action.name, count: state.count + 1};
    case 'setmodellevel':
      return {
        ...state,
        model: action.model,
        level: action.level,
        count: state.count + 1,
      };
    case 'fillstudent':
      return {...state, student: action.student};
    case 'setquery':
      return {...state, query: action.query};
    default:
      throw new Error();
  }
};

const MyForm = ({navigation}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    firestore()
      .collection('student')
      .orderBy('name', 'asc')
      .get()
      .then(snapshot => {
        let student = [];
        snapshot.forEach(document => {
          student.push({...document.data(), id: document.id});
        });

        dispatch({type: 'fillstudent', student: student});
      });
  }, []);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          paddingVertical: 15,
          paddingLeft: 20,
          marginHorizontal: 10,
          marginVertical: 5,
          backgroundColor: '#191919',
          borderRadius: 4,
        }}
        onPress={() => dispatch({type: 'setname', name: item.name})}>
        <Text
          style={{
            fontSize: 17,
          }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderItem2 = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          paddingVertical: 15,
          paddingLeft: 20,
          marginHorizontal: 10,
          marginVertical: 5,
          backgroundColor: '#191919',
          borderRadius: 4,
        }}
        onPress={() => {
          const {name, level, model} = state;

          navigation.navigate('Report', {
            name,
            level,
            model,
            progress: item,
          });
        }}>
        <Text
          style={{
            fontSize: 17,
          }}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  let data =
    state.query === ''
      ? state.student
      : state.student.filter(value =>
          value.name.search(new RegExp(`^${state.query}`, 'i')) ? false : true,
        );

  switch (state.count) {
    // student selection
    case 0:
      return (
        <View style={{flex: 1, backgroundColor: '#121212'}}>
          {/* name search bar */}
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              marginHorizontal: 5,
            }}>
            <TextInput
              placeholder={'Name'}
              value={state.query}
              placeholderTextColor="white"
              onChangeText={text => dispatch({type: 'setquery', query: text})}
              style={{
                fontSize: 20,
                color: 'white',
                backgroundColor: '#191919',
                borderRadius: 8,
                paddingLeft: 10,
              }}
            />
          </View>
          {/* flatlist for student name */}
          <View style={{flex: 9}}>
            <MyList data={data} rendererItem={renderItem} />
          </View>
        </View>
      );
    // model selection
    case 1:
      return (
        <View style={{flex: 1, backgroundColor: '#121212'}}>
          <View style={{flex: 1, marginBottom: 10}}>
            <MySectionList
              data={models}
              selection={({title, item}) => {
                dispatch({type: 'setmodellevel', model: item, level: title});
              }}
            />
          </View>
        </View>
      );
    // progress
    case 2:
      return (
        <View style={{flex: 1, backgroundColor: '#121212', paddingTop: 10}}>
          <MyList data={progress} rendererItem={renderItem2} />
        </View>
      );
  }
};

export default MyForm;
