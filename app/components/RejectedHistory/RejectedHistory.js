import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const RejectedHistory = () => (
  <View>
    <View style={styles.sectionHeader}>
      <View style={styles.contentHeader}>
        <View />
        <View>
          <Text style={styles.textHeader}>Rejected</Text>
          <Text style={styles.text}>18 July 2018</Text>
        </View>
        <View />
      </View>
    </View>
    <View style={styles.sectionDetail}>
      <Text numberOfLines={2} adjustsFontSizeToFit={true} style={styles.amount}>
        Total Amount: S$ 80.00
      </Text>
      <Text numberOfLines={2} adjustsFontSizeToFit={true} style={styles.detail}>
        E-Claim
      </Text>
    </View>
  </View>
);

export default RejectedHistory;
