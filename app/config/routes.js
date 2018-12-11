import React, { Component } from 'react';
import { Scene, Router, Stack } from 'react-native-router-flux';
import { Button, Icon } from 'native-base';

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
import ECardUserStatic from '../screens/ECardUserStatic';

// console.disableYellowBox = true;

class RouterComponent extends Component {
  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene key="Splash" component={Splash} hideNavBar />
          <Scene key="Login" component={Logins} hideNavBar />
          <Scene key="Forgot" component={Forgot} hideNavBar />
          <Scene key="Home" component={Homes} hideNavBar />
          <Scene key="SelectService" component={SelectService} hideNavBar />
          <Scene key="Balance" component={Balance} hideNavBar  />
          <Scene key="Summary" component={Summary} hideNavBar />
          <Scene key="BenefitsDollar" component={BenefitsDollar} hideNavBar />
          <Scene key="PayScan" component={ScanPay} hideNavBar />
          <Scene
            key="HistoryTransaction"
            component={HistoryTransaction}
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
          <Scene key="ECardUserStatic" component={ECardUserStatic} hideNavBar />
        </Stack>
      </Router>
    );
  }
}

export default RouterComponent;
