import React, {useState} from 'react';
import {View, TextInput, Clipboard} from 'react-native';
import {Button, Text, ListItem} from 'react-native-elements';
import MyList from './List';
import {StringGenerator} from '../Helper';
import moment from 'moment';

const level2 = [
  'Elephant',
  'Flower & Firefly',
  'Avoider',
  'Seal',
  'Beetle',
  'Raccoon',
  'Scorpion',
  'Puppy',
  'Squirrel',
  'Buffalo',
  'Crocodile',
  'Imagine',
];

const GeneratorPage = () => {
  const [log, setLog] = useState([]);
  const [name, setName] = useState('');
  const [index, setIndex] = useState(null);
  const [status, setStatus] = useState('');

  const Append = () => {
    setLog([...log, {name: name, model: index, status: status}]);
  };

  const Renderer = ({item, index}) => {
    return (
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    );
  };

  const Clear = () => {
    log.pop();
    setLog([...log]);
  };

  const Generate = () => {
    const date = moment().format('l');
    const text = StringGenerator(log);
    const finaltext = `${moment().format('dddd')} ${date} \n ${text}`;

    Clipboard.setString(finaltext);
    alert(finaltext);
  };

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <TextInput placeholder="Name" onChangeText={(text) => setName(text)} />
      <TextInput
        placeholder="Status"
        onChangeText={(text) => setStatus(text)}
      />
      <View style={{height: '20%'}}>
        <MyList data={log} rendererItem={Renderer} />
      </View>
      <View style={{height: '50%'}}>
        <MyList data={level2} selection={(index) => setIndex(index)} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          paddingTop: 20,
        }}>
        <Button title="Append" onPress={Append} />
        <Button title="Clear" onPress={Clear} />
        <Button title="Generate" onPress={Generate} />
      </View>
    </View>
  );
};

export default GeneratorPage;
