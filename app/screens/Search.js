import React, { Component } from 'react';
import {
  StatusBar,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Container, Content, Drawer } from 'native-base';
import Navbar from '../components/common/Navbar';
import { Actions } from 'react-native-router-flux';
import * as Common from '../components/common';
import * as Core from '../core'

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
              CLINIC
          </Common.Texti>
          </View>
          <View style={{
            flexDirection: 'row'
          }}>
            <Common.Texti
              fontColor={"black"}
              fontSize={10}
              marginTop={5}
              marginBottom={5}
            >
              {this.props.address}
            </Common.Texti>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Common.Texti
              fontSize={10}
              fontColor={(this.props.isOpen == 0) ? "red" : "green"}
            >
              {(this.props.isOpen == 0) ? "Closed" : "Open"}
            </Common.Texti>
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
          drawerAction={this.drawerActionCallback}
          leftNav="close"
        />
        <View style={{ backgroundColor: "#0000" }}>
          <Common.InputText2
            value={this.state.query}
            returnKeyType="search"
            onSubmitEditing={() => this.processQuery()}
            onChangeText={query => this.onQuery(query)}
            placeholder="Search"
            placeholderStyle={{
              color: "#cccccc"
            }}
            type="search"
            isClearSearch={this.state.isClearSearch}
            isClearSearchChange={this.clearProcess}
            alignItems="center"
            justifyContent="flex-start"
            style={{
              backgroundColor: '#fff',
              margin: 15,
              borderRadius: 5,
              height: 35
            }}
          />
        </View>
        <View style={{ flex: 1, marginTop: 10, marginLeft: 15, marginRight: 15 }}>

          {
            (this.state.isLoading) ? (
              <Common.Spinner />
            ) : (this.state.result) ? (
              <FlatList
                data={this.state.result}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              />
            ) : (
                  <DefaultContent />
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
