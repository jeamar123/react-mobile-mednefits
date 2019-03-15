import React, { Component } from 'react';
import { StatusBar, View, Dimensions, TouchableOpacity } from 'react-native';
import { Container, Text } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import styles from '../components/BalanceComp/styles';
import Navbar from '../components/common/Navbar';
import * as Core from '../core';
import * as Config from '../config';
import RF from "react-native-responsive-fontsize";
import * as Common from '../components/common';

const { height, width } = Dimensions.get('window')

const styless = {

  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  modal2: {
    marginTop: 54,
    height: 230,
    backgroundColor: "white"
  },
}

class Wallet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Balance: '0',
      InNetwork_Credit_spent: '0',
      Eclaim_Credit_spent: '0',
      currency: '',
      collapsed: true,
      visible: true
    };
    this.selectSpending = this.selectSpending.bind(this)
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
    this.getUserBalance();
    this.selectSpending("medical")
    // Core.GetBalance((err, result)=>{
    //   this.setState({currency: result.data.currency_symbol})
    // })
  }

  async selectSpending(type) {
    this.setState({ type: type, claimTypeState: "Loading...", claim: false })

    await Core.GetHealthTypeList(type, (err, result) => {
      if (result) {
        dataClaim = []

        result.data.map((claim) => {
          dataClaim.push({ label: claim.name, value: claim.health_type_id })
        });

        this.setState({ claimType: dataClaim })
      }

      this.setState({ claimTypeState: "Select" })
    })
  }

  getUserBalance() {
    Core.GetBalance((error, result) => {
      data =
        typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      this.setState({
        Balance: data.balance,
        InNetwork_Credit_spent: data.in_network_credits_spent,
        Eclaim_Credit_spent: data.e_claim_credits_spent,
        currency: result.data.currency_symbol
      });
    });
  }

  componentDidMount() {

  }

  render() {
    return (
      <Container style={{ backgroundColor: '#efeff4' }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar
          leftNav="back"
          title="Wallet"
        />
        <View style={{
          backgroundColor: '#0392cf',
          height: responsiveHeight(30),
          width: width,
          alignItems: 'center',
        }}>
          <View style={styles.wrapperTop}>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: responsiveHeight(14)
              }}
            >
              <Text
                style={{
                  fontSize: RF(2.2),
                  fontFamily: Config.FONT_FAMILY_MEDIUM,
                  marginTop: 30,
                  color: '#fff',
                  lineHeight: 19
                }}
              >
                Medical
              </Text>
              <Text
                style={{
                  fontSize: RF(2.2),
                  fontFamily: Config.FONT_FAMILY_MEDIUM,
                  marginTop: 30,
                  color: '#fff',
                  marginRight: 10,
                  marginLeft: 10
                }}
              >
                |
              </Text>
              <Text
                style={{
                  fontSize: RF(2.2),
                  fontFamily: Config.FONT_FAMILY_MEDIUM,
                  marginTop: 30,
                  color: '#fff',
                  lineHeight: 19
                }}
              >
                Wellness
              </Text>
            </View>

            <Text
              style={{
                fontSize: RF(2.2),
                fontFamily: Config.FONT_FAMILY_MEDIUM,
                marginTop: 30,
                color: '#2C3E50'
              }}
            >
              Balance
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: '#fff',
                  fontFamily: Config.FONT_FAMILY_ROMAN,
                  marginTop: 2,
                  lineHeight: 60,
                  letterSpacing: 1.7
                }}
              >
                {(this.state.currency) ? this.state.currency : " "}
              </Text>
              <Text
                style={{
                  fontSize: 50,
                  color: '#fff',
                  fontFamily: Config.FONT_FAMILY_ROMAN,
                  marginTop: 10,
                  lineHeight: 60,
                  letterSpacing: 2.5
                }}
              >
                {this.state.Balance}
              </Text>
            </View>


            <View style={{
              marginTop: responsiveHeight(4),
              width: responsiveWidth(80),
              height: responsiveHeight(14),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
            }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View style={styles.sectionTextPanel}>
                  <Text
                    style={{
                      fontSize: RF(2.2),
                      fontFamily: Config.FONT_FAMILY_ROMAN,
                      color: '#2C3E50',
                      letterSpacing: 1.5,
                      lineHeight: 20
                    }}
                  >
                    {(this.state.currency) ? this.state.currency : " "} {(this.state.InNetwork_Credit_spent) ? this.state.InNetwork_Credit_spent : "0"}
                  </Text>
                  <Text
                    style={{
                      fontSize: RF(1.4),
                      fontFamily: Config.FONT_FAMILY_BOLD,
                      color: '#A8A8A8',
                      lineHeight: 20
                    }}
                  >
                    In-Network Spent
                  </Text>
                </View>

                <Text
                  style={{
                    fontSize: RF(2.2),
                    fontFamily: Config.FONT_FAMILY_MEDIUM,
                    marginTop: 30,
                    marginRight: 10,
                    marginLeft: 10
                  }}
                />

                <View style={styles.sectionTextPanel}>
                  <Text
                    style={{
                      fontSize: RF(2.2),
                      fontFamily: Config.FONT_FAMILY_ROMAN,
                      color: '#2C3E50',
                      letterSpacing: 1.5,
                      lineHeight: 20
                    }}
                  >
                    {(this.state.currency) ? this.state.currency : " "} {(this.state.Eclaim_Credit_spent) ? this.state.Eclaim_Credit_spent : "0"}
                  </Text>
                  <Text
                    style={{
                      fontSize: RF(1.4),
                      fontFamily: Config.FONT_FAMILY_BOLD,
                      color: '#A8A8A8',
                      lineHeight: 20
                    }}
                  >
                    Out-of-Network Spent
                  </Text>
                </View>

              </View>
            </View>

            <View style={{
              marginTop: responsiveHeight(4),
              width: responsiveWidth(80),
              height: responsiveHeight(35),
              // alignItems: 'center',
              backgroundColor: '#fff',
            }}
            >
              <View style={{
                alignItems: 'center',
              }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: responsiveHeight(4),
                    marginBottom: responsiveHeight(2),
                  }}
                >
                  <TouchableOpacity
                    onPress={() => this.selectSpending("medical")}
                    refs="medical"
                    style={[(this.state.type == 'medical') ? styles.spendingActive : styles.spendingNotactive]}
                  >
                    <Text
                      style={{
                        fontSize: RF(1.6),
                        fontWeight: '500',
                        fontFamily: Config.FONT_FAMILY_ROMAN,
                        color: '#2C3E50',
                        letterSpacing: 1.5,
                        lineHeight: 20
                      }}
                    >
                      In-Network
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      fontSize: RF(1.6),
                      fontWeight: '500',
                      fontFamily: Config.FONT_FAMILY_MEDIUM,
                      marginTop: 30,
                      marginRight: 10,
                      marginLeft: 10
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => this.selectSpending("wellness")}
                    refs="wellness"
                    style={[(this.state.type == 'wellness') ? styles.spendingActive : styles.spendingNotactive]}
                  >
                    <Text
                      style={{
                        fontSize: RF(1.6),
                        fontWeight: '500',
                        fontFamily: Config.FONT_FAMILY_ROMAN,
                        color: '#2C3E50',
                        letterSpacing: 1.5,
                        lineHeight: 20
                      }}
                    >
                      Out-of-Network
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginLeft: responsiveWidth(2),
                  marginRight: responsiveWidth(2),
                }}
              >
                <View style={styles.sectionTextPanel}>
                  <Text
                    style={{
                      fontSize: RF(1.6),
                      fontFamily: Config.FONT_FAMILY_MEDIUM,
                      color: '#2C3E50',
                      letterSpacing: 1.5,
                      lineHeight: 20
                    }}
                  >
                    Drs Chua & Partners Pte Ltd
                  </Text>
                  <Text
                    style={{
                      fontSize: RF(1.4),
                      fontFamily: Config.FONT_FAMILY_MEDIUM,
                      color: '#A8A8A8',
                      lineHeight: 20
                    }}
                  >
                    15 January 2019, 08:45am
                  </Text>
                </View>

                <Text
                  style={{
                    fontSize: RF(2.2),
                    fontFamily: Config.FONT_FAMILY_MEDIUM,
                    marginTop: 30,
                    marginRight: 10,
                    marginLeft: 10
                  }}
                />

                <View style={styles.sectionTextPanel}>
                  <Text
                    style={{
                      fontSize: RF(1.6),
                      fontFamily: Config.FONT_FAMILY_ROMAN,
                      color: '#2C3E50',
                      letterSpacing: 1.5,
                      lineHeight: 20
                    }}
                  >
                    {(this.state.currency) ? this.state.currency : " "} {(this.state.Eclaim_Credit_spent) ? this.state.Eclaim_Credit_spent : "0"}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginLeft: responsiveWidth(2),
                  marginRight: responsiveWidth(2),
                }}
              >
                <View style={styles.sectionTextPanel}>
                  <Text
                    style={{
                      fontSize: RF(1.6),
                      fontFamily: Config.FONT_FAMILY_MEDIUM,
                      color: '#2C3E50',
                      letterSpacing: 1.5,
                      lineHeight: 20
                    }}
                  >
                    Drs Chua & Partners Pte Ltd
                  </Text>
                  <Text
                    style={{
                      fontSize: RF(1.4),
                      fontFamily: Config.FONT_FAMILY_MEDIUM,
                      color: '#A8A8A8',
                      lineHeight: 20
                    }}
                  >
                    15 January 2019, 08:45am
                  </Text>
                </View>

                <Text
                  style={{
                    fontSize: RF(2.2),
                    fontFamily: Config.FONT_FAMILY_MEDIUM,
                    marginTop: 30,
                    marginRight: 10,
                    marginLeft: 10
                  }}
                />

                <View style={styles.sectionTextPanel}>
                  <Text
                    style={{
                      fontSize: RF(1.6),
                      fontFamily: Config.FONT_FAMILY_ROMAN,
                      color: '#2C3E50',
                      letterSpacing: 1.5,
                      lineHeight: 20
                    }}
                  >
                    {(this.state.currency) ? this.state.currency : " "} {(this.state.Eclaim_Credit_spent) ? this.state.Eclaim_Credit_spent : "0"}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginLeft: responsiveWidth(2),
                  marginRight: responsiveWidth(2),
                }}
              >
                <View style={styles.sectionTextPanel}>
                  <Text
                    style={{
                      fontSize: RF(1.6),
                      fontFamily: Config.FONT_FAMILY_MEDIUM,
                      color: '#2C3E50',
                      letterSpacing: 1.5,
                      lineHeight: 20
                    }}
                  >
                    Drs Chua & Partners Pte Ltd
                  </Text>
                  <Text
                    style={{
                      fontSize: RF(1.4),
                      fontFamily: Config.FONT_FAMILY_MEDIUM,
                      color: '#A8A8A8',
                      lineHeight: 20
                    }}
                  >
                    15 January 2019, 08:45am
                  </Text>
                </View>

                <Text
                  style={{
                    fontSize: RF(2.2),
                    fontFamily: Config.FONT_FAMILY_MEDIUM,
                    marginTop: 30,
                    marginRight: 10,
                    marginLeft: 10
                  }}
                />

                <View style={styles.sectionTextPanel}>
                  <Text
                    style={{
                      fontSize: RF(1.6),
                      fontFamily: Config.FONT_FAMILY_ROMAN,
                      color: '#2C3E50',
                      letterSpacing: 1.5,
                      lineHeight: 20
                    }}
                  >
                    {(this.state.currency) ? this.state.currency : " "} {(this.state.Eclaim_Credit_spent) ? this.state.Eclaim_Credit_spent : "0"}
                  </Text>
                </View>
              </View>

              <View style={{
                alignItems: 'center',
              }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: responsiveHeight(2),
                  }}
                >
                  <TouchableOpacity>
                    <Text
                      style={{
                        fontSize: RF(1.6),
                        fontWeight: '500',
                        fontFamily: Config.FONT_FAMILY_BOLD,
                        color: '#0392CF',
                        letterSpacing: 1.5,
                        lineHeight: 20
                      }}
                    >
                      See More
                    </Text>
                  </TouchableOpacity>

                </View>
              </View>

            </View>
          </View>
        </View>
      </Container >
    );
  }
}

export default Wallet;
