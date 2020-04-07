import AsyncStorage from '@react-native-community/async-storage';
import { Actions } from 'react-native-router-flux';
import { ACCESS_TOKEN, NEW_ACCESS_TOKEN } from '../config/variable';
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

export function GetDataLocalReturn(key) {
  return new Promise((resolve, reject) => {
    try {
      AsyncStorage.getItem(key, (err, result) => {
        if (result) {
          resolve(result)
        } else {
          throw err
        }
      });
    } catch (e) {
      reject(e)
    }
  })
}

export async function GetDataLocalReturnNew(key) {
  return await AsyncStorage.getItem(key);
}

export async function GetAllClinic(key) {
  return await AsyncStorage.multiGet(key);
}

export function SetDataLocal(params, callback) {
  try {
    AsyncStorage.setItem(params.key, params.value);
    callback('', true);
  } catch (error) {
    // console.warn(error.message);
    Core.getNotify('', 'Sorry, no registered providers in that category');
  }
}

export function GetAccessToken(callback) {
  try {
    AsyncStorage.getItem(ACCESS_TOKEN, (err, result) => {
      if (result) {
        callback('', result);
      } else {
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
            Actions.home();
          } else {
            getNotify('', 'Gagal mengambil data');
          }
        });
      } else {
        Actions.Login();
      }
    });
  } catch (error) {
    Actions.Login();
  }
}

export function CheckUserData(callback) {
  try {
    AsyncStorage.getItem('status_userdata', (err, result) => {
      if (result) {
        dataUser = JSON.parse(result);
        callback('', dataUser);
      } else {
        Actions.Wallet();
      }
    });
  } catch (error) {
    Actions.Wallet();
  }
}

export function NEW_GetAccessToken() {
  return new Promise((resolve, reject) => {
    try {
      AsyncStorage.getItem(NEW_ACCESS_TOKEN, async (err, result) => {
        // statusIntro = await CheckStatusIntro()

        if (result) {
          resolve(result)
          // } else if (!statusIntro) {
          // Actions.intro({type: 'reset'})
          // reject('Error to get welcome')
        } else {
          Actions.login({ type: 'reset' })
          console.log("Token Null")
        }
      })
    } catch (e) {
      Actions.login({ type: 'reset' })
      console.log("Token Null")
    }
  })
}

export async function CheckAppStatus() {
  try {
    token = await NEW_GetAccessToken()

    if (!token) {
      Actions.login({ type: 'reset' })
    } else if (token) {

      Actions.home({ type: 'reset' })

    } else {
      Actions.login({ type: 'reset' })
    }

  } catch (e) {
    Actions.login({ type: 'reset' })
  }
}

export function NEW_CheckStatusApp(callback) {
  try {
    Core.NEW_GetAccessToken(result => {
      if (result) {
        Actions.home();
      } else {
        Actions.Login();
      }
    });
  } catch (error) {
    Actions.Login();
  }
}