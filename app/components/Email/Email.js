import React, { Component } from 'react';
import { View, Text } from 'react-native';

import styles from './styles';


class Email extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        {/*
          : (
            <Text style={{
              color: "#ff0000",
              fontFamily: 'helvetica',
              fontSize: 32,
              fontWeight: '300',
              marginBottom: 120,
            }}>User Not Found!</Text>
          )
        */}
        {
          (this.props.Type == 'email') ? (
            <Text style={styles.textTitle}>Email Sent!</Text>
          ) : (this.props.Type == 'sms') ? (
            <Text style={styles.textTitle}>SMS Sent!</Text>
          ) : null
        }
        <Text style={styles.text}>{this.props.Message}</Text>
      </View>
    );
  }
}

export default Email;
