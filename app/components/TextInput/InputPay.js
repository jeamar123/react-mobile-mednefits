import React from 'react';
import { View } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
// import TextInputMask from 'react-native-text-input-mask';
// import CurrencyInput from 'react-currency-input';
import * as Common from '../common';


import styles from './styles';

const InputWithButton = props => {
  const containerStyles = [styles.containerPay];

  return (
    <View >
      {/* <Common.SimpleCurrencyInput
        precision={2}
        separator=','
        delimiter='.'
        style={styles.inputPay}
        autoFocus={true}
        keyboardType='numeric'
      /> */}

      <TextInputMask
        autoFocus={true}
        type={'money'}
        options={{ unit: '', precision: '2', separator: '.', delimiter: ',', }}
        style={styles.inputPay}
        {...props}
        underlineColorAndroid="transparent"
      />

      {/* <TextInputMask
        autoFocus={true}
        type={'custom'}
        options={{
          mask: '999,999,999.99'
        }}
        style={styles.inputPay}
        {...props}
        underlineColorAndroid="transparent"
      /> */}

      {/* <TextInputMask
        autoFocus={true}
        style={styles.inputPay}
        {...props}
        mask={"[999]{,}[999]{,}[999]{.}[99]"}
      /> */}

      {/* <CurrencyInput
      /> */}
    </View>
  );
};

export default InputWithButton;
