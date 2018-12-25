import React from 'react';
import { Text, TouchableOpacity, Dimensions } from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import * as Config from '../../config'

const { width } = Dimensions.get('window');

const ButtonProfile = ({ onPress, children }) => {
  const { ButtonStyle, TextStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={ButtonStyle}>
      <Text style={TextStyle}>{children}</Text>
      <Icons
        name="angle-right"
        style={{ color: '#fff', fontSize: 32, paddingEnd: 10 }} />
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
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#8fd8f7',
    alignSelf: 'flex-end',
    flexDirection: 'row', 
    justifyContent: 'space-between',
    width: '65%',
  },
  TextStyle: {
    fontFamily: Config.FONT_FAMILY_MEDIUM,
    color: '#fff',
    alignSelf: 'center',
    fontSize: 16,
    paddingStart: 10
  },
};

export { ButtonProfile };
