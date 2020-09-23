import React from 'react';
import {ReadData, WriteData} from '../../Helper';

const RegistrationScreen = ({style}) => {
  const [students, setStudents] = useState(null);
  const [name, setName] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    Read();
  }, []);

  const Write = () => {
    if (name !== '') {
      WriteData([...students, name]);
      Read();
    }
  };

  const Read = () => {
    ReadData((data) => setStudents(data));
  };

  const Delete = () => {
    const arr = students
      .splice(0, selectedId)
      .concat(students.splice(selectedId + 1, students.length));

    WriteData(arr);
    Read();
  };

  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        flexDirection: 'column',
      }}>
      <TextInput
        placeholder="Name"
        placeholderTextColor="white"
        onChangeText={(text) => setName(text)}
      />
      <MyList data={students} selection={setSelectedId} />
      <View style={{padding: 5, flexDirection: 'row'}}>
        <Button title="Add Students" onPress={() => Write()} />
        <Button title="Remove Students" onPress={() => Delete()} />
      </View>
    </View>
  );
};

export default RegistrationScreen;
