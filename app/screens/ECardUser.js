import React, { Component } from 'react';
import { StatusBar, View, Image, ScrollView, Linking } from 'react-native';
import { Text, Drawer } from 'native-base';
import Navbar from '../components/common/Navbar';
import RF from "react-native-responsive-fontsize";
import { MenuSide } from '../components/HomeContent';
import * as Core from '../core';
import * as Config from '../config';
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
    this.drawerActionCallback = this.drawerActionCallback.bind(this);
  }

  closeDrawer() {
    this._drawer._root.close();
  }

  openDrawer() {
    this._drawer._root.open();
  }

  drawerActionCallback(callback) {
    if (callback == true) {
      this.openDrawer();
    }
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
    return this.state.resultPackage.map((Data, index) => (
      <View key={index}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: '5%',
            marginRight: '5%',
          }}
        >
          <Text
            style={{
              marginTop: '3%',
              fontFamily: Config.FONT_FAMILY_ROMAN,
              color: '#808080',
              fontSize: 12,
              marginRight: '10%',
            }}
          >
            {Data.package_name}
          </Text>
          <Text
            style={{
              marginTop: '3%',
              fontFamily: Config.FONT_FAMILY_ROMAN,
              color: '#808080',
              fontSize: 12,
              width: '60%',
            }}
          >
            {Data.package_description}
          </Text>

        </View>
        <View
          style={{
            marginLeft: '5%',
            marginRight: '5%',
          }}>
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
    console.warn("props: " + JSON.stringify(this.props, null, 4))
    return (
      <Drawer
        type="displace"
        openDrawerOffset={0.4}
        panCloseMask={0.4}
        ref={ref => {
          this._drawer = ref;
        }}
        content={<MenuSide navigator={this._navigator} />}
        onClose={() => this.closeDrawer()}
      >
        <View style={{ flex: 1 }}>
          <StatusBar backgroundColor="white" barStyle="dark-content" />
          <Navbar
            drawerAction={this.drawerActionCallback}
            leftNav="back-home"
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
              flex: 1,
              marginLeft: '2%',
              marginRight: '2%',
              marginTop: '2%',
            }}
          >
            <View
              style={{
                flex: 1,
                marginTop: 5,
                marginBottom: 10,
                height: 120,
                backgroundColor: '#fff',
                borderRadius: 14,
                opacity: 10000,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View
                  style={{
                    flexDirection: 'column',
                    marginTop: '30%',
                    marginLeft: '5%',
                  }}
                >
                  <Text
                    style={{
                      color: '#0392cf',
                      fontSize: 24,
                      fontFamily: Config.FONT_FAMILY_ROMAN,
                    }}
                  >
                    {this.state.FullName}
                  </Text>
                  <Text
                    style={{
                      color: '#0392cf',
                      fontSize: 24,
                      fontFamily: Config.FONT_FAMILY_ROMAN,
                    }}
                  >
                    {this.state.Nric}
                  </Text>

                  <Text
                    style={{
                      marginTop: '15%',
                      fontFamily: Config.FONT_FAMILY_ROMAN,
                      fontSize: 14,
                    }}
                  >
                    Member ID {this.state.MemberID}
                  </Text>
                  <Text
                    style={{
                      fontFamily: Config.FONT_FAMILY_ROMAN,
                      fontSize: 14,
                    }}
                  >
                    {this.state.PlanType}
                  </Text>
                  <Text
                    style={{
                      fontFamily: Config.FONT_FAMILY_ROMAN,
                      fontSize: 14,
                    }}
                  >
                    Plan Add-on: {this.state.PlanAddon}
                  </Text>
                  <Text
                    style={{
                      fontFamily: Config.FONT_FAMILY_ROMAN,
                      fontSize: 14,
                    }}
                  >
                    {this.state.Company}
                  </Text>
                  <Text
                    style={{
                      fontFamily: Config.FONT_FAMILY_ROMAN,
                      fontSize: 14,
                    }}
                  >
                    Start Date: {this.state.StartDate}
                  </Text>
                  <Text
                    style={{
                      fontFamily: Config.FONT_FAMILY_ROMAN,
                      fontSize: 14,
                    }}
                  >
                    End Date: {this.state.EndDate}
                  </Text>

                  <Text
                    style={{
                      marginTop: '15%',
                      fontFamily: Config.FONT_FAMILY_ROMAN,
                      fontSize: 14,
                    }}
                  >
                    Your Basic Coverage
                  </Text>
                </View>
                <Image
                  source={require('../../assets/apps/mednefits.png')}
                  style={{
                    height: 55,
                    width: 55,
                    resizeMode: 'contain',
                    alignItems: 'center',
                    marginTop: '5%',
                    marginRight: '5%',
                  }}
                />
              </View>

              <ScrollView>{this.renderCoverage()}</ScrollView>

              <View
                style={{
                  height: '13%',
                  backgroundColor: '#f2f2f2',
                  borderBottomLeftRadius: 14,
                  borderBottomRightRadius: 14,
                  opacity: 10000,
                }}
              >
                <View
                  style={{
                    flexDirection: 'column',
                    marginTop: '4%',
                    marginLeft: '5%',
                  }}
                >
                  <Text
                    style={{
                      color: '#000',
                      fontFamily: Config.FONT_FAMILY_ROMAN,
                      fontSize: RF(2.4)
                    }}
                  >
                    Need Help?
                  </Text>
                  <Text
                    style={{
                      color: '#0392cf',
                      fontFamily: Config.FONT_FAMILY_ROMAN,
                      fontSize: RF(2.0)
                    }}
                  >
                    <Text style={{
                      color: '#0392cf',
                      fontFamily: Config.FONT_FAMILY_ROMAN,
                      fontSize: RF(2.0),
                      textDecorationLine: 'underline'
                    }}
                      onPress={() => Linking.openURL('mailto:happiness@mednefits.com')}>
                      happiness@mednefits.com
                  </Text>
                    {' '}
                    <Text
                      style={{
                        fontFamily: Config.FONT_FAMILY_ROMAN,
                        fontSize: RF(2.0)
                      }}
                    >
                      or
                    </Text>
                    {' '}
                    <Text style={{
                      color: '#0392cf',
                      fontFamily: Config.FONT_FAMILY_ROMAN,
                      fontSize: RF(2.0),
                      textDecorationLine: 'underline'
                    }} onPress={() => Linking.openURL("tel:+65 6254 7889")}>+65 6254 7889</Text>
                  </Text>
                  <Text
                    style={{
                      color: '#0392cf',
                      fontFamily: Config.FONT_FAMILY_ROMAN,
                      fontSize: RF(2.0)
                    }}
                  >
                    mednefits.com
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Drawer>
    );
  }
}

export default ECardUser;
