import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Alert, Clipboard, View} from 'react-native';
import {Button, Icon, Text} from 'react-native-elements';
import {MyList} from '../List';

type Props = {
  text: string;
};

type Record = {
  name: string;
  level: string;
  model: string;
  progress: string;
};

const ReportStudent = ({navigation, route}) => {
  const {params} = route;
  const [record, setRecord] = useState([]);

  useEffect(() => {
    if (params != null) {
      let cur: Record = {
        name: params.name,
        level: params.level,
        model: params.model,
        progress: params.progress,
      };

      setRecord([...record, cur]);
    }
  }, [params]);

  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        if (record.length < 1) {
          return;
        }

        e.preventDefault();

        Alert.alert(
          'Discard changes?',
          'You have unsaved changes. Do you still want to discard?',
          [
            {text: "Don't leave", style: 'cancel', onPress: () => {}},
            {
              text: 'Discard',
              style: 'destructive',
              onPress: () => navigation.dispatch(e.data.action),
            },
          ],
        );
      }),
    [record],
  );

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          flex: 1,
          paddingVertical: 10,
          paddingLeft: 20,
          marginHorizontal: 10,
          marginVertical: 5,
          backgroundColor: '#191919',
          borderRadius: 4,
          elevation: 1,
        }}>
        <Text
          style={{
            fontSize: 17,
            opacity: 0.6,
          }}>
          {index}. {item.name}
        </Text>
        <Text>
          {item.level} {item.model} {item.progress}
        </Text>
      </View>
    );
  };

  const Generate = (record: Record[]) => {
    let text = '';

    if (record.length < 1) {
      return;
    }

    record.forEach(({name, level, model, progress}, index) => {
      text = text.concat(
        `${index + 1}. ${name} ${level} ${model} ${progress}\n\n`,
      );
    });

    firestore()
      .collection('history')
      .add({timecode: firestore.FieldValue.serverTimestamp(), txt: text})
      .catch(() => Alert.alert('Warning', 'Write failure.'));

    text = `${moment().format('dddd l')}\n` + text;
    Clipboard.setString(text);
    Alert.alert('Information', 'Copied generated text.', [
      {
        text: 'OK',
        style: 'default',
        onPress: () => {
          navigation.navigate('Home');
        },
      },
    ]);
  };

  const Delete = (mutable: Record[]) => {
    mutable.pop();
    setRecord([...mutable]);
  };

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: '#121212',
        elevation: 0,
      }}>
      <View
        style={{flex: 0, flexDirection: 'row', marginLeft: 10, marginTop: 11}}>
        <View
          style={{
            flexDirection: 'column',
            padding: 10,
            backgroundColor: '#191919',
            borderRadius: 8,
            elevation: 1,
            alignItems: 'center',
          }}>
          <Text style={{opacity: 0.6, fontSize: 17}}>Student Count</Text>
          <Text style={{paddingTop: 2, fontSize: 24}}>{record.length}</Text>
        </View>
        <View
          style={{
            flexGrow: 1,
            marginHorizontal: 10,
            flexDirection: 'column',
            padding: 10,
            backgroundColor: '#191919',
            borderRadius: 8,
            elevation: 1,
            alignItems: 'center',
          }}>
          <Text style={{opacity: 0.6, fontSize: 17}}>Today Date</Text>
          <Text style={{paddingTop: 2, fontSize: 24}}>
            {moment().format('dddd ll')}
          </Text>
        </View>
      </View>
      <MyList
        data={record}
        rendererItem={renderItem}
        style={{paddingTop: 10}}
      />
      <Button
        type="clear"
        containerStyle={{
          position: 'absolute',
          right: 10,
          bottom: 5,
        }}
        icon={
          <Icon name="delete" size={40} color="white" style={{opacity: 0.87}} />
        }
        onPress={() => Delete(record)}
      />
      <Button
        type="clear"
        containerStyle={{
          position: 'absolute',
          right: 165,
          bottom: 5,
        }}
        icon={
          <Icon name="done" size={40} color="white" style={{opacity: 0.87}} />
        }
        onPress={() => Generate(record)}
      />
      <Button
        type="clear"
        containerStyle={{
          position: 'absolute',
          left: 10,
          bottom: 5,
        }}
        icon={
          <Icon
            name="note-add"
            size={40}
            color="white"
            style={{opacity: 0.87}}
          />
        }
        onPress={() => navigation.navigate('Form')}
      />
    </View>
  );
};

export default ReportStudent;
