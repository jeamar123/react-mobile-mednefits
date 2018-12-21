import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const Buttons = ({ onPress, children }) => {
  const { MainContainer, ButtonStyle, TextStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={ButtonStyle}>
      <Text style={TextStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  ButtonStyle: {
    padding: 10,
    backgroundColor: '#0392cf',
    borderRadius: 5,
    width: "100%"
  },
  TextStyle: {
    fontFamily: 'helvetica',
    color: '#fff',
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '600',
  },
};

export { Buttons };
