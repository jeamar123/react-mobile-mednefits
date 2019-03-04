import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native'
import * as Common from '../common'
import RNPickerSelect from 'react-native-picker-select'
import { Icon } from 'native-base'
import styles from './styles'
import * as Core from '../../core'
import { Actions } from 'react-native-router-flux'

export default class EclaimForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      date: "Input Date",
      time: "Input Time",
      type: "medical",
      claimType: [
        {
          label: "Please choose claim first",
          value: null
        }
      ],
      claimTypeState: "Select",
      claim: false,
      member: false,
      memberData: [],
      memberState: "Select",
      isDateTimePickerVisible: false,
      amount: false,
      provider: false,
      file: false,
      isLoading: false
    }

    this.selectSpending = this.selectSpending.bind(this)
    this.inputDate = {};
  }

  componentWillMount() {
    this.getMember()
    this.selectSpending("medical")
  }

  async getMember() {
    this.setState({ memberState: "Loading..." })

    await Core.GetAllMember((err, result) => {
      if (result) {
        dataMember = []

        result.data.users.map((member) => {
          dataMember.push({ label: member.name, value: member.user_id })
        });

        this.setState({
          memberState: "Select",
          memberData: dataMember,
        })

      }
    })
  }

  async selectSpending(type) {
    this.setState({ type: type, claimTypeState: "Loading...", claim: false })

    await Core.GetHealthTypeList(type, (err, result) => {
      if (result) {
        dataClaim = []

        result.data.map((claim) => {
          dataClaim.push({ label: claim.name, value: claim.health_type_id })
        });

        this.setState({ claimType: dataClaim })
      }

      this.setState({ claimTypeState: "Select" })
    })
  }

  setClaimValue(val) {
    this.state.claimType.map((value, index) => {
      if (val == value.value) {
        this.setState({ claim: value.label })
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.submitForm) {
      this.nextSnapPhoto()
    }
  }

  nextSnapPhoto() {
    if (
      (!this.state.claim) ||
      (!this.state.provider) ||
      (!this.state.amount) ||
      (!this.state.member) ||
      (this.state.Idate == "nput Date") ||
      (this.state.time == "Input Time")
    ) {
      Core.getNotify("", "Please fill mandatory form")
    } else {
      Actions.ReceiptVerification({ claimdata: { ...this.state } })
    }
  }

  render() {
    return (
      <View
        style={styles.container}
      >
        <Core.Loader
          isVisible={this.state.isLoading}
        />
        <ScrollView showsVerticalScrollIndicator={false}>

          <View
            style={styles.sectionComponent}
          >
            <Common.Texti style={styles.title}>
              *Spending Account
          </Common.Texti>
            <View style={{ width: '50%', flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity
                onPress={() => this.selectSpending("medical")}
                refs="medical"
                style={[(this.state.type == 'medical') ? styles.spendingActive : styles.spendingNotactive, { marginRight: '1%' }]}
              >
                <Common.Texti>
                  Medical
              </Common.Texti>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.selectSpending("wellness")}
                refs="wellness"
                style={[(this.state.type == 'wellness') ? styles.spendingActive : styles.spendingNotactive, { marginRight: '5%' }]}
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

            <Common.InputSelect2
              placeholder={this.state.claimTypeState}
              data={this.state.claimType}
              titleValue={this.state.claim}
              onValueChange={(value) => this.setClaimValue(value)}
            />

          </View>

          <Common.Divider />

          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              paddingRight: 25
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
              onChangeText={text => this.setState({ provider: text })}
              placeholder="Name of Provider"
              iconColor="#9e9e9e"
              leftToRight
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

            <Common.InputDateCustom
              style={{
                backgroundColor: "white",
                borderBottomColor: "#9e9e9e",
                borderBottomWidth: 0,
                justifyContent: 'center',
                borderRadius: 2,
                height: 50
              }}
              startDate={new Date()}
              minDate={new Date()}
              onError={() => Common.getNotify("", "Error loading, please try again")}
              renderDate={({ year, month, day, date }) => {
                if (!date) {
                  return <Common.Texti fontColor={"#9e9e9e"}>{this.state.date}</Common.Texti>
                }
                const dateStr = `${day}-${month}-${year}`
                return <Common.Texti fontColor={"#2c3e50"} >{dateStr}</Common.Texti>
              }}
              onDateChanged={({ year, month, day, date }) => this.setState({ date: `${day}-${month}-${year}` })}
              rightIcon="arrow-right"
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
              *Time of Visit
            </Common.Texti>
            <View
              style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
            >
              <Common.InputTime
                placeholder={this.state.time}
                onTimeChange={(time) => this.setState({ time: time })}
              />

              <Icon
                type="SimpleLineIcons"
                name="arrow-right"
                style={{
                  color: "#9e9e9e",
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
              alignItems: 'center',
              paddingRight: 25,
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
              onChangeText={text => this.setState({ amount: text })}
              placeholder="Amount"
              type={"currency"}
              leftToRight
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
              onValueChange={(value) => this.setState({ member: value })}
            />
          </View>


        </ScrollView>
      </View>
    )
  }
}
