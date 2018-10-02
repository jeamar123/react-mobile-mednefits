import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';

import Navigation from './config/routes';

export default () => <Navigation />;

EStyleSheet.build({
  $primaryBlue: '#4F6D7A',
  $white: '#FFFFFF',
  $greyLogin: '#bdbdbd',
  $lightGray: '#F0F0F0',
  $border: '#E2e2e2',
  $inputText: '#797979',
  $black: '#000000',
});
