import React, { Component } from 'react';
import { StatusBar, View, Image, ScrollView } from 'react-native';
import { Text, Drawer } from 'native-base';
import Navbar from '../components/common/Navbar';
import { MenuSide } from '../components/HomeContent';
import * as Core from '../core';

class ECardUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idTransaction: '0',
      date: '',
      customerName: '',
      price: '',
      status: '',
      resultData: [],
      DataE_Claim: [],
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
            rightNav="search"
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
                      fontWeight: '600',
                      color: '#0392cf',
                      fontSize: 24,
                    }}
                  >
                    dhonald johannes
                  </Text>
                  <Text
                    style={{
                      fontWeight: '600',
                      color: '#0392cf',
                      fontSize: 24,
                    }}
                  >
                    289
                  </Text>

                  <Text
                    style={{
                      marginTop: '15%',
                      fontWeight: '600',
                      fontSize: 14,
                    }}
                  >
                    Member ID
                  </Text>
                  <Text style={{ fontWeight: '600', fontSize: 14 }}>
                    Mednefits Care:
                  </Text>
                  <Text style={{ fontWeight: '600', fontSize: 14 }}>
                    Plan Add-on:
                  </Text>
                  <Text style={{ fontWeight: '600', fontSize: 14 }}>
                    ABC Company Ltd
                  </Text>
                  <Text style={{ fontWeight: '600', fontSize: 14 }}>
                    Start Date:
                  </Text>
                  <Text style={{ fontWeight: '600', fontSize: 14 }}>
                    End Date:
                  </Text>

                  <Text
                    style={{
                      marginTop: '15%',
                      fontWeight: '600',
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
                    marginTop: '5%',
                    fontWeight: '600',
                    color: '#c4c4c4',
                    fontSize: 11,
                    marginRight: '10%',
                  }}
                >
                  Outpatient GP
                </Text>
                <Text
                  style={{
                    marginTop: '5%',
                    fontWeight: '600',
                    color: '#c4c4c4',
                    fontSize: 11,
                    width: '60%',
                  }}
                >
                  Consultation; Covered by us. Medicine & Treatment; Pay using
                  your Medical Credits
                </Text>
              </View>

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
                    marginTop: '2%',
                    fontWeight: '600',
                    color: '#c4c4c4',
                    fontSize: 11,
                    marginRight: '10%',
                  }}
                >
                  Dental Care
                </Text>
                <Text
                  style={{
                    marginTop: '2%',
                    fontWeight: '600',
                    color: '#c4c4c4',
                    fontSize: 11,
                    width: '60%',
                  }}
                >
                  30% off dental services
                </Text>
              </View>

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
                    marginTop: '2%',
                    fontWeight: '600',
                    color: '#c4c4c4',
                    fontSize: 11,
                    marginRight: '10%',
                  }}
                >
                  TCM
                </Text>
                <Text
                  style={{
                    marginTop: '2%',
                    fontWeight: '600',
                    color: '#c4c4c4',
                    fontSize: 11,
                    width: '60%',
                  }}
                >
                  100% consultation covered by Mednefits. You only need to pay
                  for medicine
                </Text>
              </View>
              <View
                style={{
                  marginTop: '10%',
                  marginBottom: 10,
                  height: '15%',
                  backgroundColor: '#c4c4c4',
                  borderBottomLeftRadius: 14,
                  borderBottomRightRadius: 14,
                  opacity: 10000,
                }}
              >
                <View
                  style={{
                    flexDirection: 'column',
                    marginTop: '2%',
                    marginLeft: '5%',
                  }}
                >
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 20,
                    }}
                  >
                    Need Help?
                  </Text>
                  <Text
                    style={{
                      color: '#0392cf',
                      fontSize: 14,
                    }}
                  >
                    happinness@mednefits.com or +65 6254 7889
                  </Text>
                  <Text
                    style={{
                      color: '#0392cf',
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
