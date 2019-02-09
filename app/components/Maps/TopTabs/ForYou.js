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
  ScrollView
} from 'react-native';
import MapView from 'react-native-map-clustering'
import  { Circle, Marker,Callout } from 'react-native-maps';
import markerImg from '../../assets/marker.png';
import userLocImg from '../../assets/userLocation.png';

import CustomCallout from '../../controller/CustomCallout'
import UserCallout from '../../controller/UserCallout'
import axios from 'axios';
import CustomList from '../../controller/CustomList';
import styles from '../stylesheet/foryou'
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
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
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
       (position) => {
        let region = {
          latitude:       position.coords.latitude,
          longitude:      position.coords.longitude,
          latitudeDelta:  1.0,
          longitudeDelta: 1.0
          
        }
        let circleLoc = {
            latitude:       position.coords.latitude,
            longitude:      position.coords.longitude
  

        }
        this.onCircle(circleLoc);

        this.getPlaceResult(position.coords.latitude,position.coords.longitude,this.state.distance)
        this.onRegionChange(region, region.latitude, region.longitude);
  
       },
       (error) => this.setState({ error: error.message }),
       { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
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
      lastLong: lastLong || this.state.lastLong
    });
  }



  onChangeSlider(value){
   
    this.getPlaceResult(this.state.lastLat,this.state.lastLong,value)

    
  }




/**********************************************************
 * 
 * Purpose: Api call 
 * date 28 sep 2018
 * 
 ***************************************************************/


  getPlaceResult = (lat,long,distance) => {
    this.setState ({showLoader: true});
    axios.get('http://sandbox.empatkali.co.id/merchant/'+lat+'/'+ long+'/'+distance,
    
    {
        headers: {'Content-Type': 'application/json'}
    }
)

    .then((response) => {
      this.setState ({showLoader: false});
        if(response.data == "{}"){
        }
        else{
          const getValue = response.data
                          var count = Object.keys(getValue).length
                          this.setState({placeCount:count,
                            placeLocation:getValue
                          })
          
        }
       
       // Handle the JWT response here

    })

    .catch((error) => {
      this.setState ({showLoader: false});
      Alert.alert("Not Working"+error)
        this.setState({ loaded: false})     
           
        console.log(error)
       // Handle returned errors here

    });

  }
  
  render() {
    var MarkerView = [Marker];
    var listView = []
    if(this.state.placeLocation == null )  {
      return <View style = {{flex: 1,  justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}} >
      <Image style = {{alignSelf: 'center', height: 24, width:24}} source = {require('../../assets/loader.gif')} /> 
      </View>
    } else {

    for(let i = 0; i < this.state.placeCount; i++){

      MarkerView.push(
        <Marker key = {i}
       
    
        coordinate={{
          latitude: parseFloat(this.state.placeLocation[i].lat),
          longitude: parseFloat(this.state.placeLocation[i].lon),
        }}
        
        centerOffset={{ x: -18, y: -60 }}
        anchor={{ x: 0.69, y: 1 }}
        image={markerImg}
        
        >
 <Callout tooltip>
              <CustomCallout
              imageUrl = {this.state.placeLocation[i].image}
              title = {this.state.placeLocation[i].name}
              description = {this.state.placeLocation[i].title}
              distance = {this.state.placeLocation[i].distance}
              />
            
            </Callout>

        </Marker>
      
      )
      
      listView.push (
        <View style = {{marginTop:10}}
         key = {i}>
        <CustomList
         imageUrl = {this.state.placeLocation[i].image}
         title = {this.state.placeLocation[i].name}
         description = {this.state.placeLocation[i].title}
         distance = {this.state.placeLocation[i].distance}
        
        />
        </View>
      )

    }
  }

    const { mapRegion, circleView} = this.state;
    return (
      <View style = {{flex: 1,backgroundColor:'#E7E7E7',shadowOpacity: 1.0,}}>
   
      <View style={styles.container}>
      {this.state.showView != true &&

        <MapView
        provider={"google"}
        region={mapRegion}
        style={styles.map}
        showsUserLocation = {true}
        userLocationAnnotationTitle = "hello"
        clusterColor = 'black'
        clusterTextColor = 'white'
        clusterBorderColor = 'black'
        clusterBorderWidth = {1}
        pinColor = 'red'
        showsMyLocationButton = {false}
    
        >
            <Marker coordinate={{latitude:this.state.lastLat, longitude: this.state.lastLong}} 
              centerOffset={{ x: -18, y: -60 }}
              anchor={{ x: 0.69, y: 1 }}
              image={userLocImg}
            >
           <Callout tooltip>
              <UserCallout
              imageUrl = {'http://sandbox.empatkali.co.id/brodo.png'}
              title = "Maria Lakavovic"
              description = "Anda berada disini"
              />
            
            </Callout>

            </Marker>

            {MarkerView}
          <Circle
            center={circleView}
            radius={this.state.distance * 1000}
            fillColor="rgba(0, 0, 0, 0.3)"
            strokeColor="rgba(0,0,0,0.3)"
            zIndex={2}
            strokeWidth={2}
          />
          <Circle
            center={circleView}
            radius={this.state.distance/3 * 1000}
            fillColor="rgba(0, 0, 0, 0.35)"
            strokeColor="rgba(0,0,0,0.3)"
            zIndex={2}
            strokeWidth={2}
          />

        </MapView>
      }
      {this.state.showView == true &&
      <View  style = {{ ...StyleSheet.absoluteFillObject,padding:10}}>
      <ScrollView style = {{marginTop:40}}>
        {listView}
        </ScrollView>

        </View>
        
      }
      {this.state.showLoader == true &&
      <View style = {{flex: 1,  justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}} >
      <Image style = {{alignSelf: 'center', height: 24, width:24}} source = {require('../../assets/loader.gif')} /> 
      </View>
      
      }
      <View style = {{position: 'absolute',backgroundColor:'#B91E20',height:40, left: 0,
    right:0,
    top: 0, flexDirection:'row'}}>
<Image style = {{alignSelf: 'center', height: 20, width:20,marginLeft:10}} source = {require('../../assets/locationMark.png')} /> 
<Text style = {{textAlign:'center',marginLeft:5,color:'white',fontSize: 14,alignSelf:'center',fontWeight: '600',marginRight:10}}> Kredit belum aktif. Aktivasi kredit mu sekarang! </Text>

        </View> 
      
        <View style={{position: 'absolute',
    left: 0,
    right:0,
    bottom: 0,
    backgroundColor: '#909090',
    justifyContent:'center'
    }}>
    <View>
      <Slider style= {{marginLeft:10,marginRight:50}}
       step={1}
       minimumValue={this.state.minDistance}
       maximumValue={this.state.maxDistance}
       value={this.state.distance}
       onValueChange={val => this.setState({ distance: val })}
       thumbTintColor='rgb(252, 228, 149)'
       maximumTrackTintColor='#d3d3d3' 
       minimumTrackTintColor='rgb(252, 228, 149)'
       onSlidingComplete = {val => this.onChangeSlider(val)}
      />
      <View style ={{flexDirection:'row',marginBottom:5,}}>
      <Text style = {{marginLeft:10,flex:1,color:'white'}}> 5 KM </Text>
      <Text style = {{alignSelf: 'center',flex:1,textAlign:'center',color:'white'}}> 30 KM </Text>
      <Text style = {{flex:1,textAlign:'right',marginRight:50, color:'white'}}> 55 KM </Text>

        </View>
  </View>
  <TouchableOpacity  style={{position: 'absolute',
          padding:10,
          right:0,
          top:0,
          bottom:0,
          width:40,
          backgroundColor:"rgba(0,0,0,0.3)",
          justifyContent:'center'

          
          }} 
          onPress={() => this.setState({showView: this.state.showView ==true ? false: true})} >
          {this.state.showView ==false ?
                   <Image source={require('../../assets/list.png')}/> : <Image source={require('../../assets/location.png')}/>
          }
        </TouchableOpacity>
</View>
      </View>
      </View>
    );
  }
}


export default ForYou;