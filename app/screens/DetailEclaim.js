import React, { Component } from 'react';
import { GiftedForm } from 'react-native-gifted-form';
import {
  StatusBar,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Easing,
  ImageBackground,
  Image
} from 'react-native';
import Modal from 'react-native-modal';
import { Container } from 'native-base';
import { Actions } from 'react-native-router-flux';
import ZoomImage from 'react-native-zoom-image';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import RF from "react-native-responsive-fontsize";
import ResponsiveImage from 'react-native-responsive-image';
import { ButtonFooter, Popup } from '../components/common';
import Texti from "../components/common/Texti"
import Navbar from '../components/common/NavbarGrey';
import * as Common from '../components/common';
import EclaimStep from '../components/EclaimStep';
import * as Core from '../core';
import * as Config from '../config';

class DetailEclaim extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      failed: false,
      title: null,
      message: null,
      member: null,
      showPopUp: false,
      isPromptShow: true,
      button: 'Submit',
      currency_exchange: '3.00',
      checkEclaim: {},
      isPromptShow: false,
    }

    this.isVisibleUpdate = this.isVisibleUpdate.bind(this);
    // console.log( this.props );
    // console.log( this.state );
  }

  EclaimProcess = async () => {

    try {
      await this.setState({
        isLoading: true,
        button: 'Submitting...'
      })

      eclaimFile = {
        'user_id': this.props.claimdata.member,
        'service': this.props.claimdata.claim,
        'merchant': this.props.claimdata.provider,
        'images': this.props.claimdata.images,
        'amount': this.props.claimdata.amount,
        'claim_amount': this.state.claim_amount,
        'date': this.props.claimdata.date,
        'spending_type': this.props.claimdata.type_spending,
        'time': this.props.claimdata.time,
        'currency_type': this.props.claimdata.currency,
        'currency_exchange_rate': this.state.currency_exchange
      }

      await Core.SendEClaim(eclaimFile, async (err, result) => {
        // Core.getNotify("",result.message)
        if (result.status) {
          this.setState({
            isLoading: true,
            button: 'DONE'
          })
          Actions.ThanksEclaim({ type: 'reset' })
        } else {
          // console.log('failed to submit')
          await this.setState({ message: result.message, title: 'E-Claim Submission', failed: true, isLoading: false, button: 'Submit' })
        }

      })
    } catch (e) {
      Core.getNotify("", "Failed to send e claim")

      this.setState({
        message: "Failed to send e claim", title: 'E-Claim Submission', failed: true, isLoading: false, button: 'Submit'
      })
    } finally {
      // console.log('finally called')
    }
  }

  componentDidMount() {
    this.renderMember();
    this.GetCurrency();
    this.userCheckEclaim();
  }

  async userCheckEclaim() {
    
    eclaim_data = {
      visit_date: this.props.claimdata.date,
      spending_type: this.props.claimdata.type_spending
    }
    await Core.CheckEclaimVisit(eclaim_data, async (error, result) => {
      data =
        await typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      this.setState({ checkEclaim: data }, () =>{
        var claim_amount = 0;
        console.log( this.state );
        if( this.props.claimdata.amount <= this.state.checkEclaim.balance ){
          this.setState({
            claim_amount: this.props.claimdata.amount,
            isSufficient: true,
            isLoading: false,
            isPromptShow: true
          });
          
        }
        if( this.props.claimdata.amount > this.state.checkEclaim.balance ){
          this.setState({
            claim_amount: this.state.checkEclaim.balance,
            isSufficient: false,
            isLoading: false,
            isPromptShow: true
          });
          
        }
      });
    });
  }

  async GetCurrency() {
    this.setState({
      currency_exchange: (this.props.claimdata.currency == "SGD") ? '3.00' : '3.00'
    })
  }

  isVisibleUpdate() {
    this.setState({ failed: false, showPopUp: false })
  }

  async renderMember() {
    const user = await this.props.claimdata.memberData.find(item => item.value === this.props.claimdata.member)

    if (user) {
      this.setState({ member: user.label })
    }
  }

  statusModal = () => {
    // console.log('modal hide completely')
    if (this.state.failed) {
      this.setState({ showPopUp: true });
      // console.log('this.state.showPopUp', this.state.showPopUp);
    }
  }

  renderPopUp = () => {
    return (
      <Popup
        kind="eClaimError"
        isVisible={this.state.showPopUp}
        closeSection={true}
        closeSectionUpdate={this.isVisibleUpdate}
        title={this.state.title}
        message={this.state.message}
      />
    )
  }

  customLoader = () => {
    return (
      <View>
        <Modal
          isVisible={this.state.isLoading}
          backdropTransitionOutTiming={0}
          hideModalContentWhileAnimating={true}
          onModalHide={this.statusModal}
          style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <ActivityIndicator color="#fff" size="large" />
          <Texti
            fontColor="#FFFFFF"
          >Just a sec...</Texti>
        </Modal>
      </View>
    );
  }

  renderPromptModal = () =>{
    return (
      <View>
        <Modal
          isVisible={this.state.isPromptShow}
          backdropTransitionOutTiming={0}
          hideModalContentWhileAnimating={true}
          style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <View 
            style={{ 
              backgroundColor: '#F1F1F1', 
              borderRadius: 2, 
              width: '80%', 
              textAlign: 'center'
            }}>

            <View
              style={{ 
                paddingVertical: 20,
                paddingHorizontal: 20,
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center'
              }}>

              <Image
                source={require('../../assets/bell.png')}
                style={{ height: 40, resizeMode: 'contain', width: 33, marginBottom: 20 }}
              />

              <Text style={{ lineHeight: 18, marginBottom: 10, fontSize: 16 }}>Based on Visit Date, this claim will be recorded on <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, fontWeight: '500' }}>{ this.state.checkEclaim.term_status } term's data</Text>.</Text>
              
              {
                this.state.isSufficient == true ?
                <Text style={{ lineHeight: 18, marginBottom: 15, fontSize: 16 }}>{ this.state.checkEclaim.term_status } term's balance is <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, fontWeight: '500' }}>{ this.state.checkEclaim.currency_type }{ (parseFloat(this.state.checkEclaim.balance).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }</Text> and is <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, fontWeight: '500' }}>sufficient</Text> for this claim.</Text>
                :
                <Text style={{ lineHeight: 18, marginBottom: 5, fontSize: 16 }}>Last term’s balance is <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, fontWeight: '500' }}>{ this.state.checkEclaim.currency_type }{ (parseFloat(this.state.checkEclaim.balance).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }</Text>; hence your Claim Amount is <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, fontWeight: '500' }}>{ this.state.checkEclaim.currency_type }{ (parseFloat(this.state.checkEclaim.balance).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }</Text></Text>
              }
            </View>

            <TouchableOpacity 
              style={{  
                backgroundColor: '#fff',
                height: 40,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => this.setState({ isPromptShow : false })}
            >
              <Text style={{ color: '#18A4E0', fontSize: 16 }}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }

  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  claimTypeProcess() {
    if (this.props.claimdata.type_spending == 'medical') {
      switch (this.props.claimdata.claim) {
        case '1':
          claim = "General Practice"
          break;
        case '2':
          claim = "Health Screening"
          break;
        case '3':
          claim = "Traditional Chinese Medicine"
          break;
        default:
          claim = "Traditional Chinese Medicine"
      }
    } else {
      switch (this.props.claimdata.claim) {
        case '1':
          claim = "Dental"
          break;
        case '2':
          claim = "Traditional Chinese Medicine"
          break;
        case '3':
          claim = "Vision"
          break;
        case '4':
          claim = "Fitness"
          break;
        case '5':
          claim = "Specialist"
          break;
        case '6':
          claim = "Other"
          break;
        default:
          claim = "Dental"
      }
    }

    return claim
  }

  render() {
    // console.warn("props: " + JSON.stringify(this.props))
    // console.warn(this.state.currency_exchange);
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar leftNav="back" title="Review and Submit" subtitle="E-claim" />
        <EclaimStep
          currentPosition={2}
        />
        <View style={{ backgroundColor: "#EFEFF4", marginTop: -15, marginBottom: -15 }}>
          <Common.Divider />
          <Common.Texti fontColor={"#B4B4B4"} style={{
            paddingLeft: 15,
            paddingTop: -15,
          }}>
            DETAILS
          </Common.Texti>
          <Common.Divider />
        </View>
        {this.customLoader()}
        {this.renderPopUp()}
        {this.renderPromptModal()}

        <ScrollView showsVerticalScrollIndicator={false}>
          <GiftedForm
            style={{
              backgroundColor: '#fff',
            }}
            formName="signupForm"
            openModal={route => {
              navigator.push(route); // The ModalWidget will be opened using this method. Tested with ExNavigator
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignContent: 'space-between',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 15,
                paddingBottom: 15,
                paddingRight: 15,
                paddingLeft: 8,
              }}
            >
              <Text style={{ color: '#000', marginLeft: '2%' }}>
                Spending Account
              </Text>
              <View
                style={{ flexDirection: 'row' }}>
                <Common.Texti fontColor={"#2C3E50"}>
                  {this.Capitalize(this.props.claimdata.type_spending)}
                </Common.Texti>
              </View>
            </View>

            <View style={{ paddingLeft: 8 }}>
              <Common.Divider noMargin Side />
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignContent: 'space-between',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 15,
                paddingBottom: 15,
                paddingRight: 15,
                paddingLeft: 8,
              }}
            >
              <Text style={{ color: '#000', marginLeft: '2%' }}>
                Claim Type
              </Text>
              <View
                style={{ flexDirection: 'row' }}>
                <Common.Texti fontColor={"#2C3E50"}>
                  {this.props.claimdata.claim}
                </Common.Texti>
              </View>
            </View>

            <View style={{ paddingLeft: 8 }}>
              <Common.Divider noMargin Side />
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignContent: 'space-between',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 15,
                paddingBottom: 15,
                paddingRight: 15,
                paddingLeft: 8,
              }}
            >
              <Text
                style={{ color: '#000', marginLeft: '2%', marginRight: '6%' }}
              >
                Provider
              </Text>
              <View
                style={{ flexDirection: 'row' }}>
                <Common.Texti fontColor={"#2C3E50"}>
                  {this.props.claimdata.provider}
                </Common.Texti>
              </View>
            </View>

            <View style={{ paddingLeft: 8 }}>
              <Common.Divider noMargin Side />
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignContent: 'space-between',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 15,
                paddingBottom: 15,
                paddingRight: 15,
                paddingLeft: 8,
              }}
            >
              <Common.Texti style={{
                color: '#000', marginLeft: '2%', marginRight: '3%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                Visit Date
              </Common.Texti>
              <Text
                style={{ color: '#000', marginLeft: '2%', marginRight: '3%' }}
              >
              </Text>
              <View
                style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Common.Texti fontColor={"#2C3E50"}>
                  {this.props.claimdata.date}
                </Common.Texti>
                <View
                  style={{
                    alignItems: 'flex-end',
                    marginLeft: 10
                  }}
                >
                  <ImageBackground
                    source={require('../../assets/apps/calendar.png')}
                    style={{
                      width: 15,
                      height: 15,
                      resizeMode: 'center'
                    }}
                  />
                </View>
              </View>
            </View>

            <View style={{ paddingLeft: 8 }}>
              <Common.Divider noMargin Side />
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignContent: 'space-between',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 15,
                paddingBottom: 15,
                paddingRight: 15,
                paddingLeft: 8,
              }}
            >
              <Text
                style={{ color: '#000', marginLeft: '2%', marginRight: '3%' }}
              >
                Visit Time
              </Text>
              <View
                style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Common.Texti fontColor={"#2C3E50"}>
                  {this.props.claimdata.time}
                </Common.Texti>
                <View
                  style={{
                    alignItems: 'flex-end',
                    marginLeft: 10
                  }}
                >
                  <ImageBackground
                    source={require('../../assets/apps/clocks.png')}
                    style={{
                      width: 15,
                      height: 15,
                      resizeMode: 'center'
                    }}
                  />
                </View>
              </View>
            </View>

            <View style={{ paddingLeft: 8 }}>
              <Common.Divider noMargin Side />
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignContent: 'space-between',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 15,
                paddingBottom: 15,
                paddingRight: 15,
                paddingLeft: 8,
              }}
            >
              <Text
                style={{ color: '#000', marginLeft: '2%', marginRight: '3%' }}
              >
                Receipt Amount
              </Text>
              <View
                style={{ flexDirection: 'row' }}>
                <Common.Texti fontColor={"#2C3E50"} fontSize={15}>
                  {parseFloat(this.props.claimdata.amount).toFixed(2)}{" "}
                </Common.Texti>
                <Common.Texti fontColor={"#2C3E50"} fontSize={15}>
                  {this.state.checkEclaim.currency_type}
                </Common.Texti>
              </View>
            </View>

            <View style={{ paddingLeft: 8 }}>
              <Common.Divider noMargin Side />
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignContent: 'space-between',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 15,
                paddingBottom: 15,
                paddingRight: 15,
                paddingLeft: 8,
              }}
            >
              <Text
                style={{ color: '#000', marginLeft: '2%', marginRight: '3%' }}
              >
                Claim Amount
              </Text>
              <View
                style={{ flexDirection: 'row' }}>
                <Common.Texti fontColor={"#2C3E50"} fontSize={15}>
                  {parseFloat(this.state.claim_amount).toFixed(2)}{" "}
                </Common.Texti>
                <Common.Texti fontColor={"#2C3E50"} fontSize={15}>
                  {this.props.claimdata.currency}
                </Common.Texti>
              </View>
            </View>

            <View style={{ paddingLeft: 8 }}>
              <Common.Divider noMargin Side />
            </View>

            {(this.props.claimdata.company_currency != this.props.claimdata.currency ) ? (
              <View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignContent: 'space-between',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: 15,
                    paddingBottom: 15,
                    paddingRight: 15,
                    paddingLeft: 8,
                  }}
                >
                  <Text
                    style={{ color: '#000', marginLeft: '2%', marginRight: '3%' }}
                  >
                    Currency Exchange
                  </Text>
                  <View
                    style={{ flexDirection: 'row' }}>
                    <Common.Texti fontColor={"#2C3E50"} fontSize={15}>
                      {parseFloat(this.state.currency_exchange).toFixed(2)}
                    </Common.Texti>
                  </View>
                </View>

                <View style={{ paddingLeft: 8 }}>
                  <Common.Divider noMargin Side />
                </View>

                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignContent: 'space-between',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: 15,
                    paddingBottom: 15,
                    paddingRight: 15,
                    paddingLeft: 8,
                  }}
                >
                  <Text
                    style={{ color: '#000', marginLeft: '2%', marginRight: '3%' }}
                  >
                    Total
                  </Text>
                  <View
                    style={{ flexDirection: 'row' }}>
                    <Common.Texti fontColor={"#2C3E50"} fontSize={15}>
                      { ( this.props.claimdata.company_currency == 'SGD' && this.props.claimdata.currency == 'MYR' ) ?
                        parseFloat(this.props.claimdata.amount / this.state.currency_exchange).toFixed(2)
                        :
                        parseFloat(this.props.claimdata.amount * this.state.currency_exchange).toFixed(2)
                      }
                      {" "}
                    </Common.Texti>
                    <Common.Texti fontColor={"#2C3E50"} fontSize={15}>
                      {this.props.claimdata.company_currency}
                    </Common.Texti>
                  </View>
                </View>

                <View style={{ paddingLeft: 8 }}>
                  <Common.Divider noMargin Side />
                </View>

              </View>
            ) : (<View />)}
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignContent: 'space-between',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 15,
                paddingBottom: 15,
                paddingRight: 15,
                paddingLeft: 8,
              }}
            >
              <Text
                style={{
                  color: '#000',
                  marginLeft: '2%',
                  marginRight: '10%',
                }}
              >
                Member
              </Text>
              <View
                style={{ flexDirection: 'row' }}>
                <Common.Texti fontColor={"#2C3E50"}>
                  {this.state.member}
                </Common.Texti>
              </View>
            </View>

            <View style={{ paddingLeft: 8 }}>
              <Common.Divider noMargin Side />
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignContent: 'space-between',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 15,
                paddingBottom: 15,
                paddingRight: 15,
                paddingLeft: 8,
              }}
            >
              <Text
                style={{
                  color: '#000',
                  marginLeft: '2%',
                  marginRight: '16%',
                }}
              >
                Receipt
              </Text>
              <View
                style={{
                  width: '50%',
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5,
                  borderBottomLeftRadius: 5,
                  borderBottomRightRadius: 5,
                  backgroundColor: '#fff',
                  alignItems: 'flex-end',
                }}
              >
                {(typeof this.props.claimdata.images !== 'undefined') ? (
                  this.props.claimdata.images.map((value, index) => (
                    <View
                      key={index}
                      style={{ flex: 1, flexDirection: 'column', marginBottom: 3, justifyContent: 'space-around' }}>
                      <ZoomImage
                        imgStyle={{
                          width: 70,
                          height: 80,
                          margin: 2
                        }}
                        enableScaling={true}
                        easingFunc={Easing.ease}
                        duration={200}
                        source={{ uri: value.preview }}
                      />
                      {/* <ImageBackground
                        resizeMode="cover"
                        style={{ width: '100%', height: 90, width: 70 }}
                        source={{ uri: value.preview }}
                      /> */}
                    </View>
                  ))
                ) : (
                    <View />
                  )}
              </View>
            </View>

            <View style={{ marginLeft: -15, marginRight: -15 }}>
              <Common.Divider noMargin />
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignContent: 'space-between',
                marginVertical: 10,
              }}
            >
              <Text style={{ width: '38%' }} />
            </View>
          </GiftedForm>

        </ScrollView>

        <View style={{
          justifyContent: 'flex-end',
        }}>
          <TouchableOpacity
            onPress={this.EclaimProcess}
            disabled={this.state.isLoading}
            activeOpacity={this.state.isLoading ? 0.2 : 1}
            style={{
              backgroundColor: "#0392CF",
              width: "100%",
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Common.Texti
              fontSize={RF(2.4)}
              fontColor={"#ffffff"}
              style={{
                paddingBottom: responsiveHeight(2.9),
                paddingTop: responsiveHeight(1.7),
              }}>
              {this.state.button}
            </Common.Texti>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }
}

export default DetailEclaim;
