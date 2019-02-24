import React from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';

import styles from './styles';

const Health = () => (
  <View style={styles.container}>
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
    <Text style={styles.textThanks}>Thank you!</Text>
    <Text style={styles.text}>
      Once your payment is make known by our health provider to us, you may view
      your transaction under History
    </Text>
  </View>
);

export default Health;
