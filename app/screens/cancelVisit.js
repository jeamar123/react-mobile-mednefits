import React, { Component } from 'react';
import { StatusBar, Image, View, TouchableOpacity } from 'react-native';
import { Container, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Navbar from '../components/common/NavbarGreen';
import * as Config from '../config';
import * as Common from '../components/common';
import * as Core from '../core';

class checkinUser extends Component {
  constructor(props) {
    super(props);
  }

  prosesCancel = async () => {
    await Core.CancelVisit({ check_in_id: this.props.checkId }, async (err, result) => {
      console.warn(result);
      if (result.status == true) {
        Core.getNotify('', result.message);
        Actions.Home({ type: 'reset' });
      } else {
        Core.getNotify('', 'Failed Cancel Check In, please try again');
      }
    });
  }

  render() {
    console.warn("props: " + JSON.stringify(this.props))
    return (
      <Container style={{ backgroundColor: '#3F9D59' }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar
          title="Register"
          rightNav="Close"
        />
        <View style={{
          alignItems: 'center',
        }}
        >
          <Image
            source={require('../../assets/apps/CheckIn.png')}
            style={{ height: 50, resizeMode: 'contain', width: 50, marginBottom: 10, marginTop: 50 }}
          />
          <Text style={{
            fontFamily: 'HelveticaNeue-Roman',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 25,
            color: '#fff',
            marginBottom: 5,
          }}
          >
            {this.props.member}
          </Text>
          <Text style={{
            fontFamily: 'HelveticaNeue-Roman',
            textAlign: 'center',
            fontSize: 20,
            color: '#fff',
            paddingTop: 2,
            paddingBottom: 10
          }}>
            {this.props.nric}
          </Text>

          <Text style={{
            fontFamily: 'HelveticaNeue-Roman',
            textAlign: 'center',
            fontSize: 16,
            color: '#fff',
            paddingTop: 10,
            paddingBottom: 40
          }}>
            Checked in {this.props.checkTime}
          </Text>

          <View style={{ backgroundColor: '#fff', width: '90%' }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '2%',
                marginBottom: '10%',
                marginLeft: '5%',
                marginRight: '5%'
              }}
            >
              <Image
                source={{ uri: this.props.clinic_image }}
                style={{ height: 55, resizeMode: 'center', width: 55 }}
              />
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', fontSize: 18, marginTop: '2%' }}>
                {this.props.clinic_name}
              </Text>

            </View>
          </View>
          <View style={{ backgroundColor: '#fff', width: '90%', marginTop: 10 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10%',
                marginLeft: '5%',
                marginRight: '5%'
              }}
            >
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', fontSize: 16 }}>
                Cap per visit
              </Text>
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, fontWeight: 'bold', color: '#2C3E50', fontSize: 18 }}>
                {this.props.capCurrency} {this.props.capAmount}
              </Text>

            </View>
          </View>
        </View>

        <View style={{
          flex: 1,
          justifyContent: 'flex-end',
          marginBottom: '10%',
          alignItems: 'center',
        }}>
          <TouchableOpacity
            onPress={() => this.prosesCancel()}
            style={{
              backgroundColor: "#2C3E50",
              width: "90%",
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
              borderRadius: 5,
            }}
          >
            <Common.Texti
              fontSize={16}
              fontColor={"#ffffff"}
              style={{
                padding: 10,
                fontWeight: 'bold'
              }}>
              Cancel Visit
            </Common.Texti>
          </TouchableOpacity>
        </View>

        <View style={{
          width: '100%',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 0,
        }}>
          <Image
            source={require('../../assets/apps/LogoMednefits.png')}
            style={{ height: 25, resizeMode: 'contain', width: 25 }}
          />
        </View>
      </Container>
    );
  }
}

export default checkinUser;
