import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';

const UserSwitch = () => (
  <View style={styles.container}>
    <View style={styles.sectionTitle}>
      <Image
        source={require('../../../assets/apps/coverage.png')}
        resizeMode="contain"
        style={{
          flex: 1,
          height: 80,
          width: 80,
          marginTop: '5%',
          marginLeft: '5%',
        }}
      />
      <Text style={styles.rightSide}>
        Switch to your spouse or dependent account, if they are part of your
        benefits package. They can now enjoy the same benefits.
      </Text>
    </View>
  </View>
);

export default UserSwitch;
