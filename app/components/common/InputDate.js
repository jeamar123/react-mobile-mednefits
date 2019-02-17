import React, { Component } from 'react'
import ModalDatePicker from 'react-native-datepicker-modal'
import * as Common from './index'

export default class InputDate extends Component {
  render() {
    return (
      <ModalDatePicker
        style={[style.containerDatePicker]}
        startDate={new Date()}
        minDate={new Date()}
        onError={() => Common.getNotify("", "Error loading, please try again")}
        renderDate={({ year, month, day, date }) => {
          if (!date) {
            return <Common.Texti fontColor={"#cccccc"}>{this.props.placeholder}</Common.Texti>
          }
          const dateStr = `${day}-${month}-${year}`
          return <Common.Texti fontColor={"#0392cf"} >{dateStr}</Common.Texti>
        }}
        onDateChanged={({ year, month, day, date }) => this.props.onChangeDate(`${day}-${month}-${year}`)}
      />
    )
  }
}

const style = {
  containerDatePicker: {
    backgroundColor: "white",
    borderBottomColor: "#cccccc",
    borderBottomWidth: 0,
    justifyContent: 'center',
    borderRadius: 2,
    height: 50
  },
};
