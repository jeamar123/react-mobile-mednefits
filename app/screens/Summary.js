import React, { Component } from 'react';
import { StatusBar, View, Image } from 'react-native';
import {
  Text,
} from 'native-base';
import styles from '../components/SummaryComp/styles';
import Navbar from '../components/common/NavbarGreen';
import * as Common from '../components/common';
import * as Config from '../config';

class Summary extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.warn("props: " + JSON.stringify(this.props))
    return (
      <View style={{ flex: 1, backgroundColor: '#3F9D59' }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar
          leftNav="null"
          title="Payment Successful"
          rightNav="done"
          transaction_id={this.props.result.data.transation_id}
        />

        {(this.props.result.data.half_credits_payment == false) ? (
          <View
            style={{
              alignItems: 'center',
            }}
          >
            <View
              style={{
                backgroundColor: '#fff',
                width: '90%',
                marginTop: '5%',
                height: '41%',
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
                  <Text style={styles.detailUp}>{(this.props.result.data.currency_symbol) ? this.props.result.data.currency_symbol : ""}</Text>
                  <Text style={styles.detail}>{(this.props.result.data.credits) ? this.props.result.data.credits : ""}</Text>
                </View>

                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      marginTop: 5,
                      color: '#848484',
                      fontSize: 15,
                      fontFamily: Config.FONT_FAMILY_THIN,
                    }}
                  >
                    Trans-ID: {(this.props.result.data.transation_id) ? this.props.result.data.transation_id : ""}
                  </Text>
                  <Text
                    style={{
                      marginBottom: 5,
                      color: '#848484',
                      fontSize: 15,
                      fontFamily: Config.FONT_FAMILY_THIN,
                    }}
                  >
                    Paid on: {(this.props.result.data.transaction_time) ? this.props.result.data.transaction_time : ""}
                  </Text>
                </View>

                <View
                  style={{
                    backgroundColor: '#f3f3f7',
                    width: '90%',
                    marginTop: 10,
                    height: '32%'
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
                        <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', fontSize: 18, fontWeight: 'bold', marginTop: '2%' }}>
                          {(this.props.result.data.clinic_name) ? this.props.result.data.clinic_name : ""}
                        </Text>
                        <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#848484', fontSize: 15, marginTop: '2%' }}>
                          Service : {(this.props.result.data.services) ? this.props.result.data.services : ""}
                        </Text>
                      </View>

                    </View>
                  </View>
                </View>

              </View>
            </View>

            <View style={{ backgroundColor: '#ffffff', width: '90%', marginTop: 15 }}>
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
                    <View>
                      <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#cacaca', fontSize: 18, marginTop: '2%', paddingBottom: '1%' }}>
                        Bill Details
                      </Text>
                    </View>

                  </View>
                </View>
              </View>
              <View
                style={{
                  marginLeft: '5%',
                  marginRight: '5%'
                }}>
                <View
                  style={{
                    marginTop: '5%',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#848484', }}>
                    Bill Amount
                  </Text>
                  <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', }}>
                    {(this.props.result.data.currency_symbol) ? this.props.result.data.currency_symbol : ""} {(this.props.result.data.total_payment) ? this.props.result.data.total_payment : ""}
                  </Text>
                </View>

                <View
                  style={{
                    marginTop: '5%',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#848484', }}>
                    Consultation Fee
                  </Text>
                  <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', }}>
                    {(this.props.result.data.currency_symbol) ? this.props.result.data.currency_symbol : ""} {(this.props.result.data.total_payment) ? this.props.result.data.total_payment : ""}
                  </Text>
                </View>

                <View
                  style={{
                    marginTop: '5%',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#848484', }}>
                    Total Amount
                  </Text>
                  <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', }}>
                    {(this.props.result.data.currency_symbol) ? this.props.result.data.currency_symbol : ""} {(this.props.result.data.total_payment) ? this.props.result.data.total_payment : ""}
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
                  }}
                >
                  <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#848484', }}>
                    Paid by Credits
                  </Text>
                  <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', }}>
                    {(this.props.result.data.currency_symbol) ? this.props.result.data.currency_symbol : ""} {(this.props.result.data.credits) ? this.props.result.data.credits : ""}
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
                  }}
                >
                  <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#848484', }}>
                    Paid by Cash
                  </Text>
                  <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', }}>
                    {(this.props.result.data.currency_symbol) ? this.props.result.data.currency_symbol : ""} {(this.props.result.data.cash) ? this.props.result.data.cash : ""}
                  </Text>
                </View>

              </View>
            </View>
          </View>
        ) : (
            <View
              style={{
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  backgroundColor: '#fff',
                  width: '90%',
                  marginTop: '5%',
                  height: '51%',
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
                    <Text style={styles.detailUp}>{(this.props.result.data.currency_symbol) ? this.props.result.data.currency_symbol : ""}</Text>
                    <Text style={styles.detail}>{(this.props.result.data.credits) ? this.props.result.data.credits : ""}</Text>
                  </View>

                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        marginTop: 5,
                        color: '#848484',
                        fontSize: 15,
                        fontFamily: Config.FONT_FAMILY_THIN,
                      }}
                    >
                      Trans-ID: {(this.props.result.data.transation_id) ? this.props.result.data.transation_id : ""}
                    </Text>
                    <Text
                      style={{
                        marginBottom: 5,
                        color: '#848484',
                        fontSize: 15,
                        fontFamily: Config.FONT_FAMILY_THIN,
                      }}
                    >
                      Paid on: {(this.props.result.data.transaction_time) ? this.props.result.data.transaction_time : ""}
                    </Text>
                  </View>

                  <View
                    style={{
                      backgroundColor: '#f3f3f7',
                      width: '90%',
                      marginTop: 10,
                      height: '22%'
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
                          <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', fontSize: 18, fontWeight: 'bold', marginTop: '2%' }}>
                            {(this.props.result.data.clinic_name) ? this.props.result.data.clinic_name : ""}
                          </Text>
                          <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#848484', fontSize: 15, marginTop: '2%' }}>
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
                      height: '26%'
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
                            marginBottom: 5,
                            color: '#fff',
                            fontSize: 20,
                            fontFamily: Config.FONT_FAMILY_ROMAN,
                          }}
                        >
                          Make Payment in Cash
                      </Text>
                        <View
                          style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: '3%' }}
                        >
                          <Text style={styles.detailUp2}>{(this.props.result.data.currency_symbol) ? this.props.result.data.currency_symbol : ""}</Text>
                          <Text style={styles.detail2}>{(this.props.result.data.cash) ? this.props.result.data.cash : ""}</Text>
                        </View>
                      </View>
                    </View>
                  </View>

                </View>
              </View>

              <View style={{ backgroundColor: '#ffffff', width: '90%', marginTop: 15 }}>
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
                      <View>
                        <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#cacaca', fontSize: 18, marginTop: '2%', paddingBottom: '1%' }}>
                          Bill Details
                      </Text>
                      </View>

                    </View>
                  </View>
                </View>
                <View
                  style={{
                    marginLeft: '5%',
                    marginRight: '5%'
                  }}>
                  <View
                    style={{
                      marginTop: '5%',
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#848484', }}>
                      Bill Amount
                  </Text>
                    <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', }}>
                      {(this.props.result.data.currency_symbol) ? this.props.result.data.currency_symbol : ""} {(this.props.result.data.total_payment) ? this.props.result.data.total_payment : ""}
                    </Text>
                  </View>

                  <View
                    style={{
                      marginTop: '5%',
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#848484', }}>
                      Consultation Fee
                  </Text>
                    <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', }}>
                      {(this.props.result.data.currency_symbol) ? this.props.result.data.currency_symbol : ""} {(this.props.result.data.total_payment) ? this.props.result.data.total_payment : ""}
                    </Text>
                  </View>

                  <View
                    style={{
                      marginTop: '5%',
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#848484', }}>
                      Total Amount
                  </Text>
                    <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', }}>
                      {(this.props.result.data.currency_symbol) ? this.props.result.data.currency_symbol : ""} {(this.props.result.data.total_payment) ? this.props.result.data.total_payment : ""}
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
                    }}
                  >
                    <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#848484', }}>
                      Paid by Credits
                  </Text>
                    <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', }}>
                      {(this.props.result.data.currency_symbol) ? this.props.result.data.currency_symbol : ""} {(this.props.result.data.credits) ? this.props.result.data.credits : ""}
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
                    }}
                  >
                    <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#848484', }}>
                      Paid by Cash
                  </Text>
                    <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', }}>
                      {(this.props.result.data.currency_symbol) ? this.props.result.data.currency_symbol : ""} {(this.props.result.data.cash) ? this.props.result.data.cash : ""}
                    </Text>
                  </View>

                </View>
              </View>
            </View>
          )}

      </View>
    );
  }
}
export default Summary;
