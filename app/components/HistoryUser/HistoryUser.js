import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';

const HistoryUser = () => (
  <View>
    <View style={styles.sectionHeader}>
      <View style={styles.contentHeader}>
        <View />
        <Image style={styles.imageHeader} />
        <View />
      </View>
    </View>
    <View style={styles.sectionDetail}>
      <Text numberOfLines={2} adjustsFontSizeToFit={true} style={styles.amount}>
        Total Amount: S$ 80.00
      </Text>
      <Text numberOfLines={2} adjustsFontSizeToFit={true} style={styles.detail}>
        In-Network
      </Text>
    </View>
  </View>
);

export default HistoryUser;
