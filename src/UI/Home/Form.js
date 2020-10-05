import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {models, ReadData} from '../../Helper';
import {MyList, MySectionList} from '../List';

const MyForm = ({navigation}) => {
  const [state, setState] = useState(0);
  const [student, setStudent] = useState([]);
  const [name, setName] = useState(null);

  useEffect(() => {
    ReadData((data) => {
      setStudent(data);
    });
  }, []);

  switch (state) {
    // student selection
    case 0:
      return (
        <View style={{flex: 1}}>
          <MyList
            data={student}
            selection={(id) => {
              setName(student[id]);
              setState(1);
            }}
          />
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'flex-end',
              padding: 5,
            }}></View>
        </View>
      );
    // model selection
    case 1:
      return (
        <>
          <View style={{flex: 1, backgroundColor: 'black'}}>
            <MySectionList
              data={models}
              selection={(data) => {
                navigation.navigate('Report', {name, ...data});
              }}
            />
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'flex-end',
                padding: 5,
              }}></View>
          </View>
        </>
      );
  }
};

export default MyForm;
