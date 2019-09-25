/*
* @author detatsatrio
* @year 2018
*/

import AsyncStorage from '@react-native-community/async-storage';
import { Actions } from 'react-native-router-flux';
import {
  getAlert,
  getNotify
} from './notify';
import * as Core from './index';
import * as Config from '../config'

const headerLogin = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

export function AppStatus() {
  Core.UserDetail( async (err, result) => {
    if (result.expired) {
      Actions.Login({ type: 'reset' })
    } else {
      await Core.SetDataLocal(params, async (err, result) => {
       console.log('result user_id key', result)
      });
      Actions.Home({ type: 'reset' })
    }
  })
}
