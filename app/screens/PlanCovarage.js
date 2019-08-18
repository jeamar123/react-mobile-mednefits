import React, { Component } from 'react';
import { StatusBar, View, Image, ScrollView, Linking } from 'react-native';
import { Text, Container } from 'native-base';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import Navbar from '../components/common/Navbar';
import RF from "react-native-responsive-fontsize";
import { MenuSide } from '../components/HomeContent';
import * as Config from '../config';
import * as Core from '../core';
import * as Common from '../components/common';

class ECardUser extends Component {
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
        Company: data.company_name,
        StartDate: data.start_date,
        EndDate: data.valid_date,
        resultPackage: data.packages,
      });
    });
  }

  renderCoverage() {
    return this.state.resultPackage.map(Data => (
      // <View>
      //   <View
      //     style={{
      //       flexDirection: 'row',
      //       justifyContent: 'space-between',
      //       marginLeft: '5%',
      //       marginRight: '5%',
      //     }}
      //   >
      //     <Text
      //       style={{
      //         marginTop: '3%',
      //         fontFamily: Config.FONT_FAMILY_ROMAN,
      //         color: '#808080',
      //         fontSize: 11,
      //         marginRight: '10%',
      //       }}
      //     >
      //       {Data.package_name}
      //     </Text>
      //     <Text
      //       style={{
      //         marginTop: '3%',
      //         fontFamily: Config.FONT_FAMILY_ROMAN,
      //         color: '#808080',
      //         fontSize: 11,
      //         width: '60%',
      //       }}
      //     >
      //       {Data.package_description}
      //     </Text>

      //   </View>
      //   <View
      //     style={{
      //       marginLeft: '5%',
      //       marginRight: '5%',
      //     }}>
      //     <Common.Divider />
      //   </View>


      // </View>
      <View>

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
          <View style={{ width: responsiveWidth(50) }}>
            <Text
              style={{
                fontFamily: Config.FONT_FAMILY_ROMAN,
                fontWeight: 'bold', color: '#2C3E50',
                fontSize: RF(2.1)
              }}
            >
              {Data.package_name}
            </Text>

            <Text
              style={{
                fontFamily: Config.FONT_FAMILY_ROMAN,
                color: '#848484',
                fontSize: RF(1.7)
              }}
            >
              {Data.package_description}
            </Text>
          </View>

          <Image
            source={{ uri: Data.image }}
            style={{ height: 35, width: 35, resizeMode: 'contain' }}
          />

        </View>
        <View>
          <Common.Divider />
        </View>

      </View>
    ));
  }

  _renderDivider() {
    return (
      <View
        style={{
          borderBottomColor: '#cccccc',
          borderBottomWidth: 0.8,
          marginTop: '-2%',
          marginBottom: '5%',
        }}
      />
    );
  }

  render() {
    return (
      <Container style={{ backgroundColor: '#0392cf' }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar
          title2="Plan"
          subtitle2="Coverage"
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
            marginTop: responsiveHeight(5)
          }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              width: '90%'
            }}
          >

            <ScrollView>{this.renderCoverage()}</ScrollView>

          </View>
        </View>

      </Container>
    );
  }
}

export default ECardUser;