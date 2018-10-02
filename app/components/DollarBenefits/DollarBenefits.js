import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const DollarBenefits = () => (
  <View style={styles.container}>
    <View style={styles.sectionTitle}>
      <Text style={styles.title}>Current Balance</Text>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <Text style={styles.detailUp}>S$</Text>
        <Text style={styles.detail}>100</Text>
        <Text style={styles.detailUp}>00</Text>
      </View>
    </View>
  </View>
);

export default DollarBenefits;
