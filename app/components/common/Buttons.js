import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const Buttons = ({ onPress, children }) => {
  const { MainContainer, ButtonStyle, TextStyle } = styles;

  return (
    <View style={MainContainer}>
      <TouchableOpacity onPress={onPress} style={ButtonStyle}>
        <Text style={TextStyle}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  MainContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  ButtonStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    width: width / 1.46,
    backgroundColor: '#0392cf',
    borderRadius: 5,
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
