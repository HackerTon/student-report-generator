import React, {useEffect, useState} from 'react';
import {View, Clipboard} from 'react-native';
import {Button, ListItem, Text} from 'react-native-elements';
import MyForm from '../Home/Form';
import {MyList} from '../List';

const ReportStudent = ({navigation, route}) => {
  const {params} = route;
  const [state, setState] = useState(0);
  const [record, setRecord] = useState([]);

  useEffect(() => {
    if (params != null) {
      console.log(params);
      setRecord([
        ...record,
        {name: params.name, level: params.title, model: params.item},
      ]);
    }
  }, [params]);

  console.log(record);

  const renderItem = ({item, _}) => {
    return (
      <ListItem bottomDivider containerStyle={{backgroundColor: 'black'}}>
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle style={{color: 'white'}}>
            {item.level + ' ' + item.model}
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
    let text = `${moment().format('llll')} \n 
    ${record.map(
      ({name, level, model}, index) =>
        `${index + 1}. ${name} ${level} ${model} \n`,
    )}`;
    Clipboard.alert(text);
  };

  switch (state) {
    // Records
    case 0:
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
            <View
              style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <Button title="Delete" />
              <Button title="Generate" />
              <Button
                title="Create"
                onPress={() => navigation.navigate('Form')}
              />
            </View>
          </View>
        </>
      );
    // Creation record
    case 1:
  }
};

export default ReportStudent;
