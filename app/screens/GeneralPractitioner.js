import React, { Component } from 'react';
import { StatusBar, View, Image, ScrollView } from 'react-native';
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
  Drawer,
} from 'native-base';
import Navbar from '../components/common/Navbar';
import { HomeContent, MenuSide } from '../components/HomeContent';
import * as Core from '../core';

class GeneralPractitioner extends Component {
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
    return this.state.resultData.map(Data => (
      <View
        style={{
          flex: 1,
          marginTop: 5,
          marginBottom: 10,
          height: 120,
          backgroundColor: '#fff',
          borderRadius: 14,
          opacity: 10000,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
              marginLeft: '2%',
            }}
          >
            <Text style={{ fontWeight: '600' }}>Dr. Mednefits</Text>
            <Text style={{ color: '#c4c4c4', fontSize: 11 }}>
              {Data.clinic_type_and_service}
            </Text>
            <Text
              style={{
                marginTop: '15%',
                fontSize: 11,
              }}
            >
              Cancel
            </Text>
          </View>
          <Image
            source={require('../../assets/apps/like.png')}
            style={{
              height: 100,
              width: 100,
              resizeMode: 'center',
              marginTop: '3%',
            }}
          />
        </View>
      </View>
    ));
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
        <View style={{ flex: 1 }}>
          <StatusBar backgroundColor="white" barStyle="dark-content" />
          <Navbar
            drawerAction={this.drawerActionCallback}
            leftNav={true}
            rightNav="search"
          />
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
      </Drawer>
    );
  }
}

export default GeneralPractitioner;
