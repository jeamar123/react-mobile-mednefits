import React, { Component } from 'react'
import {
  DatePickerAndroid,
  DatePickerIOS,
  Platform,
  Image,
  TouchableOpacity,
  Modal,
  View,
  StyleSheet,
  ViewPropTypes,
  Button
} from 'react-native';
import PropTypes from 'prop-types';
import ResponsiveImage from 'react-native-responsive-image';
import moment from 'moment';
import { Icon } from 'native-base';
import * as Common from '../common';

const isAndroid = Platform.OS === 'android'

function noop() { }

/**
 * React Native DatePicker Modal Component for iOS/Android
 */
class DatePicker extends Component {
  state = {
    showIOSModal: false,
    date: undefined
  }
  Date = new Date()

  static defaultProps = {
    renderDate: ({ year, month, day, date }) => {
      if (date) {
        const str = `${year} ${month} ${day}`
        return <Common.Text fontColor={"#2c3e50"} >{str}</Common.Text>
      }

      return null
    },
    startDate: new Date(),
    onError: noop,
    onDateChanged: noop,
    maxDate: Date.now(),
    minDate: undefined,
    modalButtonText: 'Done'
  }

  static propTypes = {
    /**
       * Render Component for date. Receives object with selected `date`, `year`, `day` and `month`
       */
    renderDate: PropTypes.func,
    /**
       * Start date for DatePicker (Default: Current Date `new Date()`).
       */
    startDate: PropTypes.instanceOf(Date),
    /**
       * Function called with error argument if there is error setting date:
       *
       * @example
       * ```js
       * function onError(error) {
       *    console.log(error)
       * }
       */
    onError: PropTypes.func,
    /**
       * Function called when new date has been selected. Receives object with selected `date`, `year`, `day` and `month`.
       */
    onDateChanged: PropTypes.func,
    /**
       * Minimum date that can be selected.
       */
    minDate: PropTypes.instanceOf(Date),
    /**
       * Maximum date that can be selected.
       */
    maxDate: PropTypes.instanceOf(Date),
    /**
       * Text for the iOS modal button (default: "Done").
       */
    modalButtonText: PropTypes.string,
    /**
       * Styles for the modal overlay.
       */
    modalOverlayStyle: ViewPropTypes.style,
    /**
       * Styles for the modal.
       */
    modalStyle: ViewPropTypes.style,
    /**
       * Styles for the modal button.
       */
    modalButtonStyle: ViewPropTypes.style,
    /**
       * Styles for the modal button container.
       */
    modalBtnContainer: ViewPropTypes.style,
    /**
       * Styles for the container of `renderDate`.
       */
    style: ViewPropTypes.style
  }

  handlePressed = async () => {
    const { startDate, onError } = this.props
    const { date } = this.state

    if (isAndroid) {
      try {
        const { action, year, month, day } = await DatePickerAndroid.open({
          date: date || startDate
        })

        if (action !== DatePickerAndroid.dismissedAction) {
          this.setState(() => ({ date: new Date(year, month, day) }))
          this.props.onDateChanged(this.getDateObj())
        }
      } catch (error) {
        onError(error)
      }
    } else {
      this.setState(() => ({ showIOSModal: true }))
    }
  }

  getDateObj = () => {
    const { date } = this.state
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    return {
      date,
      year: date ? date.getFullYear() : new Date().getFullYear(),
      day: date ? `${date.getDate()}`.padStart(2, '0') : `${new Date().getDate()}`.padStart(2, '0'),
      // month: date ? `${date.getMonth() + 1}`.padStart(2, '0') : `${new Date().getMonth() + 1}`.padStart(2, '0')
      month: date ? months[date.getMonth()] : months[new Date().getMonth()]
    }
  }

  handleModalClose = () => {
    this.setState(
      () => ({ showIOSModal: false }),
      () => {
        const { onDateChanged } = this.props
        onDateChanged(this.getDateObj())
      }
    )
  }

  handleDateChange = date => this.setState({ date: date })

  renderRightIcon() {
    if (this.props.rightIcon == 'arrow-right') {
      return (
        <Icon
          type="SimpleLineIcons"
          name="arrow-right"
          style={{
            color: "#cccccc",
            marginLeft: 10,
            fontSize: 18
          }}
        />
      )
    } else {
      return (
        <View
          style={{
            alignItems: 'flex-end',
            marginLeft: 10
          }}
        >
          <ResponsiveImage
            source={require('../../../assets/apps/calendar.png')}
            style={{ resizeMode: 'center' }}
            initWidth="15" initHeight="15"
          />
        </View>
      )
    }
  }

  render() {
    const { showIOSModal, date } = this.state

    const {
      startDate,
      maxDate,
      minDate,
      modalButtonText,
      renderDate,
      modalOverlayStyle,
      modalStyle,
      modalButtonStyle,
      modalBtnContainer,
      style,
      ...props
    } = this.props

    console.warn(this.state.maxDate)
    return (
      <TouchableOpacity style={style} onPress={this.handlePressed}>
        <Modal
          animationType='slide'
          transparent
          visible={showIOSModal}
          onRequestClose={this.handleModalClose}
        >
          <View style={[styles.overlay, modalOverlayStyle]}>
            <View style={[styles.modal, modalStyle]}>
              <View style={[styles.modalBtnContainer, modalBtnContainer]}>
                <Button
                  style={[modalButtonStyle]}
                  title={modalButtonText}
                  onPress={this.handleModalClose}
                />
              </View>
              <DatePickerIOS
                mode='date'
                date={date || startDate}
                onDateChange={this.handleDateChange}
                maximumDate={maxDate}
                minimumDate={minDate}
                {...props}
              />
            </View>
          </View>
        </Modal>
        <View style={{ flexDirection: 'row' }}>
          {renderDate(this.getDateObj())}
          {this.renderRightIcon()}
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.3)',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  modal: { backgroundColor: '#fff', height: 260, width: '100%' },
  modalBtnContainer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
  }
})

export default DatePicker
