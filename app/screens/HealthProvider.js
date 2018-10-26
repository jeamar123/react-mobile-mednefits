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
import Navbar from '../components/common/Navbar';

class HealthProvider extends Component {
  render() {
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar leftNav="back-home" title="Health Provider" />
        <Health />
        <Buttons>Back to Home</Buttons>
      </Container>
    );
  }
}

export default HealthProvider;
