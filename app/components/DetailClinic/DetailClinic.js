import React, { Component } from 'react';
import { View, Text, ImageBackground, Image, Linking, TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import * as Core from '../../core';
import * as Config from '../../config';
import { ButtonCall } from '../common';

class HistoryClaim extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Balance: '0',
      Full_name: '',
      favourite: null
    };
  }
    
  componentWillReceiveProps(nextProps){
    console.log(nextProps);
    this.setState({ favourite: nextProps.favourite });
  }

  componentWillMount() {
    this.getUserDetail();
  }

  _pressCall = () => {
    const url = 'tel:' + this.props.CallPhon
    console.warn(url)
    Linking.openURL(url)
  }

  getUserDetail() {
    Core.UserDetail((error, result) => {
      data =
        typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      // console.warn(data);
      this.setState({
        Full_name: data.profile.full_name,
      });
    });
  }

  renderOpenStatus(status) {
  	if(status == 1) {
      return (
        <Text style={{ marginTop: 5 }}>
          <Icons
            name="circle"
            style={{ color: '#51e500', fontSize: 12, marginRight: 15 }}
          />
          {' '}
          <Text style={{
            fontFamily: Config.FONT_FAMILY_LIGHT,
            fontSize: 10,
            marginTop: 5,
            marginLeft: 12,
            color: 'black',
          }}>Open</Text>
        </Text>
      )
  	} else {
      return (
         <Text style={{ marginTop: 5 }}>
            <Icons
              name="circle"
              style={{ color: '#e83637', fontSize: 12, marginRight: 15 }}
            />
            {' '}
            <Text style={{
              fontFamily: Config.FONT_FAMILY_LIGHT,
              fontSize: 12,
              marginTop: 5,
              marginLeft: 10,
              color: 'black',
            }}>Closed</Text>
          </Text>
      )
  	}
  }

  AddFavClinic() {
    params = {
      status: this.state.favourite == 1 ? 0 : 1,
      clinicid: this.props.clinicid
    }

    Core.AddFavouriteClinic(params, (err, result) => {
      if (result.status) {
      	if(this.state.favourite == 1) {
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

  renderFavourite( ) {
    if(this.state.favourite == 1) {
      return (
        <Image
          source={require('../../../assets/apps/like_fav.png')}
          style={styles.like} />
      )
    } else {
      return (
        <Image
          source={require('../../../assets/apps/likes.png')}
          style={styles.like} />
      )
    }
  }

  render() {
    return (
      <View>
        <View style={styles.sectionHeader}>
          <ImageBackground
            source={require('../../../assets/andriod_splash.png')}
            style={styles.HeaderContain}>
            <View style={styles.contentHeader}>
              <Image
                source={{ uri: this.props.clinicimage }}
                style={styles.imageHeader} />
              <View />
              <View style={{ flexDirection: 'column', width: '65%' }}>
                <Text numberOfLines={3} style={styles.Title}>
                  {this.props.clinicname}
                </Text>
                <Text numberOfLines={2} style={styles.details}>
                  {this.props.Address}
                </Text>
                {this.renderOpenStatus(this.props.StatusOpen)}
              </View>
              <View />
            </View>

            <View style={{ flexDirection: 'row', marginBottom: '5%', justifyContent: 'space-between', }}>
              <View style={{ width: '60%' }} />
              <View style={{ flexDirection: 'row' }}>
                <ButtonCall onPress={this._pressCall} >
                  CALL
                </ButtonCall>
                <TouchableOpacity style={{ marginTop: '4%', marginLeft: '2%' }} onPress={() => this.AddFavClinic()}>
                  {this.renderFavourite()}
                </TouchableOpacity>
              </View>
            </View>

          </ImageBackground>
        </View>
      </View>
    );
  }
}

export default HistoryClaim;
