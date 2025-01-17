import React, { Component } from 'react';
import { StatusBar, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container } from '../components/Container';
import { ForgotPassword } from '../components/ForgotPassword';
import { InputWithButton } from '../components/TextInput';
import { Buttons } from '../components/common';
import * as Core from '../core';

class ForgotPass extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      message: "",
      isLoading: false,
    }
  }

  isVisibleUpdate() {
    this.setState({ failed: false })
  }

  resetPassword = () => {
    console.log( this.state.email );
    if( this.state.email != null && this.state.email != "" && this.state.email != "null" ){
      this.setState({ isLoading: true })
      try {
        Core.ResetPassword(this.state.email, (err, result) => {
          this.setState({ isLoading: false })
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
    }else{
      Core.getNotify("Error!", "Mobile Number or Email is Required.")
    }
  }

  render() {
    return (
      <Container>
        <Core.Loader
          isVisible={this.state.isLoading}
        />
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <ForgotPassword />
        <InputWithButton
          onChangeText={(text) => this.setState({ email: text })}
          placeholder="Mobile Number or Email Address"
        />
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
