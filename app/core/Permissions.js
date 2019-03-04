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

export function checkAllPermissions() {
  // console.warn('masuk check all');
  checkLocation()
  checkCamera()
  checkWriteExternal()
}

export async function RequestAllPermissions() {
  await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    PermissionsAndroid.PERMISSIONS.CAMERA,
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  ]).then((result) => {
    console.warn('result', result);
  })
}
