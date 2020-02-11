import React, { Component } from 'react';
import { StatusBar, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Tab,
  Tabs,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import RF from "react-native-responsive-fontsize";
import Navbar from '../components/common/Navbar';
import * as Core from '../core';
import * as Config from '../config';

class HistoryTransaction extends Component {
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
      in_network: false,
      out_network: false,
      company_currency: null,
      selectedTerm: 'Current term',
      isTermDropShow: false,
      inNetworkData: {},
      inNetworkActivePage: 1,
      OutNetworkActivePage: 1,
    };
    this.selectTerm = this.selectTerm.bind(this);
  }

  async componentWillMount() {
    await this.getUserDetail();
    await this.getDataIn_Network();
    await this.getDataE_Claim();
  }

  async getUserDetail() {
    await Core.UserDetail(async (error, result) => {
      data =
        await typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      await this.setState({
        company_currency: data.profile.currency_type.toUpperCase(),
      });
    });
  }


  async getDataIn_Network() {
    this.state.resultData = [];
    var term = this.state.selectedTerm == 'Current term' ? 'current_term' : 'last_term';
    var params = {
      term : term,
      page : this.state.inNetworkActivePage,
      per_page : 30,
    }
    await Core.GetHistoryTransaction( params ,async (error, result) => {
      data =
        await typeof result.data.data == 'string' ? JSON.parse(result.data.data) : result.data.data;
        result.data.range = [...Array( result.data.last_page ).keys()];
        this.setState({ 
          inNetworkData: result.data,
          resultData: result.data.data, 
          in_network: true
        },()=>{
          console.log( this.state );
        });
    });
  }

  inNetworkNexPage(){
    this.state.inNetworkActivePage += 1;
    this.getDataIn_Network();
  }
  inNetworkPagination(){
      return this.state.inNetworkData.range.map((data, index) => {
        return (
          <TouchableOpacity style={{ flex: 1, borderWidth: 1 }} onPress={() => this.loadMoreInNetwork()} key={index}>
            <Text style={{ textAlign: 'center', padding: 0, color: '#000' }} >
              { data }
            </Text>
          </TouchableOpacity>
        )
      })
  }

  loadMoreInNetwork() {
    var term = this.state.selectedTerm == 'Current term' ? 'current_term' : 'last_term';
    var params = {
      term : term,
      page : this.state.inNetworkActivePage,
      per_page : 5,
    }
    Core.GetHistoryTransaction( params ,async (error, result) => {
      data =
        typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
        // this.setState({ resultData: data, in_network: true });
        console.log( data );
      const dataArr = this.state.resultData;
      for( var i = 0; i < data.length; i++ ){
        dataArr.unshift( data[i] );
        if( i == data.length - 1 ){
          this.setState({ resultData: dataArr }, () =>{
            console.log('done');
          });
        }
      }

    });
  }

  async getDataE_Claim() {
    var term = this.state.selectedTerm == 'Current term' ? 'current_term' : 'last_term';
    await Core.GetEClaimTransaction(term, async (error, result) => {
      data =
        await typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      
        this.setState({ DataE_Claim: data, out_network: true });
    });
  }

  loadMoreOutNetwork() {
    var term = this.state.selectedTerm == 'Current term' ? 'current_term' : 'last_term';
    Core.GetEClaimTransaction( term ,async (error, result) => {
      data =
        typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
        // this.setState({ resultData: data, in_network: true });
        console.log( data );
      const dataArr = this.state.DataE_Claim;
      for( var i = 0; i < data.length; i++ ){
        dataArr.unshift( data[i] );
        console.log(i);
        if( i == data.length - 1 ){
          this.setState({ DataE_Claim: dataArr }, () =>{
            console.log('done');
          });
        }
      }

    });
  }

  selectTerm(term){
    console.log( term );
    setTimeout(() => {
      this.setState({ 
        selectedTerm : term ,
        in_network: false,
        out_network: false,
      }, () => {
        console.log(this.state)
        this.getDataIn_Network( );
        this.getDataE_Claim( );
      })
    }, 0);
  }

  handleTouch(){
    this.refs.transNav.closeDrop();
    setTimeout(() => {
      var opt = this.refs.transNav.refs.termDrop.state.showDrop;
      console.log( opt );
      this.setState({ isTermDropShow: opt });
    }, 0);
  }

  renderInNetworkStatus(data) {
    if (data.health_provider_status == true && data.type == 'cash') {
      return (
        <View
          style={{
            paddingTop: 5,
            paddingBottom: 5,
            width: '20%',
            backgroundColor: '#439057',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#fff',
          }}
        >
          <Text
            style={{
              fontSize: 12,
              textAlign: 'center',
              color: '#fff',
            }}
          >
            Cash
          </Text>
        </View>
      );
    } else if (data.health_provider_status == false && data.type == 'credits' && data.refunded == true) {
      return (
        <Text style={{ fontSize: 11 }}>Cancelled - Refunded</Text>
      );
    }
  }

  renderTransactionIn_Network() {
    return this.state.resultData.map((Data, index) => {
      return (
        <TouchableOpacity
          key={index}
          onPress={() =>
            Actions.HistoryGeneral({ transaction_id: Data.transaction_id, currency_symbol: Data.currency_symbol, company_currency: this.state.company_currency })
          }
        >
          <Card key={index} style={{ marginLeft: -5, marginRight: -5 }}>
            <CardItem
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomWidth: 0.5,
                borderColor: 'grey',
                marginLeft: 10,
                marginRight: 10,
              }}
            >
              <Text style={{ fontSize: 13, fontWeight: 'bold', marginLeft: -10 }}>
                Transaction #: <Text style={{ fontWeight: '400', fontSize: 13 }}>{Data.transaction_id}</Text>
              </Text>
              <Text style={{ fontSize: 13, fontWeight: '500', marginRight: -10 }}>
                {Data.date_of_transaction}
              </Text>
            </CardItem>
            <CardItem>
              <Body
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={{ fontSize: 13, color: '#616161' }}>
                  {Data.clinic_type_and_service}
                </Text>
                <Text />
              </Body>
            </CardItem>
            <CardItem>
              <Body
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Image
                  style={{
                    marginTop: -10,
                    marginLeft: 10,
                    marginRight: 10,
                    aspectRatio: 0.4,
                    resizeMode: 'contain',
                  }}
                  source={require('../../assets/apps/dotted.png')}
                />

                <Text style={{ marginTop: '-2%', color: '#0392cf' }}>
                  {Data.currency_symbol} {Data.converted_amount}
                </Text>
              </Body>
            </CardItem>
            <CardItem style={{ marginTop: -20, backgroundColor: 'transparent' }}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '400',
                  color: '#616161',
                  fontFamily: Config.FONT_FAMILY_ROMAN,
                }}
              >
                {Data.clinic_name}
              </Text>
            </CardItem>
            <CardItem
              footer
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: -10,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  color: '#0392cf',
                  fontFamily: Config.FONT_FAMILY_ROMAN,
                }}
              >
                {Data.customer}
              </Text>
              {this.renderInNetworkStatus(Data)}
            </CardItem>
          </Card>
        </TouchableOpacity>
      )
    });
  }

  renderEclaimStatus(data) {
    if (data.status == 0) {
      return (
        <View
          style={{
            paddingTop: 5,
            paddingBottom: 5,
            width: '23%',
            backgroundColor: '#c4c4c4',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#fff',
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: '600',
              textAlign: 'center',
              color: '#fff',
            }}
          >
            Pending
          </Text>
        </View>
      );
    } else if (data.status == 1) {
      return (
        <View
          style={{
            paddingTop: 5,
            paddingBottom: 5,
            width: '23%',
            backgroundColor: '#439057',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#fff',
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: '600',
              textAlign: 'center',
              color: '#fff',
            }}
          >
            Approved
          </Text>
        </View>
      );
    } else if (data.status == 2) {
      return (
        <View
          style={{
            paddingTop: 5,
            paddingBottom: 5,
            width: '23%',
            backgroundColor: '#FF0000',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#fff',
          }}
        >
          <Text
            style={{
              fontWeight: '600',
              fontSize: 12,
              textAlign: 'center',
              color: '#fff',
            }}
          >
            Rejected
          </Text>
        </View>
      )
    }
  }

  renderTransactionE_Claim() {
    return this.state.DataE_Claim.map((Data, index) => (
      <TouchableOpacity
        key={index}
        onPress={() =>
          Actions.DetailEclaimTransaction({
            transaction_id: Data.transaction_id,
            currency_symbol: Data.currency_symbol
          })
        }
      >
        <Card key={index}>
          <CardItem
            bordered
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
              Claim #: {Data.transaction_id}
            </Text>
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
              Claim Date: {Data.claim_date}
            </Text>
          </CardItem>
          <CardItem>
            <Body
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ fontSize: 13 }}>{Data.merchant}</Text>
              <Text />
            </Body>
          </CardItem>
          <CardItem>
            <Body
              style={{
                marginTop: '-8%',
                marginBottom: '-8%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Image
                style={{
                  margin: 8,
                  aspectRatio: 0.4,
                  resizeMode: 'contain',
                }}
                source={require('../../assets/apps/dotted.png')}
              />

              <Text style={{ marginTop: '-5%', color: '#0392cf' }} />
            </Body>
          </CardItem>
          <CardItem>
            <Body
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: '-4%'
              }}
            >
              <Text style={{ fontSize: 12, color: '#B5B5B5' }}>
                {Data.service}
              </Text>
              <Text style={{ color: '#0392cf', marginTop: '-1%' }}>{Data.currency_symbol} {Data.amount}</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: '-6%',
                marginBottom: '1%'
              }}
            >
              <Text style={{ fontSize: 12, color: '#B5B5B5' }}>
                {Data.visit_date}
              </Text>
              {this.renderEclaimStatus(Data)}
            </Body>
          </CardItem>
          <CardItem
            footer
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: '-3.5%'
            }}
          >
            <Text
              style={{
                fontSize: 11,
                fontWeight: '400',
                color: '#0392cf',
                fontFamily: Config.FONT_FAMILY_ROMAN,
              }}
            >
              {Data.member}
            </Text>
          </CardItem>
        </Card>
      </TouchableOpacity>
    ));
  }

  render() {
    return (
      <Container
        onTouchEnd={() => this.handleTouch()}
      >
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar
          leftNav="back-home-wallet"
          title="History"
          Services={this.props.services}
          clinic_Id={this.props.clinicid}
          member={this.props.member}
          nric={this.props.nric}
          check_Id={this.props.checkId}
          checkTime={this.props.checkTime}
          capCurrency={this.props.capCurrency}
          capAmount={this.props.capAmount}
          clinic_image={this.props.clinic_image}
          clinic_name={this.props.clinic_name}
          consultation_fee_symbol={this.props.consultation_fee_symbol}
          consultation_status={this.props.consultation_status}
          consultation_fees={this.props.consultation_fees}
          rightNav="term-drop"
          ref="transNav"
          updateSelectedTerm={(term) => this.selectTerm( term )}
          headerBgColor={ this.state.isTermDropShow == true ? 'transparent' : '#0392cf'}
          backgroundColor={ this.state.isTermDropShow == true ? 'transparent' : '#0392cf'}
        />
        <View 
          pointerEvents={ this.state.isTermDropShow == true ? 'none' : 'auto' } 
          style={{ 
            backgroundColor: '#0392cf',
            paddingTop: this.state.isTermDropShow == true ? 50 : 0, 
            position: this.state.isTermDropShow == true ? 'absolute' : 'relative',
            flex: 1
          }}
        >
        <Tabs
          onChangeTab={({ i }) => this.setState.bind({ currentTab: i }) }
          tabBarUnderlineStyle={{ backgroundColor: 'transparent' }}
          tabContainerStyle={{ elevation: 0, zIndex: 1 }}
        >
          <Tab
            heading="Panel"
            tabStyle={{ backgroundColor: '#0392cf' }}
            activeTabStyle={{ color: '#3497d7', backgroundColor: 'white' }}
            activeTextStyle={{ color: '#3497d7', fontSize: RF(2.1) }}
            textStyle={{
              fontFamily: Config.FONT_FAMILY_ROMAN,
              color: '#fff',
              fontSize: RF(2.1),
            }}
          >
            <Content>
              {(!this.state.in_network) ? (
                <View style={{ flex: 1 }}>
                  <View
                    style={{ flex: 1, marginTop: 240, justifyContent: 'center', alignItems: 'center' }}
                  >
                    <ActivityIndicator size="large" color="#0392cf" style={{ flex: 1, alignSelf: 'center' }} />
                  </View>
                </View>
              ) : (
                  <View style={{ marginBottom: 20 }}>
                    {this.renderTransactionIn_Network()}
                    <View style={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center', flex: 1, flexDirection: 'row' }}>
                      <TouchableOpacity style={{ flex: 1, }} onPress={() => this.loadMoreInNetwork()} >
                        <Text style={{ textAlign: 'center', padding: 10 }} >
                          Prev
                        </Text>
                      </TouchableOpacity>
                      <View style={{ flex: 3, flexDirection: 'row', borderWidth: 1 }}>
                        { this.inNetworkPagination() }
                      </View>
                      <TouchableOpacity style={{ flex: 1, }} onPress={() => this.loadMoreInNetwork()} >
                        <Text style={{ textAlign: 'center', padding: 10 }} >
                          Next
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
            </Content>
          </Tab>
          <Tab
            heading="Non-Panel"
            tabStyle={{ backgroundColor: '#0392cf' }}
            activeTabStyle={{ color: '#3497d7', backgroundColor: 'white' }}
            activeTextStyle={{ color: '#3497d7', fontSize: RF(2.1) }}
            textStyle={{
              fontFamily: Config.FONT_FAMILY_ROMAN,
              color: '#fff',
              fontSize: RF(2.1),
            }}
          >
            <Content>
              {(!this.state.out_network) ? (
                <View style={{ flex: 1 }}>
                  <View
                    style={{ flex: 1, marginTop: 240, justifyContent: 'center', alignItems: 'center', flex: 1 }}
                  >
                    <ActivityIndicator size="large" color="#0392cf" style={{ flex: 1, alignSelf: 'center' }} />
                  </View>
                </View>
              ) : (
                  <View style={{ marginBottom: 200 }}>
                    {this.renderTransactionE_Claim()}
                    <View style={{ textAlign: 'center', padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                      <TouchableOpacity style={{ width: '100%' }} onPress={() => this.loadMoreInNetwork()} >
                        <Text style={{}} >
                          Load more
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
            </Content>
          </Tab>
        </Tabs>
        </View>
      </Container>
    );
  }
}

export default HistoryTransaction;
