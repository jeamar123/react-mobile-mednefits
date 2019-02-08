import React, { Component } from 'react';
import { StatusBar, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { InputWithButton } from '../components/TextInput';
import { Buttons } from '../components/common';
import * as Core from '../core'

class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: false,
      password: false,
      isLoading: false
    }
  }

  async LoginHandler() {
    await this.setState({ isLoading: true })

    await Core.LoginProcess(this.state.username, this.state.password, async (err, result) => {
      await this.setState({ isLoading: false })
      if (result) {
        await Actions.Home({ type: 'reset' });
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
        <Logo />
        <InputWithButton
          onChangeText={(text) => this.setState({ username: text })}
          placeholder="Email address"
          autoCapitalize='none'
        />
        <InputWithButton
          onChangeText={(text) => this.setState({ password: text })}
          placeholder="Enter password"
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
