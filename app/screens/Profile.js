import React, { Component } from 'react';
import { StatusBar, View, TouchableOpacity } from 'react-native';
import { Container, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as Config from '../config';
import Navbar from '../components/common/Navbar';
import Icons from 'react-native-vector-icons/FontAwesome';

class Profile extends Component {
  _renderDivider() {
    return (
      <View
        style={{
          borderWidth: 0.5,
          borderColor: '#6c6c6c',
          marginBottom: '5%',
          marginTop: '2%',
        }}
      />
    );
  }

  render() {
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar leftNav="back" />
        <View style={{ marginTop: '5%' }}>
          <TouchableOpacity
            onPress={() =>
              Actions.ManageProfile({
                type: 'reset',
              })
            }
          >
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text
                style={{
                  color: '#b3b3b3',
                  marginLeft: '2%',
                  fontFamily: Config.FONT_FAMILY_LIGHT,
                  fontSize: 14,
                }}
              >
                Manage Profile
              </Text>
              <Icons
                name="angle-right"
                style={{
                  color: '#0392cf',
                  fontSize: 25,
                  paddingEnd: '4%',
                }}
              />
            </View>
          </TouchableOpacity>
          {this._renderDivider()}

          <TouchableOpacity>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text
                style={{
                  color: '#b3b3b3',
                  marginLeft: '2%',
                  fontFamily: Config.FONT_FAMILY_LIGHT,
                  fontSize: 14,
                }}
              >
                Update Password
              </Text>
              <Icons
                name="angle-right"
                style={{
                  color: '#0392cf',
                  fontSize: 25,
                  paddingEnd: '4%',
                }}
              />
            </View>
          </TouchableOpacity>
          {this._renderDivider()}

          <TouchableOpacity>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text
                style={{
                  color: '#b3b3b3',
                  marginLeft: '2%',
                  fontFamily: Config.FONT_FAMILY_LIGHT,
                  fontSize: 14,
                }}
              >
                Disable Profile
              </Text>
              <Icons
                name="angle-right"
                style={{
                  color: '#0392cf',
                  fontSize: 25,
                  paddingEnd: '4%',
                }}
              />
            </View>
          </TouchableOpacity>
          {this._renderDivider()}

          <TouchableOpacity>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text
                style={{
                  color: '#b3b3b3',
                  marginLeft: '2%',
                  fontFamily: Config.FONT_FAMILY_LIGHT,
                  fontSize: 14,
                }}
              >
                Logout
              </Text>
              <Icons
                name="angle-right"
                style={{
                  color: '#0392cf',
                  fontSize: 25,
                  paddingEnd: '4%',
                }}
              />
            </View>
          </TouchableOpacity>
          {this._renderDivider()}
        </View>
      </Container>
    );
  }
}

export default Profile;
