import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import { Container, Content, Text, Drawer } from 'native-base';
import styles from '../components/BalanceComp/styles';
import Navbar from '../components/common/Navbar';
import { MenuSide } from '../components/HomeContent';
import * as Core from '../core';

class Balance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Balance: '0',
      InNetwork_Credit_spent: '0',
      Eclaim_Credit_spent: '0',
      currency: '',
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
    Core.GetBalance((err, result)=>{
      this.setState({currency: result.data.currency_symbol})
    })
  }

  getUserBalance() {
    Core.GetBalance((error, result) => {
      data =
        typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      console.warn(data);
      this.setState({
        Balance: data.balance,
        InNetwork_Credit_spent: data.in_network_credits_spent,
        Eclaim_Credit_spent: data.e_claim_credit_spent,
      });
    });
  }

  render() {
    return (
      <Drawer
        type="displace"
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
            leftNav={true}
          />
        <Content padder>
          <View style={styles.container}>
            <Text
              style={{
                fontFamily: 'HelveticaNeue-Roman',
                fontSize: 20,
                color: '#666666',
              }}
            >
              How it Works
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'HelveticaNeue-Medium',
                marginTop: 60,
              }}
            >
              Your Benefits Credits
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
              }}
            >
              Applied in your next transactions
            </Text>
          </View>
          <View style={styles.ButtonStyle}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
              }}
            >
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
                {(this.state.currency) ? this.state.currency : " "} {(this.state.Eclaim_Credit_spent) ? this.state.Eclaim_Credit_spent : "0"}
              </Text>
            </View>
          </View>
          <View style={styles.ButtonStyle2}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 18,
                  fontFamily: 'HelveticaNeue-Roman',
                }}
              >
                In-Network Account
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 12,
                  marginTop: 10,
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
                {(this.state.currency) ? this.state.currency : " "} {this.state.InNetwork_Credit_spent}
              </Text>
            </View>
          </View>
        </Content>
      </Container>
      </Drawer>
    );
  }
}
export default Balance;
