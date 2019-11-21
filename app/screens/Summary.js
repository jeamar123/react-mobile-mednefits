import React, { Component } from 'react';
import { StatusBar, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from 'native-base';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import styles from '../components/SummaryComp/styles';
import Navbar from '../components/common/NavbarGreen';
import * as Common from '../components/common';
import * as Config from '../config';
import RF from 'react-native-responsive-fontsize';
import moment from 'moment';

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      currency_symbol: this.props.result.data.currency_symbol,

      paid_by_cash: (Number( this.props.result.data.paid_by_cash )).toLocaleString(undefined, { 'minimumFractionDigits': 2, 'maximumFractionDigits': 2 }),
      paid_by_credits: (Number( this.props.result.data.paid_by_credits )).toLocaleString(undefined, { 'minimumFractionDigits': 2, 'maximumFractionDigits': 2 }) ,
      bill_amount: (Number( this.props.result.data.bill_amount )).toLocaleString(undefined, { 'minimumFractionDigits': 2, 'maximumFractionDigits': 2 }) ,
      consultation_fees: (Number( this.props.result.data.consultation_fees )).toLocaleString(undefined, { 'minimumFractionDigits': 2, 'maximumFractionDigits': 2 }) ,
      total_amount: (Number( this.props.result.data.total_amount )).toLocaleString(undefined, { 'minimumFractionDigits': 2, 'maximumFractionDigits': 2 }) , 
      
      paid_by_cash_sgd: ( this.props.result.data.currency_symbol == 'SGD' ) ? this.props.result.data.paid_by_cash : this.props.result.data.paid_by_cash / 3,
      paid_by_credits_sgd: ( this.props.result.data.currency_symbol == 'SGD' ) ? this.props.result.data.paid_by_credits : this.props.result.data.paid_by_credits / 3,
      bill_amount_sgd: ( this.props.result.data.currency_symbol == 'SGD' ) ? this.props.result.data.bill_amount : this.props.result.data.bill_amount / 3,
      consultation_fees_sgd: ( this.props.result.data.currency_symbol == 'SGD' ) ? this.props.result.data.consultation_fees : this.props.result.data.consultation_fees / 3,
      total_amount_sgd: ( this.props.result.data.currency_symbol == 'SGD' ) ? this.props.result.data.total_amount : this.props.result.data.total_amount / 3,

      paid_by_cash_myr: ( this.props.result.data.currency_symbol == 'MYR' ) ? this.props.result.data.paid_by_cash : this.props.result.data.paid_by_cash * 3,
      paid_by_credits_myr: ( this.props.result.data.currency_symbol == 'MYR' ) ? this.props.result.data.paid_by_credits : this.props.result.data.paid_by_credits * 3,
      bill_amount_myr: ( this.props.result.data.currency_symbol == 'MYR' ) ? this.props.result.data.bill_amount : this.props.result.data.bill_amount * 3,
      consultation_fees_myr: ( this.props.result.data.currency_symbol == 'MYR' ) ? this.props.result.data.consultation_fees : this.props.result.data.consultation_fees * 3,
      total_amount_myr: ( this.props.result.data.currency_symbol == 'MYR' ) ? this.props.result.data.total_amount : this.props.result.data.total_amount * 3,

      malaysia_exchange_rate: '3.00',
      convert_option: this.props.result.data.convert_option,
      transaction_time: moment( this.props.result.data.transaction_time,'MM-DD-YYYY hh:mm a').format('DD/MM/YYYY hh:mm a'),
    };
    console.log( this.props );
    console.log( this.state );
  }

  detailPaymentOpened(data) {
    let toggleID = 'toggleID';
    let id = 'detailPayment';

    if (this.state.isActive == true) {
      // close menu
      this.state.isActive = false;
      this.refs[id].setNativeProps({
        display: 'none',
      });
      this.refs[toggleID].setNativeProps({
        transform: [{ rotate: '0deg' }],
      });
    } else {
      //show menu
      this.state.isActive = true;
      this.refs[id].setNativeProps({
        display: 'flex',
      });

      this.refs[toggleID].setNativeProps({
        transform: [{ rotate: '180deg' }],
      });
    }
  }

  toggleCurrency(){
    if( this.state.currency_symbol == 'SGD' ){
      this.setState({
        currency_symbol: 'MYR',
        paid_by_cash: (Number( this.state.paid_by_cash_myr )).toLocaleString(undefined, { 'minimumFractionDigits': 2, 'maximumFractionDigits': 2 }),
        paid_by_credits: (Number( this.state.paid_by_credits_myr )).toLocaleString(undefined, { 'minimumFractionDigits': 2, 'maximumFractionDigits': 2 }),
        bill_amount: (Number( this.state.bill_amount_myr )).toLocaleString(undefined, { 'minimumFractionDigits': 2, 'maximumFractionDigits': 2 }),
        consultation_fees: (Number( this.state.consultation_fees_myr )).toLocaleString(undefined, { 'minimumFractionDigits': 2, 'maximumFractionDigits': 2 }),
        total_amount: (Number( this.state.total_amount_myr )).toLocaleString(undefined, { 'minimumFractionDigits': 2, 'maximumFractionDigits': 2 }),
      });
    }else{
      this.setState({
        currency_symbol: 'SGD',
        paid_by_cash: (Number( this.state.paid_by_cash_sgd )).toLocaleString(undefined, { 'minimumFractionDigits': 2, 'maximumFractionDigits': 2 }),
        paid_by_credits: (Number( this.state.paid_by_credits_sgd )).toLocaleString(undefined, { 'minimumFractionDigits': 2, 'maximumFractionDigits': 2 }),
        bill_amount: (Number( this.state.bill_amount_sgd )).toLocaleString(undefined, { 'minimumFractionDigits': 2, 'maximumFractionDigits': 2 }),
        consultation_fees: (Number( this.state.consultation_fees_sgd )).toLocaleString(undefined, { 'minimumFractionDigits': 2, 'maximumFractionDigits': 2 }),
        total_amount: (Number( this.state.total_amount_sgd )).toLocaleString(undefined, { 'minimumFractionDigits': 2, 'maximumFractionDigits': 2 }),
      });
    }
    console.log( this.state );
  }

  render() {
    // console.warn("props: " + JSON.stringify(this.props))

    return (
      <View style={{ flex: 1, backgroundColor: '#3F9D59' }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar
          leftNav="null"
          title="Payment Successful"
          rightNav="done"
          transaction_id={this.props.result.data.transation_id}
        />
        <ScrollView showsVerticalScrollIndicator={false} >
          {(this.props.result.data.half_credits_payment == false) ? (
            <View
              style={{
                alignItems: 'center',
                marginBottom: 100,
              }}
            >
              <View
                style={{
                  backgroundColor: '#fff',
                  width: '90%',
                  marginTop: responsiveHeight(5),
                  height: responsiveHeight(35),
                  borderRadius: 5
                }}
              >
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>

                  <Image
                    source={require('../../assets/apps/CheckIn2.png')}
                    style={{ height: 30, resizeMode: 'contain', width: 30, marginBottom: 5, marginTop: 15 }}
                  />

                  <View
                    style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: '3%' }}
                  >
                    <Text style={styles.detailUp}>{ this.state.currency_symbol }</Text>
                    <Text style={styles.detail}>{(this.state.paid_by_credits) ? this.state.paid_by_credits : ""}</Text>
                  </View>

                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        marginTop: 5,
                        marginBottom: responsiveHeight(0.5),
                        color: '#848484',
                        fontSize: RF(1.7),
                        fontFamily: Config.FONT_FAMILY_ROMAN,
                      }}
                    >
                      Trans-ID: {(this.props.result.data.transation_id) ? this.props.result.data.transation_id : ""}
                    </Text>
                    <Text
                      style={{
                        marginBottom: responsiveHeight(1),
                        color: '#848484',
                        fontSize: RF(1.7),
                        fontFamily: Config.FONT_FAMILY_ROMAN,
                      }}
                    >
                      Paid on: {(this.state.transaction_time) ? (this.state.transaction_time).toUpperCase() : ""}
                    </Text>
                  </View>

                  <View
                    style={{
                      backgroundColor: '#f3f3f7',
                      width: '90%',
                      marginTop: responsiveHeight(1),
                      height: responsiveHeight(10.2)
                    }}
                  >
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginTop: '2%',
                          marginLeft: '5%',
                          marginRight: '5%'
                        }}
                      >
                        <Image
                          source={{ uri: this.props.clinic_image }}
                          style={{ height: 50, resizeMode: 'center', width: 50, marginRight: '4%' }}
                        />
                        <View
                          style={{
                            width: responsiveWidth(52.5),
                            marginRight: responsiveWidth(2),
                          }}>
                          <Text
                            style={{
                              fontFamily: Config.FONT_FAMILY_ROMAN,
                              color: '#2C3E50',
                              fontSize: RF(1.8),
                              fontWeight: 'bold'
                            }}
                            numberOfLines={3}
                          >
                            {(this.props.result.data.clinic_name) ? this.props.result.data.clinic_name : ""}
                          </Text>
                          <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#848484', fontSize: RF(1.5), marginTop: '2%' }} numberOfLines={3}>
                            Service : {(this.props.result.data.services) ? this.props.result.data.services : ""}
                          </Text>
                        </View>

                      </View>
                    </View>
                  </View>

                </View>
              </View>

              <View style={{ marginTop: responsiveHeight(2) }}>
                <TouchableOpacity
                  onPress={() => this.detailPaymentOpened(data.number)}
                  style={{
                    backgroundColor: "#3F9D59",
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                    borderColor: '#fff',
                    borderWidth: 1,
                    paddingRight: '32.5%',
                    paddingLeft: '32.5%'
                  }}
                >
                  <Common.Texti
                    fontSize={RF(2.0)}
                    fontColor={"#ffffff"}
                    style={{
                      paddingTop: 10,
                      paddingBottom: 10,
                    }}>
                    View Details
                  </Common.Texti>
                  <View ref={'toggleID'}>
                  </View>
                </TouchableOpacity>
              </View>

              <View
                ref={'detailPayment'}
                style={{ backgroundColor: '#ffffff', width: '90%', marginTop: responsiveHeight(-6.3), display: "none" }}>
                <View
                  style={{
                    backgroundColor: '#f8f8fa',
                    width: '100%',
                  }}
                >
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingTop: '1%',
                        paddingBottom: '5%',
                        marginLeft: '5%',
                        marginRight: '5%'
                      }}
                    >
                      <View style={{ flex: 1, }}>
                        <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#cacaca', fontSize: RF(2.0), marginTop: responsiveHeight(-1) }}>
                          Bill Details
                        </Text>
                      </View>
                      <View
                        style={{
                          justifyContent: 'flex-end',
                          textAlign: 'right',
                          alignItems: 'flex-end',
                          flex: 1,
                        }}
                      >
                        { this.state.convert_option == true ? 
                          <TouchableOpacity
                            onPress={() => this.toggleCurrency()}
                            style={{
                              justifyContent: 'flex-end',
                              textAlign: 'right',
                              alignItems: 'flex-end',
                            }}
                          >
                            <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#3593CF', fontSize: RF(2.0), marginTop: responsiveHeight(-1), justifyContent: 'flex-end', textAlign: 'right', alignItems: 'flex-end', }}>
                              Click to View in { this.state.currency_symbol == 'MYR' ? 'SGD' : 'MYR' }
                            </Text>
                          </TouchableOpacity>
                          :
                          null
                        }
                      </View>

                    </View>
                  </View>
                </View>
                <View>
                  <View
                    style={{
                      marginTop: responsiveHeight(1.5),
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      marginLeft: '5%',
                      marginRight: '5%'
                    }}
                  >
                    <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#848484', fontSize: RF(2.0), }}>
                      Bill Amount
                    </Text>
                    <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', fontSize: RF(2.0), }}>
                      { this.state.currency_symbol } {(this.state.bill_amount) ? this.state.bill_amount : ""}
                    </Text>
                  </View>

                  <View
                    style={{
                      marginTop: '5%',
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      marginLeft: '5%',
                      marginRight: '5%'
                    }}
                  >
                    <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#848484', fontSize: RF(2.0), }}>
                      Consultation Fee
                    </Text>
                    <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', fontSize: RF(2.0), }}>
                      { this.state.currency_symbol } {(this.state.consultation_fees) ? this.state.consultation_fees : ""}
                    </Text>
                  </View>

                  <View
                    style={{
                      marginTop: '5%',
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      marginLeft: '5%',
                      marginRight: '5%'
                    }}
                  >
                    <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#848484', fontSize: RF(2.0), }}>
                      Total Amount
                    </Text>
                    <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', fontSize: RF(2.0), }}>
                      { this.state.currency_symbol } {(this.state.total_amount) ? this.state.total_amount : ""}
                    </Text>
                  </View>

                  <View>
                    <Common.Divider />
                  </View>
                  <View
                    style={{
                      marginTop: '2%',
                      marginBottom: '2%',
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      marginLeft: '5%',
                      marginRight: '5%'
                    }}
                  >
                    <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#848484', fontSize: RF(2.0), }}>
                      Paid by Credits
                    </Text>
                    <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', fontSize: RF(2.0), }}>
                      { this.state.currency_symbol } {(this.state.paid_by_credits) ? this.state.paid_by_credits : ""}
                    </Text>
                  </View>
                  <View>
                    <Common.Divider />
                  </View>
                  <View
                    style={{
                      marginTop: '2%',
                      marginBottom: '5%',
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      marginLeft: '5%',
                      marginRight: '5%'
                    }}
                  >
                    <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#848484', fontSize: RF(2.0), }}>
                      Paid by Cash
                    </Text>
                    <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', fontSize: RF(2.0), }}>
                      { this.state.currency_symbol } {(this.state.paid_by_cash) ? this.state.paid_by_cash : ""}
                    </Text>
                  </View>
                  { this.state.convert_option == true ? 
                    <View>
                      <View>
                        <Common.Divider />
                      </View>
                      <View
                        style={{
                          marginTop: '2%',
                          marginBottom: '5%',
                          flexDirection: 'row',
                          alignItems: 'flex-start',
                          justifyContent: 'space-between',
                          marginLeft: '5%',
                          marginRight: '5%'
                        }}
                      >
                        <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#848484', fontSize: RF(2.0), }}>
                          Exchange Rate
                        </Text>
                        <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', fontSize: RF(2.0), }}>
                          3.00
                        </Text>
                      </View>
                    </View>
                    : null
                  }
                </View>
              </View>
            </View>
          ) : (
              <View
                style={{
                  alignItems: 'center',
                  marginBottom: 100
                }}
              >
                <View
                  style={{
                    backgroundColor: '#fff',
                    width: '90%',
                    marginTop: responsiveHeight(5),
                    // height: responsiveHeight(45),
                    borderRadius: 5,
                    paddingBottom: 15
                  }}
                >
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>

                    <Image
                      source={require('../../assets/apps/CheckIn2.png')}
                      style={{ height: 30, resizeMode: 'contain', width: 30, marginBottom: 5, marginTop: 15 }}
                    />

                    <View
                      style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: '3%' }}
                    >
                      <Text style={styles.detailUp}>{ this.state.currency_symbol }</Text>
                      <Text style={styles.detail}>{(this.state.paid_by_credits) ? this.state.paid_by_credits : ""}</Text>
                    </View>

                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          marginTop: 5,
                          marginBottom: responsiveHeight(0.5),
                          color: '#848484',
                          fontSize: RF(1.7),
                          fontFamily: Config.FONT_FAMILY_ROMAN,
                        }}
                      >
                        Trans-ID: {(this.props.result.data.transation_id) ? this.props.result.data.transation_id : ""}
                      </Text>
                      <Text
                        style={{
                          marginBottom: responsiveHeight(1),
                          color: '#848484',
                          fontSize: RF(1.7),
                          fontFamily: Config.FONT_FAMILY_ROMAN,
                        }}
                      >
                        Paid on: {(this.state.transaction_time) ? (this.state.transaction_time).toUpperCase() : ""}
                      </Text>
                    </View>

                    <View
                      style={{
                        backgroundColor: '#f3f3f7',
                        width: '90%',
                        marginTop: responsiveHeight(1),
                        height: responsiveHeight(10)
                      }}
                    >
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'flex-start',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: '2%',
                            marginLeft: '5%',
                            marginRight: '5%'
                          }}
                        >
                          <Image
                            source={{ uri: this.props.clinic_image }}
                            style={{ height: 50, resizeMode: 'center', width: 50, marginRight: '4%' }}
                          />
                          <View>
                            <Text
                              style={{
                                fontFamily: Config.FONT_FAMILY_ROMAN,
                                color: '#2C3E50',
                                fontSize: RF(2.0),
                                fontWeight: 'bold',
                                width: responsiveWidth(50),
                                marginRight: responsiveWidth(5),
                              }}
                              numberOfLines={3}
                            >
                              {(this.props.result.data.clinic_name) ? this.props.result.data.clinic_name : ""}
                            </Text>
                            <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#848484', fontSize: RF(1.6), marginTop: '2%' }} numberOfLines={3}>
                              Service : {(this.props.result.data.services) ? this.props.result.data.services : ""}
                            </Text>
                          </View>

                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        backgroundColor: '#FF5757',
                        width: '90%',
                        marginTop: 10,
                        height: responsiveHeight(10),
                        paddingBottom: 10
                      }}
                    >
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              marginTop: 10,
                              color: '#fff',
                              fontSize: RF(2.2),
                              fontFamily: Config.FONT_FAMILY_ROMAN,
                            }}
                          >
                            Make Payment in Cash
                          </Text>
                          <View
                            style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: responsiveHeight(0.5) }}
                          >
                            <Text style={styles.detailUp2}>{ this.state.currency_symbol }</Text>
                            <Text style={styles.detail2}>{(this.state.paid_by_cash) ? this.state.paid_by_cash : ""}</Text>
                          </View>
                        </View>
                      </View>
                    </View>

                  </View>
                </View>

                <View style={{ marginTop: responsiveHeight(2) }}>
                  <TouchableOpacity
                    onPress={() => this.detailPaymentOpened(data.number)}
                    style={{
                      backgroundColor: "#3F9D59",
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                      borderColor: '#fff',
                      borderWidth: 1,
                      paddingRight: '32.5%',
                      paddingLeft: '32.5%'
                    }}
                  >
                    <Common.Texti
                      fontSize={RF(2.0)}
                      fontColor={"#ffffff"}
                      style={{
                        paddingTop: 10,
                        paddingBottom: 10,
                      }}>
                      View Details
                    </Common.Texti>
                    <View ref={'toggleID'}>
                    </View>
                  </TouchableOpacity>
                </View>

                <View
                  ref={'detailPayment'}
                  style={{ backgroundColor: '#ffffff', width: '90%', marginTop: responsiveHeight(-6.3), display: "none" }}>
                  <View
                    style={{
                      backgroundColor: '#f8f8fa',
                      width: '100%',
                    }}
                  >
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingTop: '1%',
                          paddingBottom: '5%',
                          marginLeft: '5%',
                          marginRight: '5%'
                        }}
                      >
                        <View style={{ flex: 1, }}>
                          <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#cacaca', fontSize: RF(2.0), marginTop: responsiveHeight(-1) }}>
                            Bill Details
                          </Text>
                        </View>
                        <View
                          style={{
                            justifyContent: 'flex-end',
                            textAlign: 'right',
                            alignItems: 'flex-end',
                            flex: 1,
                          }}
                        >
                        { this.state.convert_option == true ? 
                            <TouchableOpacity
                              onPress={() => this.toggleCurrency()}
                              style={{
                                justifyContent: 'flex-end',
                                textAlign: 'right',
                                alignItems: 'flex-end',
                              }}
                            >
                              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#3593CF', fontSize: RF(2.0), marginTop: responsiveHeight(-1), justifyContent: 'flex-end', textAlign: 'right', alignItems: 'flex-end', }}>
                                Click to View in { this.state.currency_symbol == 'MYR' ? 'SGD' : 'MYR'  }
                              </Text>
                            </TouchableOpacity>
                            :
                            null
                          }
                        </View>

                      </View>
                    </View>
                  </View>
                  <View>
                    <View
                      style={{
                        marginTop: responsiveHeight(2),
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        marginLeft: '5%',
                        marginRight: '5%'
                      }}
                    >
                      <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#848484', fontSize: RF(2.0), }}>
                        Bill Amount
                      </Text>
                      <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', fontSize: RF(2.0), }}>
                        { this.state.currency_symbol } {(this.state.bill_amount) ? this.state.bill_amount : ""}
                      </Text>
                    </View>

                    <View
                      style={{
                        marginTop: '5%',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        marginLeft: '5%',
                        marginRight: '5%'
                      }}
                    >
                      <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#848484', fontSize: RF(2.0), }}>
                        Consultation Fee
                      </Text>
                      <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', fontSize: RF(2.0), }}>
                        { this.state.currency_symbol } {(this.state.consultation_fees) ? this.state.consultation_fees : ""}
                      </Text>
                    </View>

                    <View
                      style={{
                        marginTop: '5%',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        marginLeft: '5%',
                        marginRight: '5%'
                      }}
                    >
                      <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#848484', fontSize: RF(2.0), }}>
                        Total Amount
                      </Text>
                      <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', fontSize: RF(2.0), }}>
                        { this.state.currency_symbol } {(this.state.total_amount) ? this.state.total_amount : ""}
                      </Text>
                    </View>

                    <View>
                      <Common.Divider />
                    </View>
                    <View
                      style={{
                        marginTop: '2%',
                        marginBottom: '2%',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        marginLeft: '5%',
                        marginRight: '5%'
                      }}
                    >
                      <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#848484', fontSize: RF(2.0), }}>
                        Paid by Credits
                      </Text>
                      <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', fontSize: RF(2.0), }}>
                        { this.state.currency_symbol } {(this.state.paid_by_credits) ? this.state.paid_by_credits : ""}
                      </Text>
                    </View>
                    <View>
                      <Common.Divider />
                    </View>
                    <View
                      style={{
                        marginTop: '2%',
                        marginBottom: '5%',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        marginLeft: '5%',
                        marginRight: '5%'
                      }}
                    >
                      <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#848484', fontSize: RF(2.0), }}>
                        Paid by Cash
                      </Text>
                      <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', fontSize: RF(2.0), }}>
                        { this.state.currency_symbol } {(this.state.paid_by_cash) ? this.state.paid_by_cash : ""}
                      </Text>
                    </View>
                    { this.state.convert_option == true ? 
                      <View>
                        <View>
                          <Common.Divider />
                        </View>
                        <View
                          style={{
                            marginTop: '2%',
                            marginBottom: '5%',
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                            marginLeft: '5%',
                            marginRight: '5%'
                          }}
                        >
                          <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#848484', fontSize: RF(2.0), }}>
                            Exchange Rate
                          </Text>
                          <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', fontSize: RF(2.0), }}>
                            3.00
                          </Text>
                        </View>
                      </View>
                      : null
                    }

                  </View>
                </View>
              </View>
            )}
        </ScrollView>
      </View>
    );
  }
}
export default Summary;
