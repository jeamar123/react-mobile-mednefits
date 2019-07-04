import React, { Component } from 'react';
import { StatusBar, Image, View, Linking } from 'react-native';
import { Container, Text } from 'native-base';
import RF from "react-native-responsive-fontsize";
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import Navbar from '../components/common/NavbarGreen';
import * as Common from '../components/common';
import * as Config from '../config';

class updateApps extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.warn("props: " + JSON.stringify(this.props))
    return (
      <Container style={{ backgroundColor: '#FFF' }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        {/* <Navbar
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
        /> */}
        <View
          style={{
            alignItems: 'center',
            marginRight: '5%',
            marginLeft: '5%'
          }}
        >

          <Image
            source={require('../../assets/Logo.png')}
            style={{ height: 40, resizeMode: 'contain', width: 40, marginBottom: 10, marginTop: responsiveHeight(30) }}
          />
          <Text style={{
            fontFamily: Config.FONT_FAMILY_MEDIUM,
            textAlign: 'center',
            fontSize: RF(3.8),
            paddingTop: 10,
            paddingBottom: 20,
            color: '#2C3E50'
            // fontWeight: 'bold'
          }}>
            The Mednefits app has been updated.
          </Text>
          <Text style={{
            fontFamily: Config.FONT_FAMILY_ROMAN,
            textAlign: 'center',
            fontSize: RF(1.8),
            paddingBottom: 30,
            color: '#2C3E50'
          }}>
            Please update your app to continue.
          </Text>

          <Common.Buttons
            onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.sg.medicloud')}>
            Update
          </Common.Buttons>
        </View>

      </Container>
    );
  }
}

export default updateApps;
