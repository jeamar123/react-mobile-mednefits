import React, { Component } from 'react';
import {
  StatusBar,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
  ImageBackground
} from 'react-native';
import { Container, Content, Drawer } from 'native-base';
import Navbar from '../components/common/Navbar';
import { HomeContent, MenuSide } from '../components/HomeContent';
import { Actions } from 'react-native-router-flux';
import { Text } from '../common';
import * as Config from '../config';
import * as Core from '../core'
import * as Common from '../components/common'

const { width, height } = Dimensions.get('window');

class SearchResult extends Component {

  render() {
    const arr = this.props.searchdata
    const arry = []

    return (
      <ScrollView
        showHorizontalScrollIndicator={false}
        showVerticalScrollIndicator={false}
      >
        <View style={{ padding: 10 }}>
          {Object.entries(this.props.searchdata).map(([key, v]) => {
            if ((key !== 'clinics') || (key !== 'doctors')) {
              if (Array.isArray(v.data) && (v.data.length > 0)) {
                return <View >
                  {v.data.map((ke, va) => {
                    return <View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text ellipsizeMode={"tail"} numberOfLines={2} fontFamily={Config.FONT_FAMILY_BOLD} fontSize={14} style={{ color: 'black', letterSpacing: 2, fontWeight: "bold", width: "50%", lineHeight: 20 }}>{ke.name}</Text>
                        <Text ellipsizeMode={"tail"} numberOfLines={1} fontFamily={Config.FONT_FAMILY_THIN} fontSize={10} style={{ color: '#cccccc', letterSpacing: 3 }}>{key.toUpperCase()}</Text>
                      </View>
                      <View
                        style={{
                          borderBottomColor: '#cccccc',
                          borderBottomWidth: 0.8,
                          marginTop: 15,
                          marginBottom: 15,
                          marginRight: -15
                        }}
                      />
                    </View>

                  })}

                </View>
              }
            }


          })}

          {Object.entries(this.props.searchdata).map(([key, v]) => {
            if ((key == 'clinics') || (key == 'doctors')) {
              if (Array.isArray(v) && (v.length > 0)) {
                return <View >
                  {v.map((ke, va) => {
                    return <TouchableOpacity onPress={() =>
                      Actions.DetailClinic({ clinic_id: ke.clinic_id, StatusOpen: ke.open_status })
                    }><View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Text ellipsizeMode={"tail"} numberOfLines={2} fontFamily={Config.FONT_FAMILY_BOLD} fontSize={14} style={{ color: 'black', letterSpacing: 2, fontWeight: "bold", width: "50%", lineHeight: 20 }}>{ke.name}</Text>
                          <Text ellipsizeMode={"tail"} numberOfLines={1} fontFamily={Config.FONT_FAMILY_THIN} fontSize={10} style={{ color: '#cccccc', letterSpacing: 3 }}>{key.toUpperCase()}</Text>
                        </View>
                        <Text ellipsizeMode={"tail"} numberOfLines={1} fontFamily={Config.FONT_FAMILY_THIN} fontSize={10} style={{ color: '#cccccc', letterSpacing: 3 }}>{ke.address}</Text>
                        {(ke.open_status == 0) ? (
                          <Text ellipsizeMode={"tail"} numberOfLines={1} fontFamily={Config.FONT_FAMILY_BOLD} fontSize={8} style={{ color: 'red', letterSpacing: 1 }}>
                            closed
                        </Text>
                        ) : (
                            <Text ellipsizeMode={"tail"} numberOfLines={1} fontFamily={Config.FONT_FAMILY_BOLD} fontSize={8} style={{ color: 'green' }}>
                              open
                        </Text>
                          )}
                        <View
                          style={{
                            borderBottomColor: '#cccccc',
                            borderBottomWidth: 0.8,
                            marginTop: 15,
                            marginBottom: 15,
                            marginRight: -15
                          }}
                        />
                      </View></TouchableOpacity>
                  })}
                </View>
              }
            }
          })}
        </View>
      </ScrollView>
    )
  }
}

class ResultList extends Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <Common.Texti
            fontColor={"black"}
          >
            {this.props.title}
          </Common.Texti>
          <Common.Texti
            fontColor={"black"}
          >
            {this.props.type}
          </Common.Texti>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Common.Texti
          >
            {this.props.address}
          </Common.Texti>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Common.Texti
            fontColor={(this.props.isOpen == 0) ? "red" : "green"}
          >
            {(this.props.isOpen == 0) ? "Closed" : "Open"}
          </Common.Texti>
        </View>
      </View>
    )
  }
}


class ClinicList extends Component {

  async getClinicMap(clinic_type_id) {
    Core.checkLocationFirst(clinic_type_id, (error, result) => {
    	console.log(error)
    	console.log(result)
    	if(result) {
    		Actions.NearbyClinic({ ClinicTypeID: this.props.id, NameCategory: this.props.name })
    	}
      // data =
      //   typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      // console.warn(data);
    });
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() =>
          this.getClinicMap(this.props.id)
        }
      >
        <View style={styles.gridBox}>
          <Image
            style={{
              margin: 10,
              width: 35,
              height: 35,
            }}
            source={{ uri: this.props.image }}
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
      data: false,
      searchdata: false,
      isLoadingSearch: false
    }

    this.drawerActionCallback = this.drawerActionCallback.bind(this);
    this.onUpdateSearch = this.onUpdateSearch.bind(this)
    this.isLoadingSearch = this.isLoadingSearch.bind(this)
    this.clearSearch = this.clearSearch.bind(this)

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

  async getClinicType() {
    await Core.GetClinicType(async (err, result) => {
      if (result) {
        await this.setState({
          data: result.data.clinic_types,
        })
      }
    })
  }

  async componentDidMount() {
    console.log('Home is mounted');
    await Core.GetLocation()
    await this.getClinicType()
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

  onUpdateSearch(result) {
    this.setState({ searchdata: result })
  }

  isLoadingSearch(state) {
    console.warn("state " + state);
    switch (state) {
      case 'true':
        this.setState({
          isLoadingSearch: true
        })
        break;
      case 'false':
        this.setState({
          isLoadingSearch: false
        })
        break;
      default:
    }
  }

  clearSearch(state) {
    this.setState({ searchdata: false })
  }


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
          <HomeContent
            onUpdateSearch={this.onUpdateSearch}
            isLoadingSearch={this.isLoadingSearch}
            clearProcess={this.clearSearch}
          />
          <View style={{ flex: 1, marginLeft: '2.5%', marginRight: '2.5%' }}>
            {(!this.state.data || this.state.isLoadingSearch) ? (
              <View
                style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
              >
                <ActivityIndicator size="large" color="#0392cf" />
              </View>
            ) : (this.state.searchdata) ? (
              <View>
                <View
                  style={{ justifyContent: 'center', alignItems: 'flex-start' }}
                >
                  <Text
                    fontFamily={Config.FONT_FAMILY_ROMAN}
                    style={{ textAlign: 'center' }}
                  >
                    Search Result
                  </Text>
                </View>
                <SearchResult
                  searchdata={this.state.searchdata}
                />
              </View>
            ) : (
                  <View style={{ flex: 1 }}>
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
                      <FlatList
                        data={this.state.data}
                        extraData={this.state}
                        keyExtractor={this.data}
                        renderItem={this._renderItem}
                        horizontal={false}
                        numColumns={3}
                      />
                    </View>
                  </View>
                )}
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
