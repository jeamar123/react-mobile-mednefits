import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import * as Core from '../../core';
import Icons from 'react-native-vector-icons/FontAwesome';
import RF from "react-native-responsive-fontsize";
import * as Common from '../common';
import * as Config from '../../config';

class HomeContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Balance: '0',
      Full_name: '',
      currency: false,
      isClearSearch: false,
      isLoadingSearch: false,
      kickout: true,
      services: '',
      clinicid: '',
      member: '',
      nric: '',
      checkId: '',
      checkTime: '',
      capCurrency: '',
      capAmount: '',
      clinic_image: '',
      clinic_name: '',
      consultation_fee_symbol: '',
      consultation_status: '',
      consultation_fees: '',
      isWalletLoading: false,
      isEcardLoading: false,
      isCheckoutLoading: false
    };
  }

  async componentWillMount() {
    // NEW_
    await this.NEW_getUserDetail();

    await this.getUserDetail();
    await this.getUserBalance();
    await this.StatusUseronClinic();
  }

  async StatusUseronClinic() {
    console.log(this.props);
    // this.props.toggleLoadingState('');
    New_token = await Core.GetDataLocalReturnNew('token');
    console.log("New_token__OnHome " + New_token)
    //
    user = await Core.GetDataLocalReturnNew('user_id');
    newUserCheckinIDName = Config.CHECKIDVISIT + '_' + user;
    storageCheckinUser = await Core.GetDataLocalReturnNew(newUserCheckinIDName);
    data =
      await typeof storageCheckinUser == 'string' ? JSON.parse(storageCheckinUser) : storageCheckinUser;
    console.warn("UserOnClinicData" + JSON.stringify(data, null, 4))
    console.log(data);
    // this.props.toggleLoadingState('');
    this.setState({
      services: data.clinic_procedures,
      clinicid: data.clinic_id,
      member: data.member,
      nric: data.nric,
      checkId: data.check_in_id,
      checkTime: data.check_in_time,
      capCurrency: data.cap_currency_symbol,
      capAmount: data.cap_per_visit_amount,
      clinic_image: data.image_url,
      clinic_name: data.name,
      consultation_fee_symbol: data.consultation_fee_symbol,
      consultation_status: data.consultation_status,
      consultation_fees: data.consultation_fees,
      default_service: data.default_service
    })

    this.toggleCheckoutLoading(true);
    await Core.CancelVisiByClinic(this.state.checkId, async (error, result) => {
      data =
        await typeof result == 'string' ? JSON.parse(result) : result;
      console.log(data);
      if (data.status == true) {
        this.toggleCheckoutLoading(false);
        this.setState({
          kickout: false,
        });
      }
      // console.warn('data ' + data.check_in_status_removed);
      // await this.setState({
      //   kickout: result.data.check_in_status_removed,
      // });

    });
  }

  async getUserBalance() {
    this.toggleWalletLoading(true);
    await Core.GetBalance(async (error, result) => {
      data =
        await typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      await this.setState({
        Balance: data.balance,
        currency: result.data.currency_symbol
      }, () => {
        this.toggleWalletLoading(false);
      });
    });
  }

  toggleEcardLoading(opt) {
    this.setState({ isEcardLoading: opt });
  }
  toggleWalletLoading(opt) {
    this.setState({ isWalletLoading: opt });
  }
  toggleCheckoutLoading(opt) {
    this.setState({ isCheckoutLoading: opt })
  }

  onQuery = async (query) => {
    this.setState({
      isClearSearch: true,
      query: query
    })
  }

  clearProcess = (state) => {
    this.props.clearProcess("true")
    this.setState({
      query: "",
      isClearSearch: false
    })
  }

  processQuery = async () => {
    this.props.isLoadingSearch("true")

    try {
      result = await Core.MainSearch(this.state.query)

      this.props.onUpdateSearch(result.data)
      this.props.isLoadingSearch("false")

    } catch (e) {
      Common.getNotify("", e.message)
      this.props.isLoadingSearch("false")
    } finally {
      setTimeout(() => {
        this.props.isLoadingSearch("false")
      }, 2000)
    }
  }

  async NEW_getUserDetail() {
    this.toggleEcardLoading(true);
    await Core.NEW_UserDetail(async (error, result) => {
      data =
        await typeof result == 'string' ? JSON.parse(result) : result;
      await this.setState({
        Full_name: data.Name,
      }, () => {
        this.toggleEcardLoading(false);
      });
    });
  }

  async getUserDetail() {
    this.toggleEcardLoading(true);
    console.log('in progress fetching getUserDetail')
    await Core.UserDetail(async (error, result) => {
      console.log('fetching done for getUserDetail');
      data =
        await typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      // console.warn(data);
      await this.setState({
        Full_name: data.profile.full_name,
      }, () => {
        this.toggleEcardLoading(false);
      });
    });
  }

  render() {
    // console.warn('kickout ' + this.state.kickout)
    // console.warn("props: " + JSON.stringify(this.props, null, 4))
    return (
      <View style={styles.container}>
        <View style={styles.sectionTitle}>
          <TouchableOpacity
            onPress={() =>
              Actions.HomeSearch()
            }
            style={{
              width: '90%',
              borderRadius: 5,
              color: "#fff",
              backgroundColor: '#0A6186',
              marginLeft: 10,
              marginRight: 10,
              flexDirection: 'row',
              alignItems: 'center',
              height: '20%'
            }}>
            <Common.buttonSearch
              type="search"
              iconColor="#fff"
              justifyContent="flex-start"

            />
          </TouchableOpacity>

          {/* <Common.InputSearch
            value={this.state.query}
            returnKeyType="search"
            onSubmitEditing={() => this.processQuery()}
            onChangeText={query => this.onQuery(query)}
            placeholder="Search"
            placeholderTextColor="#fff"
            placeholderStyle={{
              color: "#fff",
              width: '100%'
            }}
            type="search"
            isClearSearch={this.state.isClearSearch}
            isClearSearchChange={this.clearProcess}
            iconColor="#fff"
            // alignItems="center"
            justifyContent="flex-start"
            style={{
              width: '90%',
              borderRadius: 5,
              color: "#fff",
              backgroundColor: '#0A6186',
              marginLeft: 10,
              marginRight: 10,
              flexDirection: 'row',
              alignItems: 'center',
              height: '20%'
            }}
          /> */}
          <View style={styles.contain}>

            {(this.state.checkId && this.state.kickout == false) ? (
              <TouchableOpacity
                onPress={() =>
                  Actions.cancelVisit({
                    services: this.state.services,
                    clinicid: this.state.clinicid,
                    member: this.state.member,
                    nric: this.state.nric,
                    checkId: this.state.checkId,
                    checkTime: this.state.checkTime,
                    capCurrency: this.state.capCurrency,
                    capAmount: this.state.capAmount,
                    clinic_image: this.state.clinic_image,
                    clinic_name: this.state.clinic_name,
                    consultation_fee_symbol: this.state.consultation_fee_symbol,
                    consultation_status: this.state.consultation_status,
                    consultation_fees: this.state.consultation_fees
                  })
                }
              >
                <View style={styles.gridBox}>
                  <View style={{ flex: 1 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '13%' }}>
                      <Image
                        style={{ marginBottom: 15, width: 30, height: 30 }}
                        source={require('../../../assets/apps/Scan&Pay.png')}
                      />
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '2%', }}>
                      <Text style={(styles.titleRegister)}>Register {this.props.clinic_id} </Text>
                      {/* <Text style={styles.title}>Scan & Pay</Text>
                    <Text style={styles.detail}>Panel</Text> */}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

            ) : (this.state.kickout == true) ? (
              <TouchableOpacity
                onPress={() =>
                  Actions.Barcode()
                }
              >
                <View style={styles.gridBox}>
                  <View style={{ flex: 1 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '13%' }}>
                      <Image
                        style={{ marginBottom: 15, width: 30, height: 30 }}
                        source={require('../../../assets/apps/Scan&Pay.png')}
                      />
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '2%' }}>
                      <Text style={styles.titleRegister}>Register {this.props.clinic_id} </Text>
                      {/* <Text style={styles.title}>Scan & Pay</Text>
                    <Text style={styles.detail}>Panel</Text> */}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

            ) : (

                  <TouchableOpacity
                    onPress={() =>
                      Actions.Barcode()
                    }
                  >
                    <View style={styles.gridBox}>
                      <View style={{ flex: 1 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '13%' }}>
                          <Image
                            style={{ marginBottom: 15, width: 30, height: 30 }}
                            source={require('../../../assets/apps/Scan&Pay.png')}
                          />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '2%' }}>
                          <Text style={styles.titleRegister}>Register {this.props.clinic_id} </Text>
                          {/* <Text style={styles.title}>Scan & Pay</Text>
                    <Text style={styles.detail}>Panel</Text> */}
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}

            {(this.state.kickout == true) ? (
              <TouchableOpacity
                onPress={() =>
                  Actions.notRegister()
                }
                disabled={this.state.isCheckoutLoading}
                style={this.state.isCheckoutLoading == true ? { opacity: .5 } : null}
              >
                <View style={styles.gridBox}>
                  <View style={{ flex: 1 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '10%' }}>

                      {(!this.state.checkId && this.state.kickout == true) ? (
                        <View />
                      ) : (this.state.checkId && this.state.kickout == false) ? (
                        <View style={{
                          marginTop: '-7%',
                          marginLeft: '55%',
                          marginBottom: '-8%',
                          width: 15,
                          height: 15,
                          borderRadius: 15 / 2,
                          backgroundColor: '#f44336',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }} />
                      ) : (
                            <View />
                          )}

                      <Image
                        style={{ marginBottom: 8, width: 23, height: 35 }}
                        source={require('../../../assets/apps/payIcon.png')}
                      />
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '8.5%' }}>
                      <Text style={styles.title}>Checkout</Text>
                      {
                        this.state.isCheckoutLoading == false ?
                          <Text numberOfLines={3} style={styles.detail}></Text>
                          :
                          <ActivityIndicator color="#fff" size="small" />
                      }
                    </View>

                  </View>
                </View>
              </TouchableOpacity>

            ) : (!this.state.services.length) ? (
              <TouchableOpacity
                onPress={() =>
                  Actions.BenefitsDollar({
                    services: this.state.services,
                    clinicid: this.state.clinicid,
                    capCurrency: this.state.capCurrency,
                    capAmount: this.state.capAmount,
                    balance: this.state.Balance,
                    checkId: this.state.checkId,
                    consultation_fee_symbol: this.state.consultation_fee_symbol,
                    consultation_status: this.state.consultation_status,
                    consultation_fees: this.state.consultation_fees,
                    clinic_image: this.state.clinic_image,
                    clinic_name: this.state.clinic_name,
                    plan_type: this.state.plan_type,
                    default_service: this.state.default_service
                  })
                }
                disabled={this.state.isCheckoutLoading}
                style={this.state.isCheckoutLoading == true ? { opacity: .5 } : null}
              >
                <View style={styles.gridBox}>
                  <View style={{ flex: 1 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '10%' }}>

                      {(!this.state.checkId && this.state.kickout == true) ? (
                        <View />
                      ) : (this.state.checkId && this.state.kickout == false) ? (
                        <View style={{
                          marginTop: '-7%',
                          marginLeft: '55%',
                          marginBottom: '-8%',
                          width: 15,
                          height: 15,
                          borderRadius: 15 / 2,
                          backgroundColor: '#f44336',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }} />
                      ) : (
                            <View />
                          )}

                      <Image
                        style={{ marginBottom: 8, width: 23, height: 35 }}
                        source={require('../../../assets/apps/payIcon.png')}
                      />
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '8.5%' }}>
                      <Text style={styles.title}>Checkout</Text>
                      {/* {

                        (this.state.kickout == true) ? (
                          this.state.isEcardLoading == false ?
                            <Text numberOfLines={3} style={styles.detail}></Text>
                            :
                            <ActivityIndicator color="#fff" size="small" />

                        ) : (
                            <View />
                          )} */}
                      {
                        this.state.isCheckoutLoading == false ?
                          <Text numberOfLines={3} style={styles.detail}></Text>
                          :
                          <ActivityIndicator color="#fff" size="small" />
                      }

                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ) : (this.state.checkId && this.state.kickout == false) ? (
              <TouchableOpacity
                onPress={() =>
                  Actions.SelectService({
                    services: this.state.services,
                    clinicid: this.state.clinicid,
                    member: this.state.member,
                    nric: this.state.nric,
                    checkId: this.state.checkId,
                    checkTime: this.state.checkTime,
                    capCurrency: this.state.capCurrency,
                    capAmount: this.state.capAmount,
                    clinic_image: this.state.clinic_image,
                    clinic_name: this.state.clinic_name,
                    consultation_fee_symbol: this.state.consultation_fee_symbol,
                    consultation_status: this.state.consultation_status,
                    consultation_fees: this.state.consultation_fees,
                    kickout: this.state.kickout,
                  })
                }
                disabled={this.state.isCheckoutLoading}
                style={this.state.isCheckoutLoading == true ? { opacity: .5 } : null}
              >
                <View style={styles.gridBox}>
                  <View style={{ flex: 1 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '10%' }}>

                      {(!this.state.checkId && this.state.kickout == true) ? (
                        <View />
                      ) : (this.state.checkId && this.state.kickout == false) ? (
                        <View style={{
                          marginTop: '-7%',
                          marginLeft: '55%',
                          marginBottom: '-8%',
                          width: 15,
                          height: 15,
                          borderRadius: 15 / 2,
                          backgroundColor: '#f44336',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }} />
                      ) : (
                            <View />
                          )}

                      <Image
                        style={{ marginBottom: 8, width: 23, height: 35 }}
                        source={require('../../../assets/apps/payIcon.png')}
                      />
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '8.5%' }}>
                      <Text style={styles.title}>Checkout</Text>
                      {/* {

                        (this.state.kickout == true) ? (
                          this.state.isEcardLoading == false ?
                            <Text numberOfLines={3} style={styles.detail}></Text>
                            :
                            <ActivityIndicator color="#fff" size="small" />

                        ) : (
                            <View />
                          )} */}
                      {
                        this.state.isCheckoutLoading == false ?
                          <Text numberOfLines={3} style={styles.detail}></Text>
                          :
                          <ActivityIndicator color="#fff" size="small" />
                      }
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ) : (
                    <TouchableOpacity
                      onPress={() =>
                        Actions.notRegister()
                      }
                      disabled={this.state.isCheckoutLoading}
                      style={this.state.isCheckoutLoading == true ? { opacity: .5 } : null}
                    >
                      <View style={styles.gridBox}>
                        <View style={{ flex: 1 }}>
                          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '10%' }}>

                            {(!this.state.checkId && this.state.kickout == true) ? (
                              <View />
                            ) : (this.state.checkId && this.state.kickout == false) ? (
                              <View style={{
                                marginTop: '-7%',
                                marginLeft: '55%',
                                marginBottom: '-8%',
                                width: 15,
                                height: 15,
                                borderRadius: 15 / 2,
                                backgroundColor: '#f44336',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }} />
                            ) : (
                                  <View />
                                )}

                            <Image
                              style={{ marginBottom: 8, width: 23, height: 35 }}
                              source={require('../../../assets/apps/payIcon.png')}
                            />
                          </View>
                          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '8.5%' }}>
                            <Text style={styles.title}>Checkout</Text>
                            {
                              this.state.isCheckoutLoading == false ?
                                <Text numberOfLines={3} style={styles.detail}></Text>
                                :
                                <ActivityIndicator color="#fff" size="small" />
                            }
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}



            {(this.state.checkId && this.state.kickout == false) ? (
              <TouchableOpacity
                onPress={() =>
                  Actions.ECardUser({
                    services: this.state.services,
                    clinicid: this.state.clinicid,
                    member: this.state.member,
                    nric: this.state.nric,
                    checkId: this.state.checkId,
                    checkTime: this.state.checkTime,
                    capCurrency: this.state.capCurrency,
                    capAmount: this.state.capAmount,
                    clinic_image: this.state.clinic_image,
                    clinic_name: this.state.clinic_name,
                    consultation_fee_symbol: this.state.consultation_fee_symbol,
                    consultation_status: this.state.consultation_status,
                    consultation_fees: this.state.consultation_fees,
                  })
                }
              >
                <View style={styles.gridBox}>
                  <View style={{ flex: 1 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '10%' }}>
                      <Image
                        style={{ marginBottom: 15, width: 26, height: 35, }}
                        source={require('../../../assets/apps/E-Card.png')}
                      />
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '2%' }}>
                      <Text style={styles.title}>E-Card</Text>
                      {
                        this.state.isEcardLoading == false ?
                          <Text numberOfLines={3} style={styles.detail}>{this.state.Full_name}</Text>
                          :
                          <ActivityIndicator color="#fff" size="small" />
                      }
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ) : (!this.state.checkId && this.state.kickout == true) ? (

              <TouchableOpacity
                onPress={() =>
                  Actions.ECardUser()
                }
              >
                <View style={styles.gridBox}>
                  <View style={{ flex: 1 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '10%' }}>
                      <Image
                        style={{ marginBottom: 15, width: 26, height: 35, }}
                        source={require('../../../assets/apps/E-Card.png')}
                      />
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '2%' }}>
                      <Text style={styles.title}>E-Card</Text>
                      {
                        this.state.isEcardLoading == false ?
                          <Text numberOfLines={3} style={styles.detail}>{this.state.Full_name}</Text>
                          :
                          <ActivityIndicator color="#fff" size="small" />
                      }
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

            ) : (

                  <TouchableOpacity
                    onPress={() =>
                      Actions.ECardUser()
                    }
                  >
                    <View style={styles.gridBox}>
                      <View style={{ flex: 1 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '10%' }}>
                          <Image
                            style={{ marginBottom: 15, width: 26, height: 35, }}
                            source={require('../../../assets/apps/E-Card.png')}
                          />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '2%' }}>
                          <Text style={styles.title}>E-Card</Text>
                          {
                            this.state.isEcardLoading == false ?
                              <Text numberOfLines={3} style={styles.detail}>{this.state.Full_name}</Text>
                              :
                              <ActivityIndicator color="#fff" size="small" />
                          }
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}

            {(this.state.checkId && this.state.kickout == false) ? (
              <TouchableOpacity
                onPress={() =>
                  Actions.Wallet({
                    services: this.state.services,
                    clinicid: this.state.clinicid,
                    member: this.state.member,
                    nric: this.state.nric,
                    checkId: this.state.checkId,
                    checkTime: this.state.checkTime,
                    capCurrency: this.state.capCurrency,
                    capAmount: this.state.capAmount,
                    clinic_image: this.state.clinic_image,
                    clinic_name: this.state.clinic_name,
                    consultation_fee_symbol: this.state.consultation_fee_symbol,
                    consultation_status: this.state.consultation_status,
                    consultation_fees: this.state.consultation_fees,
                  })
                }
              >
                <View style={styles.gridBox}>
                  <View style={{ flex: 1 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '13%' }}>
                      <Image
                        style={{
                          marginBottom: 15,
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: 30,
                          height: 30,
                        }}
                        source={require('../../../assets/apps/wallet.png')}
                      />
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '2%', width: '70%' }}>
                      <Text style={styles.title}>Wallet</Text>
                      {
                        this.state.isWalletLoading == false ?
                          <Text style={styles.detail}>{(this.state.currency) ? this.state.currency : " "} {this.state.Balance}</Text>
                          :
                          <ActivityIndicator color="#fff" size="small" />
                      }
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

            ) : (!this.state.checkId && this.state.kickout == true) ? (

              <TouchableOpacity
                onPress={() =>
                  Actions.Wallet()
                }
              >
                <View style={styles.gridBox}>
                  <View style={{ flex: 1 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '13%' }}>
                      <Image
                        style={{
                          marginBottom: 15,
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: 30,
                          height: 30,
                        }}
                        source={require('../../../assets/apps/wallet.png')}
                      />
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '2%', width: '70%' }}>
                      <Text style={styles.title}>Wallet</Text>
                      {
                        this.state.isWalletLoading == false ?
                          <Text style={styles.detail}>{(this.state.currency) ? this.state.currency : " "} {this.state.Balance}</Text>
                          :
                          <ActivityIndicator color="#fff" size="small" />
                      }
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

            ) : (

                  <TouchableOpacity
                    onPress={() =>
                      Actions.Wallet()
                    }
                  >
                    <View style={styles.gridBox}>
                      <View style={{ flex: 1 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '13%' }}>
                          <Image
                            style={{
                              marginBottom: 15,
                              justifyContent: 'center',
                              alignItems: 'center',
                              width: 30,
                              height: 30,
                            }}
                            source={require('../../../assets/apps/wallet.png')}
                          />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '2%', width: '70%' }}>
                          <Text style={styles.title}>Wallet</Text>
                          {
                            this.state.isWalletLoading == false ?
                              <Text style={styles.detail}>{(this.state.currency) ? this.state.currency : " "} {this.state.Balance}</Text>
                              :
                              <ActivityIndicator color="#fff" size="small" />
                          }
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}

          </View>
        </View>
      </View>
    );
  }
}

export default HomeContent;
