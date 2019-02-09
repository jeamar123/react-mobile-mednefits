import React, { Component } from 'react';
import {
  StatusBar,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Text, Drawer, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Navbar from '../components/common/Navbar';
import { ButtonCall } from '../components/common/ButtonCall';
import * as Config from '../config';
import * as Core from '../core';

class MedicalMedications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idTransaction: '0',
      date: '',
      customerName: '',
      price: '',
      status: '',
      resultData: [],
      DataE_Claim: [],
      data: false,
      medication: [],
    };
    this.drawerActionCallback = this.drawerActionCallback.bind(this);
  }

  closeDrawer() {
    this._drawer._root.close();
  }

  openDrawer() {
    this._drawer._root.open();
  }

  drawerActionCallback(callback) {
    if (callback == true) {
      this.openDrawer();
    }
  }

  componentWillMount() {
    this.getFavorites_Clinic();
    this.GetMedicalMedications();
  }

  getFavorites_Clinic() {
    Core.GetFavouritesClinic((error, result) => {
      data =
        typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      this.setState({ resultData: data, data: true });
    });
  }

  GetMedicalMedications() {
    Core.UserDetail((error, result) => {
      data =
        typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      console.warn(data);
      this.setState({
        Full_name: data.profile.full_name,
        nirc_number: data.profile.nric,
        email: data.profile.email,
        PhoneNumber: data.profile.mobile_phone,
        Dob: data.profile.dob,
        Weight: data.profile.weight,
        Height: data.profile.height,
        bmi: data.profile.bmi,
        blodeType: data.profile.blood_type,
        photo_url: data.profile.photo_url,
        history: data.history,
        allergies: data.allergies,
        medCondition: data.conditions,
        medication: data.medications
      });
    });
  }

  delMedical_Medication(medication_id) {
    Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
      console.warn(result)
      if (result) {
        fetch(Config.AUTH_DELETE_MEDICATION + '?value=' + medication_id, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': result,
          }
        })
          .then(response => response.json())
          .then(res => {
            console.warn(medication_id);
            if (res.status == true) {
              Core.getNotify('', 'Success Delete Data');
              Actions.MedicalMedications();
            } else {
              Core.getNotify('', 'Failed Delete Data');
            }
          })
          .catch(error => {
            console.warn('error fetching', error.message);
          });
      } else {
        console.warn("else");
        // Actions.login({ type: 'reset' });
      }
    });
  }

  renderMedicalMedications() {
    return this.state.medication.map((Data, index) => (

      <View
        style={{
          flex: 1,
          marginTop: 5,
          marginBottom: 10,
          height: 50,
          backgroundColor: '#fff',
          opacity: 10000,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            marginTop: '2%',
            width: '38%',
            marginLeft: 5,
            marginRight: 5
          }}
        >
          <Text
            style={{
              fontFamily: Config.FONT_FAMILY_ROMAN,
              fontSize: 16,
              marginTop: 5,
              marginLeft: 5,
              width: '100%',
            }}
          >
            {Data.name}
          </Text>
          <Text
            style={{
              fontFamily: Config.FONT_FAMILY_LIGHT,
              fontSize: 14,
              paddingLeft: '15%',
              marginTop: 5,
              width: '100%',
            }}
          >
            {Data.dosage}
          </Text>
          <TouchableOpacity
            onPress={() =>
              this.delMedical_Medication(Data.medication_id)
            }
            style={{
              paddingTop: 2,
              paddingBottom: 4,
              backgroundColor: '#ED153F',
              borderRadius: 5,
              alignSelf: 'center',
              width: '45%'
            }}
          >
            <Text
              style={{
                fontFamily: Config.FONT_FAMILY_ROMAN,
                color: '#fff',
                alignSelf: 'center',
                fontSize: 14,
              }}
            > DELETE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    ));
  }


  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar
          drawerAction={this.drawerActionCallback}
          leftNav="back"
          rightNav="Adding-Medications"
        />

        {(!this.state.data) ? (
          <View
            style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
          >
            <ActivityIndicator size="large" color="#0392cf" />
          </View>
        ) : (
            <View
              style={{
                flex: 1,
                marginLeft: '2%',
                marginRight: '2%',
                marginTop: '2%',
              }}
            >
              <ScrollView>
                {this.renderMedicalMedications()}
              </ScrollView>
            </View>

          )}

      </View>
    );
  }
}

export default MedicalMedications;
