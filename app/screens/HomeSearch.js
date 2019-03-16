import React, { Component } from 'react';
import {
  StatusBar,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Container, } from 'native-base';
import Icons from 'react-native-vector-icons/FontAwesome';
import Navbar from '../components/common/Navbar';
import ResponsiveImage from 'react-native-responsive-image';
import RF from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';
import * as Common from '../components/common';
import * as Core from '../core';
import { Text } from '../common';
import * as Config from '../config';

const { width, height } = Dimensions.get('window');

class DefaultList extends Component {
  render() {
    return (
      <View>
        <Common.Texti
          fontColor={"#A9A9A9"}
          style={{
            color: "#cccccc"
          }}>
          {this.props.title}
        </Common.Texti>
        {(this.props.divider) ? (<Common.Divider />) : <View />}
      </View>
    )
  }
}

class DefaultContent extends Component {
  render() {
    return (
      <View>
        <DefaultList
          title="By Speciality"
          divider={true}
        />

        <DefaultList
          title="By Procedure"
          divider={true}
        />

        <DefaultList
          title="By Clinic Name"
          divider={true}
        />

        <DefaultList
          title="By Doctor's Name"
          divider={true}
        />

        <DefaultList
          title="By District"
          divider={true}
        />

        <DefaultList
          title="By MRT"
        />
      </View>
    )
  }
}

class ResultList extends Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <TouchableOpacity
          onPress={() =>
            Actions.DetailClinic({ clinic_id: this.props.id })
          }>
          <View
            style={{
              flex: 1,
              marginTop: 4,
              height: 110,
              backgroundColor: '#fff',
              width: '100%'
            }}
          >
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <ResponsiveImage
                  style={{ marginTop: '8%' }}
                  source={{ uri: this.props.image }}
                  initWidth="85" initHeight="85"
                />
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  marginTop: 2,
                  width: '65%',
                  marginRight: '1%',
                  marginLeft: '1%'
                }}
              >
                <Text
                  numberOfLines={2}
                  style={{
                    fontFamily: Config.FONT_FAMILY_BOLD,
                    fontSize: RF(1.6),
                    width: '100%',
                    fontWeight: '900'
                  }}
                >
                  {this.props.title}
                </Text>
                <Text

                  numberOfLines={2}
                  style={{
                    color: '#8c8b7f',
                    fontSize: RF(1.4),
                    fontFamily: Config.FONT_FAMILY_ROMAN,
                  }}
                >
                  {this.props.address}
                </Text>
                {this.props.isOpen === 1 ? (
                  <Text style={{ marginTop: 1 }}>
                    <Icons
                      name="circle"
                      style={{ color: '#51e500', fontSize: 10, marginRight: 15 }}
                    />
                    {' '}
                    <Text style={{
                      fontFamily: Config.FONT_FAMILY_ROMAN,
                      fontSize: 8,
                      marginLeft: 10,
                      color: '#616161',
                    }}>Now Open</Text>
                  </Text>
                ) : (
                    <Text style={{ marginTop: 1 }}>
                      <Icons
                        name="circle"
                        style={{ color: '#e83637', fontSize: 10, marginRight: 15 }}
                      />
                      {' '}
                      <Text style={{
                        fontFamily: Config.FONT_FAMILY_LIGHT,
                        fontSize: 8,
                        marginLeft: 10,
                        color: '#616161',
                      }}>Closed</Text>
                    </Text>
                  )}
              </View>


            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      isClearSearch: false,
      result: false
    }

  }

  onQuery = async (query) => {
    this.setState({
      isClearSearch: true,
      query: query
    })
  }

  clearProcess = (state) => {
    this.setState({
      query: "",
      isClearSearch: false
    })
  }

  processQuery = async () => {
    this.setState({
      isLoading: true
    })

    try {
      result = await Core.Search(this.state.query)
      console.log(result);
      this.setState({
        result: result.data.clinics,
        isLoading: false
      })
    } catch (e) {
      Common.getNotify("", e.message)
      this.setState({
        isLoading: false
      })
    } finally {
      setTimeout(() => {
        this.setState({
          isLoading: false
        })
      }, 10000)
    }
  }

  _keyExtractor = (item, index) => item.clinic_id;

  _renderItem = ({ item }) => (
    <ResultList
      key={item.clinic_id}
      image={item.clinic_image}
      id={item.clinic_id}
      title={item.name}
      address={item.address}
      isOpen={item.open_status}
    />
  );

  render() {
    return (
      <Container style={{ flex: 1, backgroundColor: '#EEEEEE' }}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <Navbar
          leftNav="back-home"
        />
        <View style={{
          backgroundColor: '#0392cf',
          height: 80,
          width: width,
          alignItems: 'center',
        }}>
          <Common.InputSearch
            value={this.state.query}
            returnKeyType="search"
            onSubmitEditing={() => this.processQuery()}
            onChangeText={query => this.onQuery(query)}
            placeholder="Search"
            placeholderTextColor="#fff"
            placeholderStyle={{
              color: "#fff",
              width: '100%'
            }}
            type="search"
            isClearSearch={this.state.isClearSearch}
            isClearSearchChange={this.clearProcess}
            iconColor="#fff"
            // alignItems="center"
            justifyContent="flex-start"
            style={{
              width: '90%',
              borderRadius: 5,
              color: "#fff",
              backgroundColor: '#0A6186',
              marginLeft: 10,
              marginRight: 10,
              flexDirection: 'row',
              alignItems: 'center',
              height: 35
            }}
          />
        </View>
        <View style={{ flex: 1, marginTop: 10, marginBottom: 30 }}>
          {
            (this.state.isLoading) ? (
              <Common.Spinner />
            ) : (this.state.result) ? (
              <View >
                <Text
                  fontFamily={Config.FONT_FAMILY_ROMAN}
                  style={{ marginLeft: '5%' }}
                >
                  Search Result
                  </Text>
                <FlatList
                  data={this.state.result}
                  extraData={this.state}
                  keyExtractor={this._keyExtractor}
                  renderItem={this._renderItem}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                />
              </View>

            ) : (
                  <View />
                )
          }

        </View>
      </Container>
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
