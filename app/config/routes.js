import React, { Component } from 'react';
import { BackHandler, SafeAreaView, Animated, Easing } from 'react-native';
import { Scene, Router, Stack, Actions } from 'react-native-router-flux';
import PushNotification from 'react-native-push-notification';

import Logins from '../screens/Login';
import Forgot from '../screens/ForgotPassword';
import EmailSend from '../screens/EmailSend';
import ThanksEclaim from '../screens/ThanksEclaim';
import HealthProvider from '../screens/HealthProvider';
import InNetworkBenefits from '../screens/InNetworkBenefit';
import ReceiptVerification from '../screens/ReceiptVerification';
import DetailEclaim from '../screens/DetailEclaim';
import EclaimSubmit from '../screens/EclaimFormSubmit';
import SettingWallet from '../screens/WalletSetting';
import BankList from '../screens/BankList';
import Member from '../screens/Member';
import HistoryDentalCare from '../screens/HistoryDentalCare';
import HistoryChieneseMedicine from '../screens/HistoryChieneseMedicine';
import HistoryGeneral from '../screens/HistoryGeneral';
import HistoryReject from '../screens/RejectHistory';
import HistoryTransaction from '../screens/HistoryTransaction';
import ScanPay from '../screens/ScanPay';
import BenefitsDollar from '../screens/BenefitsDollar';
import Summary from '../screens/Summary';
import Balance from '../screens/Balance';
import SelectService from '../screens/SelectService';
import Homes from '../screens/Home';
import Splash from '../screens/Splash';
import Barcode from '../screens/Barcode';
import GeneralPractitioner from '../screens/GeneralPractitioner';
import ECardUser from '../screens/ECardUser';
import SwitchUser from '../screens/SwitchUser';
import HomeStatic from '../screens/HomeStatic';
import ManageProfile from '../screens/manageProfile';
import Profile from '../screens/Profile';
import Favourites from '../screens/Favourites';
import DetailEclaimTransaction from '../screens/DetailEClaim_Transaction';
import Updatepassword from '../screens/Updatepassword';
import Camera from '../screens/Camera'
import Search from '../screens/Search'
import DetailClinic from '../screens/Detailclinic';
import Paycash from '../screens/PayCash';
import NearbyClinic from '../screens/NearbyClinic';
import NearbyClinicMaps from '../screens/NearbyClinicMaps';
import ConfirmPay from '../screens/ConfirmPay';
import MedicalCondition from '../screens/MedicalCondition';
import MedicalAllergies from '../screens/MedicalAllergies';
import MedicalHistory from '../screens/MedicalHistory';
import MedicalMedications from '../screens/MedicalMedications';
import MedicalHistoryAdd from '../screens/MedicalHistoryAdd';
import MedicalMedicationsAdd from '../screens/MedicalMedicationsAdd';
import MedicalConditionAdd from '../screens/MedicalConditionAdd';
import MedicalAllergiesAdd from '../screens/MedicalAllergiesAdd';
import HomeSearch from '../screens/HomeSearch';
import Wallet from '../screens/Wallet';
import WalletWellness from '../screens/WalletWellness';
import HistoryTransactionWallet from '../screens/HistoryTransactionWallet';
import checkinUser from '../screens/checkinUser';
import SelectList from '../screens/SelectList';

console.disableYellowBox = true;

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 600,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { position, layout, scene, index, scenes } = sceneProps

      const thisSceneIndex = scene.index
      const height = layout.initHeight
      const width = layout.initWidth

      // We can access our navigation params on the scene's 'route' property
      var thisSceneParams = scene.route.params || {}

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [width, 0, 0]
      })

      const translateY = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [height, 0, 0]
      })

      const opacity = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex - 0.5, thisSceneIndex],
        outputRange: [0, 1, 1],
      })

      const scale = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [4, 1, 1]
      })

      const slideFromRight = { transform: [{ translateX }] }
      const scaleWithOpacity = { opacity, transform: [{ scaleX: scale }, { scaleY: scale }] }
      const slideInFromBottom = { transform: [{ translateY }] }

      return slideFromRight
    },
  }
}

class RouterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doubleBackToExitPressedOnce: false
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    PushNotification.configure({

      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);

        // process the notification

        // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: "864568376301",

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
        * (optional) default: true
        * - Specified if permissions (ios) and token (android and ios) will requested or not,
        * - if not, you must call PushNotificationsHandler.requestPermissions() later
        */
      requestPermissions: true,
    });
  }

  componentWillMount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  onButtonPress = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    if (Actions.currentScene !== 'Home') {
      Actions.pop();
      return true;
    } else {
      BackHandler.exitApp();
      return true;
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#0392cf' }}>
        <Router backAndroidHandler={this.handleBackButton} >
          <Stack
            key="root"
            gesturesEnabled={false}
            transitionConfig={transitionConfig}
          >
            <Scene key="Splash" component={Splash} hideNavBar />
            <Scene key="Login" component={Logins} hideNavBar />
            <Scene key="Forgot" component={Forgot} hideNavBar />
            <Scene key="Home" component={Homes} hideNavBar />
            <Scene key="SelectService" component={SelectService} hideNavBar />
            <Scene key="Balance" component={Balance} hideNavBar />
            <Scene key="Summary" component={Summary} hideNavBar />
            <Scene key="BenefitsDollar" component={BenefitsDollar} hideNavBar />
            <Scene key="PayScan" component={ScanPay} hideNavBar />
            <Scene
              key="HistoryTransaction"
              component={HistoryTransaction}
              hideNavBar
            />
            <Scene
              key="HistoryTransactionWallet"
              component={HistoryTransactionWallet}
              hideNavBar
            />
            <Scene key="HistoryReject" component={HistoryReject} hideNavBar />
            <Scene key="HistoryGeneral" component={HistoryGeneral} hideNavBar />
            <Scene
              key="HistoryChieneseMedicine"
              component={HistoryChieneseMedicine}
              hideNavBar
            />
            <Scene
              key="HistoryDentalCare"
              component={HistoryDentalCare}
              hideNavBar
            />
            <Scene key="BankList" component={BankList} hideNavBar />
            <Scene key="Member" component={Member} hideNavBar />
            <Scene key="SettingWallet" component={SettingWallet} hideNavBar />
            <Scene key="EclaimSubmit" component={EclaimSubmit} hideNavBar />
            <Scene key="DetailEclaim" component={DetailEclaim} hideNavBar />
            <Scene
              key="ReceiptVerification"
              component={ReceiptVerification}
              hideNavBar
            />
            <Scene
              key="InNetworkBenefits"
              component={InNetworkBenefits}
              hideNavBar
            />
            <Scene key="HealthProvider" component={HealthProvider} hideNavBar />
            <Scene key="ThanksEclaim" component={ThanksEclaim} hideNavBar />
            <Scene key="EmailSend" component={EmailSend} hideNavBar />
            <Scene key="Barcode" component={Barcode} hideNavBar />
            <Scene
              key="GeneralPractitioner"
              component={GeneralPractitioner}
              hideNavBar
            />
            <Scene key="ECardUser" component={ECardUser} hideNavBar />
            <Scene key="SwitchUser" component={SwitchUser} hideNavBar />
            <Scene key="HomeStatic" component={HomeStatic} hideNavBar />
            <Scene key="ManageProfile" component={ManageProfile} hideNavBar />
            <Scene key="Profile" component={Profile} hideNavBar />
            <Scene key="Favourites" component={Favourites} hideNavBar />
            <Scene key="DetailEclaimTransaction" component={DetailEclaimTransaction} hideNavBar />
            <Scene key="Updatepassword" component={Updatepassword} hideNavBar />
            <Scene key="Camera" component={Camera} hideNavBar />
            <Scene key="Search" component={Search} hideNavBar />
            <Scene key="DetailClinic" component={DetailClinic} hideNavBar />
            <Scene key="Paycash" component={Paycash} hideNavBar />
            <Scene key="NearbyClinic" component={NearbyClinic} hideNavBar />
            <Scene key="NearbyClinicMaps" component={NearbyClinicMaps} hideNavBar />
            <Scene key="ConfirmPay" component={ConfirmPay} hideNavBar />
            <Scene key="MedicalCondition" component={MedicalCondition} hideNavBar />
            <Scene key="MedicalAllergies" component={MedicalAllergies} hideNavBar />
            <Scene key="MedicalHistory" component={MedicalHistory} hideNavBar />
            <Scene key="MedicalMedications" component={MedicalMedications} hideNavBar />
            <Scene key="MedicalHistoryAdd" component={MedicalHistoryAdd} hideNavBar />
            <Scene key="MedicalMedicationsAdd" component={MedicalMedicationsAdd} hideNavBar />
            <Scene key="MedicalConditionAdd" component={MedicalConditionAdd} hideNavBar />
            <Scene key="MedicalAllergiesAdd" component={MedicalAllergiesAdd} hideNavBar />
            <Scene key="HomeSearch" component={HomeSearch} hideNavBar />
            <Scene key="Wallet" component={Wallet} hideNavBar />
            <Scene key="WalletWellness" component={WalletWellness} hideNavBar />
            <Scene key="checkinUser" component={checkinUser} hideNavBar />
            <Scene key="SelectList" component={SelectList} hideNavBar />
          </Stack>
        </Router>
      </SafeAreaView>
    );
  }
}

export default RouterComponent;
