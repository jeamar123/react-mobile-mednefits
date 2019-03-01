import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';

const SummaryComp = () => (
  <View style={styles.container}>
    <View style={styles.sectionTitle}>
      <Image
        style={{ marginLeft: 25, marginRight: 25, width: 25, height: 25 }}
        source={require('../../../assets/apps/payment_successful.png')}
      />
      <Text style={styles.title}>Payment Successful</Text>
    </View>
  </View>
);

export default SummaryComp;
