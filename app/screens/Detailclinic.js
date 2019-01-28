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
  TabHeading
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Navbar from '../components/common/Navbar';
import { DetailClinic } from '../components/DetailClinic';
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
    Core.GetClinicDetails(this.props.clinic_id, (err,result) => {
      data =
        typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      console.warn(data);
      this.setState({ resultData: data });
    });
    this.getDataE_Claim();
  }

  getDataE_Claim() {
    Core.GetEClaimTransaction((error, result) => {
      data =
        typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      this.setState({ DataE_Claim: data });
    });
  }

  headingOne() {
    icon = (this.state.index == '0') ? require('../../assets/apps/stethoscope.png') : require('../../assets/apps/stethoscope.png')

    return (
      <TabHeading
        style={{
          backgroundColor: '#7bd3f7',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Image
          source={icon}
          style={{ height: 20, resizeMode: 'center' }}
        />
        <Text
          fontFamily={Config.FONT_V2_BOLD}
          fontSize={5}
          style={{
            color: (this.state.index == '0') ? "#fff" : "#fff"
          }}
        >
          Procedure
        </Text>
      </TabHeading>
    );
  }

  headingTwo() {
    icon = (this.state.index == '0') ? require('../../assets/apps/doctor.png') : require('../../assets/apps/doctor.png')

    return (
      <TabHeading
        style={{
          backgroundColor: '#7bd3f7',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Image
          source={icon}
          style={{ height: 20, resizeMode: 'center' }}
        />
        <Text
          fontFamily={Config.FONT_V2_BOLD}
          fontSize={5}
          style={{
            color: (this.state.index == '0') ? "#fff" : "#fff"
          }}
        >
          Doctors
        </Text>
      </TabHeading>
    );
  }

  headingThree() {
    icon = (this.state.index == '0') ? require('../../assets/apps/first-aid-kit-2.png') : require('../../assets/apps/first-aid-kit-2.png')

    return (
      <TabHeading
        style={{
          backgroundColor: '#7bd3f7',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Image
          source={icon}
          style={{ height: 20, resizeMode: 'center' }}
        />
        <Text
          fontFamily={Config.FONT_V2_BOLD}
          fontSize={5}
          style={{
            color: (this.state.index == '0') ? "#fff" : "#fff"
          }}
        >
          Information
        </Text>
      </TabHeading>
    );
  }

  headingFour() {
    icon = (this.state.index == '0') ? require('../../assets/apps/ambulance-2.png') : require('../../assets/apps/ambulance-2.png')

    return (
      <TabHeading
        style={{
          backgroundColor: '#7bd3f7',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Image
          source={icon}
          style={{ height: 20, resizeMode: 'center' }}
        />
        <Text
          fontFamily={Config.FONT_V2_BOLD}
          fontSize={5}
          style={{
            color: (this.state.index == '0') ? "#fff" : "#fff"
          }}
        >
          Direction
        </Text>
      </TabHeading>
    );
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

              <Text style={{ marginTop: '7%', color: '#7bd3f7' }}>
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
                color: '#7bd3f7',
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

              <Text style={{ marginTop: '7%', color: '#7bd3f7' }} />
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
              <Text style={{ color: '#7bd3f7' }}>S$ {Data.amount}</Text>
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

              <Text style={{ marginTop: '7%', color: '#7bd3f7' }} />
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
                color: '#7bd3f7',
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
    console.warn("datanya"+ (this.props.StatusOpen))
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar leftNav="back-home" />
        <DetailClinic
          clinicimage={this.state.resultData.image_url}
          clinicname={this.state.resultData.name}
          Address={this.state.resultData.address}
        />
        <Tabs
          tabBarUnderlineStyle={{ backgroundColor: 'transparant' }}
          tabBarBackgroundColor="#7bd3f7"
        >
          <Tab
          heading={this.headingOne()}
          >
            {/* <Content padder>{this.renderTransactionIn_Network()}</Content> */}
          </Tab>
          <Tab
          heading={this.headingTwo()}
          >
            {/* <Content padder>{this.renderTransactionE_Claim()}</Content> */}
          </Tab>
          <Tab
          heading={this.headingThree()}
          >
            {/* <Content padder>{this.renderTransactionIn_Network()}</Content> */}
          </Tab>
          <Tab
          heading={this.headingFour()}
          >
            {/* <Content padder>{this.renderTransactionE_Claim()}</Content> */}
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default HistoryTransaction;
