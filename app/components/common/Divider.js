import React, { Component } from 'react';
import {
  View
} from 'react-native'

export default class Divider extends Component {
  render() {
    return (
      <View
        style={{
          borderBottomColor: '#DBDBDB',
          borderBottomWidth: 0.8,
          marginTop: (this.props.noMargin) ? 0 : 10,
          marginBottom: (this.props.noMargin) ? 0 : 10,
        }}
      />
    );
  }
}
