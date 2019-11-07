import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import RF from "react-native-responsive-fontsize";
import * as Common from './index';
import * as Config from '../../config';

export default class InputTime extends Component {
  state = {
    isDateTimePickerVisible: false,
  };

  msToTime(duration) {
    console.warn(duration);
    var milliseconds = parseInt((duration % 1000) / 100),
      seconds = parseInt((duration / 1000) % 60),
      minutes = duration.getMinutes(),
      hours = duration.getHours()

    var date_format = '12'; /* FORMAT CAN BE 12 hour (12) OR 24 hour (24)*/
    var ext = '';

    if (date_format == '12') {
      if (hours > 12) {
        ext = 'PM';
        hours = (hours - 12);

        if (hours < 10) {
          result = "0" + hours;
        } else if (hours == 12) {
          hours = "00";
          ext = 'AM';
        }
      }
      else if (hours < 12) {
        result = ((hours < 10) ? "0" + hours : hours);
        ext = 'AM';
      } else if (hours == 12) {
        ext = 'PM';
      }
    }

    // var mid = 'AM';
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

    return hours + ":" + minutes + ' ' + ext;
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
          fontSize={RF(1.75)}
          fontFamily={Config.FONT_FAMILY_MEDIUM}
        >
          {(this.props.value) ? this.props.value : this.props.placeholder}
        </Common.Texti>

        <DateTimePicker
          {...this.props}
          hideTitleContainerIOS={true}
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
