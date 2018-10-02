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

class ReceiptVerification extends Component {
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
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}
              >
                Home
              </Text>
            </Button>
          </Left>
          <Body>
            <Text style={{ color: '#fff', fontWeight: '400' }}>
              Receipt Verification
            </Text>
            <Text style={{ color: '#fff' }}>E-Claim</Text>
          </Body>
          <Right />
        </Header>
        <VericicationReceipt />
        <Buttons>
          <Icon name="camera" style={{ color: '#fff', fontSize: 36 }} />
        </Buttons>
      </Container>
    );
  }
}

export default ReceiptVerification;
