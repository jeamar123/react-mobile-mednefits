import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const ClaimDetail = () => (
  <View style={styles.container}>
    <View style={styles.sectionTitle}>
      <Text style={styles.title}>
        Only 1 item/service is allow to file per claim submission. After claim
        is filed, you may track your claim status under History.
      </Text>
      <Text style={styles.detail}>CLAIM DETAILS</Text>
    </View>
  </View>
);

export default ClaimDetail;
