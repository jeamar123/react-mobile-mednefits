import React, { Component } from 'react'
import {
  View
} from 'react-native'
import ModalDatePicker from 'react-native-datepicker-modal'
import * as Common from './index'
import { Icon } from 'native-base'

export default class InputDate extends Component {

  renderRightIcon() {
    if (this.props.rightIcon == 'arrow-right') {
      return (
        <Icon
          type="SimpleLineIcons"
          name="arrow-right"
          style={{
            color: "#9e9e9e",
            marginLeft: 10,
            fontSize: 18
          }}
        />
      )
    } else {
      return <View />
    }
  }

  render() {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <ModalDatePicker
          style={[style.containerDatePicker]}
          startDate={new Date()}
          maxDate={new Date()}
          onError={() => Common.getNotify("", "Error loading, please try again")}
          renderDate={({ year, month, day, date }) => {
            if (!date) {
              return <Common.Texti fontColor={"#9e9e9e"}>{this.props.placeholder}</Common.Texti>
            }
            const dateStr = `${day}-${month}-${year}`
            return <Common.Texti fontColor={"#2c3e50"} >{dateStr}</Common.Texti>
          }}
          onDateChanged={({ year, month, day, date }) => this.props.onChangeDate(`${day}-${month}-${year}`)}
        />

        {this.renderRightIcon()}
      </View>
    )
  }
}

const style = {
  containerDatePicker: {
    backgroundColor: "white",
    borderBottomColor: "#9e9e9e",
    borderBottomWidth: 0,
    justifyContent: 'center',
    borderRadius: 2,
    height: 50
  },
};
