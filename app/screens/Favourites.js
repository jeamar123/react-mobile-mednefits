import React, { Component } from 'react';
import {
  StatusBar,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Text, Drawer } from 'native-base';
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
    this.getFavorites_Clinic();
  }

  getFavorites_Clinic() {
    Core.GetFavouritesClinic((error, result) => {
      data =
        typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      this.setState({ resultData: data });
    });
  }

  renderTransactionIn_Network() {
    return this.state.resultData.map(Data => (
      <TouchableOpacity>
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
                <Text
                  style={{
                    fontFamily: Config.FONT_FAMILY_LIGHT,
                    fontSize: 10,
                    color: '#8c8b7f',
                  }}
                >
                  Open
                </Text>
              ) : (
                <Text
                  style={{
                    fontFamily: Config.FONT_FAMILY_LIGHT,
                    fontSize: 10,
                    color: '#8c8b7f',
                  }}
                >
                  Closed
                </Text>
              )}
            </View>
            <Image
              source={require('../../assets/apps/like_fav.png')}
              style={{
                height: 100,
                width: 100,
                resizeMode: 'center',
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
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

export default Favourites;
