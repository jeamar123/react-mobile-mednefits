import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import * as Core from '../../core';

class HistoryClaim extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Balance: '0',
      Full_name: '',
    };
  }

  componentWillMount() {
    this.getUserDetail();
  }

  getUserDetail() {
    // Core.UserDetail((error, result) => {
    //   data =
    //     typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
    //   console.warn(data);
    //   this.setState({
    //     Full_name: data.profile.full_name,
    //   });
    // });
  }

  render() {
    return (
      <View>
        <View style={styles.sectionHeader}>
          <View style={styles.contentHeader}>
            <View />
            <View style={{ flexDirection: 'column', alignItems: 'center', textAlignVertical: 'center' }}>
              <Text numberOfLines={2} style={styles.Title}>
                {this.props.Status}
              </Text>
              <Text numberOfLines={2} style={styles.details}>
                {this.props.Date}
              </Text>
            </View>
            <View />
          </View>
        </View>
        <View style={styles.sectionDetail}>
          <Text
            numberOfLines={2}
            adjustsFontSizeToFit={true}
            style={styles.amount}
          >
            Claim Amount: {this.props.Currency} {this.props.Amount}
          </Text>
          <Text
            numberOfLines={2}
            adjustsFontSizeToFit={true}
            style={styles.out_of_network}
          >
            E-Claim
          </Text>
        </View>
      </View>
    );
  }
}

export default HistoryClaim;
