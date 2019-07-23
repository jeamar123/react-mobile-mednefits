import React, { Component } from 'react';
import { View, Dimensions, } from 'react-native';
import { Container, Text } from 'native-base';
import Navbar from '../components/common/NavbarGrey';
import * as Config from '../config';
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
