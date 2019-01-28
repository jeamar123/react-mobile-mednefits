/*
* @author detatsatrio
* @year 2018
*/

import {
  AsyncStorage
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {
  getAlert,
  getNotify
} from './notify';
import * as Core from './index';
import * as Config from '../config'

const headerLogin = {
  'Accept':'application/json',
  'Content-Type': 'application/json'
}

export function AppStatus(){
  Core.UserDetail((err, result)=>{
    if (result.login_status) {
      Actions.Home({type: 'reset'})
    } else {
      Actions.Login({type: 'reset'})
    }
  })
}
