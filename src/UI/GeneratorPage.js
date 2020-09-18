import React, {useState} from 'react';
import {View, TextInput} from 'react-native';
import {Button, Text, ListItem} from 'react-native-elements';
import MyList from './List';

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
  'ImagineI',
];

const GeneratorPage = () => {
  const [log, setLog] = useState([]);
  const [name, setName] = useState('');
  const [index, setIndex] = useState(null);

  const Append = () => {
    setLog([...log, {name: name, model: level2[index]}]);
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

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <TextInput placeholder="Name" onChangeText={(text) => setName(text)} />
      <View style={{height: '20%'}}>
        <MyList data={log} rendererItem={Renderer} />
      </View>
      <View style={{height: '60%'}}>
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
        <Button title="Generate" />
      </View>
    </View>
  );
};

export default GeneratorPage;
