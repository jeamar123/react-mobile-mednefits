import React from 'react';

import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form';
import { View, Text } from 'react-native';
import styles from './styles';

const SettingWallet = () => (
  <View style={styles.container}>
    <View style={styles.sectionTitle}>
      <Text style={styles.title}>
        Set your payment passcode to allow payment using Benefit Dollars for
        In-Network transactions.
      </Text>
      <Text style={styles.detail}>IN-NETWORK PAYMENT</Text>
    </View>
    <GiftedForm
      style={{
        backgroundColor: '#fff',
        paddingLeft: 5,
        paddingRight: 15,
      }}
      openModal={route => {
        navigator.push(route); // The ModalWidget will be opened using this method. Tested with ExNavigator
      }}
    >
      <GiftedForm.TextInputWidget
        name="paymentPasscode"
        title="Passcode"
        placeholder="******"
        clearButtonMode="while-editing"
        secureTextEntry={true}
      />
    </GiftedForm>
    <View style={styles.sectionTitle}>
      <Text style={styles.title}>
        Provide your bank account details for E-Claim transcations
        reiembursement.
      </Text>
      <Text style={styles.detail}>BANK ACCOUNT DETAILS</Text>
    </View>
    <GiftedForm
      style={{
        backgroundColor: '#fff',
        paddingLeft: 5,
        paddingRight: 15,
      }}
      openModal={route => {
        navigator.push(route); // The ModalWidget will be opened using this method. Tested with ExNavigator
      }}
    >
      <GiftedForm.TextInputWidget
        name="yourName"
        title="*Your Name"
        clearButtonMode="while-editing"
      />
      <GiftedForm.TextInputWidget
        name="accountNumber"
        title="*Account Number"
        clearButtonMode="while-editing"
      />
      <GiftedForm.SeparatorWidget />
      <GiftedForm.SeparatorWidget />
      <GiftedForm.SeparatorWidget />
      <GiftedForm.SeparatorWidget />
    </GiftedForm>
  </View>
);

export default SettingWallet;
