import React, { Component } from 'react';
import { StatusBar, View, Image } from 'react-native';
import {
  Container,
  Content,
  Text,
} from 'native-base';
import { SummaryComp } from '../components/SummaryComp';
import styles from '../components/SummaryComp/styles';
import Navbar from '../components/common/NavbarGrey';
import * as Common from '../components/common';
import * as Config from '../config';

class Summary extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#efeff4' }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar
          leftNav="null"
          title="Summary"
          subtitle="In-Network"
          rightNav="done"
        />
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: '#3F9D59',
              width: '90%',
              marginTop: 10,
              height: '45%'
            }}
          >
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>

              <Image
                source={require('../../assets/apps/CheckIn.png')}
                style={{ height: 50, resizeMode: 'contain', width: 50, marginBottom: 10, marginTop: 20 }}
              />

              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    marginTop: 5,
                    marginBottom: 5,
                    color: '#fff',
                    fontSize: 20,
                    fontFamily: Config.FONT_FAMILY_ROMAN,
                  }}
                >
                  Paid by Credits: Successful
                </Text>
                <Text
                  style={{
                    marginTop: 5,
                    marginBottom: 5,
                    color: '#fff',
                    fontSize: 15,
                    fontFamily: Config.FONT_FAMILY_ROMAN,
                  }}
                >
                  {(this.props.result.data.clinic_name) ? this.props.result.data.clinic_name : ""}
                </Text>
              </View>
              <View
                style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: '3%' }}
              >
                <Text style={styles.detailUp}>{(this.props.result.data.currency_symbol) ? this.props.result.data.currency_symbol : ""}</Text>
                <Text style={styles.detail}>{(this.props.result.data.amount) ? this.props.result.data.amount : ""}</Text>
              </View>
            </View>
          </View>

          <View style={{ backgroundColor: '#fff', width: '90%', marginTop: 10 }}>
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
                <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#bdbdbd', }}>
                  Total Payment
                </Text>
                <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', }}>
                  {(this.props.result.data.currency_symbol) ? this.props.result.data.currency_symbol : ""} {(this.props.result.data.amount) ? this.props.result.data.amount : ""}
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
                <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#bdbdbd', }}>
                  Service
                </Text>
                <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#bdbdbd', }}>
                  {(this.props.result.data.services) ? this.props.result.data.services : ""}
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
                <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#bdbdbd', width: '30%' }}>
                  Transaction Time
                </Text>
                <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#bdbdbd', }}>
                  {(this.props.result.data.transaction_time) ? this.props.result.data.transaction_time : ""}
                </Text>
              </View>

              <View
                style={{
                  marginTop: '5%',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  marginBottom: '5%'
                }}
              >
                <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#bdbdbd', }}>
                  Trans-ID
                </Text>
                <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#bdbdbd', }}>
                  {(this.props.result.data.transation_id) ? this.props.result.data.transation_id : ""}
                </Text>
              </View>

            </View>
          </View>
        </View>

      </View>
    );
  }
}
export default Summary;
