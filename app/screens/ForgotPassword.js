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
      email: "",
      message: ""
    }
  }

  resetPassword = () => {
    try {
      Core.ResetPassword(this.state.email, (err, result) => {
        if (result) {
          console.warn(result)
          Actions.EmailSend({ Email: this.state.email, Message: result.message, Type: result.type })
        } else {
          throw result.message;
        }
      })
    } catch (e) {
      Core.getNotify("", e)
    }
  }

  render() {
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <ForgotPassword />
        <InputWithButton placeholder="Email address or NRIC/FIN" onChangeText={(text) => this.setState({ email: text })} />
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
