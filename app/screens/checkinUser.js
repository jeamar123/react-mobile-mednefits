import React, { Component } from 'react';
import { StatusBar, Image, View } from 'react-native';
import { Container, Text } from 'native-base';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import Navbar from '../components/common/NavbarGreen';
import * as Config from '../config';

class checkinUser extends Component {
  constructor(props) {
    super(props);
  }

  render() {
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
            {this.props.dob}
          </Text>

          <Text style={{
            fontFamily: 'HelveticaNeue-Roman',
            textAlign: 'center',
            fontSize: 16,
            color: '#fff',
            paddingTop: 10,
            paddingBottom: 40
          }}>
            Checked in {this.props.checkTime.replace('am','AM').replace('pm','PM')}
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
                  width: responsiveWidth(55),
                  marginRight: responsiveWidth(5),
                  textAlign: 'right'
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
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#bbb', fontSize: 16 }}>
                Cap per visit
              </Text>
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, fontWeight: 'bold', color: '#2C3E50', fontSize: 16 }}>
                {(this.props.capAmount === 0) ? '' : this.props.capCurrency} {(this.props.capAmount === 0) ? 'Not applicable' : Number(this.props.capAmount).toFixed(2)}
              </Text>
            </View>
          </View>
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
