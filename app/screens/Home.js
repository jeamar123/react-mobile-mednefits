import React, { Component } from 'react';
import {
  StatusBar,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { Container, Content, Drawer } from 'native-base';
import Navbar from '../components/common/Navbar';
import { HomeContent, MenuSide } from '../components/HomeContent';
import { Actions } from 'react-native-router-flux';
import { Text } from '../common';
import * as Config from '../config';
import * as Core from '../core'

const { width, height } = Dimensions.get('window');

class ClinicList extends Component{
  render(){
    return(
      <TouchableOpacity>
        <View style={styles.gridBox}>
          <Image
            style={{
              margin: 10,
              width: 35,
              height: 35,
            }}
            source={{uri: this.props.image}}
          />
          <Text
            fontFamily={Config.FONT_FAMILY_ROMAN}
            style={{ textAlign: 'center' }}
          >
            {this.props.name}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: false
    }
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

  async getClinicType(){
    await Core.GetClinicType((err, result)=>{
      if (result) {
        this.setState({
          data: result.data.clinic_types,
        })
      }
    })
  }

  componentDidMount(){
    this.getClinicType()
  }

  _keyExtractor = (item, index) => item.ClinicTypeID;

  _renderItem = ({ item }) => (
    <ClinicList
      key={item.ClinicTypeID}
      id={item.ClinicTypeID}
      name={item.Name}
      image={item.clinic_type_image_url}
    />
  );

  render() {
    return (
      <Drawer
        type="displace"
        openDrawerOffset={0.4}
        panCloseMask={0.4}
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
          />
          <HomeContent />
          <View style={{ flex: 1, marginLeft: '2.5%', marginRight: '2.5%' }}>
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
              {(!this.state.data) ? (
                <View
                  style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
                >
                  <ActivityIndicator size="large" color="#0392cf" />
                </View>
              ) : (
                <FlatList
                  data={this.state.data}
                  extraData={this.state}
                  keyExtractor={this.data}
                  renderItem={this._renderItem}
                  horizontal={false}
                  numColumns={3}
                />
              )}
            </View>
          </View>
        </Container>
      </Drawer>
    );
  }
}
const styles = {
  contain: {
    flex: 1,
  },
  gridBox: {
    width: width / 3.23,
    height: height / 6,
    backgroundColor: '#fff',
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
};

export default Home;
