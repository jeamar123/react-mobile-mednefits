import React, { Component } from 'react';
import { StatusBar, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { Container } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { EclaimThanks } from '../components/EclaimThanks';
import { Texti } from '../components/common';
import EclaimStep from '../components/EclaimStep';
import Navbar from '../components/common/NavbarGrey';

class ThanksEclaim extends Component {
  render() {
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar leftNav="back-home" title="Review and Submit" subtitle="E-claim" />
        <EclaimStep
          currentPosition={3}
        />
        <EclaimThanks />
        <TouchableOpacity
          onPress={() =>
            Actions.Home({
              type: 'reset',
            })
          }
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: "#0392CF",
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: '3%'
          }}
        >
          <Texti
            style={{
              padding: 15
            }}
            fontColor={"#FFFFFF"}
          >
            Back to Home
          </Texti>
        </TouchableOpacity>
      </Container>
    );
  }
}

export default ThanksEclaim;
