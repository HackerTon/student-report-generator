import firestore from '@react-native-firebase/firestore';
import React, {useContext, useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Text} from 'react-native-elements';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {DetailDispatch} from '../../App';
import {progress} from '../../Helper/Helper';
import {Level, Model, Student} from '../../Helper/Types';
import {MySectionList} from '../List';

const MyForm = ({navigation}: {navigation: any}) => {
  const {state, dispatch} = useContext(DetailDispatch);

  useEffect(
    () =>
      navigation.addListener('beforeRemove', e =>
        dispatch({type: 'resetcount'}),
      ),
    [],
  );

  // setstudent
  const renderItem = ({item}: {item: Student}) => {
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
          // setdetail
          dispatch({
            type: 'setdetail',
            detail: {studentName: item.name, id: item.id},
          });

          // set prevmodel
          // only if index is defined
          if (item.index) {
            dispatch({type: 'setprevmodel', prevmodel: item.index});
          }
        }}>
        <Text
          style={{
            fontSize: 17,
          }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  // setprogress
  const renderItem2 = ({item}: {item: string}) => {
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
          dispatch({type: 'setdetail', detail: {progress: item}});
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

  if (state.loading) {
    return <ActivityIndicator style={{flex: 1, backgroundColor: '#121212'}} />;
  }

  let data =
    state.query === ''
      ? state.student
      : state.student.filter((value: {name: string}) =>
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
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      );
    // model selection
    case 1:
      return (
        <View style={{flex: 1, backgroundColor: '#121212'}}>
          <View style={{flex: 1, marginBottom: 10}}>
            <MySectionList
              data={state.models}
              selection={(item: Model) => {
                dispatch({
                  type: 'setdetail',
                  detail: {index: item.index, modelName: item.name},
                });
              }}
            />
          </View>
        </View>
      );
    // progress
    case 2:
      return (
        <View style={{flex: 1, backgroundColor: '#121212', paddingTop: 10}}>
          <FlatList
            data={progress}
            renderItem={renderItem2}
            keyExtractor={item => item}
          />
        </View>
      );
    case 3:
      navigation.navigate('Report', state.detail);
      dispatch({type: 'resetcount'});
      return <View></View>;
  }
};

export default MyForm;
