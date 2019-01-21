import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import * as Common from '../common'

const EclaimSubmit = () => (
  <View style={styles.container}>
    <View style={styles.sectionTitle}>
      <Common.Texti
        color={"#A5A5A5"}
        style={styles.title}>
        Only 1 item/service is allow to file per claim submission. After claim
        is filed, you may track your claim status under History.
      </Common.Texti>
      <Common.Texti
        color={"#95a5a6"}
        style={styles.detail}>CLAIM DETAILS</Common.Texti>
    </View>
  </View>
);

export default EclaimSubmit;
