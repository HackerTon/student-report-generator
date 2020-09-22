import React, {useState} from 'react';
import {View, FlatList} from 'react-native';
import {Text, ListItem} from 'react-native-elements';

const MyList = ({data, style, selection, rendererItem}) => {
  const [selectedId, setSelectedId] = useState(null);

  const keyExtractor = (_, index) => index.toString();
  const renderItem = rendererItem
    ? rendererItem
    : ({item, index}) => {
        const color = selectedId === index ? 'grey' : 'black';
        const selector = selection ? selection : () => {};

        return (
          <ListItem
            bottomDivider
            onPress={() => {
              setSelectedId(index);
              selector(index);
            }}
            containerStyle={{backgroundColor: color}}>
            <ListItem.Content>
              <ListItem.Title>{item}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        );
      };

  return (
    <FlatList
      data={data}
      extraData={selectedId}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      style={style}
    />
  );
};

const SpecialList = ({data, style, selection, rendererItem}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [trigger, setTrigger] = useState([].fill(false, 0, data.length));

  const selector = selection ? selection : () => {};
  const keyExtractor = (_, index) => index.toString();
  const renderItem = rendererItem
    ? rendererItem
    : ({item, index}) => {
        const color = trigger[index] ? 'grey' : 'black';

        return (
          <ListItem
            bottomDivider
            onPress={() => {
              setSelectedId(index);
              trigger[index] = !trigger[index];
              setTrigger(trigger);
              selector(index);
            }}
            containerStyle={{backgroundColor: color}}>
            <ListItem.Content>
              <ListItem.Title>{item}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        );
      };

  return (
    <FlatList
      data={data}
      extraData={selectedId}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      style={style}
    />
  );
};
export {MyList, SpecialList};
