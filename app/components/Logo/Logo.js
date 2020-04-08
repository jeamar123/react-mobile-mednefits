import React from 'react';
import { View, ImageBackground, Image } from 'react-native';

import styles from './styles';

//var image = require('../../../assets/mobile-logo-blue.png');

const Logo = () => (
  <View style={styles.container}>
    <ImageBackground resizeMode="contain" style={styles.containerImage}>
      <Image
        resizeMode="contain"
        style={styles.logo}
        //source={image}
        source={require('../../../assets/mobile-logo-blue.png')}
      />
    </ImageBackground>
  </View>
);

export default Logo;
