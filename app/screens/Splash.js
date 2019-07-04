import React, { Component } from 'react';
import { StatusBar, AsyncStorage } from 'react-native';
import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import * as Core from '../core';

class Splash extends Component {

  async componentWillMount() {
    setTimeout(() => {
      Core.AppStatus()
    }, 500);
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
