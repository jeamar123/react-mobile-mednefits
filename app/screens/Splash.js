import React, { Component } from 'react';
import { StatusBar, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { InputWithButton } from '../components/TextInput';
import { Buttons } from '../components/common';
import { UserDetail } from '../core'

class Splash extends Component {

  constructor(props){
    super(props)
  }

  componentWillMount(){
    UserDetail()
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
