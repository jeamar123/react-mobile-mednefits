import {
    AsyncStorage
  } from 'react-native'
  import { Actions } from 'react-native-router-flux'
  import * as Core from './index'
  
  export function GetDataLocal(key, callback){
    try {
      AsyncStorage.getItem(key, (err, result) => {
        if (result) {
          callback("",result)
        } else {
          callback(err)
        }
      });
    } catch (e) {
      Core.getNotify("","Gagal ambil data lokal")
    }
  }
  
  export function SetDataLocal(params, callback){
    try {
      AsyncStorage.setItem(params.key, params.value);
      callback("", true)
    } catch (error) {
      Core.getNotify("","Gagal set data lokal")
    }
  }
  