import React, { Component } from 'react';
import {
  StatusBar,
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
  BackHandler
} from 'react-native';
import { Text, Drawer } from 'native-base';
import Icons from 'react-native-vector-icons/FontAwesome';
import IconR from 'react-native-vector-icons/Feather';
import Svg, { Image } from 'react-native-svg'
import { Actions } from 'react-native-router-flux';
import Navbar from '../components/common/Navbar';
import { MenuSide } from '../components/HomeContent';
import * as Config from '../config';
import * as Core from '../core';
import MapView, { Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Common from '../components/common'

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 1.352083;
const LONGITUDE = 103.819839;
const LATITUDE_DELTA = 0.6;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class NearbyClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
      data: false,
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      DataClinics: [],
      data: false,
      current_page: null,
      last_page: null,
      processing: false,
    };
  }

  // Loading Data Clinic in Maps with Pagination
  async componentWillMount() {
    await Core.GetClinicMapList(this.props.clinicType, async (error, result) => {
      console.warn(error);
      console.warn(result);
      if (result) {
        if (result.status) {
          data = await typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
          // console.warn(data.current_page);
          // console.warn(data.last_page);
          await this.setState({ DataClinics: data.clinics, current_page: data.current_page, last_page: data.last_page, processing: false, data: true });
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
      // console.warn(data);
    });

    setInterval(() => {
      console.warn('I Love Karnela');
      this.paginateClinicResults();
    }, 2000);
  }

  async paginateClinicResults() {
    console.warn('paginate');
    // console.warn(this.state);
    // console.warn(event)
    if (!this.state.processing) {
      console.warn(this.state.current_page);
      console.warn(this.state.last_page);
      var current_page = await this.state.current_page + 1;
      console.warn(current_page);
      // if(current_page != this.state.last_page) {
      console.warn('query more')
      this.setState({ processing: true });
      await Core.paginateClinicResults(this.props.clinicType, current_page, async (error, result) => {
        if (result) {
          console.warn(result);
          if (result.status) {
            data = await typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
            var new_data = this.state.DataClinics.concat(data.clinics);
            this.setState({ DataClinics: new_data, current_page: current_page, processing: false });
          } else {
            this.setState({ processing: false });
          }
        } else {
          this.setState({ processing: false });
        }
      })
      // } else {
      // 	console.warn('stop');
      // }
    }
  }

  // Loading Data Clinic in Maps with All Data in one loading
  // componentWillMount() {
  //   this.getClinics()
  // }

  // getClinics = async () => {
  //   console.warn(this.props);
  //   await Core.GetClinicMap(this.props.clinicType, (err, result) => {
  //     console.warn('result', result)
  //     if (result) {
  //       this.setState({
  //         clinics: result
  //       })
  //       this.getCurrentPosition()
  //     }
  //   })
  // }

  getCurrentPosition = async () => {
    latitude = await Core.GetDataLocalReturnNew(Config.LATITUDE)
    longitude = await Core.GetDataLocalReturnNew(Config.LONGITUDE)
    dataClinicNearby = await Code.GetAllClinic(dataClinicNearby)

    console.warn(latitude);
    // console.warn(dataClinicNearby);
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

  renderCallOut = async (image_url) => {
    if (Platform.OS == "ios") {
      return (
        <View>
          <Image
            source={{ uri: image_url }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 2,
            }}
            resizeMode="cover"
          />
        </View>
      );
    } else {
      return (
        <View>
          <Svg width={50} height={50}>
            <Image
              x="5%"
              y="5%"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
              href={{ uri: image_url }}
              style={{
                borderRadius: 2
              }}
              resizeMode="contain"
            />
          </Svg>
        </View>
      );
    }
  }

  render() {
    console.warn("DataClinic " + JSON.stringify(this.state.DataClinics));
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar
          leftNav="back"
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

          {(this.state.DataClinics) ? (
            this.state.DataClinics.map(dataMarker => (
              <MapView.Marker
                title={dataMarker.custom_title}
                image={dataMarker.annotation_url}
                key={dataMarker.clinic_id}
                coordinate={{
                  latitude: Number(dataMarker.lattitude),
                  longitude: Number(dataMarker.longitude)
                }}
                description={dataMarker.description}
                onPress={this.onMarkerPress}
              >
                <Callout
                  tooltip
                  style={{
                    backgroundColor: 'white'
                  }}
                  onPress={() => Actions.DetailClinic({ clinic_id: dataMarker.clinic_id, StatusOpen: dataMarker.open_status })}>
                  <View style={{
                    flex: 1,
                    padding: 0,
                    backgroundColor: "#caeafd",
                    borderRadius: 3,
                    flexDirection: 'column',
                    minWidth: 100, maxWidth: 300
                  }}>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: '100%', margin: 10 }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Svg width={65} height={65}>
                          <Image
                            x="5%"
                            y="5%"
                            width="100%"
                            height="100%"
                            preserveAspectRatio="xMidYMid slice"
                            href={{ uri: dataMarker.image_url }}
                            style={{
                              borderRadius: 2
                            }}
                            resizeMode="contain"
                          />
                        </Svg>
                      </View>
                      <View style={{ flexDirection: 'column', width: '80%' }}>
                        <Common.Texti
                          fontFamily={Config.FONT_FAMILY_BOLD}
                          fontSize={16}
                          style={{ fontWeight: 'bold', color: '#0f4279' }}
                        >
                          {dataMarker.name}
                        </Common.Texti>
                        <Common.Texti
                          ellipsizeMode='tail'
                          numberOfLines={2}
                          fontSize={12}
                          fontFamily={Config.FONT_FAMILY_ROMAN}
                          fontColor={"#389bd8"}
                          style={{ color: '#389bd8', marginTop: 10, width: '50%' }}
                        >
                          {dataMarker.address}
                        </Common.Texti>
                        {dataMarker.open_status === 1 ? (
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
                      <View style={{ marginLeft: '-30%', marginTop: '8%' }}>
                        <IconR
                          name="chevron-right"
                          style={{ color: '#616161', fontSize: 40, marginRight: '3%' }}
                        />
                      </View>
                    </View>
                  </View>
                </Callout>
              </MapView.Marker>
            ))
          ) : (<View />)}
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
              onPress={() => Actions.pop()}
            >
              <Text style={{ color: '#fff', fontSize: 14, marginTop: 8, fontWeight: 'bold' }}>LIST</Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    );
  }
}

export default NearbyClinic;
