import React from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';

import styles from './styles';

const Health = () => (
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
      Once your payment is make known by our health provider to us, you may view
      your transaction under History
    </Text>
  </View>
);

export default Health;
