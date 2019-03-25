import React, { Component } from 'react';
import { StatusBar, View, Dimensions, TouchableOpacity } from 'react-native';
import { Container, Text } from 'native-base';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Actions } from 'react-native-router-flux';
import Icons from 'react-native-vector-icons/FontAwesome';
import styles from '../components/BalanceComp/styles';
import Navbar from '../components/common/Navbar';
import * as Core from '../core';
import * as Config from '../config';
import RF from "react-native-responsive-fontsize";
import * as Common from '../components/common';

const { width } = Dimensions.get('window')

class Wallet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Balance: '0',
      InNetwork_Credit_spent: '0',
      Eclaim_Credit_spent: '0',
      currency: '',
      inNetwork: [],
      outNetwork: [],
      collapsed: true,
      visible: true,
      medicalData: [
        {
          label: "Please choose claim first",
          value: null
        }
      ],
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
    this.selectSpending("in_network_transactions")
    // Core.GetBalance((err, result)=>{
    //   this.setState({currency: result.data.currency_symbol})
    // })
  }

  async selectSpending(type) {
    this.setState({ type: type })
  }

  getUserBalance() {
    Core.GetBalanceMedical((error, result) => {
      data =
        typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      console.warn(data);
      this.setState({
        Balance: data.balance,
        InNetwork_Credit_spent: data.in_network_credits_spent,
        Eclaim_Credit_spent: data.e_claim_credits_spent,
        currency: result.data.currency_symbol,
        inNetwork: data.in_network_transactions,
        outNetwork: data.e_claim_transactions
      });
    });
  }

  renderRecentActivity() {
    console.warn(this.state.type)
    if (this.state.type == 'in_network_transactions') {
      return this.state.inNetwork.map((Data, index) => (
        <View>
          <TouchableOpacity
            key={index}
            onPress={() =>
              Actions.HistoryGeneral({ transaction_id: Data.transaction_id })
            }
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: responsiveWidth(4),
                marginRight: responsiveWidth(4),
              }}
            >
              <View style={styles.sectionTextPanel}>
                <Text
                  style={{
                    fontSize: RF(1.4),
                    fontFamily: Config.FONT_FAMILY_ROMAN,
                    color: '#2C3E50',
                    letterSpacing: 1.5,
                    lineHeight: 20
                  }}
                >
                  {Data.clinic_name}
                </Text>
                <Text
                  style={{
                    fontSize: RF(1.2),
                    fontFamily: Config.FONT_FAMILY_THIN,
                    color: '#A8A8A8',
                    lineHeight: 20
                  }}
                >
                  {Data.date_of_transaction}
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
                    lineHeight: 20,
                    marginTop: responsiveHeight(1),
                    marginLeft: responsiveWidth(8)
                  }}
                >
                  {(this.state.currency) ? this.state.currency : " "} {(Data.amount) ? Data.amount : "0"}
                </Text>
              </View>
              <Icons
                name="angle-right"
                style={{
                  color: '#2C3E50',
                  fontSize: 20,
                  paddingRight: 5,
                  marginTop: responsiveHeight(0.85),
                }}
              />
            </View>

            <View
              style={{
                marginLeft: '5%',
                marginRight: '5%',
              }}>
              <Common.Divider />
            </View>
          </TouchableOpacity>
        </View>
      ));
    } else if (this.state.type == 'e_claim_transactions') {
      return this.state.outNetwork.map((Data, index) => (
        <View>
          <TouchableOpacity
            key={index}
            onPress={() =>
              Actions.DetailEclaimTransaction({ transaction_id: Data.transaction_id })
            }
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: responsiveWidth(4),
                marginRight: responsiveWidth(4),
              }}
            >
              <View style={styles.sectionTextPanel}>
                <Text
                  style={{
                    fontSize: RF(1.4),
                    fontFamily: Config.FONT_FAMILY_ROMAN,
                    color: '#2C3E50',
                    letterSpacing: 1.5,
                    lineHeight: 20
                  }}
                >
                  {Data.service}
                </Text>
                <Text
                  style={{
                    fontSize: RF(1.2),
                    fontFamily: Config.FONT_FAMILY_THIN,
                    color: '#A8A8A8',
                    lineHeight: 20
                  }}
                >
                  {Data.claim_date}
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
                    lineHeight: 20,
                    marginTop: responsiveHeight(1),
                    marginLeft: responsiveWidth(12)
                  }}
                >
                  {(this.state.currency) ? this.state.currency : " "} {(Data.amount) ? Data.amount : "0"}
                </Text>
              </View>
              <Icons
                name="angle-right"
                style={{
                  color: '#2C3E50',
                  fontSize: 20,
                  paddingRight: 5,
                  marginTop: responsiveHeight(0.85),
                }}
              />
            </View>

            <View
              style={{
                marginLeft: '5%',
                marginRight: '5%',
              }}>
              <Common.Divider />
            </View>
          </TouchableOpacity>
        </View>
      ));
    }
  }

  render() {
    return (
      <Container style={{ backgroundColor: '#efeff4' }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar
          leftNav="back"
          title="Wallet"
        />
        <View style={styles.wrapperTop}>
          <View style={{
            backgroundColor: '#0392cf',
            height: responsiveHeight(28),
            width: width,
            alignItems: 'center',
          }}>


            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                // marginTop: responsiveHeight(4)
              }}
            >
              <Text
                style={{
                  fontSize: RF(2.2),
                  fontFamily: Config.FONT_FAMILY_MEDIUM,
                  marginTop: responsiveHeight(2),
                  color: '#fff',
                  lineHeight: 19
                }}
              >
                Medical
              </Text>
              <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#DBDBDB',
                borderColor: '#DBDBDB',
                borderWidth: 0.3,
                borderBottomLeftRadius: 2,
                borderTopLeftRadius: 2,
                marginTop: responsiveHeight(2),
                width: responsiveWidth(0.2),
                height: responsiveHeight(3),
                marginLeft: responsiveWidth(4),
                marginRight: responsiveWidth(4),
              }}
              />
              <TouchableOpacity onPress={() => Actions.WalletWellness()}>
                <Text
                  style={{
                    fontSize: RF(2.2),
                    fontFamily: Config.FONT_FAMILY_ROMAN,
                    marginTop: responsiveHeight(2),
                    color: '#fff',
                    opacity: 0.6,
                    lineHeight: 19
                  }}
                >
                  Wellness
              </Text>
              </TouchableOpacity>
            </View>

            <Text
              style={{
                fontSize: RF(2.2),
                fontFamily: Config.FONT_FAMILY_MEDIUM,
                marginTop: responsiveHeight(4),
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
                  marginTop: responsiveHeight(1),
                  lineHeight: 60,
                  letterSpacing: 2.5
                }}
              >
                {this.state.Balance}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View style={{
              marginTop: responsiveHeight(-3),
              width: responsiveWidth(40),
              height: responsiveHeight(12),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
              elevation: 5,
              borderWidth: 0.3,
              borderColor: '#DBDBDB',
              borderBottomLeftRadius: 2,
              borderTopLeftRadius: 2,
            }}
            >
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
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
            </View>

            <View style={{
              marginTop: responsiveHeight(-3),
              width: responsiveWidth(40),
              height: responsiveHeight(12),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
              elevation: 5,
              borderWidth: 0.3,
              borderColor: '#DBDBDB',
              borderTopRightRadius: 2,
              borderBottomRightRadius: 2,

            }}
            >
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
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

          <View
            style={{
              alignContent: 'flex-start',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              marginTop: responsiveHeight(1),
              marginLeft: responsiveWidth(-45)
            }}
          >
            <Text
              style={{
                fontSize: RF(1.8),
                fontFamily: Config.FONT_FAMILY_BOLD,
                color: '#919191',
                lineHeight: 17,
              }}
            >
              Recent Activity
            </Text>
          </View>

          <View style={{
            marginTop: responsiveHeight(1),
            width: responsiveWidth(80),
            height: responsiveHeight(45),
            // alignItems: 'center',
            backgroundColor: '#fff',
            elevation: 5,
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
                  onPress={() => this.selectSpending("in_network_transactions")}
                  refs="in_network_transactions"
                  style={[(this.state.type == 'in_network_transactions') ? styles.spendingActive : styles.spendingNotactive]}
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
                  onPress={() => this.selectSpending("e_claim_transactions")}
                  refs="e_claim_transactions"
                  style={[(this.state.type == 'e_claim_transactions') ? styles.spendingActive : styles.spendingNotactive]}
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

            <View>
              {this.renderRecentActivity()}
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
                <TouchableOpacity onPress={() => Actions.HistoryTransaction()}>
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
      </Container >
    );
  }
}

export default Wallet;
