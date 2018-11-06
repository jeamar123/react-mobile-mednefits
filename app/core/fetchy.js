/*
* @author detatsatrio
* @year 2018
*/

import { AsyncStorage } from 'react-native';
import {
  AUTH_LOGIN,
  CLIENT_SECRET,
  CLIENT_ID,
  AUTH_USER_PROFILE,
} from '../config/variable';
import * as Config from '../config';
import { Actions } from 'react-native-router-flux';
import { getAlert, getNotify } from './notify';
import * as Core from './index';

const headerLogin = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

function fetching(params, callback) {
  fetch(params.url, {
    method: params.method,
    headers: params.header,
    body: (params.body !== "") ? JSON.stringify(params.body) : "",
  })
  .then(response=>response.json())
  .then(res => {

    if (!res.status) {
      callback(res)
    } else if (res.status) {
      callback(res)
    } else {
      getNotify("","Please try again...")
    }

  })
  .catch(error => {
    console.warn('error fetching' + error.message);
    getNotify('', 'Ooops, failed to get data...');
  });
}

export function LoginProcess(username, password, callback) {
  try {
    loginParameter = {
      grant_type: 'password',
      client_secret: CLIENT_SECRET,
      client_id: CLIENT_ID,
      username: username,
      password: password,
    };

    params = {
      url: AUTH_LOGIN,
      method: 'POST',
      header: headerLogin,
      body: loginParameter,
    };


    fetching(params, result => {
      if (!result.status) {
        getNotify('', result.error_description);
        callback(true);
      } else {
        callback('', true);
        getNotify('', 'Success! Wait a second...');

        data = result.data;
        data_parse = typeof data == 'string' ? JSON.parse(data) : data;
        access_token = data_parse.access_token;

        params = {
          key: 'access_token',
          value: access_token,
        };

        Core.SetDataLocal(params, (err, result) => {
          if (result) {
            Actions.Home({ type: 'reset' });
          } else {
            getNotify('', 'Failed login, try again');
          }
        });
      }
    });
  } catch (e) {
    Core.getNotify('', 'Failed login, try again');
  }
}

export function UserDetail(callback){
  try {
     Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result)=> {
      if (err || result == undefined) {
        Actions.Login({type: 'reset'})
      } else {
        params = {
          url: AUTH_USER_PROFILE,
          method: 'GET',
          header: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": result
          }
        }

        fetching(params, (result) => {
          callback("",result)
        })
      }

    })

  } catch (e) {
    console.warn('error user detail'+e.message);
    getNotify("","Failed get data, try again")
  }

}
