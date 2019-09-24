import React, { Component } from 'react';
import {
  StatusBar,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList
} from 'react-native';
import { Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Navbar from '../components/common/Navbar';
import { UserSwitch } from '../components/UserSwitch';
import * as Core from '../core';
import * as Config from '../config';

class FamilyList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    }
  }

  SwitchProcess = () => {
    this.setState({
      isLoading: true
    })

    param = {
      user_id: this.props.id,
      client_id: Config.CLIENT_ID
    }

    Core.SwitchAccount(param, (err, result) => {
      console.warn(err);
      if (err) {
        Core.getNotify('', 'Failed login, try again')
      }

      this.setState({ isLoading: false })
    })
  }

  render() {
    console.warn("props: " + JSON.stringify(this.props, null, 4))
    return (
      <View>
        <Core.Loader
          isVisible={this.state.isLoading}
        />
        <TouchableOpacity onPress={this.SwitchProcess}>
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                marginTop: 5,
                marginBottom: 0,
                height: 90,
                backgroundColor: '#fff',
              }}
            >
              <View
                style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItem: 'center' }}
              >
                <View style={{ justifyContent: 'center', alignItem: 'center' }}>
                  <Image
                    source={require('../../assets/apps/userAccount.png')}
                    resizeMode="contain"
                    style={{
                      flex: 1,
                      height: 70,
                      width: 70,
                      alignItem: 'center',
                      marginTop: '5%',
                      marginLeft: '10%',
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    marginRight: 5,
                    width: '60%',
                    justifyContent: 'center',
                    alignItem: 'center'
                  }}
                >
                  <Text style={{ fontWeight: '600' }}>{this.props.name}</Text>
                  <Text
                    style={{
                      marginTop: '5%',
                      color: '#c4c4c4',
                      fontSize: 11,
                    }}
                  >
                    {this.props.dob}
                  </Text>
                  <Text style={{ color: '#c4c4c4', fontSize: 11 }}>{this.props.type}</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItem: 'center' }}>
                  <Image
                    source={require('../../assets/apps/next-btn.png')}
                    resizeMode="contain"
                    style={{
                      flex: 1,
                      height: 12,
                      width: 12,
                      marginTop: '3%',
                      marginRight: 100
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

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
      data: false
    };
  }

  componentWillMount() {
    this.getFamilyCoverage();
  }

  getFamilyCoverage() {
    Core.GetFamilyCoverage((error, result) => {
      console.log( result.data );
      this.setState({
        data: result.data.users
      })
    });
  }

  _keyExtractor = (item, index) => item.user_id;

  _renderItem = ({ item }) => (
    <FamilyList
      key={item.user_id}
      id={item.user_id}
      name={item.name}
      nric={item.nric}
      dob={item.dob}
      type={item.type}
    />
  );

  renderTransactionIn_Network() {
    return (
      <View>
        <FlatList
          data={this.state.data}
          extraData={this.state}
          keyExtractor={this.data}
          renderItem={this._renderItem}
        />
      </View>
    );
  }

  render() {
    console.warn("props: " + JSON.stringify(this.props, null, 4))
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar
          leftNav="back-home"
          title="Family Coverage"
          Services={this.props.services}
          clinic_Id={this.props.clinicid}
          member={this.props.member}
          nric={this.props.nric}
          check_Id={this.props.checkId}
          checkTime={this.props.checkTime}
          capCurrency={this.props.capCurrency}
          capAmount={this.props.capAmount}
          clinic_image={this.props.clinic_image}
          clinic_name={this.props.clinic_name}
          consultation_fee_symbol={this.props.consultation_fee_symbol}
          consultation_status={this.props.consultation_status}
          consultation_fees={this.props.consultation_fees} />
        <UserSwitch />
        <View
          style={{
            flex: 1,
            marginLeft: '2%',
            marginRight: '2%',
            marginTop: '2%',
          }}
        >
          {(!this.state.data) ? (
            <View
              style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
            >
              <ActivityIndicator size="large" color="#0392cf" />
            </View>
          ) : this.renderTransactionIn_Network()}
        </View>
      </View>
    );
  }
}

export default SwitchUser;
