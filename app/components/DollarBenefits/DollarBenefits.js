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

  componentWillMount = async () => {
    await this.getUserBalance();
  }

  getUserBalance = async () => {
    await Core.GetBalance(async (error, result) => {
      data = await typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      console.warn(data);
      await this.setState({
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
