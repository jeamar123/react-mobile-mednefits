import React, { Component } from 'react';
import {
  StatusBar,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Platform,
  ImageBackground
} from 'react-native';
import { Text, Drawer, Icon } from 'native-base';
import Icons from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import Navbar from '../components/common/Navbar';
import { MenuSide } from '../components/HomeContent';
import * as Config from '../config';
import * as Core from '../core';
import MapView, {Callout, PROVIDER_GOOGLE} from 'react-native-maps';
const { width, height } = Dimensions.get('window');
import * as Common from '../components/common'
const ASPECT_RATIO = width / height;

const LATITUDE = 1.3437419;
const LONGITUDE = 103.6839585;
const LATITUDE_DELTA = 0.5;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
import MEDICAL_PIN from '../../assets/annotation_red_cross.png';

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
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      clinics: []
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

  componentWillMount(){
    this.getClinics()
  }

  getClinics = async()=>{
  	console.log(this.props);
    await Core.GetClinicMap(this.props.clinicType, (err, result)=>{
    	// console.log('result', result)
      if (result) {
        this.setState({
          clinics: result
        })
        this.getCurrentPosition()
      }
    })
  }

  getCurrentPosition=async()=>{
    latitude = await Core.GetDataLocalReturnNew(Config.LATITUDE)
    longitude = await Core.GetDataLocalReturnNew(Config.LONGITUDE)

    // console.warn(latitude);
    // console.warn(longitude);
    this.setState({
      region: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
    })
  }

  render() {
    // console.warn("clinisc "+JSON.stringify(this.state.clinics));
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
          <MapView
          provider={PROVIDER_GOOGLE}
          style={{
            paddingTop: 52,
            height: '85%'
          }}
          // region={(this.props.newLocation == null) ? this.state.region : this.props.newLocation}
          region={this.state.region}
          initialRegion={this.state.region}
          // showsUserLocation={true}
          loadingEnabled={true}
          moveOnMarkerPress={true}
          onPress={this.onMapPress}
          >

          {(this.state.clinics) ? (
            this.state.clinics.map(marker => (
              <MapView.Marker
                title={marker.custom_title}
                image={marker.annotation_url}
                key={marker.clinic_id}
                coordinate={{latitude: Number(marker.lattitude),
                longitude: Number(marker.longitude)}}
                description={marker.description}
                onPress={this.onMarkerPress}
              >
                <Callout
                tooltip
                style={{
                  backgroundColor: 'white'
                }}  
                onPress={()=>Actions.DetailClinic({ clinic_id: marker.clinic_id, StatusOpen: marker.open_status })}>
                <View style={{
                    flex: 1,
                    padding:0,
                    backgroundColor: "#caeafd",
                    borderRadius: 3,
                    flexDirection: 'column',
                    minWidth: 100, maxWidth: 300
                  }}>
                    <View style={{justifyContent: 'space-between', flexDirection: 'row', width: '100%', margin: 10}}>
                      <Image
                        source={{uri: marker.image_url}}
                        style={{
                          width: 50,
                          height: 50,
                          margin: 5
                        }}
                      />
                      <View style={{flexDirection: 'column'}}>
                        <Common.Texti
                          fontFamily={Config.FONT_FAMILY_BOLD}
                          fontSize={16}
                          style={{ fontWeight: 'bold', color: '#0f4279' }}
                        >
                          {marker.name}
                        </Common.Texti>
                        <Common.Texti
                          fontSize={12}
                          fontFamily={Config.FONT_FAMILY_BOLD}
                          fontColor={"#389bd8"}
                          style={{ color: '#389bd8', fontWeight: 'bold', marginTop: 10, width: '50%' }}
                        >
                          {marker.address}
                        </Common.Texti>
                      </View>
                    </View>
                    <View style={{justifyContent: 'space-between', flexDirection: 'row', width: '100%', flex: 1, backgroundColor: "#62b9eb", alignItems: 'center'}}>
                      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 10, marginRight: 10}}>
                        <Icons
                          name="circle"
                          style={{ color: (marker.open_status == 1 ) ? '#51e500' : '#e83637', fontSize: 10, marginRight: 5 }}
                        />
                        <Common.Texti
                          fontColor={'#616161'}
                          fontSize={10}
                        >
                        {(marker.open_status == 1) ? 'OPEN' : 'CLOSED'}
                        </Common.Texti>
                      </View>
                        <TouchableOpacity
                          style={{
                            backgroundColor: '#134c74',
                            borderRadius: 5,
                            margin: 10
                          }}
                        >
                          <Common.Texti
                            fontColor={'white'}
                            fontSize={10}
                            style={{
                              paddingTop: 10,
                              paddingBottom: 10,
                              paddingLeft: 20,
                              paddingRight: 20,
                              color: 'white',
                              fontSize: 10
                            }}
                          >
                            BOOK NOW
                          </Common.Texti>
                        </TouchableOpacity>
                    </View>
                  </View>
                </Callout>
              </MapView.Marker>
            ))
          ): (<View />)}
          </MapView>
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
                onPress={()=>Actions.pop()}
                >
                <Text style={{ color: '#fff', fontSize: 14, marginTop: 8, fontWeight: 'bold' }}>LIST VIEW</Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </Drawer>
    );
  }
}

export default NearbyClinic;
