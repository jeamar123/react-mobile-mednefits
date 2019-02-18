import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import {
  Container,
  Content,
  Text,
} from 'native-base';
import { SummaryComp } from '../components/SummaryComp';
import styles from '../components/SummaryComp/styles';
import Navbar from '../components/common/Navbar';
import * as Common from '../components/common';

class Summary extends Component {
  render() {
    return (
      <Container style={{ backgroundColor: '#efeff4' }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar
          leftNav="null"
          title="Summary"
          rightNav="done"
        />
        <SummaryComp />
        <Content>
          <View
            style={{
              height: 250,
              backgroundColor: '#fff',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  marginTop: 10,
                  marginBottom: 14,
                  fontFamily: 'helvetica',
                }}
              >
                {(this.props.result.data.clinic_name) ? this.props.result.data.clinic_name : ""}
              </Text>
              <View
                style={{ flexDirection: 'row', alignItems: 'flex-start' }}
              >
                <Text style={styles.detailUp}>{(this.props.result.data.currency_symbol) ? this.props.result.data.currency_symbol : ""}</Text>
                <Text style={styles.detail}>{(this.props.result.data.amount) ? this.props.result.data.amount : ""}</Text>
              </View>
            </View>

            <Common.Divider />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: '3%',
                marginRight: '3%'
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  marginTop: 20,
                  fontFamily: 'helvetica',
                }}
              >
                Service
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  marginTop: 20,
                  fontFamily: 'helvetica',
                }}
              >
                {(this.props.result.data.services) ? this.props.result.data.services : ""}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: '3%',
                marginRight: '3%'
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  marginTop: 20,
                  fontFamily: 'helvetica',
                }}
              >
                Transaction Time
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  marginTop: 20,
                  fontFamily: 'helvetica',
                }}
              >
                {(this.props.result.data.transaction_time) ? this.props.result.data.transaction_time : ""}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: '3%',
                marginRight: '3%'
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  marginTop: 20,
                  fontFamily: 'helvetica',
                }}
              >
                Trans-ID
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  marginTop: 20,
                  fontFamily: 'helvetica',
                }}
              >
                {(this.props.result.data.transation_id) ? this.props.result.data.transation_id : ""}
              </Text>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
export default Summary;
