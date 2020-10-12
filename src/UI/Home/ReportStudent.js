import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Alert, Clipboard, View} from 'react-native';
import {Button, ListItem, Text} from 'react-native-elements';
import {MyList} from '../List';
import firestore from '@react-native-firebase/firestore';

const ReportStudent = ({navigation, route}) => {
  const {params} = route;
  const [record, setRecord] = useState([]);

  useEffect(() => {
    if (params != null) {
      setRecord([
        ...record,
        {
          name: params.name,
          level: params.level,
          model: params.model,
          progress: params.progress,
        },
      ]);
    }
  }, [params]);

  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        if (record < 1) {
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
      <ListItem bottomDivider containerStyle={{backgroundColor: 'black'}}>
        <ListItem.Content>
          <ListItem.Title style={{fontWeight: 'bold'}}>
            {item.name}
          </ListItem.Title>
          <ListItem.Subtitle style={{color: 'white'}}>
            {`${item.level} ${item.model} ${item.progress}`}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  };

  const SmallBox = (props) => {
    let {text} = props;
    text = text ? text : '0';

    return (
      <View
        style={{
          maxWidth: 150,
          minHeight: 50,
          padding: 5,
        }}>
        <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 18}}>
          Student Count
        </Text>
        <Text style={{textAlign: 'center', fontSize: 17}}>{text}</Text>
      </View>
    );
  };

  const Generate = () => {
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
      .add({timecode: moment.now(), txt: text})
      .catch(() => Alert.alert('Warning', 'Write failure.'));

    text = `${moment().format('dddd l')}\n` + text;
    Clipboard.setString(text);
    Alert.alert('Information', 'Copied generated text.');
  };

  const Delete = () => {
    record.pop();
    setRecord([...record]);
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: 'black',
        }}>
        <View style={{flexDirection: 'row', padding: 5}}>
          <SmallBox text={record.length} />
        </View>
        <MyList data={record} rendererItem={renderItem} />
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <Button title="Delete" onPress={Delete} />
          <Button title="Generate" onPress={Generate} />
          <Button title="Create" onPress={() => navigation.navigate('Form')} />
        </View>
      </View>
    </>
  );
};

export default ReportStudent;
