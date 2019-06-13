import React, { Component } from 'react';
import { StatusBar, Image, View, Dimensions, TouchableOpacity } from 'react-native';
import { Container, Content, Text } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { Actions } from 'react-native-router-flux';
import { Buttons2 } from '../components/common/Buttons2';
import Navbar from '../components/common/NavbarGrey';
import * as Common from '../components/common';
import * as Config from '../config';
const { width, height } = Dimensions.get('window');

class ExpireMember extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.warn("props: " + JSON.stringify(this.props))
    return (
      <Container style={{ backgroundColor: '#efeff4' }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <View style={{ flex: 1 }}>
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>

            <Image
              source={require('../../assets/apps/warning.png')}
              style={{ height: 50, resizeMode: 'contain', width: 50, marginBottom: 10, marginTop: 50 }}
            />
            <Text style={{
              textAlign: 'center',
              fontFamily: Config.FONT_FAMILY_ROMAN,
              fontSize: 28,
              marginBottom: '10%'
            }}>
              Sorry
            </Text>
            <Text style={{ textAlign: 'center', fontFamily: Config.FONT_FAMILY_ROMAN, color: '#666' }}>We are not able to register you</Text>
            <Text style={{ textAlign: 'center', fontFamily: Config.FONT_FAMILY_ROMAN, color: '#666' }}>at the moment.</Text>

            <Text style={{ textAlign: 'center', fontFamily: Config.FONT_FAMILY_ROMAN, color: '#666', marginTop: '5%', marginBottom: '5%' }}>Please contact us at {' '}
              <Text style={{
                color: '#666',
                fontFamily: Config.FONT_FAMILY_ROMAN,
                textDecorationLine: 'underline'
              }} onPress={() => Linking.openURL("tel:+65 6254 7889")}>+65 6254 7889</Text>
            </Text>

            <TouchableOpacity
              onPress={() => Actions.Home({ type: 'reset' })}
              style={{
                backgroundColor: "#0392CF",
                width: "70%",
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5
              }}
            >
              <Common.Texti
                fontSize={16}
                fontColor={"#ffffff"}
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                }}>
                Back
              </Common.Texti>
            </TouchableOpacity>
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

export default ExpireMember;
