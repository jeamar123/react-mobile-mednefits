/* eslint-disable eol-last */
/* eslint-disable space-infix-ops */
/* eslint-disable no-shadow */
/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable handle-callback-err */
/* eslint-disable radix */
/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */

import React, { Component } from 'react';
import { StatusBar, Image, Text, TouchableOpacity, KeyboardAvoidingView, Platform, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { InputWithButton } from '../components/TextInput';
import { IDChangeNotif } from '../components/IDChangeNotif';
import { Buttons2, Popup } from '../components/common';
import VersionCheck from 'react-native-version-check';
import Toast from 'react-native-simple-toast';
import * as Config from '../config';
import * as Core from '../core'
import * as Common from '../components/common'

class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: false,
      password: false,
      isLoading: false,
      failed: false,
      title: null,
      message: null,
      button: 'Log in',
      showUpdateNotif: true,
      url: null,
      thisVersion: VersionCheck.getCurrentVersion(),
      appstoreVersion: '',
    };
    this.isVisibleUpdate = this.isVisibleUpdate.bind(this);
  }

  async componentDidMount() {

    await Core.GetLocationPermission(async (error, result) => {
      // await this.getClinicType()
    });
  }

  async componentWillMount() {

    fetch("https://itunes.apple.com/lookup?bundleId=sg.medicloud.user")
      .then(res => res.json())
      .then(json => {
        this.setState({
          appstoreVersion: json.results[0].version,
        })
        this.inAppTrigger();
      });
  }

  inAppTrigger() {
    //Get Pop Up
    console.log('app store version', this.state.appstoreVersion);
    console.log('my app version', this.state.thisVersion);
    if (parseInt(this.state.appstoreVersion.substring(4, 10)) == parseInt(this.state.thisVersion.substring(4, 10))) {
      console.warn('UP TO DATE')
    } else if (parseInt(this.state.thisVersion.substring(4, 10)) < parseInt(this.state.appstoreVersion.substring(4, 10))) {
      Actions.updateApps({ type: 'reset' })
      console.warn('Updating...')
    } else {
      console.warn('Checking...')
    }
  }

  isVisibleUpdate() {
    this.setState({ failed: false })
  }

  LoginHandler() {
    this.setState({ isLoading: true, button: 'Logging in...' })

    // this.LoginOld();
    this.NEW_Login();
  }

  LoginOld() {
    Core.LoginProcess(this.state.username, this.state.password, (err, result) => {
      if (result) {
        this.setState({ isLoading: false, failed: false, button: 'Log in' })
        Actions.Home({ type: 'reset' });
      } else {
        this.setState({ failed: true, title: 'Login Failed', isLoading: false, button: 'Log in', url: err.url })
        // this.setState({ failed: true, title: 'Login Failed', message: 'Invalid Credentials', isLoading: false, button: 'Log in', url: err.url })
      }
    })

    // setTimeout(()=>{
    //   this.setState({isLoading: !this.state.isLoading})
    // },500)
  }

  NEW_Login() {
    Core.NEW_LoginProcess(this.state.username, this.state.password, (err, result) => {
      if (result) {
        this.setState({ isLoading: false, failed: false, button: 'Log in' })
        Actions.Home({ type: 'reset' });
      } else {
        this.setState({ failed: true, title: 'Login Failed', isLoading: false, button: 'Log in', url: err.url })
      }
    })
  }

  renderError = () => {
    if (this.state.isLoading) {
      if (Platform.OS == "ios") {
        return (
          <View />
        )
      } else {
        return (
          <Core.Loader
            isVisible={this.state.isLoading}
          />
        )
      }
    } else if (this.state.failed) {
      return (
        <Popup
          kind="loginFailed"
          //just for example the right parameter is like this isVisible={this.props.isVisible}
          isVisible={this.state.failed}
          closeSection={true}
          closeSectionUpdate={this.isVisibleUpdate}
          title={this.state.title}
          message={this.state.message}
          url={this.state.url}
        >
        </Popup>
      )
    }
  }

  render() {
    console.warn('ThisVersion -' + parseInt(this.state.thisVersion.substring(4, 10)));     // this version check
    console.warn('appStoreVersion -' + parseInt(this.state.appstoreVersion.substring(4, 10)));     // AppStore version check
    console.warn("props: " + JSON.stringify(this.props, null, 4))
    console.warn("TOKEN " + Config.NEW_ACCESS_TOKEN)

    return (
      <Container>
        {this.renderError()}
        <KeyboardAvoidingView behavior="padding" enabled>

          <Logo />

          {this.state.showUpdateNotif ? <IDChangeNotif /> : null}

          <InputWithButton
            onChangeText={(text) => this.setState({ username: text })}
            placeholder="Mobile Number"
            autoCapitalize='none'
            returnKeyType={"next"}
            keyboardType={'numeric'}
          />
          <InputWithButton
            onChangeText={(text) => this.setState({ password: text })}
            placeholder="Password"
            secureTextEntry={true}
            autoCapitalize='none'
          />
          <View>
            <Buttons2 disabled={this.state.failed} activeOpacity={this.state.failed ? 1 : 0.7} onPress={() => this.LoginHandler()}>
              {this.state.button}
            </Buttons2>
          </View>
        </KeyboardAvoidingView>

        {/* <View style={{ width: '75%' }}>
          <Buttons disabled={this.state.failed} activeOpacity={this.state.failed ? 1 : 0.7} onPress={() => this.LoginHandler()}>
            {this.state.button}
          </Buttons>
        </View> */}
        <TouchableOpacity onPress={() => Actions.Forgot({ type: 'reset' })}>
          <Text style={{ color: '#0392cf', fontFamily: 'helvetica' }}>
            Forgot password?
          </Text>
        </TouchableOpacity>
      </Container>
    );
  }
}

export default Login;
