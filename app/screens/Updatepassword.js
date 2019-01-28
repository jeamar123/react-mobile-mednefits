import React, { Component } from 'react';
import { GiftedForm } from 'react-native-gifted-form';
import {
  StatusBar,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Container, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { getNotify, getAlert } from '../components/common/Notify';
import * as Core from '../core';
import * as Config from '../config';
import * as Common from '../components/common';
import Navbar from '../components/common/Navbar';
import { ButtonProfile } from '../components/common/ButtonProfile';

class Updatepassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldpassword: '',
      password: '',
    };
    this.updatePassword = this.updatePassword.bind(this);
  }

  UpdateDataUser(callback) {
    // console.warn('update');
    oldpassword = this.state.oldpassword;
    password = this.state.password;

    try {
      Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
        console.warn(result)
        if (result) {
          fetch(Config.AUTH_CHANGE_PASSWORD, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': result,
            },
            body: JSON.stringify({
              oldpassword: oldpassword,
              password: password,
            }),
          })
            .then(response => response.json())
            .then(res => {
              console.warn(res);
              if (res.status == 'true');
              Core.getNotify('', 'Success change password');
              Actions.Home();
            })
            .catch(error => {
              console.warn('error fetching', error.message);
            });
        } else {
          console.warn("else");
          // Actions.login({ type: 'reset' });
        }
      });
    } catch (e) {
      console.warn('error get history transaction' + e.message);
      getNotify('', 'Failed get data, try again');
    }
  }

  _renderDivider() {
    return (
      <View
        style={{
          borderBottomColor: '#cccccc',
          borderBottomWidth: 0.8,
          marginTop: '-2%',
          marginBottom: '5%',
        }}
      />
    );
  }

  updatePassword(result) {
    if (result) {
      this.UpdateDataUser();
    }
  }

  render() {
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar
          leftNav="back"
          rightNav="update-password"
          updatePassword={this.updatePassword}
        />
        <GiftedForm
          style={{
            backgroundColor: '#fff',
            paddingLeft: '5%',
            paddingRight: '5%',
            paddingTop: '10%',
          }}
          formName="signupForm"
          openModal={route => {
            navigator.push(route); // The ModalWidget will be opened using this method. Tested with ExNavigator
          }}
        >
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <TextInput
              underlineColorAndroid="transparent"
              style={{
                marginTop: '-4%',
                width: '50%',
                fontFamily: Config.FONT_FAMILY_ROMAN,
              }}
              value={this.state.oldpassword ? this.state.oldpassword : false}
              onChangeText={text => this.setState({ oldpassword: text })}
              placeholder=""
            />
            <Text
              style={{
                color: '#c4c4c4',
                width: '23%',
                fontFamily: Config.FONT_FAMILY_LIGHT,
                fontSize: 13,
              }}
            >
              Old Password
            </Text>
          </View>
          {this._renderDivider()}

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <TextInput
              placeholder=""
              underlineColorAndroid="transparent"
              style={{
                marginTop: '-4%',
                width: '40%',
                fontFamily: Config.FONT_FAMILY_ROMAN,
              }}
              value={this.state.password ? this.state.password : false}
              onChangeText={text => this.setState({ password: text })}
            />
            <Text
              style={{
                color: '#c4c4c4',
                marginLeft: '2%',
                fontFamily: Config.FONT_FAMILY_LIGHT,
                fontSize: 13,
              }}
            >
              New Password
            </Text>
          </View>
          {this._renderDivider()}
        </GiftedForm>
      </Container>
    );
  }
}

export default Updatepassword;
