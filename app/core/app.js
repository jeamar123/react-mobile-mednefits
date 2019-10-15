/*
* @author detatsatrio
* @year 2018
*/

import {
  AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  getAlert,
  getNotify
} from './notify';
import * as Core from './index';
import * as Config from '../config'

// const headerLogin = {
//   'Accept': 'application/json',
//   'Content-Type': 'application/json'
// }

export function AppStatus(){
  Core.UserDetail(async (err, result)=>{
    // console.log( result );
    if( result.data.profile.to_update_auto_logout == true ){
      await AsyncStorage.removeItem('access_token');
      await AsyncStorage.removeItem('latitude');
      await AsyncStorage.removeItem('longitude');
      Actions.Login({type: 'reset'});
    }else{
      if (result.expired) {
        Actions.Login({type: 'reset'})
      } else {
        params = {
          key: 'user_id',
          value: String(result.data.profile.user_id),
        };
        await Core.SetDataLocal(params, async (err, result) => {
          // console.log('result user_id key', result)
        });
        Actions.Home({type: 'reset'})
      }
    }
  })
}
