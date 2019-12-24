import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Text
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
      company_currency: 'SGD',
      currency: 'SGD',
      updateDataSelect: false,
      currencyData: [],
      currencyState: "Select"
    }
    this.selectSpending = this.selectSpending.bind(this)
    this.inputDate = {};
  }

  componentWillMount() {
    this.getUserDetail()
    this.getMember()
    this.selectSpending("medical")
    this.getCurrency()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currencyState !== this.props.currencyState) {
      this.setState({
        currency: this.state.currency
      })
    }
  }

  async getUserDetail() {
    console.log('in progress fetching getUserDetail')
    await Core.UserDetail(async (error, result) => {
      console.log('fetching done for getUserDetail');
      data =
        await typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      console.log(data);
      await this.setState({
        currency: data.profile.currency_type.toUpperCase(),
        company_currency: data.profile.currency_type.toUpperCase(),
      });
    });
  }

  updateDataSelect() {
    this.setState({
      type_spending: this.props.type_spending,
      provider: this.props.provider,
      amount: this.props.amount,
      member: this.props.member,
      date: this.props.date,
      time: this.props.time,
      updateDataSelect: true
    })
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
          dataCurrency.push({ label: currency.currency_name, value: (currency.currency_name == "SGD - Singapore Dollar") ? "SGD" : "MYR" })
        });
        this.setState({
          currencyState: "Select",
          currencyData: dataCurrency,
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
    try {
      this.state.claimType.map((value, index) => {
        if (val == value.value) {
          this.setState({
            claimLabel: value.label
          })
        }
      })
    } catch (e) {
      console.warn('unset eclaim');
    }
  }

  updateClaim(val) {
    try {
      this.state.claimType.map((value, index) => {
        if (val == value.value) {
          this.setState({
            claim: value.value,
            claimLabel: value.label
          })
        }
      })
    } catch (e) {
      console.warn('unset eclaim');
    }
  }

  nextSnapPhoto() {
    try {
      if (
        (!this.state.claim) ||
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
          claim: this.state.claimLabel,
          provider: this.state.provider,
          amount: this.state.amount,
          member: this.state.member,
          date: this.state.date,
          time: this.state.time,
          currency: this.state.currency,
          company_currency: this.state.company_currency,
        }

        Actions.ReceiptVerification({ claimdata: Object.assign({}, claimData, { memberData: this.state.memberData }) })

      }
    } catch (e) {
      Core.getNotify("", "Failed to process data")
    }
  }

  render() {
    let Tanggal = new Date()
    console.warn(this.state.claimLabel);
    return (
      <View
        style={styles.container}
      >
        <Core.Loader
          isVisible={this.state.isLoading}
        />
        <ScrollView showsVerticalScrollIndicator={false} >
          <View style={{ marginBottom: 60 }}>
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

            <View style={{ flex: 1 }}>
              <View
                style={[styles.fieldStyle, { marginTop: "3%" }]}
              >
                <Common.Texti
                  fontFamily={Config.FONT_FAMILY_MEDIUM}
                  fontColor={'#2C3E50'}
                >
                  Claim Type
                </Common.Texti>
                <Common.InputSelectListClaim
                  title="Claim Type"
                  placeholder={this.state.claimTypeState}
                  dataclaim={this.state.claimType}
                  value={this.state.claim}
                  onValueChange={(value) => this.updateClaim(value)}
                />
              </View>

              <View style={{ marginLeft: '5%' }}>
                <Common.Divider />
              </View>


              <View
                style={styles.fieldStyleNoPadding}
              >
                <Common.Texti
                  fontFamily={Config.FONT_FAMILY_MEDIUM}
                  fontColor={'#2C3E50'}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  Provider
                </Common.Texti>
                <Common.InputText
                  value={this.state.provider}
                  onChangeText={text => this.setState({ provider: text })}
                  placeholder="Name of Provider "
                  inputStyle={{
                    color: "#2C3E50"
                  }}
                  iconColor="#9e9e9e"
                  leftToRight
                />
              </View>

              <View style={{ marginLeft: '5%' }}>
                <Common.Divider />
              </View>


              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  paddingTop: 10,
                  paddingBottom: 10,
                  marginRight: '5%',
                  marginLeft: "5%",
                }}
              >
                <Common.Texti
                  fontFamily={Config.FONT_FAMILY_MEDIUM}
                  fontColor={'#2C3E50'}
                >
                  Visit Date
                </Common.Texti>

                <Common.InputDateCustom
                  startDate={new Date()}
                  minDate={new Date()}
                  maxDate={() => Tanggal.now()}
                  onError={() => Common.getNotify("", "Error loading, please try again")}
                  renderDate={({ year, month, day, date }) => {
                    if (!date) {
                      return <Common.Texti fontFamily={Config.FONT_FAMILY_MEDIUM} fontColor={"#9e9e9e"}>{this.state.date}</Common.Texti>
                    }
                    const dateStr = `${day} ${month} ${year}`
                    return <Common.Texti fontFamily={Config.FONT_FAMILY_MEDIUM} fontColor={"#2c3e50"} >{dateStr}</Common.Texti>
                  }}
                  onDateChanged={({ year, month, day, date }) => this.setState({ date: `${day} ${month} ${year}` })}
                />

              </View>

              <View style={{ marginLeft: '5%' }}>
                <Common.Divider />
              </View>


              <View
                style={styles.fieldStyle}
              >
                <Common.Texti
                  fontFamily={Config.FONT_FAMILY_MEDIUM}
                  fontColor={'#2C3E50'}
                  style={{
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

              <View style={{ marginLeft: '5%' }}>
                <Common.Divider />
              </View>

              {/* ( this.state.company_currency == 'SGD' ) ? : null */}

              <View>
                <View
                  style={styles.fieldStyle}
                >
                  <Common.Texti
                    fontFamily={Config.FONT_FAMILY_MEDIUM}
                    fontColor={'#2C3E50'}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    Currency
                  </Common.Texti>

                  <Common.InputSelectListCurrency
                    title="Currency"
                    placeholder={this.state.currencyState}
                    titleValue={(this.state.currency == "S$" || this.state.currency == "SGD") ? "SGD" : "MYR"}
                    data={this.state.currencyData}
                    onValueChange={(value) => this.setState({ currency: value })}
                  />
                </View>

                <View style={{ marginLeft: '5%' }}>
                  <Common.Divider />
                </View>
              </View>

              <View
                style={styles.fieldStyleNoPadding}
              >
                <Common.Texti
                  fontFamily={Config.FONT_FAMILY_MEDIUM}
                  fontColor={'#2C3E50'}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  Receipt Amount
                </Common.Texti>

                <View style={{ flexDirection: 'row' }}>
                  <Common.InputAmount
                    keyboardType={"number-pad"}
                    value={this.state.amount}
                    keyboardType="numeric"
                    onChangeText={text => this.setState({ amount: text })}
                    placeholder="Enter amount "
                    currency={this.state.currency}
                    leftToRight
                  />
                  {/*
                  <View
                    style={{
                      borderRightColor: '#DBDBDB',
                      borderRightWidth: 0.8,
                      marginTop: -10,
                      marginBottom: -10
                    }}
                  />
                  */}
                  <View style={{ marginLeft: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Common.Texti fontSize={12} fontFamily={Config.FONT_FAMILY_BOLD}>
                      { this.state.currency }
                    </Common.Texti>
                    {/*<Common.InputSelectListCurrency
                      title="Currency"
                      data={this.state.currencyData}
                      titleValue={this.state.currency}
                      onValueChange={(value) => this.setState({ currency: value })}
                    />*/}
                  </View>
                </View>
              </View>

              <View style={{ marginLeft: '5%' }}>
                <Common.Divider />
              </View>


              <View
                style={styles.fieldStyle}
              >
                <Common.Texti
                  fontFamily={Config.FONT_FAMILY_MEDIUM}
                  fontColor={'#2C3E50'}
                  style={{
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
          </View>
        </ScrollView>
        <View style={{
          flex: 1,
          justifyContent: 'flex-end',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}>
          <TouchableOpacity
            onPress={() => this.nextSnapPhoto()}
            style={{
              backgroundColor: (!this.state.claim) ||
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
        </View>
      </View>
    )
  }
}
