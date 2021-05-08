import React, {useState} from 'react';
import {FlatList, SectionList} from 'react-native';
import {ListItem, Text} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';

const MyList = ({data, style, selection, rendererItem}) => {
  const [selectedId, setSelectedId] = useState(null);

  const keyExtractor = (_, index) => index.toString();
  const renderItem = rendererItem
    ? rendererItem
    : ({item, index}) => {
        const selector = selection ? selection : () => {};

        return (
          <ListItem
            onPress={() => {
              setSelectedId(index);
              selector({item, index});
            }}
            containerStyle={{backgroundColor: '#191919'}}>
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
  const keyExtractor = (item, index) => item + index;

  const renderItem = rendererItem
    ? rendererItem
    : ({item, index, section}) => {
        const {title} = section;

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
            onPress={() => selection({title, item, index})}>
            <Text
              style={{
                fontSize: 17,
              }}>
              {`${index + 1}. ${item}`}
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
