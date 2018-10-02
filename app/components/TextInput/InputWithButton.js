import React from 'react';
import { View, TextInput } from 'react-native';

import styles from './styles';

const InputWithButton = props => {
  const containerStyles = [styles.container];

  return (
    <View style={containerStyles}>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        {...props}
      />
    </View>
  );
};

export default InputWithButton;
