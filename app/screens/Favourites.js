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
import ResponsiveImage from 'react-native-responsive-image';
import Navbar from '../components/common/Navbar';
import { MenuSide } from '../components/HomeContent';
import * as Config from '../config';
import * as Core from '../core';

class Favourites extends Component {
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
      data: false,
      favourite: null
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

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({ favourite: nextProps.favourite });
  }

  componentWillMount() {
    this.getFavorites_Clinic();
  }

  getFavorites_Clinic() {
    Core.GetFavouritesClinic((error, result) => {
      data =
        typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      this.setState({ resultData: data, data: true });
    });
  }

  AddFavClinic(id_Clinic) {
    params = {
      status: this.state.favourite == 1 ? 0 : 1,
      clinicid: id_Clinic
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
        <ResponsiveImage
          source={require('../../assets/apps/like_fav.png')}
          resizeMode="contain"
          style={{
            marginRight: '5%',
            marginTop: '50%'
          }}
          initWidth="25" initHeight="25"
        />
      )
    } else {
      return (
        <ResponsiveImage
          source={require('../../assets/apps/likes.png')}
          resizeMode="contain"
          style={{            marginRight: '5%',
            marginTop: '50%'
          }}
          initWidth="25" initHeight="25"
        />
      )
    }
  }

  renderTransactionIn_Network() {
    console.warn("datanya" + (this.state.clinic_id))
    return this.state.resultData.map((Data, index) => (
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
            <ResponsiveImage
              source={{ uri: Data.image_url }}
              resizeMode="contain"
              style={{
                marginTop: '2%',
                marginLeft: '2%',
                marginRight: '2%',
              }}
              initWidth="80" initHeight="80"
            />
            <View
              style={{
                flexDirection: 'column',
                marginTop: '2%',
                width: '60%',
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
                numberOfLines={2}
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
            <TouchableOpacity style={{ marginTop: '4%', marginRight: '2%' }} onPress={() => this.AddFavClinic(JSON.stringify(Data.clinic_id))}>
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
            leftNav={true}
            rightNav="search"
          />

          {(!this.state.data) ? (
            <View
              style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
            >
              <ActivityIndicator size="large" color="#0392cf" />
            </View>
          ) : (
              <View
                style={{
                  flex: 1,
                  marginRight: '2%',
                  marginTop: '2%',
                }}
              >
                <ScrollView>
                  {this.renderTransactionIn_Network()}
                  <TouchableOpacity onPress={() => Actions.Search()}>
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
                        style={{ flexDirection: 'row'}}
                      >
                        <Image
                          source={require('../../assets/apps/plus.png')}
                          resizeMode="contain"
                          style={{
                            // flex: 1,
                            height: 60,
                            width: 60,
                            // alignItems: 'center',
                            marginTop: '2%',
                            marginLeft: '4%',
                            // marginRight: '-5%',
                          }}
                        />
                        <View
                          style={{
                            flexDirection: 'column',
                            marginTop: '4%',
                            marginLeft: '2%',
                            width: '45%',
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: Config.FONT_FAMILY_ROMAN,
                              fontSize: 14,
                              width: '100%',
                            }}
                          >
                            Add Your Clinic
                        </Text>
                          <Text
                            style={{
                              color: '#8c8b7f',
                              fontSize: 9,
                              fontFamily: Config.FONT_FAMILY_LIGHT,
                            }}
                          >
                            Tap here to search and add your favourite clinic to the list
                        </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </ScrollView>
              </View>

            )}

        </View>
      </Drawer>
    );
  }
}

export default Favourites;
