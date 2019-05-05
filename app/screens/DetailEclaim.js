import React, { Component } from 'react';
import { GiftedForm } from 'react-native-gifted-form';
import {
  StatusBar,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  Image,
  Easing
} from 'react-native';
import Modal from 'react-native-modal';
import { Container } from 'native-base';
import { Actions } from 'react-native-router-flux';
import ZoomImage from 'react-native-zoom-image';
import { ButtonFooter, Popup } from '../components/common';
import Texti from "../components/common/Texti"
import Navbar from '../components/common/Navbar';
import * as Common from '../components/common';
import EclaimStep from '../components/EclaimStep';
import * as Core from '../core';

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
      button: 'Submit'
    }

    this.isVisibleUpdate = this.isVisibleUpdate.bind(this);
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
        'date': this.props.claimdata.date,
        'spending_type': this.props.claimdata.type,
        'time': this.props.claimdata.time
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
          console.log('failed to submit')
          await this.setState({ message: result.message, title: 'E-Claim Submission', failed: true, isLoading: false, button: 'Submit' })
        }

      })
    } catch (e) {
      Core.getNotify("", "Failed to send e claim")

      this.setState({
        message: "Failed to send e claim", title: 'E-Claim Submission', failed: true, isLoading: false, button: 'Submit'
      })
    } finally {
      console.log('finally called')
      // setTimeout(()=>{
      //   this.setState({
      //     isLoading: false,
      //     button: 'Log in'
      //   })
      // }, 2000)
    }
  }

  componentDidMount() {
    this.renderMember();
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
    console.log('modal hide completely')
    if (this.state.failed) {
      this.setState({ showPopUp: true });
      console.log('this.state.showPopUp', this.state.showPopUp);
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

  render() {
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar leftNav="back" title="E-Claim" subtitle="File e-claim" />
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

        <ScrollView showsVerticalScrollIndicator={false}>
          <GiftedForm
            style={{
              backgroundColor: '#fff',
              paddingLeft: 5,
              paddingRight: 15,
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
                paddingBottom: 15
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
                <View
                  style={{
                    alignItems: 'flex-end',
                    marginLeft: 10
                  }}
                >
                  <Image
                    source={require('../../assets/apps/arrow.png')}
                    style={{ height: 15, resizeMode: 'center', width: 15 }}
                  />
                </View>
              </View>
            </View>
            <Common.Divider noMargin />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignContent: 'space-between',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 15,
                paddingBottom: 15
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
            <Common.Divider noMargin />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignContent: 'space-between',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 15,
                paddingBottom: 15
              }}
            >
              <Text
                style={{ color: '#000', marginLeft: '2%', marginRight: '3%' }}
              >
                Visit Date
              </Text>
              <View
                style={{ flexDirection: 'row' }}>
                <Common.Texti fontColor={"#2C3E50"}>
                  {this.props.claimdata.date}
                </Common.Texti>
                <View
                  style={{
                    alignItems: 'flex-end',
                    marginLeft: 10
                  }}
                >
                  <Image
                    source={require('../../assets/apps/calendar.png')}
                    style={{ height: 16, resizeMode: 'center', width: 15 }}
                  />
                </View>
              </View>
            </View>
            <Common.Divider noMargin />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignContent: 'space-between',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 15,
                paddingBottom: 15
              }}
            >
              <Text
                style={{ color: '#000', marginLeft: '2%', marginRight: '3%' }}
              >
                Visit Time
              </Text>
              <View
                style={{ flexDirection: 'row' }}>
                <Common.Texti fontColor={"#2C3E50"}>
                  {this.props.claimdata.time}
                </Common.Texti>
                <View
                  style={{
                    alignItems: 'flex-end',
                    marginLeft: 10
                  }}
                >
                  <Image
                    source={require('../../assets/apps/clocks.png')}
                    style={{ height: 15, resizeMode: 'center', width: 15 }}
                  />
                </View>
              </View>
            </View>
            <Common.Divider noMargin />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignContent: 'space-between',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 15,
                paddingBottom: 15
              }}
            >
              <Text
                style={{ color: '#000', marginLeft: '2%', marginRight: '3%' }}
              >
                Claim Amount
              </Text>
              <View
                style={{ flexDirection: 'row' }}>
                <Common.Texti fontColor={"#2C3E50"}>
                  {this.props.claimdata.amount}{" "}
                </Common.Texti>
                <Common.Texti fontColor={"#2C3E50"} fontSize={16}>
                  S$
                </Common.Texti>
              </View>
            </View>
            <Common.Divider noMargin />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignContent: 'space-between',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 15,
                paddingBottom: 15
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
                <View
                  style={{
                    alignItems: 'flex-end',
                    marginLeft: 10
                  }}
                >
                  <Image
                    source={require('../../assets/apps/arrow.png')}
                    style={{ height: 15, resizeMode: 'center', width: 15 }}
                  />
                </View>
              </View>
            </View>
            <Common.Divider noMargin />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignContent: 'space-between',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 15,
                paddingBottom: 15
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
                  justifyContent: 'flex-end',
                  alignItems: 'center',
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
          <ButtonFooter onPress={this.EclaimProcess} disabled={this.state.isLoading} activeOpacity={this.state.isLoading ? 0.2 : 1}>
            {this.state.button}
          </ButtonFooter>
        </ScrollView>
      </Container>
    );
  }
}

export default DetailEclaim;
