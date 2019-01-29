import React, { Component } from 'react';
import { StatusBar, View, Image, ScrollView, Linking } from 'react-native';
import { Text, Drawer } from 'native-base';
import Navbar from '../components/common/Navbar';
import { MenuSide } from '../components/HomeContent';
import * as Core from '../core';
import * as Config from '../config';

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
    return this.state.resultPackage.map(Data => (
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
            color: '#c4c4c4',
            fontSize: 11,
            marginRight: '10%',
          }}
        >
          {Data.package_name}
        </Text>
        <Text
          style={{
            marginTop: '3%',
            fontFamily: Config.FONT_FAMILY_ROMAN,
            color: '#c4c4c4',
            fontSize: 11,
            width: '60%',
          }}
        >
          {Data.package_description}
        </Text>
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
      <Drawer
        type="displace"
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
            leftNav={true}
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
                    resizeMode: 'center',
                    alignItem: 'center',
                    marginTop: '5%',
                    marginRight: '5%',
                  }}
                />
              </View>

              <ScrollView>{this.renderCoverage()}</ScrollView>

              <View
                style={{
                  height: '15%',
                  backgroundColor: '#f2f2f2',
                  borderBottomLeftRadius: 14,
                  borderBottomRightRadius: 14,
                  opacity: 10000,
                }}
              >
                <View
                  style={{
                    flexDirection: 'column',
                    marginTop: '5%',
                    marginLeft: '5%',
                  }}
                >
                  <Text
                    style={{
                      color: '#000',
                      fontFamily: Config.FONT_FAMILY_ROMAN,
                      fontSize: 18,
                    }}
                  >
                    Need Help?
                  </Text>
                  <Text
                    style={{
                      color: '#0392cf',
                      fontFamily: Config.FONT_FAMILY_ROMAN,
                      fontSize: 14,
                    }}
                  >
                    <Text style={{
                      color: '#0392cf',
                      fontFamily: Config.FONT_FAMILY_ROMAN,
                      fontSize: 14,
                    }}
                      onPress={() => Linking.openURL('mailto:happinness@mednefits.com')}>
                      happinness@mednefits.com
                    </Text>
                    {' '}
                    <Text
                      style={{
                        fontFamily: Config.FONT_FAMILY_ROMAN,
                        fontSize: 14,
                      }}
                    >
                      or
                    </Text>
                    {' '}
                    <Text style={{
                      color: '#0392cf',
                      fontFamily: Config.FONT_FAMILY_ROMAN,
                      fontSize: 14,
                    }} onPress={() => Linking.openURL("tel:+65 6254 7889")}>+65 6254 7889</Text>
                  </Text>
                  <Text
                    style={{
                      color: '#0392cf',
                      fontFamily: Config.FONT_FAMILY_ROMAN,
                      fontSize: 14,
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
