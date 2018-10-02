import React from 'react';
import { View, ActivityIndicator } from 'react-native';

let Spinner = ({ size }) => {
  let { spinnerStyle } = styles;
  return (
    <View style={spinnerStyle}>
      <ActivityIndicator size={size || 'large'} />
    </View>
  );
};

let styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export { Spinner };
