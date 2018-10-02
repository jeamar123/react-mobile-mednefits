import React from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';

import styles from './styles';

const InNetwork = () => (
  <View style={styles.container}>
    <ImageBackground resizeMode="contain" style={styles.containerImage}>
      <Image
        resizeMode="contain"
        style={styles.image}
        source={require('./images/smile.png')}
      />
    </ImageBackground>
    <Text style={styles.textThanks}>Thank you!</Text>
    <Text style={styles.text}>
      Payment is successfully deducted using your Benefit Dollars. You may view
      your transaction under History.
    </Text>
  </View>
);

export default InNetwork;
