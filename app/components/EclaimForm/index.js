import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import * as Common from '../common'
import styles from './styles'
import * as Core from '../../core'
import * as Config from '../../config'

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
      claimTypeState: "Name of Provider",
      claim: false,
      member: false,
      memberData: [],
      memberState: "Select",
      isDateTimePickerVisible: false,
      amount: false,
      provider: false,
      file: false,
      isLoading: false,
      currency: false,
      currencyData: [],
      currencyState: "S$"
    }
    this.selectSpending = this.selectSpending.bind(this)
    this.inputDate = {};
  }

  componentWillMount() {
    this.getMember()
    this.selectSpending("medical")
    this.getCurrency()
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

  async getCurrency() {
    this.setState({ currencyState: "Loading..." })

    await Core.CurrencyList((err, result) => {
      if (result) {
        dataCurrency = []

        result.data.map((currency) => {
          dataCurrency.push({ label: (currency.currency_name == "SGD - Singapore Dollar") ? "S$" : "RM", value: (currency.currency_name == "SGD - Singapore Dollar") ? "S$" : "RM" })
        });
        this.setState({
          currencyState: "Select",
          currencyData: dataCurrency,
          currency: "S$",
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
          type_spending: this.state.type,
          claim: this.props.claim,
          provider: this.state.provider,
          amount: this.state.amount,
          member: this.state.member,
          date: this.state.date,
          time: this.state.time,
          currency: this.state.currency
        }

        Actions.ReceiptVerification({ claimdata: Object.assign({}, claimData, { memberData: this.state.memberData }) })

      }
    } catch (e) {
      Core.getNotify("", "Failed to process data")
    }
  }

  render() {
    let Tanggal = new Date()
    console.warn(this.state.type);
    return (
      <View
        style={styles.container}
      >
        <Core.Loader
          isVisible={this.state.isLoading}
        />
        <ScrollView showsVerticalScrollIndicator={false} >
          <View
            style={styles.sectionComponent}
          >
            <Common.Texti fontColor="#848484" style={styles.title}>
              SPENDING ACCOUNT
            </Common.Texti>
          </View>
          <View style={styles.sectionSpending}>
            <TouchableOpacity
              onPress={() => this.selectSpending("medical")}
              refs="medical"
              style={[(this.state.type == 'medical') ? styles.spendingActive : styles.spendingNotactive, { width: '45%' }]}
            >
              <Common.Texti>
                Medical
              </Common.Texti>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.selectSpending("wellness")}
              refs="wellness"
              style={[(this.state.type == 'wellness') ? styles.spendingActive : styles.spendingNotactive, { width: '45%' }]}
            >
              <Common.Texti>
                Wellness
              </Common.Texti>
            </TouchableOpacity>
          </View>

          <View style={styles.dividerDetail}>
            <Common.Texti fontColor="#848484" style={styles.detailsTitle}>
              DETAILS
            </Common.Texti>
          </View>

          <View style={{ flex: 1, marginLeft: "5%", marginRight: "5%" }}>
            <View
              style={[styles.fieldStyle, { marginTop: "3%" }]}
            >
              <Common.Texti>
                Claim Type
              </Common.Texti>
              <TouchableOpacity
                onPress={() => Actions.SelectList({ title: "Claim Type", data: this.state.claimType })}
                style={{ flexDirection: 'row' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Common.Texti
                    fontSize={12}
                    fontFamily={Config.FONT_FAMILY_LIGHT}
                    fontColor={((this.props.claimTypeState == "") || (this.props.claimTypeState == undefined) || (this.props.claimTypeState == null)) ? "#9e9e9e" : "black"}>
                    {((this.props.claimTypeState == "") || (this.props.claimTypeState == undefined) || (this.props.claimTypeState == null)) ? this.state.claimTypeState : this.props.claimTypeState}
                  </Common.Texti>
                </View>

                <View
                  style={{
                    alignItems: 'flex-end',
                    marginLeft: 10
                  }}
                >
                  <Image
                    source={require('../../../assets/apps/arrow.png')}
                    style={{ height: 20, resizeMode: 'center', width: 20 }}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <Common.Divider />

            <View
              style={styles.fieldStyleNoPadding}
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
                inputStyle={{
                  fontSize: 16
                }}
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
                Visit Date
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
                maxDate={() => Tanggal.now()}
                onError={() => Common.getNotify("", "Error loading, please try again")}
                renderDate={({ year, month, day, date }) => {
                  if (!date) {
                    return <Common.Texti fontSize={12} fontFamily={Config.FONT_FAMILY_LIGHT} fontColor={"#9e9e9e"}>{this.state.date}</Common.Texti>
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
                Visit Time
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
                    style={{ height: 20, resizeMode: 'center', width: 20 }}
                  />
                </View>

              </View>
            </View>

            <Common.Divider />

            {/*   */}

            <View
              style={styles.fieldStyle}
            >
              <Common.Texti style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                Currency
              </Common.Texti>

              <Common.InputSelect
                placeholder={this.state.currency}
                data={this.state.currencyData}
                value={this.state.currency}
                onValueChange={(value) => this.setState({ currency: value })}
              />
            </View>

            <Common.Divider />

            <View
              style={styles.fieldStyleNoPadding}
            >
              <Common.Texti style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                Receipt Amount
              </Common.Texti>

              <Common.InputAmount
                value={this.state.amount}
                keyboardType="numeric"
                onChangeText={text => this.setState({ amount: text })}
                placeholder="Enter amount"
                type={"currency"}
                currency={this.state.currency}
                leftToRight
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
                Member
              </Common.Texti>

              <Common.InputSelect
                placeholder={this.state.memberState}
                data={this.state.memberData}
                value={this.state.member}
                onValueChange={(value) => this.setState({ member: value })}
              />
            </View>
            <Common.Divider style={{ marginLeft: "-5%", marginRight: "-5%" }} />
          </View>

          <View style={{ marginBottom: "15%" }} />

          <TouchableOpacity
            onPress={() => this.nextSnapPhoto()}
            style={{
              backgroundColor: (!this.props.claim) ||
                (!this.state.provider) ||
                (!this.state.amount) ||
                (!this.state.member) ||
                (this.state.date == "Input Date") ||
                (this.state.time == "Input Time") ? "#aacef7" : "#0392CF",
              width: "100%",
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Common.Texti
              fontSize={16}
              fontColor={"#ffffff"}
              style={{
                paddingTop: 10,
                paddingBottom: 10,
              }}>
              Next
          </Common.Texti>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}
