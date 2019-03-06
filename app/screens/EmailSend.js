import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container } from '../components/Container';
import { Email } from '../components/Email';
import { Buttons } from '../components/common';

class EmailSend extends Component {
  render() {
    console.warn("datanya" + (this.props.Email))
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Email
          email={this.props.Email}
        />
        <Buttons onPress={() => Actions.Login({type: 'reset'})}>Back to Login</Buttons>
      </Container>
    );
  }
}

export default EmailSend;
