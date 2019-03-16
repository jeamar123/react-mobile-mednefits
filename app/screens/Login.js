import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { InputWithButton } from '../components/TextInput';
import { Buttons, Popup } from '../components/common';
import * as Core from '../core';

class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: false,
      password: false,
      isLoading: false,
      failed: false,
      title: null,
      message: null
    };
    this.isVisibleUpdate = this.isVisibleUpdate.bind(this);
  }

  isVisibleUpdate() {
    this.setState({ failed: false })
  }

  LoginHandler() {
    this.setState({ isLoading: true })

    Core.LoginProcess(this.state.username, this.state.password, (err, result) => {
      // console.log(err)
      // console.log(result);
      this.setState({ isLoading: false })
      if (result) {
        Actions.Home({ type: 'reset' });
      } else {
        // Toast.show(err.error_description, Toast.LONG);
        this.setState({ failed: true, title: 'Login Failed', message: err.error_description })
        // Core.getNotify('', err.error_description);
      }
    })

    // setTimeout(()=>{
    //   this.setState({isLoading: !this.state.isLoading})
    // },500)
  }

  render() {
    return (
      <Container>
        <Core.Loader
          isVisible={this.state.isLoading}
        />
        <Popup
          kind="loginFailed"
          //just for example the right parameter is like this isVisible={this.props.isVisible}
          isVisible={this.state.failed}
          closeSection={true}
          closeSectionUpdate={this.isVisibleUpdate}
          title={this.state.title}
          message={this.state.message}
        />
        <Logo />
        <InputWithButton
          onChangeText={(text) => this.setState({ username: text })}
          placeholder="Email or NRIC"
          autoCapitalize='none'
          returnKeyType={"next"}
        />
        <InputWithButton
          onChangeText={(text) => this.setState({ password: text })}
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize='none'
        />
        <Buttons onPress={() => this.LoginHandler()}>
          Log in
        </Buttons>
        <TouchableOpacity onPress={() => Actions.Forgot({ type: 'reset' })}>
          <Text style={{ color: '#0392cf', fontFamily: 'helvetica' }}>
            Forgot password?
          </Text>
        </TouchableOpacity>
      </Container>
    );
  }
}

export default Login;
