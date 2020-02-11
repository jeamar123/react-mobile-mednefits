import React, { Component } from 'react';
import { StatusBar, View, StyleSheet, Dimensions, TouchableOpacity, Button, Animated, ScrollView } from 'react-native';
import { Container, Content, Text, Drawer, Icon } from 'native-base';
import styles from '../components/BalanceComp/styles';
import Navbar from '../components/common/Navbar';
import { MenuSide } from '../components/HomeContent';
import * as Core from '../core';
import Modal from 'react-native-modalbox';
import * as Common from '../components/common'

const { height } = Dimensions.get('window')

const styless = {

  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  modal2: {
    marginTop: 54,
    height: 230,
    backgroundColor: "white"
  },
}

class Balance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Balance: '0',
      InNetwork_Credit_spent: '0',
      Eclaim_Credit_spent: '0',
      currency: '',
      collapsed: true,
      visible: true
    };
    this.drawerActionCallback = this.drawerActionCallback.bind(this);
  }

  closeDrawer() {
    this._drawer._root.close();
  }

  openDrawer() {
    this._drawer._root.open();
  }

  drawerActionCallback(callback) {
    if (callback == true) {
      this.openDrawer();
    }
  }

  componentWillMount() {
    this.getUserBalance();
    // Core.GetBalance((err, result)=>{
    //   this.setState({currency: result.data.currency_symbol})
    // })
  }

  getUserBalance() {
    Core.GetBalance((error, result) => {
      data =
        typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      this.setState({
        Balance: data.balance,
        InNetwork_Credit_spent: data.in_network_credits_spent,
        Eclaim_Credit_spent: data.e_claim_credits_spent,
        currency: result.data.currency_symbol
      });
    });
  }

  componentDidMount() {

  }

  render() {
    return (
      <Drawer
        type="displace"
        openDrawerOffset={0.4}
        panCloseMask={0.4}
        ref={ref => {
          this._drawer = ref;
        }}
        content={<MenuSide navigator={this._navigator} />}
        onClose={() => this.closeDrawer()}
      >
        <Container>
          <StatusBar backgroundColor="white" barStyle="dark-content" />
          <Navbar
            drawerAction={this.drawerActionCallback}
            leftNav="back-home"
          />
          <Modal
            style={[styless.modal, styless.modal2]}
            backdrop={true}
            position={"top"}
            swipeToClose={true}
            swipeThreshold={100}
            entry={"top"}
            animationDuration={500}
            ref={"modal2"}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-around'
            }}>
              <View style={{ width: "40%", justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                <Icon
                  type="SimpleLineIcons"
                  name="wallet"
                  style={{
                    fontSize: 52,
                    color: '#0392cf'
                  }}
                />
                <Common.Texti
                  fontColor={'#0392cf'}
                  fontSize={14}
                  style={{
                    textAlign: 'center',
                    lineHeight: 20
                  }}
                >
                  Mednefits credit added via corporate employees benefits or gift code
              </Common.Texti>
              </View>
              <View style={{ width: "20%", justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                <Icon
                  type="SimpleLineIcons"
                  name="arrow-right"
                  style={{
                    color: '#0392cf'
                  }}
                />
              </View>
              <View style={{ width: "40%", justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                <Icon
                  type="SimpleLineIcons"
                  name="calendar"
                  style={{
                    fontSize: 52,
                    color: '#0392cf'
                  }}
                />
                <Common.Texti
                  fontColor={'#0392cf'}
                  fontSize={14}
                  style={{
                    textAlign: 'center',
                    lineHeight: 20
                  }}
                >
                  Mednefits credit gets auto deducted after end of the service
              </Common.Texti>
              </View>
            </View>
          </Modal>
          <View style={styles.container}>
            <View style={styles.wrapperTop}>
              <TouchableOpacity onPress={() => this.refs.modal2.open()} style={{ paddingLeft: 30, paddingRight: 30, paddingBottom: 10, borderLeftWidth: 1, borderRightWidth: 1, borderBottomWidth: 1, borderLeftColor: '#c8c8c8', borderRightColor: '#c8c8c8', borderBottomColor: '#c8c8c8' }}>
                <Text
                  style={{
                    fontFamily: 'HelveticaNeue-Roman',
                    fontSize: 16,
                    color: '#666666',
                    fontWeight: 'bold',
                    marginTop: 10
                  }}
                >
                  How it Works
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'HelveticaNeue-Medium',
                  marginTop: 40,
                }}
              >
                Your Medical Spending Credits
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'HelveticaNeue-Medium',
                  marginTop: 30,
                }}
              >
                Balance
              </Text>
              <Text
                style={{
                  fontSize: 42,
                  color: '#0392cf',
                  fontFamily: 'HelveticaNeue-Roman',
                  marginTop: 10,
                }}
              >
                {(this.state.currency) ? this.state.currency : " "} {this.state.Balance}
              </Text>

              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'HelveticaNeue-Roman',
                  marginTop: 50,
                  marginBottom: 10
                }}
              >
              </Text>
            </View>
            <View style={styles.wrapperBottom}>
              <View style={[{ backgroundColor: '#0392cf' }, styles.panelBottom]}>
                <View style={styles.sectionTextPanel}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 18,
                      fontFamily: 'HelveticaNeue-Roman',
                    }}
                  >
                    Panel Account
                  </Text>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 12,
                      marginTop: 10,
                      marginBottom: 10,
                      fontFamily: 'HelveticaNeue-Roman',
                    }}
                  >
                    Spent
                  </Text>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 20,
                      fontWeight: '600',
                      fontFamily: 'HelveticaNeue-Roman',
                    }}
                  >
                    {(this.state.currency) ? this.state.currency : " "} {(this.state.InNetwork_Credit_spent) ? this.state.InNetwork_Credit_spent : "0"}
                  </Text>
                </View>
              </View>
              <View style={[{ backgroundColor: '#626E82' }, styles.panelBottom]}>
                <View style={styles.sectionTextPanel}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 18,
                      fontFamily: 'HelveticaNeue-Roman',
                    }}
                  >
                    E-Claim Account
                  </Text>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 12,
                      marginTop: 10,
                      marginBottom: 10,
                      fontFamily: 'HelveticaNeue-Roman',
                    }}
                  >
                    Spent
                  </Text>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 20,
                      fontWeight: '600',
                      fontFamily: 'HelveticaNeue-Roman',
                    }}
                  >
                    {(this.state.currency) ? this.state.currency : " "} {this.state.Eclaim_Credit_spent}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Container>
      </Drawer>
    );
  }
}

export default Balance;
