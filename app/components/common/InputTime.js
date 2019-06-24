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
    console.warn(duration);
    var milliseconds = parseInt((duration % 1000) / 100),
      seconds = parseInt((duration / 1000) % 60),
      minutes = parseInt((duration / (1000 * 60)) % 60),
      hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    ampm = hours >= 12 ? 'PM' : 'AM';
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return (hours-4) + ":" + minutes + " "+ampm;
  }
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.warn(date);
    this.props.onTimeChange(this.msToTime(date))
    this._hideDateTimePicker();
  };

  render() {
    return (
      <TouchableOpacity
        onPress={() => this._showDateTimePicker()}
      >
        <Common.Texti
          fontSize={12}
          fontFamily={Config.FONT_FAMILY_LIGHT}
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
