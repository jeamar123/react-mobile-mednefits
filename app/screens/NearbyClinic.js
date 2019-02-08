import React, { Component } from 'react';
import {
  StatusBar,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Text, Drawer, Icon } from 'native-base';
import Icons from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import Navbar from '../components/common/Navbar';
import { MenuSide } from '../components/HomeContent';
import * as Config from '../config';
import * as Core from '../core';

class NearbyClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idTransaction: '0',
      date: '',
      customerName: '',
      price: '',
      status: '',
      DataClinic: [],
      data: false,
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

  async componentWillMount() {
    await Core.GetClinicMapList(this.props.ClinicTypeID, async (error, result) => {
    	// console.log(error);
    	// console.log(result);
    	if(result.status) {
        data = await typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
        await this.setState({ DataClinic: data.clinics, data: true });
    	} else {
    		setTimeout(function() {
    		  Actions.pop();
    		  Core.getNotifyLong('', 'Sorry, no registered clinics nearby');
    		}, 2000);
    	}
      // console.log(data);
    });
  }

  renderFavourite(favourite) {
    if(favourite == 1) {
      return (
        <Image
          source={require('../../assets/apps/like_fav.png')}
          style={{
            height: 100,
            width: 100,
            resizeMode: 'center',
          }}
        />
      )
    } else {
      return (
        <Image
          source={require('../../assets/apps/likes.png')}
          style={{
            height: 100,
            width: 100,
            resizeMode: 'center',
          }}
        />
      )
    }
  }

  renderTransactionIn_Network() {
    console.warn(this.props.ClinicTypeID);
    return this.state.DataClinic.map((Data, index) => (
      <TouchableOpacity
        key={index}
        onPress={() =>
          Actions.DetailClinic({ clinic_id: Data.clinic_id, StatusOpen: Data.open_status })
        }
      >
        <View
          style={{
            flex: 1,
            marginTop: 5,
            marginBottom: 10,
            height: 90,
            backgroundColor: '#fff',
            opacity: 10000,
          }}
        >
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Image
              source={{ uri: Data.image_url }}
              style={{
                height: 80,
                width: 80,
                resizeMode: 'center',
                alignItem: 'center',
                marginTop: '2%',
                marginLeft: '2%',
                marginRight: '-5%',
              }}
            />
            <View
              style={{
                flexDirection: 'column',
                marginTop: '4%',
                width: '45%',
              }}
            >
              <Text
                style={{
                  fontFamily: Config.FONT_FAMILY_ROMAN,
                  fontSize: 14,
                  marginTop: 5,
                  width: '100%',
                }}
              >
                {Data.name}
              </Text>
              <Text
                style={{
                  color: '#8c8b7f',
                  fontSize: 10,
                  fontFamily: Config.FONT_FAMILY_LIGHT,
                }}
              >
                {Data.address}
              </Text>
              {Data.open_status === 1 ? (
                <Text style={{ marginTop: 5 }}>
                  <Icons
                    name="circle"
                    style={{ color: '#51e500', fontSize: 10, marginRight: 15 }}
                  />
                  {' '}
                  <Text style={{
                    fontFamily: Config.FONT_FAMILY_LIGHT,
                    fontSize: 10,
                    marginTop: 5,
                    marginLeft: 10,
                    color: '#616161',
                  }}>Now Open</Text>
                </Text>
              ) : (
                  <Text style={{ marginTop: 5 }}>
                    <Icons
                      name="circle"
                      style={{ color: '#e83637', fontSize: 10, marginRight: 15 }}
                    />
                    {' '}
                    <Text style={{
                      fontFamily: Config.FONT_FAMILY_LIGHT,
                      fontSize: 10,
                      marginTop: 5,
                      marginLeft: 10,
                      color: '#616161',
                    }}>Closed</Text>
                  </Text>
                )}
            </View>
            { this.renderFavourite(Data.favourite) }
          </View>
        </View>
      </TouchableOpacity>
    ));
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
        <View style={{ flex: 1 }}>
          <StatusBar backgroundColor="white" barStyle="dark-content" />
          <Navbar
            drawerAction={this.drawerActionCallback}
            leftNav={true}
            rightNav="search"
          />

          {(!this.state.data) ? (
            <View
              style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
            >
              <Image
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 15,
                  width: 80,
                  height: 80,
                }}
                source={require('../../assets/apps/search_empty.png')}
              />
              <Text>We are looking  for health partners near you.</Text>
            </View>
          ) : (
              <View
                style={{
                  flex: 1,
                  marginLeft: '2%',
                  marginRight: '2%',
                  marginTop: '2%',
                }}
              >
                <ScrollView>
                  {this.renderTransactionIn_Network()}
                </ScrollView>
              </View>

            )}
          <View style={{
            height: 50,
            backgroundColor: '#0392cf'
          }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginRight: '3%',
              marginLeft: '3%',
              marginBottom: 5,
              marginTop: 5,
              alignItem: 'center'
            }}>
              <TouchableOpacity onPress={() => Actions.Home()}>
                <View style={{
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                  <Text style={{ color: '#fff', fontSize: 10, marginTop: 2, fontWeight: 'bold' }}>I am looking for</Text>
                  <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>{this.props.NameCategory}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={{ color: '#fff', fontSize: 14, marginTop: 8, fontWeight: 'bold' }}>Map View</Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </Drawer>
    );
  }
}

export default NearbyClinic;
