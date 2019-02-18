import React from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';

import styles from './styles';

const VericicationReceipt = () => (
  <View style={styles.container}>
    <Image
      style={{
        height: 90,
        resizeMode: 'contain',
        width: 90,
        marginTop: '20%',
        marginBottom: '10%',
      }}
      source={require('./images/Verification.png')}
    />
    <Text style={styles.text}>
      Snap a photo of your physical receipt given by the merchant for claim
      reimbursement.
    </Text>
  </View>
);

export default VericicationReceipt;
