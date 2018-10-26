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
import { Actions } from 'react-native-router-flux';
import { ACCESS_TOKEN } from '../config/variable';
import * as Core from './index';

const headerLogin = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

function fetching(params, callback) {
  fetch(params.url, {
    method: params.method,
    headers: params.header,
    body: JSON.stringify(params.body),
  })
    .then(response => response.json())
    .then(res => {
      if (!res.status) {
        callback(res);
      } else if (res.status) {
        callback(res);
      } else {
        Core.getNotify('', 'Please try again...');
      }
    })
    .catch(error => {
      Core.getNotify('', 'Ooops, failed to get data...');
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

    fetching(params, (err, result) => {
      if (!err.status) {
        Core.getNotify('', err.error);
        callback(true);
      } else {
        callback('', true);
        Core.getNotify('', 'Success! Wait a second...');
        Actions.home({ type: 'reset' });
      }
    });
  } catch (e) {
    Core.getNotify('', 'Failed login, try again');
  }
}

export function UserDetail(callback) {
  Core.GetAccessToken((err, result) => {
    if (result) {
      params = {
        url: AUTH_USER_PROFILE,
        method: 'GET',
        header: {
          Authorization: result,
        },
      };
      fetching(params, res => {
        callback(res);
      });
    } else {
      console.warn('tidak ada access Token');
    }
  });
}
