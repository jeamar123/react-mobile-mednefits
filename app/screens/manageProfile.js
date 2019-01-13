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
const options = {
  title: 'Upload Foto Profil Anda',
  takePhotoButtonTitle: 'Take a Photo',
  chooseFromLibraryButtonTitle: 'Choose from Gallery',
  quality: 1,
};
import { getNotify } from '../components/common/Notify';
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
      PhoneNumber: '',
      nirc_number: '',
      Dob: '',
      Weight: '',
      Height: '',
      blodeType: '',
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
        PhoneNumber: data.profile.mobile_phone,
        nirc_number: data.profile.nric,
        Dob: data.profile.dob,
        Weight: data.profile.weight,
        Height: data.profile.height,
        blodeType: data.profile.blood_type,
        clinicImage: data.profile.photo_url,
      });
    });
  }

  UpdateDataUser(callback) {
    full_name = this.state.Full_name;
    mobile_phone = this.state.PhoneNumber;
    nric = this.state.nirc_number;
    dob = this.state.Dob;
    weight = this.state.Weight;
    height = this.state.Height;
    blood_type = this.state.blodeType;
    // photo_url = this.state.photo_url;

    Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
      if (result) {
        fetch(Config.AUTH_UPDATE, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': result,
          },
          body: JSON.stringify({
            full_name: full_name,
            mobile_phone: mobile_phone,
            nric: nric,
            dob: dob,
            weight: weight,
            height: height,
            blood_type: blood_type,
          }),
        })
          .then(response => response.json())
          .then(res => {
            callback(res)
          })
          .catch(error => {
            console.warn('Mednefits', error.message);
          });
      } else {
        Actions.login({ type: 'reset' });
      }
    });
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
        this.setState({ imageSource: source });

        const file = {
          uri: response.uri,
          name: response.fileName,
          type: response.type,
        };

        const options = {
          keyPrefix: 'profile/',
          bucket: Config.AWS_BUCKET,
          region: Config.AWS_REGION,
          accessKey: Config.AWS_KEY,
          secretKey: Config.AWS_SECRET,
          successActionStatus: 201,
        };

        RNS3.put(file, options)
          .progress(e =>
            this.setState({
              profileProgress: ((e.loaded / e.total) * 100).toFixed(0),
            })
          )
          .then(response => {
            if (response.status == 201) {
              if (response.body.postResponse.location) {
                if ((this.state.profil == "") || (this.state.profil == undefined) || (this.state.profil == null)) {
                  photo = ""
                } else {
                  photo = this.state.profil
                }

                idData = {
                  photo: photo,
                  ktp: response.body.postResponse.location,
                };

                this.setState({ foto: response.body.postResponse.location });

                this.UpdateDataUser((response)=>{
                  Common.getNotify("","update profile photo success")
                });
                // console.warn('selesai update');
              } else {
                console.warn('failed to get location');
              }
            } else {
              getNotify("","Failed to update profile photo")
            }
          })
      }
    });
  }

  showPhotoProfile() {
    console.warn("profil "+this.props.profil);
    try {
      return (
        <TouchableOpacity
          onPress={()=>this.selectPhoto()}
          >
          <Image
            style={{ height: 100, width: 100, borderRadius: 100 / 2 }}
            source={{
              uri: ((this.props.profil == false) || (this.props.profil == "") || (this.props.profil == undefined))
                ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8PrT2WeBH8Y0D1s_IwjZpzva_q5Z6oujfJuSgzGhCBmd7sSlp'
                : this.props.profil,
            }}
            onError={()=>this.errorLoad()}
          />
        </TouchableOpacity>
      );
    } catch (e) {
      return(
        <TouchableOpacity
          onPress={()=>this.selectPhoto()}
          >
          <Image
            style={{ height: 100, width: 100, borderRadius: 100 / 2 }}
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8PrT2WeBH8Y0D1s_IwjZpzva_q5Z6oujfJuSgzGhCBmd7sSlp',
            }}
            onError={()=>this.errorLoad()}
          />
        </TouchableOpacity>
      )
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


        {/* <ProfileManage clinicimage={this.state.clinicImage} /> */}
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
                marginTop: '-4%',
                width: '40%',
                fontFamily: Config.FONT_FAMILY_ROMAN,
              }}
              value={this.state.Full_name ? this.state.Full_name : false}
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
                marginTop: '-4%',
                width: '40%',
                fontFamily: Config.FONT_FAMILY_ROMAN,
              }}
              value={this.state.PhoneNumber ? this.state.PhoneNumber : false}
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
                marginTop: '-4%',
                width: '40%',
                fontFamily: Config.FONT_FAMILY_ROMAN,
              }}
              value={this.state.nirc_number ? this.state.nirc_number : false}
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
            <TextInput
              placeholder="Date of Birth"
              underlineColorAndroid="transparent"
              style={{
                marginTop: '-4%',
                width: '40%',
                fontFamily: Config.FONT_FAMILY_ROMAN,
              }}
              value={this.state.Dob ? this.state.Dob : false}
              onChangeText={text => this.setState({ Dob: text })}
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
                marginTop: '-4%',
                width: '40%',
                fontFamily: Config.FONT_FAMILY_ROMAN,
              }}
              value={`${this.state.Weight}` ? `${this.state.Weight}` : false}
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
                marginTop: '-4%',
                width: '40%',
                fontFamily: Config.FONT_FAMILY_ROMAN,
              }}
              value={`${this.state.Height}` ? `${this.state.Height}` : false}
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
                marginTop: '-4%',
                width: '40%',
                fontFamily: Config.FONT_FAMILY_ROMAN,
              }}
              value={this.state.blodeType ? this.state.blodeType : false}
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
              1
            </Text>
            <ButtonProfile>Medical History</ButtonProfile>
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
              1
            </Text>
            <ButtonProfile>Alergies</ButtonProfile>
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
              1
            </Text>
            <ButtonProfile>Medical Conditions</ButtonProfile>
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
              1
            </Text>
            <ButtonProfile>Medications</ButtonProfile>
          </View>
        </GiftedForm>
      </Container>
    );
  }
}

export default manageProfile;
