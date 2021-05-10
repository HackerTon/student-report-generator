import React, {useState} from 'react';
import {FlatList, SectionList, StyleProp, ViewStyle} from 'react-native';
import {ListItem, Text} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {mylistProp} from '../Helper/Types';

const MyList = ({data, style, selection, rendererItem}: mylistProp) => {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <FlatList
      data={data}
      extraData={selectedId}
      keyExtractor={keyExtractor}
      renderItem={rendererItem}
      style={style}
    />
  );
};

const MySectionList = ({data, style, selection, rendererItem}: mylistProp) => {
  const keyExtractor = (item, index) => item + index;

  // remove this list renderer item
  const renderItem = rendererItem
    ? rendererItem
    : ({item, index, section}) => {
        const {level} = section;

        return (
          <TouchableOpacity
            style={{
              paddingVertical: 15,
              paddingLeft: 20,
              marginHorizontal: 10,
              marginVertical: 5,
              backgroundColor: '#191919',
              borderRadius: 4,
            }}
            onPress={() => {
              selection(item);
            }}>
            <Text
              style={{
                fontSize: 17,
              }}>
              {`${parseInt(index) + 1}. ${item.name}`}
            </Text>
          </TouchableOpacity>
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
              backgroundColor: '#121212',
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

export {MyList, MySectionList};
