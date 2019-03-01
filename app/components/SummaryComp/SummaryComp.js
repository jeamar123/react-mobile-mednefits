import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';

const SummaryComp = () => (
  <View style={styles.container}>
    <View style={styles.sectionTitle}>
      <View style={{ marginLeft: 20, marginRight: 20 }}>
        <Image
          style={{ width: 35, height: 35 }}
          source={require('../../../assets/apps/payment_successful.png')}
        />
      </View>
      <View>
        <Text style={styles.title}>Payment Successful</Text>
      </View>

    </View>
  </View>
);

export default SummaryComp;
