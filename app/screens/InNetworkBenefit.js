import React, { Component } from 'react';
import { StatusBar } from 'react-native';
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
import { InNetwork } from '../components/InNetwork';
import { Buttons } from '../components/common';
import Icons from 'react-native-vector-icons/FontAwesome';

class InNetworkBenefit extends Component {
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
                Home
              </Text>
            </Button>
          </Left>
          <Body>
            <Title style={{ color: '#fff' }}>In-Network</Title>
            <Text style={{ color: '#fff' }}>Benefit Dollars</Text>
          </Body>
          <Right />
        </Header>
        <InNetwork />
        <Buttons>Back to Home</Buttons>
      </Container>
    );
  }
}

export default InNetworkBenefit;
