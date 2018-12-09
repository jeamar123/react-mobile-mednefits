import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Container } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { EclaimThanks } from '../components/EclaimThanks';
import { Buttons } from '../components/common';
import Navbar from '../components/common/Navbar';

class ThanksEclaim extends Component {
  render() {
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar leftNav="back-home" title="Health Provider" />
        <EclaimThanks />
        <Buttons
          onPress={() =>
            Actions.Home({
              type: 'reset',
            })
          }
        >
          Back to Home
        </Buttons>
      </Container>
    );
  }
}

export default ThanksEclaim;
