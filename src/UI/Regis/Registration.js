import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import {Button, Icon, Input, ListItem} from 'react-native-elements';
import {MyList} from '../List';
import {Picker} from '@react-native-community/picker';

const RegistrationScreen = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [classday, setClassday] = useState('wed');

  useEffect(() => {
    const subscribe = firestore()
      .collection('student')
      .orderBy('name', 'asc')
      .onSnapshot((query) => {
        const students = [];

        query.forEach((document) => {
          students.push({...document.data(), id: document.id});
        });

        setStudents(students);
      });

    return () => subscribe;
  }, []);

  const testname = () => {
    let validator = /^\d+$/;
    if (validator.test(name) || name === '') {
      return 0;
    } else {
      return 1;
    }
  };

  const InsertStudent = () => {
    if (testname()) {
      const query = firestore().collection('student').where('name', '==', name);

      query.get().then((snapshot) => {
        const isEmpty = snapshot.empty;
        if (isEmpty) {
          firestore()
            .collection('student')
            .add({name: name, classday: classday})
            .then(() => {
              console.log('write student successful');
            })
            .catch((err) => 'write student failure');
        } else {
          Alert.alert('Duplicate found', 'System found entry with same name');
        }
      });
    } else {
      Alert.alert('Invalid name', `"${name}", reenter your name.`);
    }
  };

  const RemoveStudent = (docid) => {
    if (docid) {
      firestore().collection('student').doc(docid).delete();
    }
  };

  const renderItem = ({item}) => {
    return (
      <ListItem
        onLongPress={() => {
          RemoveStudent(item.id);
        }}
        containerStyle={{backgroundColor: '#191919'}}>
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    );
  };

  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        flexDirection: 'column',
      }}>
      <Input
        placeholder="Name"
        placeholderTextColor="white"
        value={name}
        onTouchStart={() => setName('')}
        onChangeText={(text) => setName(text)}
        style={{color: 'white'}}
      />
      <Picker
        selectedValue={classday}
        onValueChange={(value) => setClassday(value)}
        style={{backgroundColor: 'grey', marginBottom: 10}}
        prompt="Day">
        <Picker.Item label="wednesday" value="wed" />
        <Picker.Item label="friday" value="fri" />
        <Picker.Item label="saturday" value="sat" />
      </Picker>
      <MyList data={students} rendererItem={renderItem} />
      <Button
        onPress={InsertStudent}
        icon={<Icon name="add" size={40} color="white" />}
        containerStyle={{
          position: 'absolute',
          right: 10,
          bottom: 10,
          borderRadius: 100,
        }}
      />
    </View>
  );
};

export default RegistrationScreen;
