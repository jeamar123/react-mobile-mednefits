import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Dimensions,
  Slider,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Circle, Marker, Callout } from 'react-native-maps';
import markerImg from '../../../assets/apps/annotation_me.png';
import userLocationIndicator from '../../../assets/apps/annotation_me.png';
import Navbar from '../common/Navbar';

import CustomCallout from './CustomCallout';
import CustomList from './CustomList';
import styles from './styles';
const { width, height } = Dimensions.get('window');
import UserCallout from './UserCallout';
import MapView from 'react-native-map-clustering';
import * as Core from '../../core'

const ASPECT_RATIO = width / height;
const LATITUDE = -6.1722;
const LONGITUDE = 106.72215;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

class ForYou extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mapRegion: null,
      lastLat: null,
      lastLong: null,
      mapCirlce: null,
      placeLocation: null,
      distanceCount: null,
      placeCount: null,
      showView: false,
      showLoader: false,
      distance: 30,
      minDistance: 5,
      maxDistance: 55,
      circleView: {
        latitude: LATITUDE + SPACE,
        longitude: LONGITUDE + SPACE,
      },
      circle: {
        center: {
          latitude: LATITUDE + SPACE,
          longitude: LONGITUDE + SPACE,
        },
        radius: 200,
      },
    };
  }
  componentWillMount() {

    Core.SendScreenViewAnalytics('Pedagang')

    navigator.geolocation.getCurrentPosition(
      position => {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 1.0,
          longitudeDelta: 1.0,
        };
        let circleLoc = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        this.onCircle(circleLoc);
        this.getPlaceResult(
          position.coords.latitude,
          position.coords.longitude,
          this.state.distance
        );
        this.onRegionChange(region, region.latitude, region.longitude);
        console.warn('latitude ' + position.coords.latitude);
        console.warn('longitude ' + position.coords.longitude);
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
    );
  }

  onCircle(center) {
    this.setState({
      circleView: center,
    });
  }

  /**************************************************************
   *
   *
   * Region change
   *
   */

  onRegionChange(region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      // If there are no new values set the current ones
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong,
    });
  }

  onChangeSlider(value) {
    this.getPlaceResult(this.state.lastLat, this.state.lastLong, value);
  }

  /**********************************************************
   *
   * Purpose: Api call
   * date 28 sep 2018
   *
   ***************************************************************/

  getPlaceResult = async (lat, long, distance) => {
    this.setState({ showLoader: true });
    // console.warn("latitude "+lat);
    // console.warn("longitude "+long);
    // console.warn("distance "+distance);
    try {
      fetchData = await Core.GetNearbyStore(lat, long)

      this.setState({ showLoader: false });

      // Handle the  response here
      if (fetchData.data == '{}') {
      } else {
        const getValue = fetchData;
        var count = Object.keys(getValue).length;
        this.setState({
          placeCount: count,
          placeLocation: getValue,
        });
      }

    } catch (e) {
      this.setState({ showLoader: false });
      Alert.alert('Not Working' + error);
      this.setState({ loaded: false });
    }

  };

  render() {
    var MarkerView = [Marker];
    var listView = [];

    if ((this, this.state.placeLocation == null)) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
          }}
        >
          <Image
            style={{ alignSelf: 'center', height: 24, width: 24 }}
            source={require('../../assets/loader.gif')}
          />
        </View>
      );
    } else {
      for (let i = 0; i < this.state.placeCount; i++) {
        MarkerView.push(
          <Marker
            key={i}
            coordinate={{
              latitude: parseFloat(this.state.placeLocation[i].lat),
              longitude: parseFloat(this.state.placeLocation[i].lng),
            }}
            centerOffset={{ x: -18, y: -60 }}
            anchor={{ x: 0.69, y: 1 }}
            image={markerImg}
          >
            <Callout tooltip>
              <CustomCallout
                imageUrl={this.state.placeLocation[i].image}
                title={this.state.placeLocation[i].name}
                description={this.state.placeLocation[i].title}
                distance={this.state.placeLocation[i].distance}
              />
            </Callout>
          </Marker>
        );

        listView.push(
          <View style={{ marginTop: 10 }} key={i}>
            <CustomList
              imageUrl={this.state.placeLocation[i].image}
              title={this.state.placeLocation[i].name}
              description={this.state.placeLocation[i].title}
              distance={this.state.placeLocation[i].distance}
            />
          </View>
        );
      }
    }

    const { mapRegion, circleView } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Navbar leftNav="cancel" title="Map View Clinic" />
        <View style={{ flex: 1, backgroundColor: '#E7E7E7', shadowOpacity: 1.0 }}>
          <View style={styles.container}>
            {this.state.showView != true && (
              <MapView
                provider={'google'}
                region={mapRegion}
                style={styles.map}
                clustering={false} //Set this value true to display number
                showUserLocation={false} // Set this value true to show blue dot
                clusterColor="black"
                clusterTextColor="white"
                clusterBorderColor="black"
                clusterBorderWidth={1}
                pinColor="red"
                showsMyLocationButton={false}
              >
                <Marker
                  coordinate={{
                    latitude: this.state.lastLat,
                    longitude: this.state.lastLong,
                  }}
                  stopPropagation={false}
                  image={userLocationIndicator}
                >
                  <Callout tooltip>
                    <UserCallout
                      imageUrl={'http://sandbox.empatkali.co.id/brodo.png'}
                      title="Maria Lakabovic"
                      description="Anda berada disini"
                    />
                  </Callout>
                </Marker>
                {MarkerView}

                <Circle
                  center={circleView}
                  radius={this.state.distance * 1000}
                  fillColor="rgba(0, 0, 0, 0.3)"
                  strokeColor="transparent"
                  zIndex={2}
                  strokeWidth={2}
                />
                <Circle
                  center={circleView}
                  radius={(this.state.distance / 2) * 1000}
                  fillColor="rgba(0, 0, 0, 0.35)"
                  strokeColor="transparent"
                  zIndex={2}
                  strokeWidth={2}
                />
              </MapView>
            )}
            {this.state.showView == true && (
              <View style={{ ...StyleSheet.absoluteFillObject, padding: 10 }}>
                <ScrollView style={{ marginTop: 40 }}>{listView}</ScrollView>
              </View>
            )}
            {this.state.showLoader == true && (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                }}
              >
                <Image
                  style={{ alignSelf: 'center', height: 24, width: 24 }}
                  source={require('../../assets/loader.gif')}
                />
              </View>
            )}
            <View
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: '#909090',
                justifyContent: 'center',
              }}
            >
              <View>
                <Slider
                  style={{ marginLeft: 10, marginRight: 60 }}
                  step={1}
                  minimumValue={this.state.minDistance}
                  maximumValue={this.state.maxDistance}
                  value={this.state.distance}
                  onValueChange={val => this.setState({ distance: val })}
                  thumbTintColor="rgb(252, 228, 149)"
                  maximumTrackTintColor="#d3d3d3"
                  minimumTrackTintColor="white"
                  onSlidingComplete={val => this.onChangeSlider(val)}
                />
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={{
                      marginLeft: 10,
                      flex: 1,
                      color: 'white',
                      paddingBottom: 5,
                    }}
                  >
                    5 KM
                  </Text>
                  <Text
                    style={{
                      alignSelf: 'center',
                      flex: 1,
                      textAlign: 'center',
                      color: 'white',
                      paddingBottom: 5,
                    }}
                  >
                    30 KM
                  </Text>
                  <Text
                    style={{
                      flex: 1,
                      textAlign: 'right',
                      marginRight: 60,
                      color: 'white',
                      paddingBottom: 5,
                    }}
                  >
                    55 KM
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  padding: 15,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  width: 50,
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  justifyContent: 'center',
                }}
                onPress={() =>
                  this.setState({
                    showView: this.state.showView == true ? false : true,
                  })
                }
              >
                {this.state.showView == false ? (
                  <Image source={require('../../assets/maps/list.png')} />
                ) : (
                    <Image source={require('../../assets/maps/location.png')} />
                  )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default ForYou;
