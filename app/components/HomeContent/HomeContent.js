import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import * as Core from '../../core';
import Icons from 'react-native-vector-icons/FontAwesome';
import RF from "react-native-responsive-fontsize";
import * as Common from '../common'

class HomeContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Balance: '0',
      Full_name: '',
      currency: false,
      isClearSearch: false,
      isLoadingSearch: false
    };
  }

  async componentWillMount() {
    await this.getUserDetail();
    await this.getUserBalance();
  }

  async getUserBalance() {
    // console.log('in progress fetching getUserBalance')
    await Core.GetBalance(async (error, result) => {
      // console.log('fetching done for getUserBalance');
      data =
        await typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      await this.setState({
        Balance: data.balance,
        currency: result.data.currency_symbol
      });
    });
  }

  onQuery = async (query) => {
    this.setState({
      isClearSearch: true,
      query: query
    })
  }

  clearProcess = (state) => {
    this.props.clearProcess("true")
    this.setState({
      query: "",
      isClearSearch: false
    })
  }

  processQuery = async () => {
    this.props.isLoadingSearch("true")

    try {
      result = await Core.MainSearch(this.state.query)

      this.props.onUpdateSearch(result.data)
      this.props.isLoadingSearch("false")

    } catch (e) {
      Common.getNotify("", e.message)
      this.props.isLoadingSearch("false")
    } finally {
      setTimeout(() => {
        this.props.isLoadingSearch("false")
      }, 2000)
    }
  }


  async getUserDetail() {
    console.log('in progress fetching getUserDetail')
    await Core.UserDetail(async (error, result) => {
      console.log('fetching done for getUserDetail');
      data =
        await typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      console.warn(data);
      await this.setState({
        Full_name: data.profile.full_name,
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.sectionTitle}>
          <Common.InputSearch
            value={this.state.query}
            returnKeyType="search"
            onSubmitEditing={() => this.processQuery()}
            onChangeText={query => this.onQuery(query)}
            placeholder="Search"
            placeholderTextColor="#fff"
            placeholderStyle={{
              color: "#fff",
              width: '100%'
            }}
            type="search"
            isClearSearch={this.state.isClearSearch}
            isClearSearchChange={this.clearProcess}
            iconColor="#fff"
            // alignItems="center"
            justifyContent="flex-start"
            style={{
              width: '90%',
              borderRadius: 5,
              color: "#fff",
              backgroundColor: '#0A6186',
              marginLeft: 10,
              marginRight: 10,
              flexDirection: 'row',
              alignItems: 'center',
              height: '20%'
            }}
          />
          <View style={styles.contain}>
            <TouchableOpacity
              onPress={() =>
                Actions.Barcode()
              }
            >
              <View style={styles.gridBox}>
                <View style={{ flex: 1 }}>
                  <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '13%' }}>
                    <Image
                      style={{ marginBottom: 15, width: 30, height: 30 }}
                      source={require('../../../assets/apps/Scan&Pay.png')}
                    />
                  </View>
                  <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '2%' }}>
                    <Text style={styles.title}>Scan & Pay</Text>
                    <Text style={styles.detail}>In-Network</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Actions.ECardUser()
              }
            >
              <View style={styles.gridBox}>
                <View style={{ flex: 1 }}>
                  <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '10%' }}>
                    <Image
                      style={{ marginBottom: 15, width: 26, height: 35, }}
                      source={require('../../../assets/apps/E-Card.png')}
                    />
                  </View>
                  <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '2%' }}>
                    <Text style={styles.title}>E-Card</Text>
                    <Text numberOfLines={3} style={styles.detail}>{this.state.Full_name}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Actions.Wallet()
              }
            >
              <View style={styles.gridBox}>
                <View style={{ flex: 1 }}>
                  <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '13%' }}>
                    <Image
                      style={{
                        marginBottom: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 30,
                        height: 30,
                      }}
                      source={require('../../../assets/apps/wallet.png')}
                    />
                  </View>
                  <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '2%', width: '70%' }}>
                    <Text style={styles.title}>Wallet</Text>
                    <Text style={styles.detail}>{(this.state.currency) ? this.state.currency : " "} {this.state.Balance}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default HomeContent;
