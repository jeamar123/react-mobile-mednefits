import React, { Component } from 'react';
import { StatusBar, View, Text, TouchableOpacity, Image, ActivityIndicator, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Navbar from '../components/common/Navbar';
import * as Core from '../core';
import * as Config from '../config';

class HistoryTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMainLoaderShow: true,
      idTransaction: '0',
      date: '',
      customerName: '',
      price: '',
      status: '',
      inNetworkList: [],
      outNetworkList: [],
      in_network: true,
      out_network: false,
      company_currency: null,
      selectedTerm: 'Current term',
      isTermDropShow: false,
      inNetworkData: {},
      outNetworkData: {},
      inNetworkActivePage: 1,
      outNetworkActivePage: 1,
    };
    this.selectTerm = this.selectTerm.bind(this);
  }

  async componentWillMount() {
    await this.getUserDetail();
    await this.getDataIn_Network();
    // await this.getDataE_Claim();
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

  selectTab( opt ){
    this.setState({
      in_network : opt == 1 ? true : false,
      out_network : opt == 2 ? true : false,
      isMainLoaderShow : true,
      inNetworkData: {},
      outNetworkData: {},
      inNetworkActivePage: 1,
      outNetworkActivePage: 1,
      inNetworkList: [],
      outNetworkList: [],
    }, () => {
      if( opt == 1 ){
        this.getDataIn_Network( );
      }
      if( opt == 2 ){
        this.getDataE_Claim( );
      }
    });
    
  }

  selectTerm(term){
    // console.log( term );
    setTimeout(() => {
      this.setState({ 
        selectedTerm : term ,
        isMainLoaderShow : true,
        inNetworkData: {},
        outNetworkData: {},
        inNetworkActivePage: 1,
        outNetworkActivePage: 1,
      }, () => {
        console.log(this.state)
        if( this.state.in_network == true ){
          this.getDataIn_Network( );
        }
        if( this.state.out_network == true ){
          this.getDataE_Claim( );
        }
      })
    }, 0);
  }

  handleTouch(){
    this.refs.transNav.closeDrop();
    // setTimeout(() => {
      var opt = this.refs.transNav.refs.termDrop.state.showDrop == true ? false : true;
      console.log( opt );
      this.setState({ isTermDropShow: opt });
    // }, 0);
  }

  async getDataIn_Network() {
    this.setState({ isMainLoaderShow: true });
    var term = this.state.selectedTerm == 'Current term' ? 'current_term' : 'last_term';
    var params = {
      term : term,
      page : this.state.inNetworkActivePage,
      per_page : 50,
    }
    await Core.GetHistoryTransaction( params ,async (error, result) => {
      console.log( result );
      data =
        await typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      result.data.range = await [...Array( result.data.last_page ).keys()];
      this.setState({ 
        inNetworkData: result.data,
        inNetworkList: result.data.data, 
        in_network: true,
        out_network: false,
        isMainLoaderShow: false
      },() => {
        console.log( this.state );
      });
    });
  }

  // INNETWORK PAGINATION 
    inNetworkBackPage(){
      if( this.state.inNetworkActivePage != 1 ){
        this.state.inNetworkActivePage -= 1;
        this.getDataIn_Network();
      }
    }
    inNetworkNextPage(){
      if( this.state.inNetworkActivePage != this.state.inNetworkData.range.length ){
        this.state.inNetworkActivePage += 1;
        this.getDataIn_Network();
      }
    }
    inNetworkToPage( page ){
      this.state.inNetworkActivePage = page;
      this.getDataIn_Network();
    }
    inNetworkPagination(){
      if( this.state.inNetworkList.length > 0 ){
        return this.state.inNetworkData.range.map((data, index) => {
          return (
            <TouchableOpacity 
              style={{ 
                // flex: 1,
                width: 20, 
                borderWidth: 0.5, 
                borderColor: '#FFF',
                backgroundColor: this.state.inNetworkActivePage == (data + 1) ? '#FFF' : 'transparent', 
              }} 
              onPress={() => this.inNetworkToPage( data + 1 )} 
              key={index}
            >
              <Text 
                style={{ 
                  textAlign: 'center', 
                  paddingVertical: 10, 
                  color: this.state.inNetworkActivePage == (data + 1) ? '#0392cf' : '#FFF' 
                }} 
              >
                { data + 1 }
              </Text>
            </TouchableOpacity>
          )
        })
      }else{
        return null;
      }
    }
  // 

  async getDataE_Claim() {
    this.setState({ isMainLoaderShow: true });
    var term = this.state.selectedTerm == 'Current term' ? 'current_term' : 'last_term';
    var params = {
      term : term,
      page : this.state.outNetworkActivePage,
      per_page : 50,
    }
    await Core.GetEClaimTransaction(params, async (error, result) => {
      data =
        await typeof result.data == 'string' ? JSON.parse(result.data.data) : result.data.data;
        result.data.range = await [...Array( result.data.last_page ).keys()];
        console.log( result );
        this.setState({ 
          outNetworkData: result.data,
          outNetworkList: result.data.data, 
          in_network: false,
          out_network: true,
          isMainLoaderShow: false
        },() => {
          console.log( this.state );
        });
    });
  }

  // INNETWORK PAGINATION 
    outNetworkBackPage(){
      if( this.state.outNetworkActivePage != 1 ){
        this.state.outNetworkActivePage -= 1;
        this.getDataE_Claim();
      }
    }
    outNetworkNextPage(){
      if( this.state.outNetworkActivePage != this.state.outNetworkData.range.length ){
        this.state.outNetworkActivePage += 1;
        this.getDataE_Claim();
      }
    }
    outNetworkToPage( page ){
      this.state.outNetworkActivePage = page;
      this.getDataE_Claim();
    }
    outNetworkPagination(){
      if( this.state.outNetworkList.length > 0 ){
        return this.state.outNetworkData.range.map((data, index) => {
          return (
            <TouchableOpacity 
              style={{ 
                // flex: 1,
                width: 20,
                borderWidth: 0.5, 
                borderColor: '#FFF',
                backgroundColor: this.state.outNetworkActivePage == (data + 1) ? '#FFF' : 'transparent', 
              }} 
              onPress={() => this.outNetworkToPage( data + 1 )} 
              key={index}
            >
              <Text 
                style={{ 
                  textAlign: 'center', 
                  paddingVertical: 10, 
                  color: this.state.outNetworkActivePage == (data + 1) ? '#0392cf' : '#FFF' 
                }} 
              >
                { data + 1 }
              </Text>
            </TouchableOpacity>
          )
        })
      }else{
        return null;
      }
    }
  //

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
    return this.state.inNetworkList.map((Data, index) => {
      return (
        <TouchableOpacity
          key={index}
          onPress={() =>
            Actions.HistoryGeneral({ transaction_id: Data.transaction_id, currency_symbol: Data.currency_symbol, company_currency: this.state.company_currency })
          }
          style={{
            borderWidth: 1,
            borderRadius: 4,
            borderColor: '#ddd',
            marginTop: 5,
            marginBottom: 10, 
            marginLeft: 1,
            marginRight: 1,
            paddingVertical: 5,
            flex: 1,
          }}
        >
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomWidth: 0.5,
                borderColor: 'grey',
                marginLeft: 5,
                marginRight: 5,
                padding: 10,
              }}
            >
              <Text style={{ fontSize: 13, fontWeight: 'bold', }}>
                Transaction #: <Text style={{ fontWeight: '400', fontSize: 13 }}>{Data.transaction_id}</Text>
              </Text>
              <Text style={{ fontSize: 13, fontWeight: '500', }}>
                {Data.date_of_transaction}
              </Text>
            </View>
            <View 
              style={{ 
                marginLeft: 5,
                marginRight: 5,
                padding: 10, 
                flex: 1 
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={{ fontSize: 13, color: '#616161' }}>
                  {Data.clinic_type_and_service}
                </Text>
                <Text />
              </View>
            </View>
            <View style={{ 
              marginLeft: 5,
              marginRight: 5,
              padding: 10,
              flex: 1 
            }}>
              <View
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

                <Text style={{ marginTop: '-2%', color: '#0392cf', fontWeight: '700' }}>
                  {Data.currency_symbol} {Data.converted_amount}
                </Text>
              </View>
            </View>
            <View style={{ 
              marginTop: -10, 
              marginLeft: 5, 
              marginRight: 5, 
              paddingHorizontal: 10, 
              flex: 1, 
              backgroundColor: 'transparent' }}>
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
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 5,
                marginRight: 5,
                padding: 10,
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'center'
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
            </View>
          </View>
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
    return this.state.outNetworkList.map((Data, index) => (
      <TouchableOpacity
        key={index}
        onPress={() =>
          Actions.DetailEclaimTransaction({
            transaction_id: Data.transaction_id,
            currency_symbol: Data.currency_symbol
          })
        }
        style={{
          borderWidth: 1,
          borderRadius: 4,
          borderColor: '#ddd',
          marginTop: 5,
          marginBottom: 10, 
          marginLeft: 1,
          marginRight: 1,
          paddingVertical: 5,
          flex: 1,
        }}
      >
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomWidth: 0.5,
              borderColor: 'grey',
              marginLeft: 5,
              marginRight: 5,
              padding: 10,
            }}

          >
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
              Claim #: {Data.transaction_id}
            </Text>
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
              Claim Date: {Data.claim_date}
            </Text>
          </View>
          <View 
            style={{ 
              marginLeft: 5,
              marginRight: 5,
              padding: 10, 
              flex: 1 
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ fontSize: 13 }}>{Data.merchant}</Text>
              <Text />
            </View>
          </View>
          <View
            style={{ 
              marginLeft: 5,
              marginRight: 5,
              padding: 10, 
              flex: 1 
            }}
          >
            <View
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
            </View>
          </View>
          <View
            style={{ 
              marginTop: -5, 
              marginLeft: 5, 
              marginRight: 5, 
              paddingHorizontal: 10, 
              flex: 1, 
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ fontSize: 12, color: '#B5B5B5' }}>
                {Data.service}
              </Text>
              <Text style={{ color: '#0392cf', marginTop: '-1%' }}>{Data.currency_symbol} {Data.amount}</Text>
            </View>
          </View>
          <View
            style={{ 
              marginLeft: 5,
              marginRight: 5,
              paddingHorizontal: 10, 
              flex: 1 
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ fontSize: 12, color: '#B5B5B5' }}>
                {Data.visit_date}
              </Text>
              {this.renderEclaimStatus(Data)}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginLeft: 5,
              marginRight: 5,
              padding: 10, 
              flex: 1 
            }}
          >
            <Text
              style={{
                fontSize: 11,
                fontWeight: '700',
                color: '#0392cf',
                fontFamily: Config.FONT_FAMILY_ROMAN,
              }}
            >
              {Data.member}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    ));
  }

  render() {
    return (
      <View
        style={{ flex: 1, width: '100%', height: '100%', backgroundColor: 'transparent' }}
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
            paddingTop: this.state.isTermDropShow == true ? 54 : 0, 
            position: this.state.isTermDropShow == true ? 'absolute' : 'relative',
            flex: 1,
            width: '100%',
            height: '100%',
          }}
        >
          <View style={{ flexDirection: 'row', height: 50, width: '100%' }}>
            <TouchableOpacity 
              style={{ 
                flex: 1,
                backgroundColor: this.state.in_network == true ? '#FFF' : '#0392cf',
                justifyContent: 'center'
              }}
              onPress={() => this.selectTab(1)}
            >
              <Text 
                style={{ 
                  textAlign: 'center',
                  color: this.state.in_network == true ? '#0392cf' : '#FFF', 
                  fontWeight: '700'
                }}
              >
                In-Network
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={{ 
                flex: 1,
                backgroundColor: this.state.out_network == true ? '#FFF' : '#0392cf',
                justifyContent: 'center'
              }}
              onPress={() => this.selectTab(2)}
            >
              <Text 
                style={{ 
                  textAlign: 'center',
                  color: this.state.out_network == true ? '#0392cf' : '#FFF', 
                  fontWeight: '700'
                }}
              >
                Out-of-Network
              </Text>
            </TouchableOpacity>
          </View>

          
          <ScrollView style={{ backgroundColor: '#FFF' }}>
            <View style={{ width: '100%', flexDirection: 'column' }}>
              {
                this.state.isMainLoaderShow == true ?
                  <View style={{ flex: 1 }}>
                    <View
                      style={{ flex: 1, marginTop: 240, justifyContent: 'center', alignItems: 'center' }}
                    >
                      <ActivityIndicator size="large" color="#0392cf" style={{ flex: 1, alignSelf: 'center' }} />
                    </View>
                  </View>
                : null
              }

              { 
                this.state.isMainLoaderShow == false && this.state.in_network == true ?
                  this.renderTransactionIn_Network() 
                : null
              }

              { 
                this.state.isMainLoaderShow == false && this.state.out_network == true ?
                  this.renderTransactionE_Claim() 
                : null
              }
            </View>

            { 
              this.state.isMainLoaderShow == false && this.state.inNetworkList.length > 0 ?
                <View style={{ paddingTop: 20, paddingBottom: 20, textAlign: 'center', alignItems: 'center', justifyContent: 'center', flex: 1, flexDirection: 'row', backgroundColor: '#0392cf'
                 }}>
                  <TouchableOpacity style={{ width: 55 }} onPress={() => this.inNetworkBackPage()} >
                    <Text style={{ textAlign: 'center', padding: 10, color: '#FFF' }} >
                      Prev
                    </Text>
                  </TouchableOpacity>
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: '#FFF'  }}>
                      { this.inNetworkPagination() }
                    </View>
                  </View>
                  <TouchableOpacity style={{ width: 55 }} onPress={() => this.inNetworkNextPage()} >
                    <Text style={{ textAlign: 'center', padding: 10, color: '#FFF' }} >
                      Next
                    </Text>
                  </TouchableOpacity>
                </View>
              : null
            }


            { 
              this.state.isMainLoaderShow == false && this.state.outNetworkList.length > 0 ?
                <View style={{ paddingTop: 20, paddingBottom: 20, textAlign: 'center', alignItems: 'center', justifyContent: 'center', flex: 1, flexDirection: 'row', backgroundColor: '#0392cf'
                 }}>
                  <TouchableOpacity style={{ width: 55 }} onPress={() => this.outNetworkBackPage()} >
                    <Text style={{ textAlign: 'center', padding: 10, color: '#FFF' }} >
                      Prev
                    </Text>
                  </TouchableOpacity>
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: '#FFF'  }}>
                      { this.outNetworkPagination() }
                    </View>
                  </View>
                  <TouchableOpacity style={{ width: 55 }} onPress={() => this.outNetworkNextPage()} >
                    <Text style={{ textAlign: 'center', padding: 10, color: '#FFF' }} >
                      Next
                    </Text>
                  </TouchableOpacity>
                </View>
              : null
            }
          </ScrollView>
          

        </View>
      </View>
    );
  }
}

export default HistoryTransaction;
