import React, { Component } from 'react';
import { GiftedForm } from 'react-native-gifted-form';
import {
  StatusBar,
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import { Container } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { ClaimDetail } from '../components/ClaimDetail';
import { ButtonFooter, Popup } from '../components/common';
import Navbar from '../components/common/Navbar';
import * as Core from '../core'

class DetailEclaim extends Component {

  constructor(props){
    super(props)

    this.state = {
      isLoading: false,
      failed: false,
      title: null,
      message: null
    }

    this.isVisibleUpdate = this.isVisibleUpdate.bind(this);
  }

  EclaimProcess = () =>{

    try {
      this.setState({
        isLoading: true
      })

      eclaimFile = {
        'user_id': this.props.claimdata.member,
        'service': this.props.claimdata.claim,
        'merchant': this.props.claimdata.provider,
        'file': this.props.claimdata.uri,
        'filename': this.props.claimdata.filename,
        'filetype': this.props.claimdata.filetype,
        'amount': this.props.claimdata.amount,
        'date': this.props.claimdata.date,
        'spending_type': this.props.claimdata.type,
        'time': this.props.claimdata.time
      }

      Core.SendEClaim(eclaimFile, (err, result)=>{
        // Core.getNotify("",result.message)
        if (result.status) {
          this.setState({
            isLoading: false
          })
          Actions.ThanksEclaim({type: 'reset'})
        } else {
          this.setState({ message: result.message, title: 'E-Claim Submission', failed: true, isLoading: false })
        }

      })
    } catch (e) {
      Core.getNotify("", "Failed to send e claim")

      this.setState({
        message: "Failed to send e claim", title: 'E-Claim Submission', failed: true, isLoading: false
      })
    } finally {
      setTimeout(()=>{
        this.setState({
          isLoading: false
        })
      }, 2000)
    }
  }

  isVisibleUpdate() {
    this.setState({ failed: false })
  }

  render() {
    console.warn(this.props.claimdata);
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar leftNav="back" title="E-Claim" subtitle="File e-claim" />
        <ClaimDetail />
        <Popup
          kind="eClaimError"
          isVisible={this.state.failed}
          closeSection={true}
          closeSectionUpdate={this.isVisibleUpdate}
          title={this.state.title}
          message={this.state.message}
        />
        <Core.Loader
          isVisible={this.state.isLoading}
        />
        <ScrollView>
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
                marginVertical: 10,
              }}
            >
              <Text style={{ color: '#000', marginLeft: '2%' }}>
                *Item/Service
              </Text>
              <TextInput
                placeholderTextColor="#0392cf"
                placeholder={(this.props.claimdata.claim) ? this.props.claimdata.claim : ""}
                underlineColorAndroid="transparent"
                colo="#000"
                style={{ marginTop: '-3%', marginLeft: '20%' }}
              />
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignContent: 'space-between',
                marginVertical: 10,
              }}
            >
              <Text
                style={{ color: '#000', marginLeft: '2%', marginRight: '6%' }}
              >
                *Merchant
              </Text>
              <TextInput
                placeholderTextColor="#0392cf"
                placeholder={(this.props.claimdata.provider) ? this.props.claimdata.provider : ""}
                underlineColorAndroid="transparent"
                colo="#000"
                style={{ marginTop: '-3%', marginLeft: '20%' }}
              />
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignContent: 'space-between',
                marginVertical: 10,
              }}
            >
              <Text
                style={{ color: '#000', marginLeft: '2%', marginRight: '3%' }}
              >
                *Date of Visit
              </Text>
              <TextInput
                placeholderTextColor="#0392cf"
                placeholder={(this.props.claimdata.date) ? this.props.claimdata.date : ""}
                underlineColorAndroid="transparent"
                colo="#000"
                style={{ marginTop: '-3%', marginLeft: '19%' }}
              />
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignContent: 'space-between',
                marginVertical: 10,
              }}
            >
              <Text
                style={{ color: '#000', marginLeft: '2%', marginRight: '3%' }}
              >
                *Time of Visit
              </Text>
              <TextInput
                placeholderTextColor="#0392cf"
                placeholder={(this.props.claimdata.time) ? this.props.claimdata.time : ""}
                underlineColorAndroid="transparent"
                colo="#000"
                style={{ marginTop: '-3%', marginLeft: '18%' }}
              />
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignContent: 'space-between',
                marginVertical: 10,
              }}
            >
              <Text
                style={{ color: '#000', marginLeft: '2%', marginRight: '3%' }}
              >
                *Claim Amount
              </Text>
              <TextInput
                placeholderTextColor="#0392cf"
                placeholder={(this.props.claimdata.amount) ? "S$"+this.props.claimdata.amount : ""}
                underlineColorAndroid="transparent"
                colo="#000"
                style={{ marginTop: '-3%', marginLeft: '15%' }}
              />
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignContent: 'space-between',
                marginVertical: 10,
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
              <TextInput
                placeholderTextColor="#0392cf"
                placeholder={(this.props.claimdata.memberData[0].label) ? this.props.claimdata.memberData[0].label : ""}
                underlineColorAndroid="transparent"
                colo="#000"
                style={{ marginTop: '-3%', marginLeft: '19%' }}
              />
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignContent: 'space-between',
                marginVertical: 10,
              }}
            >
              <Text
                style={{
                  color: '#000',
                  marginLeft: '2%',
                  marginRight: '19%',
                }}
              >
                Receipt
              </Text>
              <View
                style={{
                  height: 130,
                  width: '50%',
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5,
                  borderBottomLeftRadius: 5,
                  borderBottomRightRadius: 5,
                  backgroundColor: '#fff',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image
                  resizeMode="cover"
                  style={{ width: '50%', height: 130 }}
                  source={{uri: this.props.claimdata.uri}}
                />
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
          <ButtonFooter onPress={this.EclaimProcess}>
            Submit
          </ButtonFooter>
        </ScrollView>
      </Container>
    );
  }
}

export default DetailEclaim;
