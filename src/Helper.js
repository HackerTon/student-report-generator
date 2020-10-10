import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const models = [
  {
    title: 'level 1',
    data: [
      'Squirrel',
      'Windmill',
      'Whale',
      'Dragonfly',
      'Brachiosaurus',
      'Rabbit',
      'Calf',
      'Ladybug',
      'Chick',
      'Kangaroo',
      'Caterpillar',
      'Tyrannosaurus',
      'Creative',
    ],
  },
  {
    title: 'level 2',
    data: [
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
    ],
  },
  {
    title: 'level 3',
    data: [
      'Security Robot',
      'Sound Detecting Robot',
      'Four-wheeled car',
      'Money Box',
      'Roly Poly',
      'Passcode Safe',
      'Motorcycle',
      'Cannon',
      'Airplane',
      'Robot arm',
      'Sports Car',
      'My own robot',
    ],
  },
  {title: 'miscellaneous', data: ['Absent']},
];

const progress = ['assembling', 'programming', 'done'];

const ValidateName = (text) => {
  let validator = /^\d+$/;

  return !(validator.test(text) || text === '');
};

const StringGenerator = (array) => {
  var text = '';

  array.forEach((value, index) => {
    const {name, model, status} = value;
    text = text.concat(
      `${index}. ${name.toString()} - ${level[model]} ${status} \n\n`,
    );
  });

  return text;
};

const WriteData = async (array, set) => {
  const selection = set ? set : 'students';

  try {
    await AsyncStorage.setItem(selection, JSON.stringify(array));
    console.log('Write successful');
  } catch (e) {
    console.error(`Error during write: ${e}`);
  }
};

const ReadData = async (callback, set) => {
  const selection = set ? set : 'students';
  callback = callback ? callback : () => {};

  try {
    const jsonValue = await AsyncStorage.getItem(selection);
    const value = JSON.parse(jsonValue);

    callback(value);

    console.log('Read successful.');
  } catch (e) {
    console.error(`Error during write: ${e}`);
  }
};
export {StringGenerator, WriteData, ReadData, ValidateName, models, progress};
