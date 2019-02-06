import React, { Component } from 'react';
import {
  View,
  TouchableOpacity
} from 'react-native'
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import * as Common from './index'

export default class InputFile extends Component {

  state = {
    fileName: false,
  };

  getFile = () => {
    try {
      DocumentPicker.show({
        filetype: [DocumentPickerUtil.images()],
      }, (error, res) => {
        if (!error) {
          this.props.onChangeFile(res)

          this.setState({ fileName: res.fileName })
        }
      });
    } catch (e) {
      Common.getNotify("", "Failed to get file")
    }
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.getFile}
        style={{
          borderRadius: 3,
          borderWidth: 1,
          borderColor: "#0392cf",
          flex: 1,
          alignItems: 'center'
        }}>
        <Common.Texti
          style={{
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 10,
            paddingRight: 10,
          }}
          numberOfLines={1}
        >
          {(!this.state.fileName) ? "Upload File" : this.state.fileName}
        </Common.Texti>

      </TouchableOpacity>
    )
  }
}
