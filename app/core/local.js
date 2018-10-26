import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ACCESS_TOKEN } from '../config/variable';
import * as Core from './index';

export function GetDataLocal(key, callback) {
  try {
    AsyncStorage.getItem(key, (err, result) => {
      if (result) {
        callback('', result);
      } else {
        callback(err);
      }
    });
  } catch (e) {
    Core.getNotify('', 'Gagal ambil data lokal');
  }
}

export function SetDataLocal(params, callback) {
  try {
    AsyncStorage.setItem(params.key, params.value);
    callback('', true);
  } catch (error) {
    Core.getNotify('', 'Gagal set data lokal');
  }
}

export function GetAccessToken(callback) {
  try {
    AsyncStorage.getItem(ACCESS_TOKEN, (err, result) => {
      if (result) {
        callback('', result);
      } else {
        console.warn(result);
        Actions.Login();
      }
    });
  } catch (error) {
    Actions.Login();
  }
}

export function CheckStatusApp(callback) {
  try {
    Core.GetAccessToken(result => {
      if (result) {
        Core.UserDetail(result => {
          if (result) {
            getNotify('', 'Berhasil mengambil data');
          } else {
            getNotify('', 'Gagal mengambil data');
          }
        });
      } else {
        Actions.Login();
      }
    });
  } catch (error) {
    Actions.Splash();
  }
}

export function CheckUserData(callback) {
  try {
    AsyncStorage.getItem('status_userdata', (err, result) => {
      if (result) {
        dataUser = JSON.parse(result);
        callback('', dataUser);
      } else {
        Actions.Balance();
      }
    });
  } catch (error) {
    Actions.Balance();
  }
}
