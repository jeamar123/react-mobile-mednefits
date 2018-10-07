import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Container } from '../components/Container';
import { Email } from '../components/Email';
import { Buttons } from '../components/common';

class EmailSend extends Component {
  render() {
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Email />
        <Buttons>Back to Login</Buttons>
      </Container>
    );
  }
}

export default EmailSend;
