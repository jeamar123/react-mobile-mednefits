import React, { Component } from 'react';
import { View, Text, ImageBackground, Image, Linking } from 'react-native';
import styles from './styles';
import * as Core from '../../core';
import { ButtonCall } from '../common';

class HistoryClaim extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Balance: '0',
      Full_name: '',
    };
  }

  componentWillMount() {
    this.getUserDetail();
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
                {this.props.StatusOpen === 1 ? (
                  <Text numberOfLines={1} style={styles.statusCLinic} >
                    OPEN
                </Text>
                ) : (
                    <Text numberOfLines={1} style={styles.statusCLinic} >
                      CLOSED
                </Text>
                  )}
              </View>
              <View />
            </View>

            <View style={{ flexDirection: 'row', marginBottom: '5%', justifyContent: 'space-between', }}>
              <View style={{ width: '60%' }} />
              <View style={{ flexDirection: 'row' }}>
                <ButtonCall >
                  CALL
                </ButtonCall>
                <Image
                  source={require('../../../assets/apps/likes.png')}
                  style={styles.like} />
              </View>
            </View>

          </ImageBackground>
        </View>
      </View>
    );
  }
}

export default HistoryClaim;
