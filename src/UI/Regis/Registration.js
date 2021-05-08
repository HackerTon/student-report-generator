import {Picker} from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import {Button, Icon, Text} from 'react-native-elements';
import {
  FlatList,
  State,
  TapGestureHandler,
  TextInput,
} from 'react-native-gesture-handler';
import {testname} from '../../Helper';

const renderItem = ({item}) => {
  return (
    <TapGestureHandler
      onHandlerStateChange={event => {
        if (event.nativeEvent.state === State.ACTIVE) {
          Alert.alert(
            'Discard student ' + item.name,
            'Do you still want to discard?',
            [
              {text: 'Cancel', style: 'cancel', onPress: () => {}},
              {
                text: 'Discard',
                style: 'destructive',
                onPress: () => RemoveStudent(item.id),
              },
            ],
          );
        }
      }}>
      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 5,
          padding: 10,
          backgroundColor: '#191919',
          borderRadius: 8,
          elevation: 1,
        }}>
        <Text
          style={{
            fontSize: 17,
          }}>
          {item.name}
        </Text>
      </View>
    </TapGestureHandler>
  );
};

const InsertStudent = ({name, classday}) => {
  if (testname(name)) {
    const query = firestore().collection('student').where('name', '==', name);

    query.get().then(snapshot => {
      const isEmpty = snapshot.empty;
      if (isEmpty) {
        firestore()
          .collection('student')
          .add({name: name, classday: classday})
          .then(() => {
            console.log('write student successful');
          })
          .catch(err => 'write student failure');
      } else {
        Alert.alert('Duplicate found', 'System found entry with same name');
      }
    });
  } else {
    Alert.alert('Invalid name', `"${name}", reenter your name.`);
  }
};

const RemoveStudent = docid => {
  if (docid) {
    firestore().collection('student').doc(docid).delete();
  }
};

const RegistrationScreen = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [classday, setClassday] = useState('wed');

  useEffect(() => {
    const subscribe = firestore()
      .collection('student')
      .orderBy('name', 'asc')
      .onSnapshot(query => {
        const students = [];

        query.forEach(document => {
          students.push({...document.data(), id: document.id});
        });

        setStudents(students);
      });

    return subscribe;
  }, []);

  return (
    <View
      style={{
        backgroundColor: '#121212',
        height: '100%',
      }}>
      <View
        style={{
          marginTop: 10,
          marginHorizontal: 5,
        }}>
        <TextInput
          placeholder="Name to register"
          placeholderTextColor="white"
          value={name}
          onTouchStart={() => setName('')}
          onChangeText={text => setName(text)}
          style={{
            fontSize: 20,
            color: 'white',
            backgroundColor: '#191919',
            borderRadius: 8,
            paddingLeft: 10,
          }}
        />
      </View>
      <View style={{paddingLeft: 5}}>
        <Picker
          prompt="Day"
          style={{color: 'white'}}
          selectedValue={classday}
          onValueChange={value => setClassday(value)}>
          <Picker.Item label="wednesday" value="wed" />
          <Picker.Item label="friday" value="fri" />
          <Picker.Item label="saturday" value="sat" />
        </Picker>
      </View>
      <FlatList
        data={students}
        renderItem={renderItem}
        contentContainerStyle={{paddingVertical: 20}}
      />
      <Button
        type="clear"
        containerStyle={{
          backgroundColor: '#BB86FC',
          position: 'absolute',
          right: 10,
          bottom: 10,
          borderRadius: 100,
        }}
        icon={<Icon name="add" size={40} color="black" />}
        onPress={() => InsertStudent({name, classday})}
      />
    </View>
  );
};

export default RegistrationScreen;
