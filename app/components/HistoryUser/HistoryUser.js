import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import * as Core from '../../core';

class HistoryUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Balance: '0',
      Full_name: '',
    };
  }

  componentWillMount() {
    // this.getUserDetail();
  }

  getUserDetail() {
    Core.UserDetail((error, result) => {
      data =
        typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      console.warn(data);
      this.setState({
        Full_name: data.profile.full_name,
      });
    });
  }

  render() {
    return (
      <View>
        <View style={styles.sectionHeader}>
          <View style={styles.contentHeader}>
            <View />
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <Image
                source={{ uri: this.props.clinicimage }}
                style={styles.imageHeader} />
              <Text
                numberOfLines={2}
                style={styles.detail}
              >{this.props.clinicname}</Text>
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
            Total Amount: {this.props.Currency ? this.props.Currency : 'N/A'} {this.props.Amount ? this.props.Amount : '0.00'}
          </Text>
          <Text
            numberOfLines={2}
            adjustsFontSizeToFit={true}
            style={styles.in_network}
          >
            In-Network
          </Text>
        </View>
      </View>
    );
  }
}

export default HistoryUser;
