import {Picker} from '@react-native-community/picker';
import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import {Button, Icon, Input, Text} from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';

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
      <View
        style={{
          flex: 1,
          paddingVertical: 20,
          paddingLeft: 20,
          marginHorizontal: 10,
          marginVertical: 5,
          backgroundColor: '#191919',
          borderRadius: 8,
          elevation: 1,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 17,
          }}>
          {item.name}
        </Text>
      </View>
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
      <FlatList
        data={students}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View></View>}
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
        onPress={InsertStudent}
      />
    </View>
  );
};

export default RegistrationScreen;
