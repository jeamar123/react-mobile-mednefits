import React, { Component } from 'react';

import { StatusBar, View } from 'react-native';
import {
  Container,
  Header,
  Title,
  Button,
  Left,
  Right,
  Body,
  Text,
} from 'native-base';
import { SettingWallet } from '../components/SettingWallet';
import { Buttons } from '../components/common';
import Icons from 'react-native-vector-icons/FontAwesome';

class WalletSetting extends Component {
  render() {
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Header style={{ backgroundColor: '#0392cf' }}>
          <Left>
            <Button transparent>
              <Icons
                name="angle-left"
                style={{ color: '#fff', fontSize: 32 }}
              />
              <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
                Back
              </Text>
            </Button>
          </Left>
          <Body>
            <Title style={{ color: '#fff', fontSize: 16 }}>
              Wallet Setting
            </Title>
          </Body>
          <Right />
        </Header>
        <SettingWallet />
        <Buttons>Save</Buttons>
      </Container>
    );
  }
}

export default WalletSetting;
