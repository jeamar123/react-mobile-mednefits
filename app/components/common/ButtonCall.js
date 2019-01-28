import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import * as Config from '../../config'

const { width } = Dimensions.get('window');

const ButtonCall = ({ onPress, children }) => {
  const { MainContainer, ButtonStyle, TextStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={ButtonStyle}>
      <Text style={TextStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  ButtonStyle: {
    paddingTop: 4,
    paddingBottom: 4,
    backgroundColor: '#21bf3f',
    borderRadius: 5,
    alignSelf: 'center',
    width: '45%'
  },
  TextStyle: {
    fontFamily: Config.FONT_FAMILY_ROMAN,
    color: '#fff',
    alignSelf: 'center',
    fontSize: 14,
  },
};

export { ButtonCall };
