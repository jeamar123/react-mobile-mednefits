/*
* @author detatsatrio
* @year 2018
*/

import {
  AsyncStorage
} from 'react-native'
import {
  AUTH_LOGIN,
  CLIENT_SECRET,
  CLIENT_ID,
  AUTH_USER_PROFILE
} from '../config/variable'
import {Actions} from 'react-native-router-flux'
import {
  getAlert,
  getNotify
} from './notify'
import * as Core from './index'
import * as Config from '../config'

const headerLogin = {
  'Accept':'application/json',
  'Content-Type': 'application/json'
}

export function AppStatus(){
  Core.UserDetail((err,result)=>{
    if (result.error) {
      getNotify("", result.message)
      Actions.Login({type: 'reset'})
    } else {
      Actions.home({type: 'reset'})
    }
  })
}
