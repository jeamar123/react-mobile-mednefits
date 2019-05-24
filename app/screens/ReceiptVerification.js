import React, { Component } from 'react';
import { StatusBar, View, TouchableOpacity } from 'react-native';
import { Container } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { VericicationReceipt } from '../components/VericicationReceipt';
import { Buttons } from '../components/common/Buttons';
import Icon from 'react-native-vector-icons/Feather';
import Navbar from '../components/common/NavbarGrey';
import EclaimStep from '../components/EclaimStep';
import * as Common from '../components/common';

class ReceiptVerification extends Component {
  render() {
    console.warn("props: " + JSON.stringify(this.props))
    return (
      <Container style={{ backgroundColor: 'white' }}>
        <StatusBar barStyle="dark-content" />
        <Navbar
          leftNav="back"
          title="Receipt Verification"
          subtitle="E-Claim"
        />
        <EclaimStep
          currentPosition={1}
        />
        <VericicationReceipt />
        <TouchableOpacity
          onPress={() => Actions.Camera({ claimdata: this.props.claimdata })}
          style={{ backgroundColor: "#EFEFF4" }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 60, paddingBottom: 60 }}>
            <Icon name="camera" style={{ color: '#B4B4B4', fontSize: 36 }} />
            <Common.Texti fontColor={"#B4B4B4"}>
              Snap and upload your receipt
            </Common.Texti>
          </View>
        </TouchableOpacity>
      </Container>
    );
  }
}

export default ReceiptVerification;
