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
import { getAlert, getNotify } from './notify';

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
        getNotify('', 'Please try again...');
      }
    })
    .catch(error => {
      getNotify('', 'Ooops, failed to get data...');
    });
}

function getAuthToken() {
  AsyncStorage.getItem('authtoken', (err, result) => {
    if (result) {
      return result;
    } else {
      Actions.Login();
    }
  });
}

export function LoginProcess(username, password) {
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
        getNotify('', err.error);
      } else {
        getNotify('', 'Success! Wait a second...');
        Actions.home();
      }
    });
  } catch (e) {
    getNotify('', 'Failed login, try again');
  }
}

export function UserDetail() {
  const header = {
    Authorization: { getAuthToken },
  };
  fetching(AUTH_USER_PROFILE, 'GET', header, '');
}
