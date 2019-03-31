import React, { Component } from 'react';
import {
  View
} from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export default class Divider extends Component {
  render() {
    return (
      <View
        style={{
          borderBottomColor: '#DBDBDB',
          borderBottomWidth: 0.8,
          marginBottom: responsiveHeight(1),
        }}
      />
    );
  }
}
