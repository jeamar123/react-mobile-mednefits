import React, { Component } from 'react';
import { StatusBar, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { InputWithButton } from '../components/TextInput';
import { Buttons } from '../components/common';
import { LoginProcess } from '../core'

class Login extends Component {

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
        <Logo />
        <InputWithButton
          onChangeText={(text)=>this.setState({username: text})}
          placeholder="Email address"
          />
        <InputWithButton
          onChangeText={(text)=>this.setState({password: text})}
          placeholder="Enter password"
          secureTextEntry={true}
          />
        <Buttons onPress={() => LoginProcess(this.state.username, this.state.password)}>
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
