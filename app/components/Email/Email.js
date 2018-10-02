import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

const Email = () => (
  <View style={styles.container}>
    <Text style={styles.textTitle}>Email Sent!</Text>
    <Text style={styles.text}>
      We've sent an email to{' '}
      <Text style={{ fontFamily: 'helveticabold' }}>filbert@mednefits.com</Text>{' '}
      with a link to reset your password
    </Text>
  </View>
);

export default Email;
