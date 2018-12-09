import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { Icon, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Icons from 'react-native-vector-icons/FontAwesome';
import * as Core from '../../core';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Empat Kali',
      loading: false,
      right: false,
      left: false,
    };
  }

  componentWillMount() {
    if (this.props.leftNav) {
      this.setState({ left: true });
    }

    if (this.props.rightNav) {
      this.setState({ right: true });
    }
  }

  renderLeft() {
    if (this.props.type == 'reset') {
      return <View />;
    } else if (this.props.leftNav == 'back') {
      return (
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <TouchableOpacity
            onPress={() => Actions.Home()}
            style={{
              paddingStart: 11,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icons
              name="angle-left"
              style={{ color: '#fff', fontSize: 32, paddingEnd: 5 }}
            />
            <Text
              style={{ color: '#fff', fontSize: 14, fontFamily: 'Helvetica' }}
            >
              Back
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.leftNav == 'back-home') {
      return (
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <TouchableOpacity
            onPress={() => Actions.Home()}
            style={{
              paddingStart: 11,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icons
              name="angle-left"
              style={{ color: '#fff', fontSize: 32, paddingEnd: 5 }}
            />
            <Text
              style={{
                color: '#fff',
                fontSize: 14,
                fontFamily: 'HelveticaNeue-Roman',
              }}
            >
              Home
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.leftNav == 'cancel') {
      return (
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <TouchableOpacity
            onPress={() => Actions.Home()}
            style={{
              paddingStart: 15,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontSize: 14,
                fontFamily: 'HelveticaNeue-Roman',
                width: 50,
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.leftNav == 'null') {
      return (
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        />
      );
    } else {
      return (
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <TouchableOpacity
            style={{ paddingLeft: 15 }}
            onPress={() => this.props.drawerAction(true)}
          >
            <Icons name="bars" style={{ color: '#fff', fontSize: 32 }} />
          </TouchableOpacity>
        </View>
      );
    }
  }

  renderMiddle() {
    if (this.props.title && this.props.subtitle) {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Text
            style={{
              fontFamily: 'HelveticaNeue-Bold',
              color: '#fff',
              fontSize: 18,
            }}
          >
            {this.props.title}
          </Text>
          <Text
            style={{
              fontFamily: 'HelveticaNeue-Roman',
              color: '#fff',
              fontSize: 14,
            }}
          >
            {this.props.subtitle}
          </Text>
        </View>
      );
    } else if (this.props.title) {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Text
            style={{
              fontFamily: 'HelveticaNeue-Bold',
              color: '#fff',
              fontSize: 18,
            }}
          >
            {this.props.title}
          </Text>
        </View>
      );
    } else {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={require('../../../assets/MednefitsLogo.png')}
            style={{ height: 25, resizeMode: 'center', width: 155 }}
          />
        </View>
      );
    }
  }

  renderRight() {
    console.warn(this.props.rightNav);
    if (this.props.rightNav == true) {
      return (
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
        >
          <TouchableOpacity
            style={{ paddingEnd: '3%' }}
            onPress={() => Actions.SwitchUser()}
          >
            <Image
              source={require('../../../assets/apps/switch.png')}
              style={{ height: 55, resizeMode: 'center', width: 75 }}
            />
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.rightNav == 'done') {
      return (
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
        >
          <TouchableOpacity onPress={() => Actions.Home()}>
            <Text
              style={{
                fontFamily: 'HelveticaNeue-Roman',
                fontSize: 16,
                color: '#FFFFFF',
                marginRight: 10,
              }}
            >
              Done
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.rightNav == 'search') {
      return (
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
        >
          <TouchableOpacity>
            <Image
              source={require('../../../assets/apps/search.png')}
              style={{ height: 55, resizeMode: 'center', width: 75 }}
            />
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.rightNav == 'next') {
      return (
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
        >
          <TouchableOpacity onPress={() => Actions.Member()}>
            <Text
              style={{
                fontFamily: 'HelveticaNeue-Roman',
                fontSize: 16,
                color: '#FFFFFF',
                marginRight: 10,
              }}
            >
              Next
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
        >
          <Button transparent style={{ paddingLeft: 15 }} />
        </View>
      );
    }
  }

  render() {
    // console.warn(this.props.rightNav);
    return (
      <View style={{ flexDirection: 'column' }}>
        <View
          style={[
            styles.container,
            {
              justifyContent:
                !this.props.leftNav && !this.props.rightNav
                  ? 'center'
                  : 'space-between',
            },
          ]}
        >
          <StatusBar backgroundColor="#0392cf" barStyle="light-content" />
          {this.renderLeft()}
          {this.renderMiddle()}
          {this.renderRight()}
        </View>
        <Core.Network />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Platform.OS === 'ios' ? 64 : 54,
    flexDirection: 'row',
    paddingTop: 2,
    backgroundColor: '#0392cf',
  },
  navBarItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 24,
    fontFamily: 'MyriadPro',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: '80%',
  },
});
