import React, {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {ReadData, WriteData} from '../../Helper';
import {MyList} from '../List';

const RegistrationScreen = () => {
  const [students, setStudents] = useState(null);
  const [name, setName] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    Read();
  }, []);

  const Write = () => {
    let validator = /^\d+$/;

    if (validator.test(name) || name === '') {
      Alert.alert('Invalid name', `"${name}", reenter your name.`);
    } else {
      WriteData([...students, name]);
      setName('');
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
      <Input
        placeholder="Name"
        placeholderTextColor="white"
        onChangeText={(text) => setName(text)}
        style={{color: 'white'}}
      />
      <MyList data={students} selection={setSelectedId} />
      <View style={{padding: 5, flexDirection: 'row'}}>
        <Button title="Add Students" onPress={() => Write()} />
        <Button title="Remove Students" onPress={() => Delete()} />
      </View>
    </View>
  );
};

export default RegistrationScreen;
