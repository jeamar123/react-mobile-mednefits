import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native'
import * as Common from '../common'
import styles from './styles'
import * as Core from '../../core'
import { Actions } from 'react-native-router-flux'

export default class EclaimForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      date: "Input Date",
      timeholder: "Input Time",
      time: false,
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

  nextSnapPhoto() {
    try {
      if (
        (!this.props.claim) ||
        (!this.state.provider) ||
        (!this.state.amount) ||
        (!this.state.member) ||
        (this.state.date == "Input Date") ||
        (this.state.time == "Input Time")
      ) {
        Core.getNotify("", "Please fill mandatory form")
      } else {
        claimData = {
          claim: this.props.claim,
          provider: this.state.provider,
          amount: this.state.amount,
          member: this.state.member,
          date: this.state.date,
          time: this.state.time
        }

        Actions.ReceiptVerification({ claimdata: Object.assign({}, claimData, { memberData: this.state.memberData }) })

      }
    } catch (e) {
      Core.getNotify("", "Failed to process data")
    }
  }


  render() {
    let Tanggal = new Date()
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding" >
        <Core.Loader
          isVisible={this.state.isLoading}
        />
        <ScrollView showsVerticalScrollIndicator={false} >
          <View>
            <View
              style={styles.sectionComponent}
            >
              <Common.Texti fontColor="#B4B4B4" style={styles.title}>
                SPENDING ACCOUNT
              </Common.Texti>
            </View>

            <View style={styles.sectionSpending}>
              <TouchableOpacity
                onPress={() => this.selectSpending("medical")}
                refs="medical"
                style={[(this.state.type == 'medical') ? styles.spendingActive : styles.spendingNotactive, { width: '45%' }]}
              >
                <Common.Texti style={{ color: '#2C3E50' }}>
                  Medical
                </Common.Texti>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.selectSpending("wellness")}
                refs="wellness"
                style={[(this.state.type == 'wellness') ? styles.spendingActive : styles.spendingNotactive, { width: '45%' }]}
              >
                <Common.Texti style={{ color: '#2C3E50' }}>
                  Wellness
                </Common.Texti>
              </TouchableOpacity>
            </View>

            <View style={styles.dividerDetail}>
              <Common.Texti fontColor="#B4B4B4" style={styles.detailsTitle}>
                DETAILS
              </Common.Texti>
            </View>

            <View style={{ flex: 1, marginLeft: "5%", marginRight: "5%", marginTop: 10 }}>
              <View
                style={styles.fieldStyle}
              >
                <Common.Texti>
                  Claim Type
                </Common.Texti>

                <TouchableOpacity
                  onPress={() => Actions.SelectList({ title: "Claim Type", data: this.state.claimType })}
                  style={{ flexDirection: 'row' }}>
                  <Common.Texti fontColor={((this.props.claimTypeState == "") || (this.props.claimTypeState == undefined) || (this.props.claimTypeState == null)) ? "#848484" : "black"}>
                    {((this.props.claimTypeState == "") || (this.props.claimTypeState == undefined) || (this.props.claimTypeState == null)) ? this.state.claimTypeState : this.props.claimTypeState}
                  </Common.Texti>
                  <View
                    style={{
                      alignItems: 'flex-end',
                      marginLeft: 10
                    }}
                  >
                    <Image
                      source={require('../../../assets/apps/arrow.png')}
                      style={{ height: 18, resizeMode: 'center', width: 18 }}
                    />
                  </View>
                </TouchableOpacity>
              </View>

              <Common.Divider />

              <View
                style={styles.fieldStyle}
              >
                <Common.Texti style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  Provider
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
                  Date of Visit
                </Common.Texti>

                <Common.InputDateCustom
                  style={{
                    backgroundColor: "white",
                    borderBottomColor: "#9e9e9e",
                    borderBottomWidth: 0,
                    justifyContent: 'center',
                    borderRadius: 2,
                    height: 40
                  }}
                  maxDate={new Date()}
                  onError={() => Common.getNotify("", "Error loading, please try again")}
                  renderDate={({ year, month, day, date }) => {
                    if (!date) {
                      return <Common.Texti fontColor={"#9e9e9e"}>{this.state.date}</Common.Texti>
                    }
                    const dateStr = `${day}-${month}-${year}`
                    return <Common.Texti fontColor={"#2c3e50"} >{dateStr}</Common.Texti>
                  }}
                  onDateChanged={({ year, month, day, date }) => this.setState({ date: `${day}-${month}-${year}` })}
                />

              </View>

              <Common.Divider />

              <View
                style={styles.fieldStyle}
              >
                <Common.Texti style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  Time of Visit
              </Common.Texti>
                <View
                  style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                >
                  <Common.InputTime
                    placeholder={this.state.timeholder}
                    onTimeChange={(time) => this.setState({ time: time })}
                    value={this.state.time}
                  />

                  <View
                    style={{
                      alignItems: 'flex-end',
                      marginLeft: 10
                    }}
                  >
                    <Image
                      source={require('../../../assets/apps/clocks.png')}
                      style={{ height: 18, resizeMode: 'center', width: 18 }}
                    />
                  </View>

                </View>
              </View>

              <Common.Divider />

              <View
                style={styles.fieldStyle}
              >
                <Common.Texti style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  Claim Amount
                </Common.Texti>

                <Common.InputAmount
                  value={this.state.amount}
                  keyboardType="numeric"
                  onChangeText={text => this.setState({ amount: text })}
                  placeholder="Enter amount"
                  type={"currency"}
                  leftToRight
                />
              </View>

              <Common.Divider />

              <View
                style={[styles.fieldStyle, { marginBottom: "10%" }]}
              >
                <Common.Texti style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  Member
                </Common.Texti>

                <Common.InputSelect
                  placeholder={this.state.memberState}
                  data={this.state.memberData}
                  value={this.state.member}
                  onValueChange={(value) => this.setState({ member: value })}
                />
              </View>

            </View>
          </View>
        </ScrollView>
        <View>
          <TouchableOpacity
            onPress={() => this.nextSnapPhoto()}
            style={{
              backgroundColor: "#0392CF",
              width: "100%",
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Common.Texti
              fontSize={16}
              fontColor={"#ffffff"}
              style={{
                padding: 10
              }}>
              Next
              </Common.Texti>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
}
