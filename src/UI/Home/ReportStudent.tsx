import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import {Button, Icon, Text} from 'react-native-elements';
import Clipboard from '@react-native-community/clipboard';
import {MyList} from '../List';

type Record = {
  name: string;
  level: string;
  model: string;
  progress: string;
};

const renderItem = ({item, index}) => {
  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 15,
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
      navigation.addListener('beforeRemove', e => {
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

  // generate string form for clipboar
  // while saving history to firestore
  const Generate = (record: Record[]) => {
    let text = '';

    if (record.length > 1) {
      // concatenate details of each student
      // into string
      record.forEach(({name, level, model, progress}, index) => {
        text = text.concat(
          `${index + 1}. ${name} ${level} ${model} ${progress}\n\n`,
        );
      });

      // write the string to firestore
      firestore()
        .collection('history')
        .add({timecode: firestore.FieldValue.serverTimestamp(), txt: text})
        .catch(() => Alert.alert('Warning', 'Write failure.'));

      // concatenate date
      text = `${moment().format('dddd l')}\n` + text;

      // copy the string to clipboard
      Clipboard.setString(text);

      // alert user that text is copy
      // go back to home page
      Alert.alert('Information', 'Copied generated text.', [
        {
          text: 'OK',
          style: 'default',
          onPress: () => {
            navigation.navigate('Home');
          },
        },
      ]);
    }
  };

  const Delete = (mutable: Record[]) => {
    mutable.pop();
    setRecord([...mutable]);
  };

  return (
    <View style={{backgroundColor: '#121212'}}>
      {/* header */}
      <View style={{height: '13%', paddingTop: 5}}>
        <View style={{flex: 1}}>
          {/* todays day */}
          <View
            style={{
              alignSelf: 'center',
            }}>
            <Text style={{paddingTop: 2, fontSize: 24}}>
              {moment().format('dddd')}
            </Text>
          </View>
          {/* student count and date */}
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            {/* student count */}
            <View style={{}}>
              <Text style={{opacity: 0.6, fontSize: 17, textAlign: 'center'}}>
                Student Count
              </Text>
              <Text style={{fontSize: 24, textAlign: 'center'}}>
                {record.length}
              </Text>
            </View>

            {/* today date */}
            <View style={{}}>
              <Text style={{opacity: 0.6, fontSize: 17, textAlign: 'center'}}>
                Today Date
              </Text>
              <Text style={{fontSize: 24, textAlign: 'center'}}>
                {moment().format('ll')}
              </Text>
            </View>
          </View>
        </View>
      </View>
      {/* flatlist */}
      <View style={{height: '79%', paddingVertical: 10}}>
        <MyList data={record} rendererItem={renderItem} />
      </View>
      {/* bottom button */}
      <View style={{height: '8%'}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Button
            type="clear"
            icon={
              <Icon
                name="delete"
                size={40}
                color="white"
                style={{opacity: 0.87}}
              />
            }
            onPress={() => Delete(record)}
          />
          <Button
            type="clear"
            icon={
              <Icon
                name="done"
                size={40}
                color="white"
                style={{opacity: 0.87}}
              />
            }
            onPress={() => Generate(record)}
          />
          <Button
            type="clear"
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
      </View>
    </View>
  );
};

export default ReportStudent;
