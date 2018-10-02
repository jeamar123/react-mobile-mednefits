import React from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';

import styles from './styles';

const EclaimThanks = () => (
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
      Your claim has been successfully submitted. Our team will be processing
      your claim, for claim status updates go to History.
    </Text>
  </View>
);

export default EclaimThanks;
