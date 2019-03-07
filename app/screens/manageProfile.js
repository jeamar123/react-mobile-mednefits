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
import { RNS3 } from 'react-native-aws3';
import ImagePicker from 'react-native-image-picker';
import DatePicker from 'react-native-datepicker-latest';
const options = {
  title: 'Upload Profile Image',
  takePhotoButtonTitle: 'Take a Photo',
  chooseFromLibraryButtonTitle: 'Choose from Gallery',
  quality: 1,
};
import { getNotify, getAlert } from '../components/common/Notify';
import * as Core from '../core';
import * as Config from '../config';
import * as Common from '../components/common';
import Navbar from '../components/common/Navbar';
import { ButtonProfile } from '../components/common/ButtonProfile';

class manageProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FullName: '',
      email: '',
      nirc_number: '',
      PhoneNumber: '',
      Dob: '',
      Weight: '',
      Height: '',
      bmi: '',
      blodeType: '',
      history: [],
      allergies: [],
      medCondition: [],
      medication: [],
      loaderProcess: false,
    };
    this.updateProfile = this.updateProfile.bind(this);
  }

  componentWillMount() {
    this.GetDataProfile();
  }

  GetDataProfile() {
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

  UpdateDataUser(callback) {
    full_name = this.state.Full_name;
    email = this.state.email;
    nric = this.state.nirc_number;
    mobile_phone = this.state.PhoneNumber;
    dob = this.state.Dob;
    weight = this.state.Weight;
    height = this.state.Height;
    bmi = this.state.bmi;
    blood_type = this.state.blodeType;
    // photo_url = this.state.photo_url;
    this.setState({ loaderProcess: true });
    try {
      Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
        if (result) {
          fetch(Config.AUTH_UPDATE, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: result,
            },
            body: JSON.stringify({
              full_name: full_name,
              email: email,
              nric: nric,
              mobile_phone: mobile_phone,
              dob: dob,
              weight: weight,
              height: height,
              bmi: bmi,
              blood_type: blood_type,
            }),
          })
            .then(response => response.json())
            .then(res => {
              this.setState({ loaderProcess: false });
              console.warn(res);
              if (res.status == true) {
                Core.getNotify('', res.message);
              } else {
                Core.getAlert('Ooops', res.message, null, true);
              }
            })
            .catch(error => {
              this.setState({ loaderProcess: false });
              console.warn('error fetching', error.message);
            });
        } else {
          Actions.login({ type: 'reset' });
          this.setState({ loaderProcess: false });
        }
      });
    } catch (e) {
      this.setState({ loaderProcess: false });
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
          // marginTop: '-2%',
          marginBottom: '5%',
        }}
      />
    );
  }

  selectPhoto() {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.warn('User cancelled image picker');
      } else if (response.error) {
        console.warn('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.warn('User tapped custom button: ', response.customButton);
      } else {
        let source = { uri: response.uri };
        this.setState({ imageSource: source, photo_url: response.uri, loaderProcess: true });

        const file = {
          uri: response.uri,
          name: 'profilePicture',
          type: 'image/jpeg',
        };

        const options = {
          keyPrefix: 'profile/',
          bucket: Config.AWS_BUCKET,
          region: Config.AWS_REGION,
          accessKey: Config.AWS_KEY,
          secretKey: Config.AWS_SECRET,
          successActionStatus: 201,
        };

        Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
          let myHeaders = new Headers();
          let formdata = new FormData();

          myHeaders.append('Authorization', result);
          // myHeaders.append('Content-Type', 'multipart/form-data');
          formdata.append("file", file)

          params = {
            url: Config.AUTH_UPDATE,
            method: 'POST',
            header: myHeaders,
            body: formdata,
            mode: 'cors',
            cache: 'default',
            bodyType: 'multipart'
          };

          fetch(Config.AUTH_UPDATE, {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
          })
            .then(response => response.json())
            .then(res => {
              this.setState({ loaderProcess: false });
              console.warn(res);
              // if (res.status == true) {
              //   Core.getNotify('', 'Success update data');
              // } else {
              Core.getNotify('', res.message);
              // }
            })
            .catch(error => {
              console.warn('error fetching', error.message);
            });
        });

        // RNS3.put(file, options)
        //   .progress(e =>
        //     this.setState({
        //       profileProgress: ((e.loaded / e.total) * 100).toFixed(0),
        //     })
        //   )
        //   .then(response => {
        //     if (response.status == 201) {
        //       if (response.body.postResponse.location) {
        //         if (
        //           this.state.photo_url == '' ||
        //           this.state.photo_url == undefined ||
        //           this.state.photo_url == null
        //         ) {
        //           photo = '';
        //         } else {
        //           photo = this.state.photo_url;
        //         }

        //         idData = {
        //           photo: photo,
        //           ktp: response.body.postResponse.location,
        //         };

        //         this.setState({ foto: response.body.postResponse.location });

        //         this.UpdateDataUser(response => {
        //           Common.getNotify('', 'update profile photo success');
        //         });
        //         // console.warn('selesai update');
        //       } else {
        //         console.warn('failed to get location');
        //       }
        //     } else {
        //       getNotify('', 'Failed to update profile photo');
        //     }
        //   });
      }
    });
  }

  showPhotoProfile() {
    console.warn('profil ' + this.state.photo_url);
    try {
      return (
        <TouchableOpacity onPress={() => this.selectPhoto()}>
          <Image
            style={{ height: 100, width: 100, borderRadius: 100 / 2 }}
            source={{
              uri:
                this.state.photo_url == false ||
                  this.state.photo_url == '' ||
                  this.state.photo_url == undefined
                  ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8PrT2WeBH8Y0D1s_IwjZpzva_q5Z6oujfJuSgzGhCBmd7sSlp'
                  : this.state.photo_url,
            }}
            onError={() => this.errorLoad()}
          />
        </TouchableOpacity>
      );
    } catch (e) {
      return (
        <TouchableOpacity onPress={() => this.selectPhoto()}>
          <Image
            style={{ height: 100, width: 100, borderRadius: 100 / 2 }}
            source={{
              uri:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8PrT2WeBH8Y0D1s_IwjZpzva_q5Z6oujfJuSgzGhCBmd7sSlp',
            }}
            onError={() => this.errorLoad()}
          />
        </TouchableOpacity>
      );
    }
  }

  updateProfile(result) {
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
          rightNav="update-profile"
          updateProfile={this.updateProfile}
          onLoaderProcess={this.state.loaderProcess}
        />
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          {this.showPhotoProfile()}
        </View>

        {/* <ProfileManage photo_url={this.state.photo_url} /> */}
        <GiftedForm
          style={{
            backgroundColor: '#fff',
            paddingLeft: '5%',
            paddingRight: '5%',
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
                width: '80%',
                fontFamily: Config.FONT_FAMILY_ROMAN,
              }}
              value={this.state.Full_name ? this.state.Full_name : ''}
              onChangeText={text => this.setState({ Full_name: text })}
              placeholder="Name"
            />
            <Text
              style={{
                color: '#c4c4c4',
                marginLeft: '2%',
                fontFamily: Config.FONT_FAMILY_LIGHT,
                fontSize: 13,
              }}
            >
              Name
            </Text>
          </View>
          {this._renderDivider()}

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <TextInput
              placeholder="Phone Number"
              underlineColorAndroid="transparent"
              style={{
                // marginTop: '-4%',
                width: '40%',
                fontFamily: Config.FONT_FAMILY_ROMAN,
              }}
              value={this.state.PhoneNumber ? this.state.PhoneNumber : ''}
              onChangeText={text => this.setState({ PhoneNumber: text })}
            />
            <Text
              style={{
                color: '#c4c4c4',
                marginLeft: '2%',
                fontFamily: Config.FONT_FAMILY_LIGHT,
                fontSize: 13,
              }}
            >
              Phone
            </Text>
          </View>
          {this._renderDivider()}

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <TextInput
              placeholder="NIRC Number"
              underlineColorAndroid="transparent"
              style={{
                // marginTop: '-4%',
                width: '40%',
                fontFamily: Config.FONT_FAMILY_ROMAN,
              }}
              value={this.state.nirc_number ? this.state.nirc_number : ''}
              onChangeText={text => this.setState({ nirc_number: text })}
            />
            <Text
              style={{
                color: '#c4c4c4',
                marginLeft: '2%',
                fontFamily: Config.FONT_FAMILY_LIGHT,
                fontSize: 13,
              }}
            >
              NIRC Number
            </Text>
          </View>
          {this._renderDivider()}

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <DatePicker
              style={{
                fontFamily: Config.FONT_FAMILY_ROMAN,
              }}
              date={
                this.state.Dob == '0000-00-00'
                  ? '1993-08-30'
                  : this.state.Dob
              }
              mode="date"
              placeholder="00-00-0000"
              format="DD-MM-YYYY"
              minDate="30-01-1945"
              maxDate="30-12-2002"
              confirmBtnText="Oke"
              cancelBtnText="Batal"
              customStyles={{
                dateIcon: { width: 0, height: 0 },
                dateInput: {
                  color: '#38424B',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  marginLeft: '4%',
                  borderWidth: 0,
                  marginBottom: 10,
                },
                placeholderText: {
                  color: '#38424B',
                  fontFamily: Config.FONT_FAMILY_ROMAN,
                  fontSize: 14,
                  lineHeight: 30,
                },
                dateText: {
                  color: '#38424B',
                  fontFamily: Config.FONT_FAMILY_ROMAN,
                  fontSize: 14,
                  lineHeight: 30,
                },
              }}
              onDateChange={date => this.setState({ Dob: date })}
            />

            <Text
              style={{
                color: '#c4c4c4',
                marginLeft: '2%',
                fontFamily: Config.FONT_FAMILY_LIGHT,
                fontSize: 13,
              }}
            >
              Date of Birth
            </Text>
          </View>
          {this._renderDivider()}

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <TextInput
              placeholder="0.0"
              underlineColorAndroid="transparent"
              style={{
                // marginTop: '-4%',
                width: '40%',
                fontFamily: Config.FONT_FAMILY_ROMAN,
              }}
              value={`${this.state.Weight}` ? `${this.state.Weight}` : ''}
              onChangeText={text => this.setState({ Weight: text })}
            />
            <Text
              style={{
                color: '#c4c4c4',
                marginLeft: '2%',
                fontFamily: Config.FONT_FAMILY_LIGHT,
                fontSize: 13,
              }}
            >
              Weight (KG)
            </Text>
          </View>
          {this._renderDivider()}

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <TextInput
              placeholder="0.0"
              underlineColorAndroid="transparent"
              style={{
                // marginTop: '-4%',
                width: '40%',
                fontFamily: Config.FONT_FAMILY_ROMAN,
              }}
              value={`${this.state.Height}` ? `${this.state.Height}` : ''}
              onChangeText={text => this.setState({ Height: text })}
            />
            <Text
              style={{
                color: '#c4c4c4',
                marginLeft: '2%',
                fontFamily: Config.FONT_FAMILY_LIGHT,
                fontSize: 13,
              }}
            >
              Height (CM)
            </Text>
          </View>
          {this._renderDivider()}

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <TextInput
              placeholder="Blood Type"
              underlineColorAndroid="transparent"
              style={{
                // marginTop: '-4%',
                width: '40%',
                fontFamily: Config.FONT_FAMILY_ROMAN,
              }}
              value={this.state.blodeType ? this.state.blodeType : ''}
              onChangeText={text => this.setState({ blodeType: text })}
            />
            <Text
              style={{
                color: '#c4c4c4',
                marginLeft: '2%',
                fontFamily: Config.FONT_FAMILY_LIGHT,
                fontSize: 13,
              }}
            >
              Blood Type
            </Text>
          </View>
          {this._renderDivider()}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: '3%',
            }}
          >
            <Text />
            <Text />
            <Text />
            <Text
              style={{
                justifyContent: 'flex-end',
                fontSize: 36,
                fontFamily: Config.FONT_FAMILY_ROMAN,
                color: '#8fd8f7',
              }}
            >
              {this.state.history !== null ? this.state.history.length : '0'}
            </Text>
            <ButtonProfile onPress={() => Actions.MedicalHistory()}>Medical History</ButtonProfile>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: '3%',
            }}
          >
            <Text />
            <Text />
            <Text />
            <Text
              style={{
                justifyContent: 'flex-end',
                fontSize: 36,
                fontFamily: Config.FONT_FAMILY_ROMAN,
                color: '#8fd8f7',
              }}
            >
              {this.state.allergies !== null ? this.state.allergies.length : '0'}
            </Text>
            <ButtonProfile onPress={() => Actions.MedicalAllergies()}>Allergies</ButtonProfile>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: '3%',
            }}
          >
            <Text />
            <Text />
            <Text />
            <Text
              style={{
                justifyContent: 'flex-end',
                fontSize: 36,
                fontFamily: Config.FONT_FAMILY_ROMAN,
                color: '#8fd8f7',
              }}
            >
              {this.state.medCondition !== null ? this.state.medCondition.length : '0'}
            </Text>
            <ButtonProfile onPress={() => Actions.MedicalCondition()} >Medical Conditions</ButtonProfile>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: '3%',
            }}
          >
            <Text />
            <Text />
            <Text />
            <Text
              style={{
                justifyContent: 'flex-end',
                fontSize: 36,
                fontFamily: Config.FONT_FAMILY_ROMAN,
                color: '#8fd8f7',
              }}
            >
              {this.state.medication !== null ? this.state.medication.length : '0'}
            </Text>
            <ButtonProfile onPress={() => Actions.MedicalMedications()}>Medications</ButtonProfile>
          </View>
        </GiftedForm>
      </Container>
    );
  }
}

export default manageProfile;
