import React, { Component } from 'react';
import { StatusBar, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container } from '../components/Container';
import { ForgotPassword } from '../components/ForgotPassword';
import { InputWithButton } from '../components/TextInput';
import { Buttons } from '../components/common';
import * as Core from '../core'

class ForgotPass extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: ""
    }
  }

  resetPassword = () => {
    try {
      Core.ResetPassword(this.state.email, (err, result) => {
        if (result) {
          Actions.EmailSend({ Email: this.state.email })
        } else {
          throw result.message;
        }
      })
    } catch (e) {
      Core.getNotify("", e)
    }
  }

  render() {
    console.warn(this.state.email);
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <ForgotPassword />
        <InputWithButton autoCapitalize='none' placeholder="Email address" onChangeText={(text) => this.setState({ email: text })} />
        <Buttons
          onPress={this.resetPassword}
        >Reset password</Buttons>
        <TouchableOpacity onPress={() => Actions.Login({ type: 'reset' })}>
          <Text style={{ fontFamily: 'helvetica' }}>Back to Login</Text>
        </TouchableOpacity>
      </Container>
    );
  }
}

export default ForgotPass;
