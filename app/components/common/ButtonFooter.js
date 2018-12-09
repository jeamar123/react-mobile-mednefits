import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const ButtonFooter = ({ onPress, children }) => {
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
    width: width,
    backgroundColor: '#0392cf',
  },
  TextStyle: {
    fontFamily: 'HelveticaNeue-Light',
    color: '#fff',
    alignSelf: 'center',
    fontSize: 20,
  },
};

export { ButtonFooter };
