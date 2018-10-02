import React, { Component } from 'react';
import { StatusBar, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container } from '../components/Container';
import { ForgotPassword } from '../components/ForgotPassword';
import { InputWithButton } from '../components/TextInput';
import { Buttons } from '../components/common';

class ForgotPass extends Component {
  render() {
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <ForgotPassword />
        <InputWithButton placeholder="Email address" />
        <Buttons>Reset password</Buttons>
        <TouchableOpacity onPress={() => Actions.Login({ type: 'reset' })}>
          <Text style={{ fontFamily: 'helvetica' }}>Back to Login</Text>
        </TouchableOpacity>
      </Container>
    );
  }
}

export default ForgotPass;
