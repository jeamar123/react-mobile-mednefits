import React, { Component } from 'react';
import { StatusBar, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { InputWithButton } from '../components/TextInput';
import { Buttons } from '../components/common';

class Login extends Component {
  render() {
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Logo />
        <InputWithButton placeholder="Email address" />
        <InputWithButton placeholder="Enter password" />
        <Buttons onPress={() => Actions.home({ type: 'reset' })}>
          Log in
        </Buttons>
        <TouchableOpacity onPress={() => Actions.forgot({ type: 'reset' })}>
          <Text style={{ color: '#0392cf', fontFamily: 'helvetica' }}>
            Forgot password?
          </Text>
        </TouchableOpacity>
      </Container>
    );
  }
}

export default Login;
