import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Text
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import ResponsiveImage from 'react-native-responsive-image';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import RF from "react-native-responsive-fontsize";
import moment from 'moment';
import styles from './styles';
import * as Common from '../common';
import * as Core from '../../core';
import * as Config from '../../config';

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
      isLoading: false,
      company_currency: 'SGD',
      currency: 'SGD',
      currencyData: [
        {
          label: "Please choose currency first",
          value: null
        }
      ],
      currencyState: "SGD",
      claimData: null,
      visitMinDate: null,
      visitMaxDate: null,
    }

    this.selectSpending = this.selectSpending.bind(this)
    this.inputDate = {};

    console.log( this.props );
  }

  componentWillMount() {
    this.getUserDetail();
    this.getVisitDateList();
    this.getMember();
    this.selectSpending("medical");
    this.getCurrency();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currencyState !== this.props.currencyState) {
      this.setState({
        currency: this.state.currency
      })
    }
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

  async getUserDetail() {
    await Core.UserDetail(async (error, result) => {
      data =
        await typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      await this.setState({
        currency: data.profile.currency_type.toUpperCase(),
        company_currency: data.profile.currency_type.toUpperCase(),
      });
    });
  }

  async getVisitDateList() {
    await Core.GetCoverageDates(async (error, result) => {
      data =
        await typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
        console.log( data );
      await this.setState({
        visitMinDate: data.start,
        visitMaxDate: data.end,
      });
    });
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

  setCurrencyValue(val) {
    this.state.currencyData.map((value, index) => {
      if (val == value.value) {
        this.setState({ currency: value.label })
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
          claim: this.state.claim,
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
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding" >
        <Core.Loader
          isVisible={this.state.isLoading}
        />
        <ScrollView showsVerticalScrollIndicator={false} >
          <View style={{ marginBottom: 70 }}>
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

            <View style={{ flex: 1, marginTop: 10 }}>
              <View
                style={styles.fieldStyle}
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
                  label={this.state.claim}
                  onValueChange={(label) => this.setState({ claim: label })}
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
                  Provider
                </Common.Texti>
                <Common.InputText
                  value={this.state.provider}
                  returnKeyType='done'
                  keyboardType="email-address"
                  onChangeText={text => this.setState({ provider: text })}
                  placeholder="Name of Provider"
                  inputStyle={{
                    fontSize: RF(1.75),
                    color: "#2C3E50",
                  }}
                  placeholderStyle={{
                    fontSize: 18,
                  }}
                  fontFamily={Config.FONT_FAMILY_MEDIUM}
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
                  alignItems: 'center',
                  marginRight: '5%',
                  marginLeft: "5%",
                }}
              >
                <Common.Texti
                  fontFamily={Config.FONT_FAMILY_MEDIUM}
                  fontColor={'#2C3E50'}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  Visit Date
                </Common.Texti>

                <Common.InputDateCustom
                  style={{
                    backgroundColor: "white",
                    borderBottomColor: "red",
                    borderBottomWidth: 0,
                    justifyContent: 'center',
                    borderRadius: 2,
                    height: 40
                  }}
                  minDate={ new Date( this.state.visitMinDate ) }
                  maxDate={ new Date( this.state.visitMaxDate ) }
                  onError={() => Common.getNotify("", "Error loading, please try again")}
                  renderDate={({ year, month, day, date }) => {
                    if (!date) {
                      return <Common.Texti
                        fontColor={(this.state.date == 'Input Date') ? "#9e9e9e" : "#2c3e50"}
                        fontSize={RF(1.75)}
                        fontFamily={Config.FONT_FAMILY_MEDIUM}
                      >{this.state.date}</Common.Texti>
                    }
                    const dateStr = `${day} ${month} ${year}`
                    return <Common.Texti
                      fontColor={"#2c3e50"}
                      fontSize={RF(1.75)}
                      fontFamily={Config.FONT_FAMILY_MEDIUM}
                    >{dateStr}</Common.Texti>
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
                    <ResponsiveImage
                      source={require('../../../assets/apps/clocks.png')}
                      style={{ resizeMode: 'center' }}
                      initWidth="15" initHeight="15"
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
                  >
                    Currency
                  </Common.Texti>

                  <Common.InputSelectListCurrency
                    title="Currency"
                    placeholder={this.state.currencyState}
                    titleValue={(this.state.currency == "SGD - Singapore Dollar") ? "SGD" : "MYR"}
                    data={this.state.currencyData}
                    value={this.state.currency}
                    onValueChange={(value) => this.setState({ currency: value })}
                  />
                </View>

                <View style={{ marginLeft: '5%' }}>
                  <Common.Divider />
                </View>
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
                  Receipt Amount
                </Common.Texti>

                <View
                  style={{ flexDirection: 'row' }}>
                  <Common.InputAmount
                    value={this.state.amount}
                    returnKeyType='done'
                    keyboardType="decimal-pad"
                    onChangeText={text => this.setState({ amount: text })}
                    placeholder="Enter amount"
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

                  <View style={{ marginLeft: 0, justifyContent: 'center', alignItems: 'center' }}>
                    <Common.Texti fontSize={RF(1.8)} fontFamily={Config.FONT_FAMILY_MEDIUM}>
                      { this.state.currency }
                    </Common.Texti>
                    {/*
                      <Common.InputSelectListCurrency
                        title="Currency"
                        placeholder={this.state.currencyState}
                        titleValue={(this.state.currency == "SGD - Singapore Dollar") ? "SGD" : "MYR"}
                        data={this.state.currencyData}
                        value={this.state.currency}
                        onValueChange={(value) => this.setState({ currency: value })}
                      />
                    */}

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

              <Common.Divider />

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
              paddingBottom: responsiveHeight(0.1),
            }}
          >
            <Common.Texti
              fontSize={RF(2.4)}
              fontColor={"#ffffff"}
              style={{
                paddingBottom: responsiveHeight(2.9),
                paddingTop: responsiveHeight(1.7),
              }}>
              Next
            </Common.Texti>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    )
  }
}
