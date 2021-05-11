import React, {useContext} from 'react';
import {SectionList} from 'react-native';
import {ListItem, Text} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {DetailDispatch} from '../App';
import {Model, mylistProp} from '../Helper/Types';

const MySectionList = ({data, style, selection}: mylistProp) => {
  const {state, dispatch} = useContext(DetailDispatch);
  const keyExtractor = (item: string, index: number) => item + index;

  // remove this list renderer item
  const rendererItem = ({item, index}: {item: Model; index: string}) => {
    // change this item to white if
    // this is the last progress
    const color = item.index == state.prevModel ? 'grey' : '#191919';

    return (
      <TouchableOpacity
        style={{
          paddingVertical: 15,
          paddingLeft: 20,
          marginHorizontal: 10,
          marginVertical: 5,
          backgroundColor: color,
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
      renderItem={rendererItem}
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

export {MySectionList};
