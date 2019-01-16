import React, { Component } from 'react';
import { StatusBar, View, TouchableOpacity, Image } from 'react-native';
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
    };
  }

  componentWillMount() {
    this.getDataIn_Network();
    this.getDataE_Claim();
  }

  getDataIn_Network() {
    Core.GetHistoryTransaction((error, result) => {
      data =
        typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      this.setState({ resultData: data });
    });
  }

  getDataE_Claim() {
    Core.GetEClaimTransaction((error, result) => {
      data =
        typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      this.setState({ DataE_Claim: data });
    });
  }

  renderTransactionIn_Network() {
    return this.state.resultData.map(Data => (
      <TouchableOpacity
        onPress={() =>
          Actions.HistoryGeneral({ transaction_id: Data.transaction_id })
        }
      >
        <Card>
          <CardItem
            bordered
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
              Transaction #: {Data.transaction_id}
            </Text>
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
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
              <Text style={{ fontSize: 12, color: '#B5B5B5' }}>
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
                  margin: 10,
                }}
                source={require('../../assets/apps/dotted.png')}
              />

              <Text style={{ marginTop: '7%', color: '#0392cf' }}>
                S$ {Data.amount}
              </Text>
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
                fontSize: 12,
                fontWeight: '400',
                color: '#0392cf',
                fontFamily: Config.FONT_FAMILY_ROMAN,
              }}
            >
              {Data.customer}
            </Text>
            {Data.health_provider_status == true && Data.type == 'cash' ? (
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
            ) : Data.health_provider_status == false &&
              Data.type == 'credits' ? (
              <Text />
            ) : (
              Data.health_provider_status == false &&
              Data.type == 'credits' &&
              Data.refunded ==
                true(<Text style={{ fontSize: 11 }}>Cancelled - Refunded</Text>)
            )}
          </CardItem>
        </Card>
      </TouchableOpacity>
    ));
  }

  renderTransactionE_Claim() {
    return this.state.DataE_Claim.map(Data => (
      <TouchableOpacity
        onPress={() =>
          Actions.DetailEclaimTransaction({
            transaction_id: Data.transaction_id,
          })
        }
      >
        <Card>
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
              <Text style={{ fontSize: 13 }}>{Data.merchant}</Text>
              <Text />
            </Body>
          </CardItem>
          <CardItem>
            <Body
              style={{
                marginTop: '-9%',
                marginBottom: '-6%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Image
                style={{
                  margin: 10,
                }}
                source={require('../../assets/apps/dotted.png')}
              />

              <Text style={{ marginTop: '7%', color: '#0392cf' }} />
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
              <Text style={{ color: '#0392cf' }}>S$ {Data.amount}</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body
              style={{
                marginTop: '-9%',
                marginBottom: '-6%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Image
                style={{
                  margin: 10,
                }}
                source={require('../../assets/apps/dotted.png')}
              />

              <Text style={{ marginTop: '7%', color: '#0392cf' }} />
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
                {Data.visit_date}
              </Text>
              {Data.status == 0 ? (
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
              ) : Data.status == 1 ? (
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
                    Approve
                  </Text>
                </View>
              ) : (
                Data.status ==
                2(
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
              )}
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
          tabBarUnderlineStyle={{ backgroundColor: 'transparant' }}
          tabBarBackgroundColor="#0392cf"
        >
          <Tab
            heading="In-Network Transactions"
            tabStyle={{ backgroundColor: '#0392cf' }}
            activeTabStyle={{ color: '#fff', backgroundColor: '#0392cf' }}
            activeTextStyle={{ color: '#fff', fontSize: 16 }}
            textStyle={{
              fontFamily: Config.FONT_FAMILY_ROMAN,
              color: '#fff',
              fontSize: 15,
            }}
          >
            <Content padder>{this.renderTransactionIn_Network()}</Content>
          </Tab>
          <Tab
            heading="E-Claim Transactions"
            tabStyle={{ backgroundColor: '#0392cf' }}
            activeTabStyle={{ color: '#fff', backgroundColor: '#0392cf' }}
            activeTextStyle={{ color: '#fff', fontSize: 16 }}
            textStyle={{
              fontFamily: Config.FONT_FAMILY_ROMAN,
              color: '#fff',
              fontSize: 15,
            }}
          >
            <Content padder>{this.renderTransactionE_Claim()}</Content>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default HistoryTransaction;
