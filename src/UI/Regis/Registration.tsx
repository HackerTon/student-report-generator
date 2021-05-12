import firestore from '@react-native-firebase/firestore';
import {Picker} from '@react-native-picker/picker';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, View} from 'react-native';
import {Button, Icon, Text} from 'react-native-elements';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {testname} from '../../Helper/Helper';
import {StudentRegis, TabScreenNavProp} from '../../Helper/Types';

const renderItem = ({item}: {item: StudentRegis}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#191919',
        padding: 10,
        marginTop: 10,
        marginBottom: 5,
        marginHorizontal: 10,
        borderRadius: 5,
      }}>
      {/* header detail */}
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
        }}>
        {/* student detail */}
        <Text style={{fontSize: 17, flex: 1}}>{item.studentName}</Text>
        {/* setting icon */}
        <Menu style={{flex: 0}}>
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
      {/* student details, level, progress */}
      <View style={{flex: 1}}>
        <Text style={{flex: 1}}>Progress: {item.progress}</Text>
        <Text style={{flex: 1}}>Day: {item.classday}</Text>
        <Text style={{flex: 1}}>Model: {item.modelName}</Text>
        <Text style={{flex: 1}}>Level: {item.level}</Text>
      </View>
    </View>
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

const RegistrationScreen = ({navigation}: {navigation: TabScreenNavProp}) => {
  const [students, setStudents] = useState<StudentRegis[]>([]);
  const [name, setName] = useState('');
  const [day, setDay] = useState('wed');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      firestore()
        .collection('student')
        .orderBy('name', 'asc')
        .get()
        .then(query => {
          const student: StudentRegis[] = [];
          query.forEach(document => {
            const {classday, index, name, progress} = document.data();
            firestore()
              .collection('model')
              .doc(index + '')
              .get()
              .then(doc => {
                const data = doc.data();

                student.push({
                  id: document.id,
                  studentName: name,
                  modelName: data?.name,
                  level: data?.level,
                  classday,
                  index,
                  progress,
                });
                setStudents(student);
              })
              .catch(e => console.error(e));
          });
          setLoading(false);
        })
        .catch(e => console.error(e));
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return <ActivityIndicator style={{backgroundColor: '#121212'}} />;
  }

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
