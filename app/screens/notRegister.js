import React, { Component } from 'react';
import { StatusBar, View, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Container, Content, Text } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modal';
import { Buttons2 } from '../components/common/Buttons2';
import Navbar from '../components/common/NavbarGrey';
import Texti from "../components/common/Texti";
import * as Commmon from '../components/common';
import * as Config from '../config';
import * as Core from '../core';
const { width, height } = Dimensions.get('window');

class notRegister extends Component {

  constructor(props) {
    super(props);

    this.state = {
    }

  }


  render() {
    console.warn("props: " + JSON.stringify(this.props))
    return (
      <Container style={{ backgroundColor: '#efeff4' }}>

        <View style={{ flex: 1 }}>
          <Navbar
            leftNav="backHome"
            title="Payment Type"
          />
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style={{ textAlign: 'center', fontFamily: Config.FONT_FAMILY_ROMAN }}>Please register before</Text>
            <Text style={{ textAlign: 'center', fontFamily: Config.FONT_FAMILY_ROMAN }}>making payment</Text>
          </View>
        </View>

      </Container>
    );
  }
}
const styles = {
  contain: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridBox: {
    width: width / 3.8,
    height: height / 7.3,
    backgroundColor: '#fff',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  gridBoxActive: {
    width: width / 3.8,
    height: height / 6.2,
    backgroundColor: '#fff',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderWidth: 3,
    borderColor: "#0392CF"
  },
};

export default notRegister;
