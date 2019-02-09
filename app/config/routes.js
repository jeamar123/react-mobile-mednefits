import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
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
// import MapView from '../components/MapView/MapView';
import MedicalCondition from '../screens/MedicalCondition';
import MedicalAllergies from '../screens/MedicalAllergies';
import MedicalHistory from '../screens/MedicalHistory';
import MedicalMedications from '../screens/MedicalMedications';

console.disableYellowBox = true;

class RouterComponent extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#0392cf' }}>
        <Router>
          <Stack key="root">
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
            <Scene key="ManageProfile" component={ManageProfile} hideNavBar />
            <Scene key="Profile" component={Profile} hideNavBar />
            <Scene key="Favourites" component={Favourites} hideNavBar />
            <Scene key="DetailEclaimTransaction" component={DetailEclaimTransaction} hideNavBar />
            <Scene key="Updatepassword" component={Updatepassword} hideNavBar />
            <Scene key="Camera" component={Camera} hideNavBar />
            <Scene key="Search" component={Search} hideNavBar />
            <Scene key="DetailClinic" component={DetailClinic} hideNavBar />
            <Scene key="Camera" component={Camera} hideNavBar />
            <Scene key="Paycash" component={Paycash} hideNavBar />
            <Scene key="NearbyClinic" component={NearbyClinic} hideNavBar />
            <Scene key="NearbyClinicMaps" component={NearbyClinicMaps} hideNavBar />
            <Scene key="ConfirmPay" component={ConfirmPay} hideNavBar />
            {/* <Scene key="MapView" component={MapView} hideNavBar /> */}
            <Scene key="MedicalCondition" component={MedicalCondition} hideNavBar />
            <Scene key="MedicalAllergies" component={MedicalAllergies} hideNavBar />
            <Scene key="MedicalHistory" component={MedicalHistory} hideNavBar />
            <Scene key="MedicalMedications" component={MedicalMedications} hideNavBar />


          </Stack>
        </Router>
      </SafeAreaView>
    );
  }
}

export default RouterComponent;
