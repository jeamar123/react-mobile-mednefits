import React, { Component } from 'react';
import { Text as RNText,View, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import * as Config from '../../config';
import * as Common from '../../components/common';

export default class GlobaLoadingState extends Component {

  constructor(props) {
    super(props)
    console.log( this.props );
  }

  render() {
    return (
      <View>
        <Modal
          isVisible={this.props.loadingShow}
          backdropTransitionOutTiming={0}
          hideModalContentWhileAnimating={true}
          onModalHide={this.props.onHide}
          style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <ActivityIndicator color="#fff" size="large" />
          <Common.Texti
            fontColor="#FFFFFF"
          >{this.props.loadingText}
          </Common.Texti>
        </Modal>
      </View>
    );
  }
}
