import React, { Component } from 'react';
import { StatusBar, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { InputWithButton } from '../components/TextInput';
import { Buttons } from '../components/common';
import { LoginProcess } from '../core'

class Splash extends Component {

  constructor(props){
    super(props)

    this.state = {
      username: false,
      password: false
    }
  }

  render() {
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />

      </Container>
    );
  }
}

export default Splash;
