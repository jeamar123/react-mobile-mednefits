import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import * as Core from '../../core';
import Icons from 'react-native-vector-icons/FontAwesome';
import RF from "react-native-responsive-fontsize";
import * as Common from '../common'

class HomeContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Balance: '0',
      Full_name: '',
      currency: false,
      isClearSearch: false,
      isLoadingSearch: false
    };
  }

  async componentWillMount() {
    await this.getUserDetail();
    await this.getUserBalance();
  }

  async getUserBalance() {
    // console.log('in progress fetching getUserBalance')
    await Core.GetBalance(async (error, result) => {
      // console.log('fetching done for getUserBalance');
      data =
        await typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      await this.setState({
        Balance: data.balance,
        currency: result.data.currency_symbol
      });
    });
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

  async getUserDetail() {
    console.log('in progress fetching getUserDetail')
    await Core.UserDetail(async (error, result) => {
      console.log('fetching done for getUserDetail');
      data =
        await typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      console.warn(data);
      await this.setState({
        Full_name: data.profile.full_name,
      });
    });
  }

  render() {
    console.warn("props: " + JSON.stringify(this.props, null, 4))
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
            {(this.props.check_Id) ? (
              <TouchableOpacity
                onPress={() =>
                  Actions.cancelVisit({
                    services: this.props.Services,
                    clinicid: this.props.clinic_Id,
                    member: this.props.member,
                    nric: this.props.nric,
                    checkId: this.props.check_Id,
                    checkTime: this.props.checkTime,
                    capCurrency: this.props.capCurrency,
                    capAmount: this.props.capAmount,
                    clinic_image: this.props.clinic_image,
                    clinic_name: this.props.clinic_name,
                    consultation_fee_symbol: this.props.consultation_fee_symbol,
                    consultation_status: this.props.consultation_status,
                    consultation_fees: this.props.consultation_fees
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
                    <Text style={styles.detail}>In-Network</Text> */}
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
                    <Text style={styles.detail}>In-Network</Text> */}
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}

            <TouchableOpacity
              onPress={() =>
                Actions.SelectService({
                  services: this.props.Services,
                  clinicid: this.props.clinic_Id,
                  member: this.props.member,
                  nric: this.props.nric,
                  checkId: this.props.check_Id,
                  checkTime: this.props.checkTime,
                  capCurrency: this.props.capCurrency,
                  capAmount: this.props.capAmount,
                  consultation_fee_symbol: this.props.consultation_fee_symbol,
                  consultation_status: this.props.consultation_status,
                  consultation_fees: this.props.consultation_fees,
                  clinic_image: this.props.clinic_image,
                  clinic_name: this.props.clinic_name,
                })
              }
            >
              <View style={styles.gridBox}>
                <View style={{ flex: 1 }}>
                  <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '10%' }}>

                    {(this.props.check_Id) ? (
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
                      }}>
                      </View>
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
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Actions.ECardUser({
                  services: this.props.Services,
                  clinicid: this.props.clinic_Id,
                  member: this.props.member,
                  nric: this.props.nric,
                  checkId: this.props.check_Id,
                  checkTime: this.props.checkTime,
                  capCurrency: this.props.capCurrency,
                  capAmount: this.props.capAmount,
                  clinic_image: this.props.clinic_image,
                  clinic_name: this.props.clinic_name,
                  consultation_fee_symbol: this.props.consultation_fee_symbol,
                  consultation_status: this.props.consultation_status,
                  consultation_fees: this.props.consultation_fees
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
                    <Text numberOfLines={3} style={styles.detail}>{this.state.Full_name}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Actions.Wallet({
                  services: this.props.Services,
                  clinicid: this.props.clinic_Id,
                  member: this.props.member,
                  nric: this.props.nric,
                  checkId: this.props.check_Id,
                  checkTime: this.props.checkTime,
                  capCurrency: this.props.capCurrency,
                  capAmount: this.props.capAmount,
                  clinic_image: this.props.clinic_image,
                  clinic_name: this.props.clinic_name,
                  consultation_fee_symbol: this.props.consultation_fee_symbol,
                  consultation_status: this.props.consultation_status,
                  consultation_fees: this.props.consultation_fees
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
                    <Text style={styles.detail}>{(this.state.currency) ? this.state.currency : " "} {this.state.Balance}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default HomeContent;
