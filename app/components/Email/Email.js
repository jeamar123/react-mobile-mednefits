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
        <Text style={styles.textTitle}>Email Sent!</Text>
        <Text style={styles.text}>
          We've sent an email to{' '}
          <Text style={{ fontFamily: 'helveticabold' }}>{this.props.email}</Text>{' '}
          with a link to reset your password
        </Text>
      </View>
    );
  }
}

export default Email;