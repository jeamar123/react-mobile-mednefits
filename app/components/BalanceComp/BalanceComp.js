import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';

const BalanceComp = () => (
  <View style={styles.container}>
    <View style={styles.sectionTitle}>
      <Image
        style={{ marginLeft: 10, marginRight: 10 }}
        source={require('../../../assets/apps/checklist.png')}
      />
      <Text style={styles.title}>Payment Successful</Text>
    </View>
  </View>
);

export default BalanceComp;
