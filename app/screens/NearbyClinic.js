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

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 5;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};

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
      current_page: null,
      last_page: null,
      processing: false,
    };
    this.drawerActionCallback = this.drawerActionCallback.bind(this);
    this.paginateClinicResults = this.paginateClinicResults.bind(this);
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
      console.log(error);
      console.log(result);
      if (result) {
        if (result.status) {
          data = await typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
          // console.log(data.current_page);
          // console.log(data.last_page);
          await this.setState({ DataClinic: data.clinics, current_page: data.current_page, last_page: data.last_page, processing: false, data: true });
        } else {
          setTimeout(function () {
            Actions.pop();
            Core.getNotifyLong('', 'Sorry, no registered clinics nearby');
          }, 2000);
        }
      } else {
        if (error.code === 3) {
          setTimeout(function () {
            Actions.pop();
            Core.getNotifyLong("", 'Unable to get location. Please try again.');
          }, 1000);
        } else {
          setTimeout(function () {
            Actions.pop();
            Core.getNotifyLong('', 'Sorry, no registered clinics nearby');
          }, 2000);
        }
      }
      // console.log(data);
    });
  }

  async paginateClinicResults(event) {
    console.log('paginate');
    // console.log(this.state);
    // console.log(event)
    if (!this.state.processing) {
      console.log(this.state.current_page);
      console.log(this.state.last_page);
      var current_page = await this.state.current_page + 1;
      console.log(current_page);
      // if(current_page != this.state.last_page) {
      console.log('query more')
      this.setState({ processing: true });
      await Core.paginateClinicResults(this.props.ClinicTypeID, current_page, async (error, result) => {
        if (result) {
          console.log(result);
          if (result.status) {
            data = await typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
            var new_data = this.state.DataClinic.concat(data.clinics);
            this.setState({ DataClinic: new_data, current_page: current_page, processing: false });
          } else {
            this.setState({ processing: false });
          }
        } else {
          this.setState({ processing: false });
        }
      })
      // } else {
      // 	console.log('stop');
      // }
    }
  }

  AddFavClinic(id_clinic) {
    params = {
      status: this.state.favourite == 1 ? 0 : 1,
      clinicid: id_clinic
    }

    Core.AddFavouriteClinic(params, (err, result) => {
      if (result.status) {
        if (this.state.favourite == 1) {
          Core.getNotify('', 'Success Remove Favourite Clinic');
          this.setState({ favourite: 0 });
        } else {
          Core.getNotify('', 'Success Add Favourite Clinic');
          this.setState({ favourite: 1 });
        }
      } else if (!result.status) {
        Core.getNotify('', result.message);
      } else {
        Core.getNotify('', 'Failed to Add Favourite Clinic, please try again');
      }
    });
  }

  renderFavourite(favourite) {
    if (favourite == 1) {
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
                alignItems: 'center',
                marginTop: '2%',
                marginLeft: '2%',
                marginRight: '2%',
              }}
            />
            <View
              style={{
                flexDirection: 'column',
                marginTop: '2%',
                width: '50%',
              }}
            >
              <Text
                ellipsizeMode='tail'
                numberOfLines={2}
                style={{
                  fontFamily: Config.FONT_FAMILY_ROMAN,
                  fontSize: 12,
                  marginTop: 5,
                  width: '100%',
                }}
              >
                {Data.name}
              </Text>
              <Text
                ellipsizeMode='tail'
                numberOfLines={3}
                style={{
                  color: '#8c8b7f',
                  fontSize: 10,
                  fontFamily: Config.FONT_FAMILY_LIGHT,
                }}
              >
                {Data.address}
              </Text>
              {Data.open_status === 1 ? (
                <Text style={{ marginTop: 1 }}>
                  <Icons
                    name="circle"
                    style={{ color: '#51e500', fontSize: 10, marginRight: 15 }}
                  />
                  {' '}
                  <Text style={{
                    fontFamily: Config.FONT_FAMILY_LIGHT,
                    fontSize: 10,
                    marginTop: 2,
                    marginLeft: 10,
                    color: '#616161',
                  }}>Now Open</Text>
                </Text>
              ) : (
                  <Text style={{ marginTop: 1 }}>
                    <Icons
                      name="circle"
                      style={{ color: '#e83637', fontSize: 10, marginRight: 15 }}
                    />
                    {' '}
                    <Text style={{
                      fontFamily: Config.FONT_FAMILY_LIGHT,
                      fontSize: 10,
                      marginTop: 2,
                      marginLeft: 10,
                      color: '#616161',
                    }}>Closed</Text>
                  </Text>
                )}
            </View>
            <TouchableOpacity style={{ marginTop: '4%', marginLeft: '2%' }} onPress={() => this.AddFavClinic(Data.clinic_id)}>
              {this.renderFavourite(Data.favourite)}
            </TouchableOpacity>
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
            leftNav="back-home"
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
                <ScrollView onScroll={({ nativeEvent }) => {
                  if (isCloseToBottom(nativeEvent)) {
                    this.paginateClinicResults();
                  }
                }}>
                  {
                    this.renderTransactionIn_Network()
                  }
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
              <TouchableOpacity
                onPress={() => Actions.NearbyClinicMaps({
                  clinicType: this.props.ClinicTypeID,
                  NameCategory: this.props.NameCategory
                })}
              >
                <Text style={{ color: '#fff', fontSize: 14, marginTop: 8, fontWeight: 'bold' }}>MAP</Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </Drawer>
    );
  }
}

export default NearbyClinic;
