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
      medicalinNetwork: [],
      medicaloutNetwork: [],
      wellnessinNetwork: [],
      wellnessoutNetwork: [],
      visible: true,
      isLoading: this.props.isLoading
    };
    this.selectSpending = this.selectSpending.bind(this);
    this.selectWallet = this.selectWallet.bind(this);
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
    this.selectWallet("Medical")
    this.selectSpending("in_network_transactions");
    this.getMedicalWallet();
    this.getWelnnessWallet();
    // Core.GetBalance((err, result)=>{
    //   this.setState({currency: result.data.currency_symbol})
    // })
  }

  async selectSpending(type) {
    this.setState({ type: type })
  }

  async selectWallet(walletType) {
    this.setState({ walletType: walletType })
    setInterval(() => {
      this.setState({ isLoading: false })
    }, 1000);
  }

  getMedicalWallet() {
    this.setState({ isLoading: true })
    Core.GetBalanceMedical((error, result) => {
      data =
        typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      console.warn(data);
      this.setState({ isLoading: false })
      this.setState({
        medicalData: data,
        medicalBalance: data.balance,
        medicalInNetwork_Credit_spent: data.in_network_credits_spent,
        medicalEclaim_Credit_spent: data.e_claim_credits_spent,
        medicalcurrency: result.data.currency_symbol,
        medicalinNetwork: data.in_network_transactions,
        medicaloutNetwork: data.e_claim_transactions
      });
    });
  }

  getWelnnessWallet() {
    this.setState({ isLoading: true })
    Core.GetBalanceWellness((error, result) => {
      data =
        typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      console.warn(data);
      this.setState({ isLoading: false })
      this.setState({
        wellnessData: data,
        wellnessBalance: data.balance,
        wellnessInNetwork_Credit_spent: data.in_network_credits_spent,
        wellnessEclaim_Credit_spent: data.e_claim_credits_spent,
        wellnessurrency: result.data.currency_symbol,
        wellnessinNetwork: data.in_network_transactions,
        wellnessoutNetwork: data.e_claim_transactions
      });
    });
  }

  renderRecentActivity() {
    if (this.state.walletType == 'Medical') {
      if (this.state.type == 'in_network_transactions') {
        return this.state.medicalinNetwork.map((Data, index) => (
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
                      fontSize: 12,
                      fontFamily: Config.FONT_FAMILY_ROMAN,
                      color: '#2C3E50',
                      lineHeight: 20
                    }}
                  >
                    {Data.clinic_name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 11,
                      fontFamily: Config.FONT_FAMILY_THIN,
                      color: '#4f4f4f',
                      lineHeight: 20
                    }}
                  >
                    {Data.date_of_transaction}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: Config.FONT_FAMILY_MEDIUM,
                    marginTop: 30,
                    marginRight: 10,
                    marginLeft: 10
                  }}
                />
                <View style={styles.sectionTextPanel}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: Config.FONT_FAMILY_MEDIUM,
                      color: '#2C3E50',
                      lineHeight: 20,
                      marginTop: responsiveHeight(1),
                      fontWeight: '500'
                    }}
                  >
                    {
                      (this.state.walletType == 'Medical') ?
                        (this.state.medicalcurrency) ? this.state.medicalcurrency : '' :
                        (this.state.wellnessurrency) ? this.state.wellnessurrency : ''
                    } {(Data.amount) ? Data.amount : "0"} {" "}
                    <Icons
                      name="angle-right"
                      style={{
                        color: '#2C3E50',
                        fontSize: 15,
                        fontWeight: '600'
                      }}
                    />
                  </Text>

                </View>
              </View>

              <View
                style={{
                  marginLeft: '5%',
                  marginRight: '5%',
                }}>
                <Common.DividerWallet />
              </View>
            </TouchableOpacity>
          </View>
        ));
      } else if (this.state.type == 'e_claim_transactions') {
        return this.state.medicaloutNetwork.map((Data, index) => (
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
                      fontSize: 12,
                      fontFamily: Config.FONT_FAMILY_ROMAN,
                      color: '#2C3E50',
                      lineHeight: 20
                    }}
                  >
                    {Data.service}
                  </Text>
                  <Text
                    style={{
                      fontSize: 11,
                      fontFamily: Config.FONT_FAMILY_THIN,
                      color: '#4f4f4f',
                      lineHeight: 20
                    }}
                  >
                    {Data.claim_date}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: Config.FONT_FAMILY_MEDIUM,
                    marginTop: 30,
                    marginRight: 10,
                    marginLeft: 10
                  }}
                />
                <View style={styles.sectionTextPanel}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: Config.FONT_FAMILY_MEDIUM,
                      color: '#2C3E50',
                      lineHeight: 20,
                      marginTop: responsiveHeight(1),
                      fontWeight: '500'
                    }}
                  >
                    {
                      (this.state.walletType == 'Medical') ?
                        (this.state.medicalcurrency) ? this.state.medicalcurrency : '' :
                        (this.state.wellnessurrency) ? this.state.wellnessurrency : ''
                    } {(Data.amount) ? Data.amount : "0"} {" "}
                    <Icons
                      name="angle-right"
                      style={{
                        color: '#2C3E50',
                        fontSize: 15,
                        fontWeight: '600'
                      }}
                    />
                  </Text>

                </View>
              </View>

              <View
                style={{
                  marginLeft: '5%',
                  marginRight: '5%',
                }}>
                <Common.DividerWallet />
              </View>
            </TouchableOpacity>
          </View>
        ));
      }
    } else if (this.state.walletType == 'Wellness') {
      if (this.state.type == 'in_network_transactions') {
        return this.state.wellnessinNetwork.map((Data, index) => (
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
                      fontSize: 12,
                      fontFamily: Config.FONT_FAMILY_ROMAN,
                      color: '#2C3E50',
                      lineHeight: 20
                    }}
                  >
                    {Data.clinic_name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 11,
                      fontFamily: Config.FONT_FAMILY_THIN,
                      color: '#4f4f4f',
                      lineHeight: 20
                    }}
                  >
                    {Data.date_of_transaction}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: Config.FONT_FAMILY_MEDIUM,
                    marginTop: 30,
                    marginRight: 10,
                    marginLeft: 10
                  }}
                />
                <View style={styles.sectionTextPanel}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: Config.FONT_FAMILY_MEDIUM,
                      color: '#2C3E50',
                      lineHeight: 20,
                      marginTop: responsiveHeight(1),
                      fontWeight: '500'
                    }}
                  >
                    {
                      (this.state.walletType == 'Medical') ?
                        (this.state.medicalcurrency) ? this.state.medicalcurrency : '' :
                        (this.state.wellnessurrency) ? this.state.wellnessurrency : ''
                    } {(Data.amount) ? Data.amount : "0"} {" "}
                    <Icons
                      name="angle-right"
                      style={{
                        color: '#2C3E50',
                        fontSize: 15,
                        fontWeight: '600'
                      }}
                    />
                  </Text>
                </View>
              </View>

              <View
                style={{
                  marginLeft: '5%',
                  marginRight: '5%',
                }}>
                <Common.DividerWallet />
              </View>
            </TouchableOpacity>
          </View>
        ));
      } else if (this.state.type == 'e_claim_transactions') {
        return this.state.wellnessoutNetwork.map((Data, index) => (
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
                      fontSize: 12,
                      fontFamily: Config.FONT_FAMILY_ROMAN,
                      color: '#2C3E50',
                      lineHeight: 20
                    }}
                  >
                    {Data.service}
                  </Text>
                  <Text
                    style={{
                      fontSize: 11,
                      fontFamily: Config.FONT_FAMILY_THIN,
                      color: '#4f4f4f',
                      lineHeight: 20
                    }}
                  >
                    {Data.claim_date}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: Config.FONT_FAMILY_MEDIUM,
                    marginTop: 30,
                    marginRight: 10,
                    marginLeft: 10
                  }}
                />
                <View style={styles.sectionTextPanel}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: Config.FONT_FAMILY_MEDIUM,
                      color: '#2C3E50',
                      lineHeight: 20,
                      marginTop: responsiveHeight(1),
                      fontWeight: '500'
                    }}
                  >
                    {
                      (this.state.walletType == 'Medical') ?
                        (this.state.medicalcurrency) ? this.state.medicalcurrency : '' :
                        (this.state.wellnessurrency) ? this.state.wellnessurrency : ''
                    } {(Data.amount) ? Data.amount : "0"} {" "}
                    <Icons
                      name="angle-right"
                      style={{
                        color: '#2C3E50',
                        fontSize: 15,
                        fontWeight: '600'
                      }}
                    />
                  </Text>
                </View>
              </View>

              <View
                style={{
                  marginLeft: '5%',
                  marginRight: '5%',
                }}>
                <Common.DividerWallet />
              </View>
            </TouchableOpacity>
          </View>
        ));
      }
    }


  }

  render() {
    return (
      <Container style={{ backgroundColor: '#efeff4' }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar
          leftNav="homeback"
          title="Wallet"
        />
        <View style={styles.wrapperTop}>
          <Core.Loader
            isVisible={this.state.isLoading}
          />
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
              <View>
                <TouchableOpacity onPress={() => this.selectWallet("Medical") ? this.setState({ isLoading: true }) : null}
                  refs="Medical"
                >
                  <Text
                    style={(this.state.walletType == 'Medical') ? styles.textActive : styles.textNoactive}
                  >
                    Medical
                  </Text>
                </TouchableOpacity>
                <View
                  style={(this.state.walletType == 'Medical') ? styles.walletActive : styles.walletNotactive}
                />
              </View>
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
              <View>
                <TouchableOpacity onPress={() => this.selectWallet("Wellness") ? this.setState({ isLoading: true }) : null}
                  refs="Wellness"
                >
                  <Text
                    style={(this.state.walletType == 'Wellness') ? styles.textActive : styles.textNoactive}
                  >
                    Wellness
                  </Text>
                </TouchableOpacity>
                <View
                  style={(this.state.walletType == 'Wellness') ? styles.walletActive : styles.walletNotactive}
                />
              </View>
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
                {
                  (this.state.walletType == 'Medical') ?
                    (this.state.medicalcurrency) ? this.state.medicalcurrency : '' :
                    (this.state.wellnessurrency) ? this.state.wellnessurrency : ''
                }
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
                {
                  (this.state.walletType == 'Medical') ?
                    (this.state.medicalBalance) ? this.state.medicalBalance : '0' :
                    (this.state.wellnessBalance) ? this.state.wellnessBalance : '0'
                }
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
              width: responsiveWidth(45),
              height: responsiveHeight(10),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
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
                  {
                    (this.state.walletType == 'Medical') ?
                      (this.state.medicalcurrency) ? this.state.medicalcurrency : '' :
                      (this.state.wellnessurrency) ? this.state.wellnessurrency : ''
                  }
                  {
                    (this.state.walletType == 'Medical') ?
                      (this.state.medicalInNetwork_Credit_spent) ? this.state.medicalInNetwork_Credit_spent : '0' :
                      (this.state.wellnessInNetwork_Credit_spent) ? this.state.wellnessInNetwork_Credit_spent : '0'
                  }
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
              width: responsiveWidth(45),
              height: responsiveHeight(10),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
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
                  {
                    (this.state.walletType == 'Medical') ?
                      (this.state.medicalcurrency) ? this.state.medicalcurrency : '' :
                      (this.state.wellnessurrency) ? this.state.wellnessurrency : ''
                  }
                  {
                    (this.state.walletType == 'Medical') ?
                      (this.state.medicalEclaim_Credit_spent) ? this.state.medicalEclaim_Credit_spent : '0' :
                      (this.state.wellnessEclaim_Credit_spent) ? this.state.wellnessEclaim_Credit_spent : '0'
                  }
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
              marginLeft: responsiveWidth(-57)
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
            width: responsiveWidth(90),
            height: responsiveHeight(42),
            // alignItems: 'center',
            backgroundColor: '#fff',
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
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
