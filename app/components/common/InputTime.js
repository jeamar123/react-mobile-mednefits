import React, { Component } from 'react'
import {
  TouchableOpacity,
  TimePickerAndroid
} from 'react-native'
import * as Common from './index'
import DateTimePicker from 'react-native-modal-datetime-picker'

export default class InputTime extends Component{
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
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes;
  }
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    this.props.onTimeChange(date.toLocaleTimeString())
    this._hideDateTimePicker();
  };

  render(){
    return(
      <TouchableOpacity
        onPress={()=>this._showDateTimePicker()}
        >
        <Common.Texti
          fontColor={"#0392cf"}
        >
          {this.props.placeholder}
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
