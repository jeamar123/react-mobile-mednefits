import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import styles from './styles';
import * as Core from '../../core';
import * as Config from '../../config';
import RF from "react-native-responsive-fontsize";
import moment from 'moment';

class HistoryUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Balance: '0',
      Full_name: '',
    };
    console.log( this.props );
  }

  UNSAFE_componentWillMount() {
    // this.getUserDetail();
  }

  getUserDetail() {
    Core.UserDetail((error, result) => {
      data =
        typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      this.setState({
        Full_name: data.profile.full_name,
      });
    });
  }

  render() {
    return (
      <View>
        <View style={styles.sectionHeader}>
          <View
            style={{
              backgroundColor: '#fff',
              width: '90%',
              height: responsiveHeight(42),
              borderRadius: 5
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: responsiveHeight(1),
                marginLeft: '5%',
                marginRight: '5%'
              }}
            >
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#949494', fontSize: RF(1.8) }}>
                Total Amount
              </Text>
              <View
                style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: responsiveHeight(1) }}
              >
                <Text style={{
                  fontFamily: Config.FONT_FAMILY_ROMAN,
                  fontSize: RF(1.8),
                  lineHeight: 20,
                  color: '#2c3e50',
                  marginRight: responsiveWidth(1),
                  marginTop: responsiveHeight(0.5)
                }}>
                  {this.props.Currency ? this.props.Currency : ' '}
                </Text>
                <Text style={{
                  fontFamily: Config.FONT_FAMILY_BOLD,
                  fontSize: RF(4.1),
                  lineHeight: 38,
                  color: '#2c3e50',
                  fontWeight: 'bold',
                }}>
                  {this.props.Amount}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: responsiveHeight(1),
                marginBottom: responsiveHeight(1),
                marginLeft: '5%',
                marginRight: '5%'
              }}
            >
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#949494', fontSize: RF(1.8) }}>
                Transaction ID
              </Text>
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', fontSize: RF(1.8) }}>
                {this.props.transaction_id ? this.props.transaction_id : ' '}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: responsiveHeight(1),
                marginBottom: responsiveHeight(1),
                marginLeft: '5%',
                marginRight: '5%'
              }}
            >
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#949494', fontSize: RF(1.8) }}>
                Transaction Time
              </Text>
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', fontSize: RF(1.8) }}>
                {this.props.date_of_transaction ? ( moment( this.props.date_of_transaction, 'DD-MM-YYYY, hh:mm a' ).format('DD/MM/YYYY hh:mm a') ).toUpperCase() : ' '}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: responsiveHeight(1),
                marginBottom: responsiveHeight(1),
                marginLeft: '5%',
                marginRight: '5%'
              }}
            >
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#949494', fontSize: RF(1.8) }}>
                Member
              </Text>
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', fontSize: RF(1.8) }}>
                {this.props.customer ? this.props.customer : ' '}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: responsiveHeight(1),
                marginBottom: responsiveHeight(1.5),
                marginLeft: '5%',
                marginRight: '5%'
              }}
            >
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#949494', fontSize: RF(1.8) }}>
                Cap
              </Text>
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', fontSize: RF(1.8) }}>
                {(this.props.cap_transaction == false) ? '' : this.props.Currency} {(this.props.cap_transaction == false) ? 'Not applicable' : Number(this.props.cap_per_visit).toFixed(2)}
              </Text>
            </View>
            { this.props.convert_option == true ? 
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: responsiveHeight(1),
                  marginBottom: responsiveHeight(1.5),
                  marginLeft: '5%',
                  marginRight: '5%'
                }}
              >
                <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#949494', fontSize: RF(1.8) }}>
                  Exchange Rate
                </Text>
                <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', fontSize: RF(1.8) }}>
                  {this.props.malaysia_exchange_rate}
                </Text>
              </View>
              :
              null
            }

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: '#f3f3f7',
                  width: '90%',
                  height: responsiveHeight(10),
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
                      marginLeft: '5%',
                      marginRight: '5%',
                      marginBottom: responsiveHeight(1),
                      marginTop: responsiveHeight(1.5)
                    }}
                  >
                    <Image
                      source={{ uri: this.props.clinicimage }}
                      style={{ height: 50, resizeMode: 'center', width: 50, marginRight: '4%' }}
                    />
                  <View style={{width: '80%', flexWrap: 'wrap'}}>
                      <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', fontSize: RF(1.9), fontWeight: 'bold', marginTop: '2%' }}>
                        {(this.props.clinicname) ? this.props.clinicname : ""}
                      </Text>
                      <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#848484', fontSize: RF(1.6), marginTop: '2%' }}>
                        Service : {(this.props.services) ? this.props.services : ""}
                      </Text>
                    </View>

                  </View>
                </View>
              </View>
            </View>

          </View>
        </View>
      </View>
    );
  }
}

export default HistoryUser;
