import React from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';
import * as Common from '../common'
import styles from './styles';

const VericicationReceipt = () => (
  <View style={[styles.container,{backgroundColor: '#fff', padding: 15}]}>
    <Common.Texti fontColor={"#2C3E50"}>
      Receipt Verification for Claim Reimbursement
    </Common.Texti>
  </View>
);

export default VericicationReceipt;
