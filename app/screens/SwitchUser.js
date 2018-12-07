import React, { Component } from 'react';
import {
  StatusBar,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Navbar from '../components/common/Navbar';
import { UserSwitch } from '../components/UserSwitch';
import * as Core from '../core';

class SwitchUser extends Component {
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
  }

  getDataIn_Network() {
    Core.GetHistoryTransaction((error, result) => {
      data =
        typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      this.setState({ resultData: data });
    });
  }

  renderTransactionIn_Network() {
    return (
      <View>
        <TouchableOpacity onPress={() => Actions.Home()}>
          <View
            style={{
              flex: 1,
              marginTop: 5,
              marginBottom: 10,
              height: 120,
              backgroundColor: '#fff',
            }}
          >
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Image
                source={require('../../assets/apps/mednefits.png')}
                style={{
                  height: 80,
                  width: 80,
                  resizeMode: 'center',
                  alignItem: 'center',
                  marginTop: '5%',
                  marginLeft: '5%',
                }}
              />
              <View
                style={{
                  flexDirection: 'column',
                  marginTop: '8%',
                  marginLeft: '-20%',
                }}
              >
                <Text style={{ fontWeight: '600' }}>Alice Ng</Text>
                <Text
                  style={{
                    marginTop: '5%',
                    color: '#c4c4c4',
                    fontSize: 11,
                  }}
                >
                  G847835I
                </Text>
                <Text style={{ color: '#c4c4c4', fontSize: 11 }}>Spouse</Text>
              </View>
              <Image
                source={require('../../assets/apps/next-btn.png')}
                style={{
                  height: 100,
                  width: 100,
                  resizeMode: 'center',
                  marginTop: '3%',
                }}
              />
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Actions.Home()}>
          <View
            style={{
              flex: 1,
              marginTop: 5,
              marginBottom: 10,
              height: 120,
              backgroundColor: '#fff',
            }}
          >
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Image
                source={require('../../assets/apps/mednefits.png')}
                style={{
                  height: 80,
                  width: 80,
                  resizeMode: 'center',
                  alignItem: 'center',
                  marginTop: '5%',
                  marginLeft: '5%',
                }}
              />
              <View
                style={{
                  flexDirection: 'column',
                  marginTop: '8%',
                  marginLeft: '-18%',
                }}
              >
                <Text style={{ fontWeight: '600' }}>Emma Lee</Text>
                <Text
                  style={{
                    marginTop: '5%',
                    color: '#c4c4c4',
                    fontSize: 11,
                  }}
                >
                  T0588888J
                </Text>
                <Text style={{ color: '#c4c4c4', fontSize: 11 }}>Child</Text>
              </View>
              <Image
                source={require('../../assets/apps/next-btn.png')}
                style={{
                  height: 100,
                  width: 100,
                  resizeMode: 'center',
                  marginTop: '3%',
                }}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar leftNav="back-home" title="Family Coverage" />
        <UserSwitch />
        <View
          style={{
            flex: 1,
            marginLeft: '2%',
            marginRight: '2%',
            marginTop: '2%',
          }}
        >
          <ScrollView>{this.renderTransactionIn_Network()}</ScrollView>
        </View>
      </View>
    );
  }
}

export default SwitchUser;
