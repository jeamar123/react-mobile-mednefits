import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import {
  Container,
  Header,
  Button,
  Left,
  Right,
  Body,
  Text,
} from 'native-base';
import { VericicationReceipt } from '../components/VericicationReceipt';
import { Buttons } from '../components/common';
import Icons from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Feather';
import Navbar from '../components/common/Navbar';

class ReceiptVerification extends Component {
  render() {
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar
          leftNav="back-home"
          title="Receipt Verification"
          subtitle="E-Claim"
        />
        <VericicationReceipt />
        <Buttons>
          <Icon name="camera" style={{ color: '#fff', fontSize: 36 }} />
        </Buttons>
      </Container>
    );
  }
}

export default ReceiptVerification;
