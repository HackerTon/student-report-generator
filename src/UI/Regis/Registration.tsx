import firestore from '@react-native-firebase/firestore';
import {Picker} from '@react-native-picker/picker';
import React, {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import {Button, Icon, Text} from 'react-native-elements';
import {
  FlatList,
  TapGestureHandler,
  TextInput,
} from 'react-native-gesture-handler';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {testname} from '../../Helper/Helper';
import {Student} from '../../Helper/Types';

const renderItem = ({item}: {item: Student}) => {
  return (
    <TapGestureHandler
    // onHandlerStateChange={event => {
    //   if (event.nativeEvent.state === State.ACTIVE) {
    //     Alert.alert(
    //       'Discard student ' + item.name,
    //       'Do you still want to discard?',
    //       [
    //         {text: 'Cancel', style: 'cancel', onPress: () => {}},
    //         {
    //           text: 'Discard',
    //           style: 'destructive',
    //           onPress: () => RemoveStudent(item.id),
    //         },
    //       ],
    //     );
    //   }
    // }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          backgroundColor: '#191919',
          padding: 10,
          marginTop: 10,
          marginBottom: 5,
          marginHorizontal: 10,
          borderRadius: 5,
        }}>
        {/* student detail */}
        <View style={{flex: 1}}>
          <Text style={{fontSize: 17}}>{item.name}</Text>
        </View>
        {/* setting icon */}
        <View style={{flex: 0}}>
          <Menu>
            <MenuTrigger>
              <Icon name="settings" type="Feather" size={20} color="white" />
            </MenuTrigger>
            <MenuOptions>
              <MenuOption
                customStyles={{
                  optionText: {color: 'black', fontSize: 17},
                  optionWrapper: {
                    backgroundColor: 'white',
                    padding: 10,
                    elevation: 7,
                  },
                }}
                onSelect={() => {
                  Alert.alert(
                    'Discard this history?',
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
                }}
                text="Delete"
              />
            </MenuOptions>
          </Menu>
        </View>
      </View>
    </TapGestureHandler>
  );
};

const InsertStudent = ({name, day}: {name: String; day: String}) => {
  if (testname(name)) {
    const query = firestore().collection('student').where('name', '==', name);

    query.get().then(snapshot => {
      const isEmpty = snapshot.empty;
      if (isEmpty) {
        firestore()
          .collection('student')
          .add({name, classday: day})
          .then(() => {
            ('write student successful');
          })
          .catch(_ => 'write student failure');
      } else {
        Alert.alert('Duplicate found', 'System found entry with same name');
      }
    });
  } else {
    Alert.alert('Invalid name', `"${name}", reenter your name.`);
  }
};

const RemoveStudent = (id: string) => {
  if (id) {
    firestore().collection('student').doc(id).delete().then();
  }
};

const RegistrationScreen = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [name, setName] = useState('');
  const [day, setDay] = useState('wed');

  useEffect(() => {
    const subscribe = firestore()
      .collection('student')
      .orderBy('name', 'asc')
      .onSnapshot(query => {
        const student: Student[] = [];
        query.forEach(document => {
          const {classday, index, name, progress} = document.data();
          student.push({id: document.id, classday, index, name, progress});
        });
        setStudents(student);
      });
    return subscribe;
  }, []);

  return (
    <View
      style={{
        backgroundColor: '#121212',
        flex: 1,
      }}>
      {/* new student textinput */}
      <View style={{flex: 0}}>
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
      {/* current day to set to student to */}
      <View
        style={{
          flex: 0,
          margin: 5,
          borderWidth: 2,
          borderColor: 'white',
          borderRadius: 10,
        }}>
        <Picker
          prompt="Day"
          style={{color: 'white'}}
          selectedValue={day}
          onValueChange={value => setDay(value)}>
          <Picker.Item label="wednesday" value="wed" />
          <Picker.Item label="friday" value="fri" />
          <Picker.Item label="saturday" value="sat" />
        </Picker>
      </View>
      <View style={{flex: 1}}>
        <FlatList
          data={students}
          renderItem={renderItem}
          ListFooterComponent={<View style={{height: 80}}></View>}
        />
      </View>
      <Button
        type="clear"
        containerStyle={{
          backgroundColor: '#BB86FC',
          position: 'absolute',
          right: 15,
          bottom: 15,
          borderRadius: 100,
        }}
        icon={<Icon name="add" size={40} color="black" />}
        onPress={() => InsertStudent({name, day})}
      />
    </View>
  );
};

export default RegistrationScreen;
