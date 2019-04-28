import React from 'react';
import { Dimensions } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
import Navigation from './config/routes';

let entireScreenWidth = Dimensions.get('window').width;

export default () => <Navigation />;


EStyleSheet.build({
  $rem: entireScreenWidth / 380,
  $primaryBlue: '#4F6D7A',
  $white: '#ffffff',
  $greyLogin: '#bdbdbd',
  $lightGray: '#F0F0F0',
  $border: '#E2e2e2',
  $inputText: '#797979',
  $black: '#000000',
});
