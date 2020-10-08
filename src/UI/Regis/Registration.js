import React, {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import {Button, Input, Icon, ListItem} from 'react-native-elements';
import {ReadData, WriteData} from '../../Helper';
import {MyList} from '../List';
import firestore from '@react-native-firebase/firestore';

const RegistrationScreen = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState();

  useEffect(() => {
    const subscribe = firestore()
      .collection('student')
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
      firestore()
        .collection('student')
        .add({name: name})
        .then(() => console.log('Inserted data'))
        .catch((err) => console.error(err));
      setName('');
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
        onChangeText={(text) => setName(text)}
        style={{color: 'white'}}
      />
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
