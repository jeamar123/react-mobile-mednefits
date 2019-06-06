import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import styles from './styles';
import * as Core from '../../core';
import * as Config from '../../config';
import RF from "react-native-responsive-fontsize";

class HistoryUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Balance: '0',
      Full_name: '',
    };
  }

  componentWillMount() {
    // this.getUserDetail();
  }

  getUserDetail() {
    Core.UserDetail((error, result) => {
      data =
        typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      console.warn(data);
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
              height: responsiveHeight(36),
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
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#949494', fontSize: RF(1.9) }}>
                Total Amount
              </Text>
              <View
                style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: responsiveHeight(1) }}
              >
                <Text style={{
                  fontFamily: Config.FONT_FAMILY_ROMAN,
                  fontSize: RF(1.9),
                  lineHeight: 20,
                  color: '#2c3e50',
                  marginRight: responsiveWidth(1),
                  marginTop: responsiveHeight(0.5)
                }}>
                  {this.props.Currency ? this.props.Currency : ' '}
                </Text>
                <Text style={{
                  fontFamily: Config.FONT_FAMILY_BOLD,
                  fontSize: RF(3.8),
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
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#949494', fontSize: RF(1.9) }}>
                Transaction ID
              </Text>
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', fontSize: RF(1.9) }}>
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
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#949494', fontSize: RF(1.9) }}>
                Transaction Time
                </Text>
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', fontSize: RF(1.9) }}>
                {this.props.date_of_transaction ? this.props.date_of_transaction.toUpperCase() : ' '}
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
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#949494', fontSize: RF(1.9) }}>
                Member
              </Text>
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', fontSize: RF(1.9) }}>
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
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#949494', fontSize: RF(1.9) }}>
                Cap
              </Text>
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', fontSize: RF(1.9) }}>
                {(this.props.cap_per_visit === 0) ? 'Not applicable' : this.props.cap_per_visit}
              </Text>
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: '#f3f3f7',
                  width: '90%',
                  height: responsiveHeight(9.5),
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
                      marginTop: responsiveHeight(1),
                      marginLeft: '5%',
                      marginRight: '5%'
                    }}
                  >
                    <Image
                      source={{ uri: this.props.clinicimage }}
                      style={{ height: 50, resizeMode: 'center', width: 50, marginRight: '4%' }}
                    />
                    <View>
                      <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', fontSize: RF(2.1), fontWeight: 'bold', marginTop: '2%' }}>
                        {(this.props.clinicname) ? this.props.clinicname : ""}
                      </Text>
                      <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#848484', fontSize: RF(1.9), marginTop: '2%' }}>
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
