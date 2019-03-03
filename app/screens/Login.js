import React, { Component } from 'react';
import { StatusBar, Text, TouchableOpacity, KeyboardAvoidingView, Platform, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { InputWithButton } from '../components/TextInput';
import { Buttons2, Popup } from '../components/common';
import * as Core from '../core'
import Toast from 'react-native-simple-toast';

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
      button: 'Log in'
    };
    this.isVisibleUpdate = this.isVisibleUpdate.bind(this);
  }

  isVisibleUpdate() {
    this.setState({ failed: false })
  }

  LoginHandler() {
    this.setState({ isLoading: true, button: 'Logging in...' })

    Core.LoginProcess(this.state.username, this.state.password, (err, result) => {
      // console.log(err)
      // console.log(result);
      if (result) {
        this.setState({ isLoading: false, failed: false, button: 'Log in' })
        Actions.Home({ type: 'reset' });
      } else {
        // Toast.show(err.error_description, Toast.LONG);
        this.setState({ failed: true, title: 'Login Failed', message: err.error_description, isLoading: false, button: 'Log in' })
        // Core.getNotify('', err.error_description);
      }
    })

    // setTimeout(()=>{
    //   this.setState({isLoading: !this.state.isLoading})
    // },500)
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
      console.log('called')
      return (
        <Popup
          kind="loginFailed"
          //just for example the right parameter is like this isVisible={this.props.isVisible}
          isVisible={this.state.failed}
          closeSection={true}
          closeSectionUpdate={this.isVisibleUpdate}
          title={this.state.title}
          message={this.state.message}
        >
        </Popup>
      )
    }
  }

  render() {
    return (
      <Container>
        {this.renderError()}
        <KeyboardAvoidingView behavior="padding" enabled>

          <Logo />
          <InputWithButton
            onChangeText={(text) => this.setState({ username: text })}
            placeholder="Email or NRIC"
            autoCapitalize='none'
            returnKeyType={"next"}
          />
          <InputWithButton
            onChangeText={(text) => this.setState({ password: text })}
            placeholder="Password"
            secureTextEntry={true}
            autoCapitalize='none'
          />
          <View >
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
