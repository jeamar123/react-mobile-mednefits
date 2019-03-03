import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import * as Config from '../../config'

const { width } = Dimensions.get('window');

const Buttons2 = ({ onPress, children}) => {
  const { MainContainer, ButtonStyle, TextStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={ButtonStyle}>
      <Text style={TextStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  MainContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  ButtonStyle: {
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#0392cf',
    borderRadius: 5,
    margin: 10,
    alignSelf: 'center',
    width: '100%'
  },
  TextStyle: {
    fontFamily: Config.FONT_FAMILY_LIGHT,
    color: '#fff',
    alignSelf: 'center',
    fontSize: 20,
  },
};

export { Buttons2 };
