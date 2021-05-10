import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useReducer} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Text} from 'react-native-elements';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {progress} from '../../Helper';
import {Action, Level, Model, Student} from '../../Types';
import {MyList, MySectionList} from '../List';

const initialState = {
  count: 0,
  loading: true,
  query: '',
  student: [],
  models: [],
  detail: {
    id: '',
    index: 0,
    level: 0,
    progress: '',
    studentName: '',
    modelName: '',
  },
};

const reducer = (state: any, action: Action) => {
  switch (action.type) {
    case 'setdetail':
      const thisdetail = {...state.detail, ...action.detail};
      return {
        ...state,
        count: state.count + 1,
        detail: thisdetail,
      };
    case 'setstudent':
      return {...state, student: action.student};
    case 'setquery':
      return {...state, query: action.query};
    case 'setmodel':
      return {...state, models: action.models};
    case 'setloading':
      return {...state, loading: action.loading};
    default:
      throw new Error('no type for this ' + action.type);
  }
};

const MyForm = ({navigation}: {navigation: any}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // reading all data from student
  // and model collection
  useEffect(() => {
    firestore()
      .collection('student')
      .orderBy('name', 'asc')
      .get()
      .then(snapshot => {
        let student: Student[] = [];
        snapshot.forEach(document => {
          const {classday, name} = document.data();
          student.push({id: document.id, classday, name});
        });

        // read all models option
        firestore()
          .collection('model')
          .orderBy('index', 'asc')
          .get()
          .then(snapshot => {
            let modelsArray: Level[] = [];
            snapshot.forEach(doc => {
              const {level, name} = doc.data();
              if (modelsArray[level - 1] === undefined) {
                modelsArray[level - 1] = {title: 'level' + level, data: []};
              }

              modelsArray[level - 1].data.push({index: parseInt(doc.id), name});
            });
            // write to our state
            dispatch({type: 'setstudent', student: student});
            dispatch({type: 'setmodel', models: modelsArray});
            dispatch({type: 'setloading', loading: false});
          });
      });
  }, []);

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
          dispatch({
            type: 'setdetail',
            detail: {studentName: item.name, id: item.id},
          });
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

  const renderItem2 = ({item}: {item: String}) => {
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
          <MyList data={progress} rendererItem={renderItem2} />
        </View>
      );
    case 3:
      navigation.navigate('Report', state.detail);
      return <View></View>;
  }
};

export default MyForm;
