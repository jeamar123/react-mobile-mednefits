import React, { Component } from 'react';
import {
  StatusBar,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Container, Content, Drawer } from 'native-base';
import Navbar from '../components/common/Navbar';
import { HomeContent, MenuSide } from '../components/HomeContent';
import { Actions } from 'react-native-router-flux';
import { Text } from '../common';
import * as Config from '../config';

const { width, height } = Dimensions.get('window');

class Home extends Component {

  constructor(props){
    super(props)

    this.drawerActionCallback = this.drawerActionCallback.bind(this)
  }

  closeDrawer() {
    this._drawer._root.close();
  }

  openDrawer() {
    this._drawer._root.open();
  }

  drawerActionCallback(callback){
    if (callback == true) {
      this.openDrawer()
    }
  }

  render() {
    return (
      <Drawer
        ref={ref => {
          this._drawer = ref;
        }}
        content={<MenuSide navigator={this._navigator} />}
        onClose={() => this.closeDrawer()}
      >
        <Container style={{ backgroundColor: '#EEEEEE' }}>
          <StatusBar backgroundColor="#fff" barStyle="dark-content" />
          <Navbar
            drawerAction={this.drawerActionCallback}
            leftNav={true}
            rightNav={true}
          />
          {/* <Header style={{ backgroundColor: '#0392cf' }}>
            <Left>
              <Button transparent onPress={() => this.openDrawer()}>
                <Icons name="bars" style={{ color: '#fff', fontSize: 32 }} />
              </Button>
            </Left>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image
                source={require('../../assets/MednefitsLogo.png')}
                style={{ height: 25, resizeMode: 'center', width: 155 }}
              />
            </View>
            <Right>
              <Button transparent onPress={() => this.openDrawer()}>
                <Icons name="gear" style={{ color: '#fff', fontSize: 32 }} />
              </Button>
            </Right>
          </Header> */}
          <HomeContent />
          <Content padder>
            <View
              style={{ justifyContent: 'center', alignItems: 'flex-start' }}
            >
              <Text
                fontFamily={Config.FONT_FAMILY_ROMAN}
                style={{ textAlign: 'center' }}
              >
                Benefits Category
              </Text>
            </View>
            <View style={styles.contain}>
              <TouchableOpacity>
                <View style={styles.gridBox}>
                  <Image
                    style={{ marginBottom: 15 }}
                    source={require('../../assets/apps/health.png')}
                  />
                  <Text
                    fontFamily={Config.FONT_FAMILY_ROMAN}
                    style={{ textAlign: 'center' }}
                  >
                    Health Screening
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Actions.HistoryGeneral({
                    type: 'reset',
                  })
                }
              >
                <View style={styles.gridBox}>
                  <Image
                    style={{ margin: 10 }}
                    source={require('../../assets/apps/general.png')}
                  />
                  <Text
                    fontFamily={Config.FONT_FAMILY_ROMAN}
                    style={{ textAlign: 'center' }}
                  >
                    General Practitioner
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Actions.HistoryDentalCare({
                    type: 'reset',
                  })
                }
              >
                <View style={styles.gridBox}>
                  <Image
                    style={{ marginBottom: 20 }}
                    source={require('../../assets/apps/tooth.png')}
                  />
                  <Text
                    fontFamily={Config.FONT_FAMILY_ROMAN}
                    style={{ textAlign: 'center' }}
                  >
                    Dental Care
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Actions.HistoryChieneseMedicine({
                    type: 'reset',
                  })
                }
              >
                <View style={styles.gridBox}>
                  <Image
                    style={{ margin: 10 }}
                    source={require('../../assets/apps/chienese.png')}
                  />
                  <Text
                    fontFamily={Config.FONT_FAMILY_ROMAN}
                    style={{ textAlign: 'center' }}
                  >
                    Traditional Chinese Medicine
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.gridBox}>
                  <Image
                    style={{ margin: 10 }}
                    source={require('../../assets/apps/Specialist.png')}
                  />
                  <Text
                    fontFamily={Config.FONT_FAMILY_ROMAN}
                    style={{ textAlign: 'center' }}
                  >
                    Health Specialist
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.gridBox}>
                  <Image
                    style={{ margin: 10 }}
                    source={require('../../assets/apps/Wellness.png')}
                  />
                  <Text
                    fontFamily={Config.FONT_FAMILY_ROMAN}
                    style={{ textAlign: 'center' }}
                  >
                    Wellness
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </Content>
        </Container>
      </Drawer>
    );
  }
}
const styles = {
  contain: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  gridBox: {
    width: width / 3.23,
    height: height / 6,
    backgroundColor: '#fff',
    margin: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default Home;
