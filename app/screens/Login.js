import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import VersionCheck from 'react-native-version-check';
import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { InputWithButton } from '../components/TextInput';
import { IDChangeNotif } from '../components/IDChangeNotif';
import { Buttons, Popup } from '../components/common';
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
      showUpdateNotif: true,
      url: null,
      thisVersion: VersionCheck.getCurrentVersion(),
      appstoreVersion: '',
      isLoading: false,
    };
    this.isVisibleUpdate = this.isVisibleUpdate.bind(this);
  }

  async componentDidMount() {
    await Core.GetLocationPermission(async (error, result) => {
      // await this.getClinicType()
    });
    //Get Pop Up
    if (parseInt(this.state.appstoreVersion.substring(4, 10)) == parseInt(this.state.thisVersion.substring(4, 10))) {
      console.warn('UP TO DATE')
    } else if (this.state.thisVersion.substring(4, 10) < this.state.appstoreVersion.substring(4, 10)) {
      Actions.updateApps({ type: 'reset' })
      console.warn('Updating...')
    } else {
      console.warn('Checking...')
    }

    await this.CheckToken();
  }

  async CheckToken() {
    New_token = await Core.GetDataLocalReturnNew('token');
    console.log("New_token__OnLogin " + New_token)
  }

  UNSAFE_componentWillMount() {
    //Version Check
    VersionCheck.getLatestVersion({
      provider: 'playStore'  // for Android
    })
      .then(latestVersion => {
        // console.warn('latest - ' + latestVersion);    // 0.1.2
        this.setState({
          appstoreVersion: latestVersion,
        })
      });
    // this.checkversion()

  }

  // checkversion = async () =
  //   version = await Core.CheckVersion()
  // }

  isVisibleUpdate() {
    this.setState({ failed: false })
  }

  LoginHandler() {
    this.setState({ isLoading: true })

    this.LoginOld();
    this.NEW_Login();
  }

  LoginOld() {
    Core.LoginProcess(this.state.username, this.state.password, (err, result) => {
      console.log(err)
      // console.log(result);
      this.setState({ isLoading: false })
      if (result) {
        Actions.Home({ type: 'reset' });
      } else {
        // Toast.show(err.error_description, Toast.LONG);
        this.setState({ failed: true, title: 'Login Failed', message: 'Invalid Credentials', url: err.url })
        // this.setState({ failed: true, title: 'Login Failed', message: 'Mobile Number or Password is Incorrect', url: err.url })
        // this.setState({ failed: true, title: 'Login Failed', message: 'Please enter your password' })
        // Core.getNotify('', err.error_description);
      }
    })

    // setTimeout(()=>{
    //   this.setState({isLoading: !this.state.isLoading})
    // },500)
  }

  NEW_Login() {
    console.log('start NEW_Login')
    Core.NEW_LoginProcess(this.state.username, this.state.password, (err, result) => {
      console.log('the result NEW_Login : ' + result)
      if (result) {
        this.setState({ isLoading: false })
        Actions.Home({ type: 'reset' });
      } else {
        this.setState({ failed: true, title: 'Login Failed', message: 'Invalid Credentials', url: err.url })
      }
    })
  }

  render() {
    console.warn('ThisVersion -' + parseInt(this.state.thisVersion.substring(4, 10)));     // this version check
    console.warn('appStoreVersion -' + parseInt(this.state.appstoreVersion.substring(4, 10)));     // AppStore version check
    console.warn("props: " + JSON.stringify(this.props, null, 4))
    return (
      <Container>
        <Core.Loader
          isVisible={this.state.isLoading}
        />
        <Popup
          kind="loginFailed"
          //just for example the right parameter is like this isVisible={this.props.isVisible}
          isVisible={this.state.failed}
          closeSection={true}
          closeSectionUpdate={this.isVisibleUpdate}
          title={this.state.title}
          message={this.state.message}
          url={this.state.url}
        />
        <Logo />

        {this.state.showUpdateNotif ? <IDChangeNotif /> : null}

        <InputWithButton
          onChangeText={(text) => this.setState({ username: text })}
          placeholder="Mobile Number"
          autoCapitalize='none'
          returnKeyType={"next"}
          keyboardType='numeric'
        />
        <InputWithButton
          onChangeText={(text) => this.setState({ password: text })}
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize='none'
        />
        <Buttons onPress={() => this.LoginHandler()}>
          Log in
        </Buttons>
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
