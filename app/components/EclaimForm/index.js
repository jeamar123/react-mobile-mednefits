import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native'
import * as Common from '../common'
import RNPickerSelect from 'react-native-picker-select'
import {Icon} from 'native-base'
import styles from './styles'
import * as Core from '../../core'

export default class EclaimForm extends Component{
  constructor(props){
    super(props)

    this.state = {
      date: "Choose Date",
      time: "Choose Time",
      type: "medical",
      claimType: [
        {
          label: "Please choose claim first",
          value: null
        }
      ],
      claimTypeState: "Choose Claim Type",
      claim:false,
      member: false,
      memberData: [],
      memberState: "Choose Member",
      isDateTimePickerVisible: false,
      amount: false,
      provider: false,
      file: false,
      isLoading: false
    }

    this.selectSpending = this.selectSpending.bind(this)
  }

  componentWillMount(){
    this.getMember()
    this.selectSpending("medical")
  }

  EclaimProcess = () =>{
    try {
      if (!this.state.file) {
        Common.getNotify("","Please input file")
      } else {
        this.setState({
          isLoading: true
        })

        eclaimFile = {
          'user_id': this.state.member,
          'service': this.state.claim,
          'merchant': this.state.provider,
          'file': this.state.file,
          'amount': this.state.amount,
          'date': this.state.date,
          'spending_type': this.state.type,
          'time': this.state.time
        }

        Core.SendEClaim(eclaimFile, (err, result)=>{
          this.setState({
            isLoading: false
          })
        })
      }
    } catch (e) {
      Common.getNotify("","Failed to send data")
    } finally {
      setTimeout(()=>{
        this.setState({
          isLoading: false
        })
      }, 5000)
    }

  }

  async getMember(){
    this.setState({memberState: "Loading..."})

    await Core.GetAllMember((err, result)=>{
      if (result) {
        dataMember = []

        result.data.users.map((member) => {
            dataMember.push({label: member.name, value: member.user_id})
        });

        this.setState({
          memberState: "Choose member",
          memberData: dataMember,
        })

      }
    })
  }

  async selectSpending(type){
    this.setState({type: type, claimTypeState: "Loading...", claim: false})

    await Core.GetHealthTypeList(type, (err, result)=>{
      if (result) {
        dataClaim = []

        result.data.map((claim) => {
            dataClaim.push({label: claim.name,value: claim.health_type_id})
        });

        this.setState({claimType: dataClaim})
      }

      this.setState({claimTypeState: "Choose Claim Type"})
    })
  }

  setClaimValue(value){
    this.state.claimType.map((value, index)=>{
      console.warn(value.value);
      if (value == value.value) {
        console.warn(value.label);
        this.setState({claim: value.label})
      } else {
        console.warn('gada');
      }
    })
  }

  componentDidUpdate(prevProps, prevStates){
    if (prevProps.submitForm !== this.props.submitForm) {
      this.EclaimProcess()
    }
  }

  render(){
    return(
      <View
        style={styles.container}
      >
        <Core.Loader
          isVisible={this.state.isLoading}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Common.Texti style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            *File
          </Common.Texti>

          <View style={{
            width: "50%"
          }}>
            <Common.InputFile
              onChangeFile={(file)=>this.setState({file: file})}
            />
          </View>
        </View>

        <Common.Divider />

        <View
          style={styles.sectionComponent}
        >
          <Common.Texti style={styles.title}>
            *Spending Account
          </Common.Texti>
          <View style={{width: '50%', flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              onPress={()=>this.selectSpending("medical")}
              refs="medical"
              style={[(this.state.type == 'medical') ? styles.spendingActive : styles.spendingNotactive,{marginRight: 15}]}
              >
              <Common.Texti>
                Medical
              </Common.Texti>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>this.selectSpending("wellness")}
              refs="wellness"
              style={(this.state.type == 'wellness') ? styles.spendingActive : styles.spendingNotactive}
              >
              <Common.Texti>
                Wellness
              </Common.Texti>
            </TouchableOpacity>
          </View>
        </View>

        <Common.Divider />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Common.Texti>
            *Claim Type
          </Common.Texti>

          <Common.InputSelect
            placeholder={this.state.claimTypeState}
            data={this.state.claimType}
            value={this.state.claim}
            onValueChange={(value)=>this.setClaimValue(value)}
          />

        </View>

        <Common.Divider />

        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Common.Texti style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            *Provider
          </Common.Texti>
          <Common.InputText
            value={this.state.provider}
            onChangeText={text => this.setState({provider: text})}
            placeholder="Provider"
          />
        </View>

        <Common.Divider />

        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Common.Texti style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            *Date of Visit
          </Common.Texti>

          <TouchableOpacity
            onPress={()=>this._showDateTimePicker()}
            style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}
          >
            <Common.InputDate
              color={"#0392cf"}
              placeholder={this.state.date}
              onChangeDate={(value)=>this.setState({date:value})}
              value={this.state.date}
            />

            <Icon
              type="SimpleLineIcons"
              name="arrow-right"
              style={{
                color: "#cccccc",
                marginLeft: 10,
                fontSize: 18
              }}
            />

          </TouchableOpacity>
        </View>

        <Common.Divider />

        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Common.Texti style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            *Time of Visit
          </Common.Texti>

          <View
            style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}
          >
            <Common.InputTime
              placeholder={this.state.time}
              onTimeChange={(time)=>this.setState({time: time})}
            />

            <Icon
              type="SimpleLineIcons"
              name="arrow-right"
              style={{
                color: "#cccccc",
                marginLeft: 10,
                fontSize: 18
              }}
            />

          </View>
        </View>

        <Common.Divider />

        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Common.Texti style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            *Claim Amount
          </Common.Texti>

          <Common.InputText
            value={this.state.amount}
            keyboardType="numeric"
            onChangeText={text => this.setState({amount: text})}
            placeholder="Amount"
            type={"currency"}
          />
        </View>

        <Common.Divider />

        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Common.Texti style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            *Member
          </Common.Texti>

          <Common.InputSelect
            placeholder={this.state.memberState}
            data={this.state.memberData}
            value={this.state.member}
            onValueChange={(value)=>this.setState({member: value})}
          />
        </View>


        </ScrollView>
      </View>
    )
  }
}
