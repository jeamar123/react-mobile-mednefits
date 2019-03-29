import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Container } from 'native-base';
import { SettingWallet } from '../components/SettingWallet';
import { Buttons } from '../components/common';
import Navbar from '../components/common/Navbar';

class WalletSetting extends Component {
  render() {
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar leftNav="back" title="Wallet Setting" />
        <SettingWallet />
        <Buttons>Save</Buttons>
      </Container>
    );
  }
}

export default WalletSetting;
