import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Container } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { VericicationReceipt } from '../components/VericicationReceipt';
import { Buttons } from '../components/common/Buttons2';
import Icon from 'react-native-vector-icons/Feather';
import Navbar from '../components/common/NavbarGrey';

class ReceiptVerification extends Component {
  render() {
    return (
      <Container style={{ backgroundColor: '#efeff4' }}>
        <StatusBar barStyle="dark-content" />
        <Navbar
          leftNav="back"
          title="Receipt Verification"
          subtitle="E-Claim"
        />
        <VericicationReceipt />
        <Buttons onPress={() => Actions.Camera({ claimdata: this.props.claimdata })}>
          <Icon name="camera" style={{ color: '#fff', fontSize: 36 }} />
        </Buttons>
      </Container>
    );
  }
}

export default ReceiptVerification;
