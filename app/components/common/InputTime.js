import React, { Component } from 'react'
import {
  TouchableOpacity,
  TimePickerAndroid
} from 'react-native'
import * as Common from './index'
import DateTimePicker from 'react-native-modal-datetime-picker'

export default class InputTime extends Component {
  state = {
    isDateTimePickerVisible: false,
  };

  msToTime(duration) {
    console.warn(duration);
    var milliseconds = parseInt((duration % 1000) / 100),
      seconds = parseInt((duration / 1000) % 60),
      minutes = parseInt((duration / (1000 * 60)) % 60),
      hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    var mid = 'AM';
    if (hours == 0) { //At 00 hours we need to show 12 am
      hours = 12;
    }
    else if (hours > 12) {
      hours = hours % 12;
      mid = 'PM';
    }

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ' ' + mid;
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
