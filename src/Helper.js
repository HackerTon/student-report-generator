import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

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

const StringGenerator = (array) => {
  var text = '';

  array.forEach((value, index) => {
    const {name, model, status} = value;
    text = text.concat(
      `${index}. ${name.toString()} - ${level2[model]} ${status} \n\n`,
    );
  });

  return text;
};

const WriteData = async (array, set) => {
  const selection = set ? set : 'students';

  try {
    await AsyncStorage.setItem('students', JSON.stringify(array));
    console.log('Write successful');
  } catch (e) {
    console.error(`Error during write: ${e}`);
  }
};

const ReadData = async (callback, set) => {
  const selection = set ? set : 'students';
  callback = callback ? callback : () => {};

  try {
    const jsonValue = await AsyncStorage.getItem('students');
    const value = JSON.parse(jsonValue);

    callback(value);

    console.log('Read successful.');
  } catch (e) {
    console.error(`Error during write: ${e}`);
  }
};
export {StringGenerator, WriteData, ReadData};
