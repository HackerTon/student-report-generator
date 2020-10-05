import React, {useState} from 'react';
import {FlatList, SectionList} from 'react-native';
import {ListItem} from 'react-native-elements';

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

const MySectionList = ({data, style, selection, rendererItem}) => {
  const Selector = selection ? selection : () => {};

  const keyExtractor = (item, index) => item + index;
  const renderItem = rendererItem
    ? rendererItem
    : ({item, index, section}) => {
        const {title} = section;

        return (
          <ListItem
            topDivider
            bottomDivider
            onPress={() => {
              selection({title, item});
            }}
            containerStyle={{backgroundColor: 'black'}}>
            <ListItem.Content>
              <ListItem.Title>{item}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        );
      };

  return (
    <SectionList
      sections={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      renderSectionHeader={({section}) => {
        return (
          <ListItem
            containerStyle={{
              backgroundColor: 'black',
              flex: 1,
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <ListItem.Content>
              <ListItem.Title h4>
                {String(section.title).toUpperCase()}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        );
      }}
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
export {MyList, SpecialList, MySectionList};
