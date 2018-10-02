import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from './styles';

const HomeContent = () => (
  <View style={styles.container}>
    <View style={styles.sectionTitle}>
      <View style={styles.contain}>
        <TouchableOpacity
          onPress={() =>
            Actions.ScanPay({
              type: 'reset',
            })
          }
        >
          <View style={styles.gridBox}>
            <Image
              style={{
                marginBottom: 15,
              }}
              source={require('../../../assets/apps/Scan&Pay.png')}
            />
            <Text style={styles.title}>Scan & Pay</Text>
            <Text style={styles.detail}>In-Network</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Actions.Balance({
              type: 'reset',
            })
          }
        >
          <View style={styles.gridBox}>
            <Image
              style={{
                marginBottom: 15,
              }}
              source={require('../../../assets/apps/E-Card.png')}
            />
            <Text style={styles.title}>E-Card</Text>
            <Text style={styles.detail}>Filbert</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Actions.BenefitsDollar({
              type: 'reset',
            })
          }
        >
          <View style={styles.gridBox}>
            <Image
              style={{
                marginBottom: 15,
                justifyContent: 'center',
                alignItems: 'center',
                width: 30,
                height: 30,
              }}
              source={require('../../../assets/apps/wallet.png')}
            />
            <Text style={styles.title}>B-Dollars</Text>
            <Text style={styles.detail}>S$1.000.00</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default HomeContent;
