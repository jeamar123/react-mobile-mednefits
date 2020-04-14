import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import * as Core from '../core';

class Splash extends Component {

  async UNSAFE_componentWillMount() {
    setTimeout(() => {
      Core.AppStatus()
    }, 1000);
    await AsyncStorage.removeItem('latitude');
    await AsyncStorage.removeItem('longitude');
    console.log('removed latitude')
    console.log('removed longitude')
  }

  render() {
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Logo />
      </Container>
    );
  }
}

export default Splash;
