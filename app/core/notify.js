import React, { Component } from 'react';
import {
  Alert,
  Platform,
  ToastAndroid,
  Modal,
  StyleSheet,
  View,
  Text,
} from 'react-native';

import Toast from 'react-native-simple-toast';

export function getNotify(title, message, action, cancelable) {
  Platform.OS == 'ios'
    ? notifIos(title, message, action, cancelable)
    : notifDroid(message);
}

export function getNotifyLong(title, message, action, cancelable) {
  Platform.OS == 'ios'
    ? notifIos(title, message, action, cancelable)
    : notifDroidLong(message);
}

export function getAlert(title, message, action, cancelable) {
  alerty(title, message, action, cancelable);
}

export function getModal() {
  return (
    <Modal
      isVisible={true}
      animationInTiming={2000}
      animationOutTiming={2000}
      backdropTransitionInTiming={2000}
      backdropTransitionOutTiming={2000}
    >
      <View
        style={{
          backgroundColor: 'white',
          padding: 22,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 4,
          borderColor: 'rgba(0, 0, 0, 0.1)',
        }}
      >
        <Text>Mednefits</Text>
        <Text>Progress Download: {progress}</Text>
      </View>
    </Modal>
  );
}

export function notifIos(title, message, action, cancelable) {
	Toast.show(message, Toast.SHORT);
  // alerty(title, message, action, cancelable);
}

export function notifDroid(message) {
  ToastAndroid.show(message, ToastAndroid.SHORT);
}

export function notifDroidLong(message) {
  ToastAndroid.show(message, ToastAndroid.LONG);
}

export function alerty(title, message, action, cancelable) {
  Alert.alert(title, message, action, { cancelable: cancelable });
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  innerContainer: {
    alignItems: 'center',
  },
});
