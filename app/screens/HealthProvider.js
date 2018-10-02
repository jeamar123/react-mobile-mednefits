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
import { Health } from '../components/Health';
import { Buttons } from '../components/common';
import Icons from 'react-native-vector-icons/FontAwesome';

class HealthProvider extends Component {
  render() {
    return (
      <Container>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
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
            <Title style={{ color: '#fff' }}>Health Provider</Title>
          </Body>
          <Right />
        </Header>
        <Health />
        <Buttons>Back to Home</Buttons>
      </Container>
    );
  }
}

export default HealthProvider;
