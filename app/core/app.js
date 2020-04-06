/* eslint-disable eol-last */
/* eslint-disable space-infix-ops */
/* eslint-disable no-shadow */
/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable handle-callback-err */
/* eslint-disable radix */
/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */

/*
* @author detatsatrio
* @year 2018
*/

import AsyncStorage from '@react-native-community/async-storage';
import { Actions } from 'react-native-router-flux';
import { NEW_ACCESS_TOKEN } from '../config/variable';
import * as Core from './index';

// const headerLogin = {
//   'Accept': 'application/json',
//   'Content-Type': 'application/json'
// }

export function AppStatus() {
  Core.UserDetail(async (err, result) => {
    // console.log( result );
    if (result.data.profile.to_update_auto_logout == true) {
      await AsyncStorage.removeItem('access_token');
      await AsyncStorage.removeItem('latitude');
      await AsyncStorage.removeItem('longitude');

      await AsyncStorage.removeItem('token')

      Actions.Login({ type: 'reset' });
    } else {
      if (result.expired) {
        Actions.Login({ type: 'reset' })
      } else {
        try {
          params = {
            key: 'user_id',
            value: String(result.data.profile.user_id),
          };
          console.log('params', params)
          await Core.SetDataLocal(params, async (err, result) => {
            console.log('result user_id key', result)
          });
          Actions.Home({ type: 'reset' })
        } catch (e) {
          Actions.Login({ type: 'reset' })
        }
      }
    }
  })
}

export async function NEW_AppStatus() {
  try {
    Token = await NEW_GetAccessToken()

    if (!Token) {
      Actions.Login({ type: 'reset' })
    } else {
      Actions.Home({ type: 'reset' })
    }

  } catch (e) {
    Actions.Login({ type: 'reset' })
  }

}