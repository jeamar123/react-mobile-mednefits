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
    // await this.getUserDetail();
    // await this.getUserBalance();
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
      console.log(result);
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
        <View style={styles.sectionSearch}>
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
              flexDirection: 'row',
              alignItems: 'center',
              height: '55%'
            }}
          />
        </View>
      </View>
    );
  }
}

export default HomeContent;
