import React from 'react';
import { View } from 'react-native';
// import { TextInputMask } from 'react-native-masked-text';
// import TextInputMask from 'react-native-text-input-mask';
// import CurrencyInput from 'react-currency-input';
// import { TextInputMask } from 'react-masked-text';
import * as Common from '../common';
import styles from './styles';

const InputWithButton = props => {
  const containerStyles = [styles.containerPay];

  return (
    <View >

      {/* <TextInputMask
        autoFocus={true}
        kind={'money'}
        options={{ unit: '', precision: '2', separator: '.', delimiter: ',', }}
        style={styles.inputPay}
        {...props}
        underlineColorAndroid="transparent"
      /> */}

      {/* <Common.SimpleCurrencyInput
        precision={2}
        separator=','
        delimiter='.'
        style={styles.inputPay}
        autoFocus={true}
        keyboardType='numeric'
      /> */}

      <Common.TextInputMask
        autoFocus={true}
        type={'money'}
        options={{
          unit: '',
          precision: '2',
          separator: '.',
          delimiter: ',',
          suffixUnit: ''
        }}
        ref={(ref) => this.moneyField = ref}
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
        autoFocus={'true'}
        decimalSeparator="."
        thousandSeparator=","
        {...props}
      /> */}
    </View>
  );
};

export default InputWithButton;
