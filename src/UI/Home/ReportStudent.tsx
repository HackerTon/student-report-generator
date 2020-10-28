import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Alert, Clipboard, View} from 'react-native';
import {Button, ListItem, Text, Icon} from 'react-native-elements';
import {MyList} from '../List';
import firestore from '@react-native-firebase/firestore';

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
      // <ListItem bottomDivider containerStyle={{backgroundColor: 'black'}}>
      //   <ListItem.Content>
      //     <ListItem.Title style={{fontWeight: 'bold'}}>
      //       {item.name}
      //     </ListItem.Title>
      //     <ListItem.Subtitle style={{color: 'white'}}>
      //       {`${item.level} ${item.model} ${item.progress}`}
      //     </ListItem.Subtitle>
      //   </ListItem.Content>
      // </ListItem>
    );
  };

  const SmallBox = (props: Props) => {
    let {text} = props;
    text = text ? text : '0';

    return (
      <View
        style={{
          margin: 5,
          paddingLeft: 20,
          paddingTop: 15,
          paddingRight: 20,
          paddingBottom: 10,
          backgroundColor: '#191919',
          borderRadius: 8,
          elevation: 1,
        }}>
        <Text style={{opacity: 0.6, fontSize: 17}}>Student Count</Text>
        <Text style={{paddingTop: 2, fontSize: 24}}>{text}</Text>
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
    Alert.alert('Information', 'Copied generated text.');
  };

  const Delete = (mutable: Record[]) => {
    mutable.pop();
    setRecord([...mutable]);
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#121212',
        elevation: 0,
      }}>
      <View style={{flexDirection: 'row', padding: 5}}>
        <SmallBox text={record.length} />
      </View>
      <MyList data={record} rendererItem={renderItem} />
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
