import React from 'react';
import { View, TextInput } from 'react-native';
import { TextInputMask } from 'react-native-masked-text'


import styles from './styles';

const InputWithButton = props => {
  const containerStyles = [styles.containerPay];

  return (
    <View style={containerStyles}>
      <TextInputMask
        autoFocus={true}
        type={'money'}
        options={{ unit: '', precision: '2', separator: '.', delimiter: '.', }}
        style={styles.inputPay}
        {...props}
        underlineColorAndroid="transparent"
      />
    </View>
  );
};

export default InputWithButton;
