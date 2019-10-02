import React, { Component } from 'react';
import { View, Text, Image, Linking, Platform } from 'react-native';
import styles from './styles';
import * as Config from '../../config';

export default class UserSwitch extends Component {
  goToUpdateForm() {
    console.log('IN');
    console.log( Config.WEB + "/app/mobile_exercise" );
    Linking.openURL( Config.WEB + "/app/mobile_exercise" );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.sectionTitle}>
          <View style={styles.leftSide}>
            <Image
              source={require('../../../assets/danger.png')}
              style={styles.leftImage}
            />
          </View>
          <View style={styles.rightSide}>
            <Text style={styles.textInfo}>
              <Text style={styles.textItem}>Notification: User ID Change {'\n'}</Text>
              <Text style={styles.textItemBreak}>{'\n'}</Text>
              <Text style={styles.textItem2}>NRIC/FIN and email address will no longer be valid as your user ID. {'\n'}</Text> 
              <Text style={styles.textItem2}>
                Please click <Text style={styles.textItem3} onPress={() => this.goToUpdateForm()}>here</Text> to change your user ID to your mobile number.
              </Text>
            </Text>
          </View>
        </View>
      </View>
    )
  }
}
