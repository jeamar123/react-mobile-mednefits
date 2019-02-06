import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import * as Core from '../../core';
import Icons from 'react-native-vector-icons/FontAwesome';

class HomeContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Balance: '0',
      Full_name: '',
      currency: false,
    };
  }

  componentWillMount() {
    this.getUserBalance();
    this.getUserDetail();
    // Core.GetBalance((err, result)=>{
    //   this.setState({currency: result.data.currency_symbol})
    // })

  }

  async getUserBalance() {
    await Core.GetBalance((error, result) => {
      data =
        typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      console.warn(data);
      this.setState({
        Balance: data.balance,
        currency: result.data.currency_symbolpro
      });
    });
  }

  async getUserDetail() {
    await Core.UserDetail((error, result) => {
      data =
        typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      console.warn(data);
      this.setState({
        Full_name: data.profile.full_name,
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.sectionTitle}>
          <TouchableOpacity
            onPress={() => Actions.Search()}
            style={{
              width: "91%",
              borderRadius: 5,
              backgroundColor: '#0A6186',
              marginLeft: 15,
              marginRight: 15,
              flexDirection: 'row',
              alignItems: 'center'
            }}>
            <Icons
              name="search"
              style={{
                color: '#ffff',
                fontSize: 12,
                paddingLeft: 15,
                paddingRight: 15
              }}
            />
            <Text style={styles.searchtext}>Search</Text>
          </TouchableOpacity>
          <View style={styles.contain}>
            <TouchableOpacity
              onPress={() =>
                Actions.Barcode()
              }
            >
              <View style={styles.gridBox}>
                <Image
                  style={{ marginBottom: 15, width: 30, height: 30 }}
                  source={require('../../../assets/apps/Scan&Pay.png')}
                />
                <Text style={styles.title}>Scan & Pay</Text>
                <Text style={styles.detail}>In-Network</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Actions.ECardUser({
                  type: 'reset',
                })
              }
            >
              <View style={styles.gridBox}>
                <Image
                  style={{ marginBottom: 12, width: 26, height: 35 }}
                  source={require('../../../assets/apps/E-Card.png')}
                />
                <Text style={styles.title}>E-Card</Text>
                <Text style={styles.detail}>{this.state.Full_name}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Actions.Balance({
                  type: 'reset',
                })
              }
            >
              <View style={styles.gridBox}>
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
                <Text style={styles.title}>B-Dollars</Text>
                <Text style={styles.detail}>{(this.state.currency) ? this.state.currency : " "} {this.state.Balance}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default HomeContent;
