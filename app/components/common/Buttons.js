import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import * as Config from '../../config'

const { width } = Dimensions.get('window');

const Buttons = ({ onPress, children, props }) => {
  const { MainContainer, ButtonStyle, TextStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={ButtonStyle} {...props}>
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
    width: '80%'
  },
  TextStyle: {
    fontFamily: Config.FONT_FAMILY_ROMAN,
    color: '#fff',
    alignSelf: 'center',
    fontSize: 20,
  },
};

export { Buttons };
