import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useReducer, useState} from 'react';
import {View} from 'react-native';
import {Input, ListItem, Text} from 'react-native-elements';
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
    const subscribe = firestore()
      .collection('student')
      .orderBy('name', 'asc')
      .get()
      .then((snapshot) => {
        let student = [];
        snapshot.forEach((document) => {
          student.push({...document.data(), id: document.id});
        });

        dispatch({type: 'fillstudent', student: student});
      });
  }, []);

  const renderItem = ({item}) => {
    return (
      <ListItem
        onPress={() => dispatch({type: 'setname', name: item.name})}
        containerStyle={{backgroundColor: '#191919'}}>
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    );
  };

  let data =
    state.query === ''
      ? state.student
      : state.student.filter((value) =>
          value.name.search(new RegExp(`^${state.query}`, 'i')) ? false : true,
        );

  switch (state.count) {
    // student selection
    case 0:
      return (
        <View style={{flex: 1, backgroundColor: 'black'}}>
          <Input
            placeholder={'Name'}
            value={state.query}
            placeholderTextColor="white"
            onChangeText={(text) => dispatch({type: 'setquery', query: text})}
            style={{color: 'white'}}
          />
          <MyList data={data} rendererItem={renderItem} />
        </View>
      );
    // model selection
    case 1:
      return (
        <>
          <View style={{flex: 1, backgroundColor: 'black'}}>
            <MySectionList
              data={models}
              selection={({title, item}) => {
                dispatch({type: 'setmodellevel', model: item, level: title});
              }}
            />
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'flex-end',
                padding: 5,
              }}></View>
          </View>
        </>
      );
    case 2:
      return (
        <>
          <View style={{flex: 1, backgroundColor: 'black'}}>
            <MyList
              data={progress}
              selection={({item}) => {
                const {name, level, model} = state;

                navigation.navigate('Report', {
                  name,
                  level,
                  model,
                  progress: item,
                });
              }}
            />
          </View>
        </>
      );
  }
};

export default MyForm;
