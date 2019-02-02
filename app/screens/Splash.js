import React, { Component } from 'react';
import { StatusBar, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { ACCESS_TOKEN } from '../config/variable';
import * as Core from '../core';
import * as Config from '../config';

class Splash extends Component {

  async componentWillMount() {
    setTimeout(async () => {
      await Core.AppStatus(this.state.username, this.state.password, async (err, result)=>{
    	if(err) {
        await Actions.Login();
    	}
    })
    }, 500);
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
