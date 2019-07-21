import React, { Component } from 'react';
import { StatusBar, Image, View, TouchableOpacity } from 'react-native';
import { Container, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import RF from "react-native-responsive-fontsize";
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import Navbar from '../components/common/NavbarGreen';
import * as Config from '../config';
import * as Common from '../components/common';
import * as Core from '../core';

class checkinUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kickout: false
    };
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

  async componentWillMount() {
    await this.StatusUseronClinic();
  }

  async StatusUseronClinic() {
    await Core.CancelVisiByClinic(this.props.checkId, async (error, result) => {
      data =
        await typeof result == 'string' ? JSON.parse(result) : result;
      if (data.status == false) {
        this.setState({
          kickout: true
        });
      }
      console.warn('data ' + data);
      // await this.setState({
      //   kickout: result.data.check_in_status_removed,
      // });

    });
  }

  render() {
    console.warn('kickout ' + this.state.kickout)
    console.warn("props: " + JSON.stringify(this.props, null, 4))
    return (
      <Container style={{ backgroundColor: '#3F9D59' }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar
          title="Register"
          rightNav="Close"
          Services={this.props.services}
          clinic_Id={this.props.clinicid}
          member={this.props.member}
          nric={this.props.nric}
          check_Id={this.props.checkId}
          checkTime={this.props.checkTime}
          capCurrency={this.props.capCurrency}
          capAmount={this.props.capAmount}
          clinic_image={this.props.clinic_image}
          clinic_name={this.props.clinic_name}
          consultation_fee_symbol={this.props.consultation_fee_symbol}
          consultation_status={this.props.consultation_status}
          consultation_fees={this.props.consultation_fees}
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
            fontWeight: 'bold',
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
            Checked in {(this.props.checkTime).toUpperCase()}
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
              <Text
                style={{
                  fontFamily: Config.FONT_FAMILY_ROMAN,
                  color: '#2C3E50',
                  fontSize: 18,
                  marginTop: responsiveHeight(0.5),
                  width: responsiveWidth(57),
                  marginRight: responsiveWidth(5),
                }}
                numberOfLines={3}>
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
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, fontWeight: 'bold', color: '#2C3E50', fontSize: RF(2.1) }}>
                {(this.props.capAmount === 0) ? '' : this.props.capCurrency} {(this.props.capAmount === 0) ? 'Not applicable' : Number(this.props.capAmount).toFixed(2)}
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
