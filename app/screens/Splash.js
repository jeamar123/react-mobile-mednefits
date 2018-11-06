import React, { Component } from 'react';
import { StatusBar, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { ACCESS_TOKEN } from '../config/variable';
import * as Core from '../core';
import * as Config from '../config';

class Splash extends Component {

  componentWillMount() {
    setTimeout(() => {
      Core.AppStatus()
    }, 500);
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
