import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import * as Core from '../../core';

class DollarBenefits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Balance: '0',
    };
  }

  UNSAFE_componentWillMount() {
    this.getUserBalance();
  }

  getUserBalance() {
    Core.GetBalance((error, result) => {
      data =
        typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      console.warn(data);
      this.setState({
        Balance: data.balance,
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.sectionTitle}>
          <Text style={styles.title}>Current Balance</Text>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <Text style={styles.detailUp}>S$</Text>
            <Text style={styles.detail}>{this.state.Balance}</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default DollarBenefits;
