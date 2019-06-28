import React, { Component } from 'react'
import {
  TouchableOpacity,
  TimePickerAndroid
} from 'react-native'
import * as Common from './index'
import * as Config from '../../config'
import DateTimePicker from 'react-native-modal-datetime-picker'

export default class InputTime extends Component {
  state = {
    isDateTimePickerVisible: false,
  };

  msToTime(duration) {
    date = new Date(duration)
    hour = date.getHours()
    minute = date.getMinutes()

    ampm = hour >= 12 ? 'PM' : 'AM';
    hours = (hour.toString().length == 1) ? "0"+hour : hour
    minutes = (minute.toString().length == 1) ? "0"+minute : minute

    return hours + ":" + minutes + " "+ampm;
  }
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    this.props.onTimeChange(this.msToTime(date))
    this._hideDateTimePicker();
  };

  render() {
    return (
      <TouchableOpacity
        onPress={() => this._showDateTimePicker()}
      >
        <Common.Texti
          fontFamily={Config.FONT_FAMILY_MEDIUM}
          fontColor={(this.props.value) ? "#2c3e50" : "#9e9e9e"}
        >
          {(this.props.value) ? this.props.value : this.props.placeholder}
        </Common.Texti>

        <DateTimePicker
          {...this.props}
          is24Hour={true}
          mode={"time"}
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
      </TouchableOpacity>
    )
  }
}
