import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ImageBackground
} from 'react-native'
import Modal from 'react-native-modal';
import * as Common from './index'
import * as Config from '../../config'

export default class Error extends Component{

  constructor(props) {
    super(props);

    this.state = {
      isVisible: true
    }
  }

  _renderHeader=()=>{
    return(
      <View style={{marginLeft:15,marginRight:15, justifyContent: 'flex-start'}}>
        <Common.Texti
          fontColor="red"
        >
          Error
        </Common.Texti>
      </View>
    )
  }

  _renderBody=()=>{
    return(
      <View style={{justifyContent: 'center', alignItems: 'center', padding: 15}}>
        {this.props.renderBody}
      </View>
    )
  }

  _renderButton=()=>{
    return(
      <View style={{margin: 15}}>
        <TouchableOpacity
          onPress={()=>this.setState({isVisible: false})}
          style={{backgroundColor: "#0392cf", width: '100%'}}
        >
          <Common.Texti
            fontColor="white"
            style={{
              textAlign: 'center'
            }}
          >
            Back
          </Common.Texti>
        </TouchableOpacity>
      </View>
    )
  }

  render(){
    return(
      <Modal
        transparent={true}
        isVisible={this.state.isVisible}
        animationInTiming={500}
        onBackdropPress={() => this.setState({ isVisible: false })}
        style={{
          margin: 15,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >

        <View style={{backgroundColor: 'white'}}>
          {this._renderHeader()}
          <View
            style={{
              borderBottomColor: '#cccccc',
              borderBottomWidth: 1,
            }}
          />
          {this._renderBody()}
          {this._renderButton()}
        </View>
      </Modal>
    )
  }
}
