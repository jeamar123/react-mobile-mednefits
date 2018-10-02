import React from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';

import styles from './styles';

const VericicationReceipt = () => (
  <View style={styles.container}>
    <ImageBackground resizeMode="contain" style={styles.containerImage}>
      <Image
        resizeMode="contain"
        style={styles.image}
        source={require('./images/Verification.png')}
      />
    </ImageBackground>
    <Text style={styles.text}>
      Snap a photo of your physical receipt given by the merchant for claim
      reimbursement.
    </Text>
  </View>
);

export default VericicationReceipt;
