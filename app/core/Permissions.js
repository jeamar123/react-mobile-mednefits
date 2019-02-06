import React, { Component } from 'react';
import {
  PermissionsAndroid
} from 'react-native';
import { getNotify, getAlert } from '../components/common/Notify';

/** Req Location **/

function checkLocation() {
  const granted = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

  if (granted) {
    // getNotify("","You can use the ACCESS_FINE_LOCATION" )
    console.warn("You can use the ACCESS_FINE_LOCATION")
  } else {
    requestLocation()
  }
}

function requestLocation() {
  try {
    const granted = PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Perijinan Aplikasi',
        'message': 'Kami memerlukan akses untuk menangkap lokasi Anda'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // getNotify("","You can use the camera")
    } else {
      getNotify("", "Location permission denied")
    }
  } catch (err) {
    console.warn(err.message)
    getNotify("", "Something wrong..")
  }
}

/** End Req Location **/


/** Req CAMERA **/

function checkCamera() {
  const granted = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);

  if (granted) {
    console.warn("You can use the Camera");
    // getNotify("","You can use the ACCESS_FINE_LOCATION" )
  } else {
    requestCamera()
  }
}

function requestCamera() {
  try {
    const granted = PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        'title': 'Perijinan Aplikasi',
        'message': 'Kami memerlukan akses untuk menggunakan kamera Anda'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // getNotify("","You can use the camera")
    } else {
      getNotify("", "Camera permission denied")
    }
  } catch (err) {
    console.warn(err.message)
    getNotify("", "Something wrong..")
  }
}

/** End Req CAMERA **/

/** Req Read External **/

function checkReadExternalStorage() {
  const granted = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);

  if (granted) {
    console.warn("You can use the Read External");
    // getNotify("","You can use the ACCESS_FINE_LOCATION" )
  } else {
    requestReadExternal()
  }
}

function requestReadExternal() {
  try {
    const granted = PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        'title': 'Perijinan Aplikasi',
        'message': 'Kami memerlukan akses untuk membaca memori external'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // getNotify("","You can use the camera")
    } else {
      getNotify("", "Read external permission denied")
    }
  } catch (err) {
    console.warn(err.message)
    getNotify("", "Something wrong..")
  }
}

/** End Req Read External **/

/** Req Read Contact **/

function checkReadContact() {
  const granted = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_CONTACTS);

  if (granted) {
    console.warn("You can use the READ_CONTACTS");
    // getNotify("","You can use the ACCESS_FINE_LOCATION" )
  } else {
    getNotify("", "Read contact permission denied")
    requestReadContact()
  }
}

function requestReadContact() {
  try {
    const granted = PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        'title': 'Perijinan Aplikasi',
        'message': 'Kami memerlukan akses untuk membaca kontak'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      getNotify("", "You can use the camera")
    } else {
      getNotify("", "Read contact permission denied")
    }
  } catch (err) {
    console.warn(err.message)
    getNotify("", "Something wrong..")
  }
}

/** End Req Read Contact **/

/** Req WRITE_EXTERNAL_STORAGE **/

function checkWriteExternal() {
  const granted = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

  if (granted) {
    console.warn("You can use the WRITE_EXTERNAL_STORAGE");
    // getNotify("","You can use the ACCESS_FINE_LOCATION" )
  } else {
    getNotify("", "WRITE_EXTERNAL_STORAGE permission denied")
    requestWriteExternal()
  }
}

function requestWriteExternal() {
  try {
    const granted = PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        'title': 'Perijinan Aplikasi',
        'message': 'Kami memerlukan akses untuk membuat file di memory external'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // getNotify("","You can use the camera")
      console.warn("WRITE_EXTERNAL_STORAGE Allowed");
    } else {
      getNotify("", "WRITE_EXTERNAL_STORAGE permission denied")
    }
  } catch (err) {
    console.warn(err.message)
    getNotify("", "Something wrong..")
  }
}

/** End Req WRITE_EXTERNAL_STORAGE **/


/** Req READ_SMS **/

function checkReadSMS() {
  const granted = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_SMS);

  if (granted) {
    console.warn("You can use the READ_SMS");
    // getNotify("","You can use the ACCESS_FINE_LOCATION" )
  } else {
    getNotify("", "ReadSMS permission denied")
    requestReadSMS()
  }
}

function requestReadSMS() {
  try {
    const granted = PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      {
        'title': 'Perijinan Aplikasi',
        'message': 'Kami memerlukan akses untuk membaca konten SMS'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // getNotify("","You can use the camera")
      console.warn("ReadSMS Allowed");
    } else {
      getNotify("", "ReadSMS permission denied")
    }
  } catch (err) {
    console.warn(err.message)
    getNotify("", "Something wrong..")
  }
}

/** End Req READ_SMS **/

/** Req RECEIVE_SMS **/

function checkReceiveSMS() {
  const granted = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECEIVE_SMS);

  if (granted) {
    console.warn("You can use the RECEIVE_SMS");
    // getNotify("","You can use the ACCESS_FINE_LOCATION" )
  } else {
    getNotify("", "RECEIVE_SMS permission denied")
    requestReceiveSMS()
  }
}

function requestReceiveSMS() {
  try {
    const granted = PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
      {
        'title': 'Perijinan Aplikasi',
        'message': 'Kami memerlukan akses untuk menerima konten SMS'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // getNotify("","You can use the camera")
      console.warn("ReceiveSMS Allowed");
    } else {
      getNotify("", "ReceiveSMS permission denied")
    }
  } catch (err) {
    console.warn(err.message)
    getNotify("", "Something wrong..")
  }
}

/** End Req RECEIVE_SMS **/


export function checkAllPermissions() {
  // console.warn('masuk check all');
  checkLocation()
  checkCamera()
  checkReadExternalStorage()
  checkReadContact()
  checkWriteExternal()
  checkReadSMS()
  checkReceiveSMS()
}

export async function RequestAllPermissions() {
  await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    PermissionsAndroid.PERMISSIONS.CAMERA,
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
    PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    PermissionsAndroid.PERMISSIONS.READ_SMS,
    PermissionsAndroid.PERMISSIONS.RECEIVE_SMS
  ]).then((result) => {
    console.warn('result', result);
  })
}
