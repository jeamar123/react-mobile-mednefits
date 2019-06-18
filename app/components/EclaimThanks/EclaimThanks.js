import React from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';
import * as Common from '../common'

import styles from './styles';

const EclaimThanks = () => (
  <View style={styles.container}>
    <ImageBackground resizeMode="contain" style={styles.containerImage}>
      <Image
        style={{
          height: 85,
          resizeMode: 'contain',
          width: 85,
          marginTop: '20%',
          marginBottom: '10%',
        }}
        source={require('./images/smile.png')}
      />
    </ImageBackground>
    <Text style={styles.textThanks}>Thank you!</Text>
    <Text style={styles.text}>
      Your claim has been successfully submitted. For claim status update, please go to History / Activity
    </Text>
  </View>
);

export default EclaimThanks;
