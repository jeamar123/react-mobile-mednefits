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

export async function AppStatus() {
  try {
    Token = await NEW_GetToken();
    console.log('Cek NEW_Token ' + Token)

    if (!Token) {

      await AsyncStorage.removeItem('token')
      await AsyncStorage.removeItem('access_token');
      await AsyncStorage.removeItem('latitude');
      await AsyncStorage.removeItem('longitude');
      Actions.Login({ type: 'reset' })

    } else {
      Actions.Home({ type: 'reset' });
    }
  } catch (e) {

    await AsyncStorage.removeItem('token')
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('latitude');
    await AsyncStorage.removeItem('longitude');
    Actions.login({ type: 'reset' })
  }
}

export function NEW_GetToken() {
  return new Promise((resolve, reject) => {
    try {
      AsyncStorage.getItem(NEW_ACCESS_TOKEN, async (err, result) => {
        // statusIntro = await CheckStatusIntro()
        console.log("token local " + result)

        if (result) {
          resolve(result)
          // } else if (!statusIntro) {
          // Actions.intro({type: 'reset'})
          // reject('Error to get welcome')
        } else {
          Actions.Login({ type: 'reset' })
          console.log("Token Null")
        }
      })
    } catch (e) {
      Actions.Login({ type: 'reset' })
      console.log("Token Null")
    }
  })
}

// export function AppStatus(){
//   Core.UserDetail(async (err, result)=>{
//     console.log( result );
//     if( result.data.profile.to_update_auto_logout == true ){
//       await AsyncStorage.removeItem('access_token');
//       await AsyncStorage.removeItem('latitude');
//       await AsyncStorage.removeItem('longitude');
//       Actions.Login({type: 'reset'});
//     }else{
//       if (result.expired) {
//         Actions.Login({type: 'reset'})
//       } else {
//         try {
//           params = {
//             key: 'user_id',
//             value: String(result.data.profile.user_id),
//           };
//           console.log('params', params)
//           await Core.SetDataLocal(params, async (err, result) => {
//             console.log('result user_id key', result)
//           });
//           Actions.Home({type: 'reset'})
//         } catch (e) {
//           Actions.Login({type: 'reset'})
//         }
//       }
//     }
//   })
// }

// export async function AppStatus() {
//   try {
//     Token = await NEW_GetToken();

//     if (!Token) {
//       Actions.login({ type: 'reset' })
//     } else if (Token) {

//       Core.UserDetail(async (err, result) => {
//         // console.log( result );
//         if (result.data.profile.to_update_auto_logout == true) {
//           await AsyncStorage.removeItem('access_token');
//           await AsyncStorage.removeItem('latitude');
//           await AsyncStorage.removeItem('longitude');

//           await AsyncStorage.removeItem('token')

//           Actions.Login({ type: 'reset' });
//         } else {
//           if (result.expired) {
//             Actions.Login({ type: 'reset' })
//           } else {
//             try {
//               params = {
//                 key: 'user_id',
//                 value: String(result.data.profile.user_id),
//               };
//               console.log('params', params)
//               await Core.SetDataLocal(params, async (err, result) => {
//                 console.log('result user_id key', result)
//               });
//               Actions.Home({ type: 'reset' })
//             } catch (e) {
//               Actions.Login({ type: 'reset' })
//             }
//           }
//         }
//       })

//     } else {
//       Actions.login({ type: 'reset' })
//     }

//   } catch (e) {
//     Actions.login({ type: 'reset' })
//   }

// }
