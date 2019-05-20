import React, { Component } from 'react';
import { StatusBar, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Button,
  Tab,
  Tabs,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Navbar from '../components/common/Navbar';
import * as Core from '../core';
import * as Config from '../config';
import { FONT_FAMILY_THIN, FONT_FAMILY_LIGHT } from '../config';
import RF from "react-native-responsive-fontsize";

class HistoryTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idTransaction: '0',
      date: '',
      customerName: '',
      price: '',
      status: '',
      resultData: [],
      DataE_Claim: [],
      in_network: false,
      out_network: false
    };
  }

  async componentWillMount() {
    await this.getDataIn_Network();
    await this.getDataE_Claim();
  }

  async getDataIn_Network() {
    await Core.GetHistoryTransaction(async (error, result) => {
      data =
        await typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      console.warn(JSON.stringify(data, null, 4))
      await this.setState({ resultData: data, in_network: true });
    });
  }

  async getDataE_Claim() {
    await Core.GetEClaimTransaction(async (error, result) => {
      data =
        await typeof result.data == 'string' ? JSON.parse(result.data) : result.data;

      this.setState({ DataE_Claim: data, out_network: true });
    });
  }

  renderInNetworkStatus(data) {
    if (data.health_provider_status == true && data.type == 'cash') {
      return (
        <View
          style={{
            paddingTop: 5,
            paddingBottom: 5,
            width: '20%',
            backgroundColor: '#439057',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#fff',
          }}
        >
          <Text
            style={{
              fontSize: 12,
              textAlign: 'center',
              color: '#fff',
            }}
          >
            Cash
          </Text>
        </View>
      );
    } else if (data.health_provider_status == false && data.type == 'credits' && data.refunded == true) {
      return (
        <Text style={{ fontSize: 11 }}>Cancelled - Refunded</Text>
      );
    }
  }

  renderTransactionIn_Network() {
    return this.state.resultData.map((Data, index) => (
      <TouchableOpacity
        key={index}
        onPress={() =>
          Actions.HistoryGeneral({ transaction_id: Data.transaction_id })
        }
      >
        <Card key={index} style={{ marginLeft: -5, marginRight: -5 }}>
          <CardItem

            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomWidth: 0.5,
              borderColor: 'grey',
              marginLeft: 10,
              marginRight: 10
            }}
          >
            <Text style={{ fontSize: 13, fontWeight: 'bold', marginLeft: -10 }}>
              Transaction #: <Text style={{ fontWeight: '400', fontSize: 13 }}>{Data.transaction_id}</Text>
            </Text>
            <Text style={{ fontSize: 13, fontWeight: '500', marginRight: -10 }}>
              {Data.date_of_transaction}
            </Text>
          </CardItem>
          <CardItem>
            <Body
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ fontSize: 13, color: '#616161' }}>
                {Data.clinic_type_and_service}
              </Text>
              <Text />
            </Body>
          </CardItem>
          <CardItem>
            <Body
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Image
                style={{
                  marginTop: -10,
                  marginLeft: 10,
                  marginRight: 10,
                  aspectRatio: 0.4,
                  resizeMode: 'contain',
                }}
                source={require('../../assets/apps/dotted.png')}
              />

              <Text style={{ marginTop: '-2%', color: '#0392cf' }}>
                {Data.currency_symbol} {Data.converted_amount}
              </Text>
            </Body>
          </CardItem>
          <CardItem style={{ marginTop: -20, backgroundColor: 'transparent' }}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: '400',
                color: '#616161',
                fontFamily: Config.FONT_FAMILY_ROMAN,
              }}
            >
              {Data.clinic_name}
            </Text>
          </CardItem>
          <CardItem
            footer
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: -10,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: '400',
                color: '#0392cf',
                fontFamily: Config.FONT_FAMILY_ROMAN,
              }}
            >
              {Data.customer}
            </Text>
            {this.renderInNetworkStatus(Data)}
          </CardItem>
        </Card>
      </TouchableOpacity>
    ));
  }

  renderEclaimStatus(data) {
    console.log(data);
    if (data.status == 0) {
      return (
        <View
          style={{
            paddingTop: 5,
            paddingBottom: 5,
            width: '23%',
            backgroundColor: '#c4c4c4',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#fff',
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: '600',
              textAlign: 'center',
              color: '#fff',
            }}
          >
            Pending
          </Text>
        </View>
      );
    } else if (data.status == 1) {
      return (
        <View
          style={{
            paddingTop: 5,
            paddingBottom: 5,
            width: '23%',
            backgroundColor: '#439057',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#fff',
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: '600',
              textAlign: 'center',
              color: '#fff',
            }}
          >
            Approved
          </Text>
        </View>
      );
    } else if (data.status == 2) {
      return (
        <View
          style={{
            paddingTop: 5,
            paddingBottom: 5,
            width: '23%',
            backgroundColor: '#FF0000',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#fff',
          }}
        >
          <Text
            style={{
              fontWeight: '600',
              fontSize: 12,
              textAlign: 'center',
              color: '#fff',
            }}
          >
            Rejected
          </Text>
        </View>
      )
    }
  }

  renderTransactionE_Claim() {
    return this.state.DataE_Claim.map((Data, index) => (
      <TouchableOpacity
        key={index}
        onPress={() =>
          Actions.DetailEclaimTransaction({
            transaction_id: Data.transaction_id,
          })
        }
      >
        <Card key={index}>
          <CardItem
            bordered
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
              Claim #: {Data.transaction_id}
            </Text>
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
              Claim Date: {Data.claim_date}
            </Text>
          </CardItem>
          <CardItem>
            <Body
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ fontSize: 13, marginBottom: 2 }}>{Data.merchant}</Text>
              <Text />
            </Body>
          </CardItem>
          <CardItem>
            <Body
              style={{
                marginTop: '-8%',
                marginBottom: '-8%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Image
                style={{
                  margin: 8,
                  aspectRatio: 0.4,
                  resizeMode: 'contain',
                }}
                source={require('../../assets/apps/dotted.png')}
              />

              <Text style={{ marginTop: '-5%', color: '#0392cf' }} />
            </Body>
          </CardItem>
          <CardItem>
            <Body
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ fontSize: 12, color: '#B5B5B5' }}>
                {Data.service}
              </Text>
              <Text style={{ color: '#0392cf', marginTop: '-1%' }}>{Data.currency_symbol} {Data.converted_amount}</Text>
            </Body>
          </CardItem>
          {/* <CardItem>
            <Body
              style={{
                marginTop: '-8%',
                marginBottom: '-8%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Image
                style={{
                  margin: 8,
                  aspectRatio: 0.4,
                  resizeMode: 'contain',
                }}
                source={require('../../assets/apps/dotted.png')}
              />

              <Text style={{ marginTop: '-5%', color: '#0392cf' }} />
            </Body>
          </CardItem> */}
          <CardItem>
            <Body
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ fontSize: 12, color: '#B5B5B5' }}>
                {Data.visit_date}
              </Text>
              {this.renderEclaimStatus(Data)}
            </Body>
          </CardItem>
          <CardItem
            footer
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',

            }}
          >
            <Text
              style={{
                fontSize: 11,
                fontWeight: '400',
                color: '#0392cf',
                fontFamily: Config.FONT_FAMILY_ROMAN,
              }}
            >
              {Data.member}
            </Text>
          </CardItem>
        </Card>
      </TouchableOpacity>
    ));
  }

  render() {
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar leftNav="back-home" title="History" />
        <Tabs
          tabBarUnderlineStyle={{ backgroundColor: 'transparent' }}
          tabContainerStyle={{ elevation: 0 }}
        >
          <Tab
            heading="In-Network Transactions"
            tabStyle={{ backgroundColor: '#0392cf' }}
            activeTabStyle={{ color: '#3497d7', backgroundColor: 'white' }}
            activeTextStyle={{ color: '#3497d7', fontSize: RF(1.9) }}
            textStyle={{
              fontFamily: Config.FONT_FAMILY_ROMAN,
              color: '#fff',
              fontSize: RF(2.1),
            }}
          >
            <Content>
              {(!this.state.in_network) ? (
                <View style={{ flex: 1 }}>
                  <View
                    style={{ flex: 1, marginTop: 240, justifyContent: 'center', alignItems: 'center' }}
                  >
                    <ActivityIndicator size="large" color="#0392cf" style={{ flex: 1, alignSelf: 'center' }} />
                  </View>
                </View>
              ) : (
                  <View style={{ marginBottom: 10 }}>
                    {this.renderTransactionIn_Network()}
                  </View>
                )}
            </Content>
          </Tab>
          <Tab
            heading="E-Claim Transactions"
            tabStyle={{ backgroundColor: '#0392cf' }}
            activeTabStyle={{ color: '#3497d7', backgroundColor: 'white' }}
            activeTextStyle={{ color: '#3497d7', fontSize: RF(1.9) }}
            textStyle={{
              fontFamily: Config.FONT_FAMILY_ROMAN,
              color: '#fff',
              fontSize: RF(2.1),
            }}
          >
            <Content>
              {(!this.state.out_network) ? (
                <View style={{ flex: 1 }}>
                  <View
                    style={{ flex: 1, marginTop: 240, justifyContent: 'center', alignItems: 'center' }}
                  >
                    <ActivityIndicator size="large" color="#0392cf" style={{ flex: 1, alignSelf: 'center' }} />
                  </View>
                </View>
              ) : (
                  <View style={{ marginBottom: 20 }}>
                    {this.renderTransactionE_Claim()}
                  </View>
                )}
            </Content>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default HistoryTransaction;
