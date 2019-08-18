import React, { Component } from 'react';
import { StatusBar, Image, View, TouchableOpacity } from 'react-native';
import { Container, Text } from 'native-base';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import { Actions } from 'react-native-router-flux';
import RF from "react-native-responsive-fontsize";
import Navbar from '../components/common/Navbar';
import * as Config from '../config';
import * as Core from '../core';
import * as Common from '../components/common';

class checkinUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FullName: '',
      MemberID: '',
      Nric: '',
      PlanType: '',
      PlanAddon: '',
      Company: '',
      StartDate: '',
      EndDate: '',
      cap_per_visit: '',
      resultPackage: [],
    };
  }

  componentWillMount() {
    this.GetDataEcard();
  }

  GetDataEcard() {
    Core.GetECardDetail((error, result) => {
      data =
        typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      console.warn(data);
      this.setState({
        FullName: data.fullname,
        MemberID: data.member_id,
        Nric: data.nric,
        PlanType: data.plan_type,
        PlanAddon: data.plan_add_on,
        cap_per_visit: data.cap_per_visit,
        Company: data.company_name,
        StartDate: data.start_date,
        EndDate: data.valid_date,
        resultPackage: data.packages,
      });
    });
  }

  render() {
    console.warn("props: " + JSON.stringify(this.props))
    return (
      <Container style={{ backgroundColor: '#0392cf' }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar
          title="E-Card"
          rightNav="Close"
          leftNav="null"
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
        <View
          style={{
            alignItems: 'center',
          }}
        >

          <Text style={{
            fontFamily: 'HelveticaNeue-Roman',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 25,
            color: '#fff',
            marginBottom: 5,
            marginTop: responsiveHeight(5),
          }}
          >
            {this.state.FullName}
          </Text>
          <Text style={{
            fontFamily: 'HelveticaNeue-Roman',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 20,
            color: '#fff',
            paddingTop: 2,
            paddingBottom: 10
          }}>
            {this.state.Nric}
          </Text>

          <Text style={{
            fontFamily: 'HelveticaNeue-Roman',
            textAlign: 'center',
            fontSize: 16,
            color: '#fff',
            paddingTop: 20,
          }}>
            Member ID {this.state.MemberID}
          </Text>

          <Text style={{
            fontFamily: 'HelveticaNeue-Roman',
            textAlign: 'center',
            fontSize: 16,
            color: '#fff',
            paddingTop: 10,
            paddingBottom: responsiveHeight(3),
          }}>
            {this.state.Company}
          </Text>

          <View
            style={{
              backgroundColor: '#fff',
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              width: '90%'
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: responsiveHeight(2),
                marginLeft: '5%',
                marginRight: '5%'
              }}
            >
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#848484', fontSize: 16 }}>
                Your Plan Type
              </Text>
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, fontWeight: 'bold', color: '#2C3E50', fontSize: RF(2.1) }}>
                {this.state.PlanType}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: responsiveHeight(2),
                marginLeft: '5%',
                marginRight: '5%'
              }}
            >
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#848484', fontSize: 16 }}>
                Plan Add-on
              </Text>
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, fontWeight: 'bold', color: '#2C3E50', fontSize: RF(2.1) }}>
                {this.state.PlanAddon}
              </Text>
            </View>

            <View>
              <Common.Divider />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: responsiveHeight(1.5),
                marginBottom: responsiveHeight(1.5),
                marginLeft: '5%',
                marginRight: '5%'
              }}
            >
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#848484', fontSize: 16 }}>
                Cap per visit
              </Text>
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, fontWeight: 'bold', color: '#2C3E50', fontSize: RF(2.1) }}>
                {(this.state.cap_per_visit === 0) ? 'Not applicable' : (this.state.cap_per_visit)}
              </Text>
            </View>

            <View>
              <Common.Divider />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: responsiveHeight(1),
                alignItems: 'center',
                marginLeft: '5%',
                marginRight: '5%'
              }}
            >
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#848484', fontSize: 16 }}>
                Start Date
              </Text>
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, fontWeight: 'bold', color: '#2C3E50', fontSize: RF(2.1) }}>
                {this.state.StartDate}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: responsiveHeight(2),
                marginBottom: '5%',
                marginLeft: '5%',
                marginRight: '5%'
              }}
            >
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#848484', fontSize: 16 }}>
                End Date
              </Text>
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, fontWeight: 'bold', color: '#2C3E50', fontSize: RF(2.1) }}>
                {this.state.EndDate}
              </Text>
            </View>


          </View>

          <View style={{ backgroundColor: '#fff', width: '90%', marginTop: responsiveHeight(2.5) }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: responsiveHeight(1.5),
                marginTop: responsiveHeight(1.5),
                marginLeft: '5%',
                marginRight: '5%'
              }}
            >
              <Image
                source={require('../../assets/apps/listCoverage.png')}
                style={{ height: 37, width: 37, resizeMode: 'contain' }}
              />
              <TouchableOpacity
                onPress={() => Actions.PlanCovarage()}
              >
                <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#0392CF', fontSize: RF(2.1) }}>
                  Click here for plan coverage
                </Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </Container>
    );
  }
}

export default checkinUser;
