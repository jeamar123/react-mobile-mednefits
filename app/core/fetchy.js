/*
 * @author detatsatrio
 * @year 2018
 */

import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { getAlert, getNotify } from './notify';
import * as Config from '../config';
import * as Core from './index';

const headerLogin = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

function fetching(params, callback) {
  Core.CheckNetworkConnection(connection => {
    try {
      if (connection == 'none') {
        throw 'No Internet Connection';
      } else if (connection == 'unknown') {
        throw 'Connection Unknown';
      } else {
        fetch(params.url, {
          method: params.method,
          headers: params.header,
          body:
            params.body == ''
              ? ''
              : (typeof params.body == 'object' && params.bodyType == 'object') || params.bodyType == 'multipart'
              ? params.body
              : JSON.stringify(params.body),
          mode: (params.mode) ? params.mode : false,
          cache: (params.cache) ? params.cache : false
        })
          .then(response => response.json())
          .then(res => {
            if (!res.status) {
              getNotify('', res.message);

              if (res.message == "Your token is expired" || res.message == "You have an invalid token. Please login again") {
                Actions.Home({ type: 'reset' });
              }
            } else if (res.status) {
              callback(res);
            } else {
              getNotify('', 'Please try again...');
            }
          })
          .catch(error => {
            console.warn('error fetching' + error.message);
            Core.getNotify('', 'Ooops, failed to process data...');
          });
      }
    } catch (e) {
      Core.getNotify('', e);
    }
  });
}

export function LoginProcess(username, password, callback) {
  try {
    loginParameter = {
      grant_type: 'password',
      client_secret: Config.CLIENT_SECRET,
      client_id: Config.CLIENT_ID,
      username: username,
      password: password,
    };

    params = {
      url: Config.AUTH_LOGIN,
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

export function UserDetail(callback) {
  try {
    Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
      if (err || result == undefined) {
        Actions.Login({ type: 'reset' });
      } else {
        params = {
          url: Config.AUTH_USER_PROFILE,
          method: 'GET',
          header: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: result,
          },
        };
        fetching(params, result => {
          callback('', result)
        });
      }
    });
  } catch (e) {
    console.warn('error user detail' + e.message);
    getNotify('', 'Failed get data, try again');
  }
}

export function GetBalance(callback) {
  try {
    Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
      params = {
        url: Config.USER_CREDITS,
        method: 'GET',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: result,
        },
      };
      fetching(params, result => {
        callback('', result);
      });
    });
  } catch (e) {
    console.warn('error get balance' + e.message);
    getNotify('', 'Failed get data, try again');
  }
}

export function GetHistoryTransaction(callback) {
  try {
    Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
      params = {
        url: Config.USER_NETWORK_TRANSACTION,
        method: 'GET',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: result,
        },
      };
      fetching(params, result => {
        callback('', result);
      });
    });
  } catch (e) {
    console.warn('error get history transaction' + e.message);
    getNotify('', 'Failed get data, try again');
  }
}

export function GetEClaimTransaction(callback) {
  try {
    Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
      params = {
        url: Config.USER_ECLAIM_TRANSACTION,
        method: 'GET',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: result,
        },
      };
      fetching(params, result => {
        callback('', result);
      });
    });
  } catch (e) {
    console.warn('error get Eclaim Transaction' + e.message);
    getNotify('', 'Failed get data, try again');
  }
}

export function GetUserNetwork(tid, callback) {
  try {
    Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
      params = {
        url: Config.USER_SPECIFIC_IN_NETWORK + '/' + tid,
        method: 'GET',
        header: {
          Authorization: result,
        },
      };

      fetching(params, result => {
        callback(result);
      });
    });
  } catch (e) {
    console.warn('error get GetUserNetwork' + e.message);
    getNotify('', 'Failed get data, try again');
  }
}

export function GetSpesificEclaim(tid, callback) {
  try {
    Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
      params = {
        url: Config.USER_SPECIFIC_E_CLAIM + '/' + tid,
        method: 'GET',
        header: { Authorization: result },
      };

      fetching(params, result => {
        callback(result);
      });
    });
  } catch (e) {
    console.warn('error get GetSpesificEclaim' + e.message);
    getNotify('', 'Failed get data, try again');
  }
}

export function GetECardDetail(callback) {
  try {
    Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
      params = {
        url: Config.AUTH_CARD_DETAILS,
        method: 'GET',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: result,
        },
      };
      fetching(params, result => {
        callback('', result);
      });
    });
  } catch (e) {
    console.warn('error get Ecard Detail' + e.message);
  }
}

export function GetBarcodeData(url, callback) {
  try {
    Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
      params = {
        url: url,
        method: 'GET',
        header: {
          Authorization: result,
        },
      };

      fetching(params, result => {
        callback(result);
      });
    });
  } catch (e) {
    getNotify('', 'Failed get data, try again');
  }
}

export function SendPayment(param, callback) {
  Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
    params = {
      url: Config.CLINIC_SEND_PAYMENT,
      method: 'POST',
      header: {
       'Content-Type': 'application/json',
        Authorization: result,
      },
      body: param,
    };

    fetching(params, result => {
      callback('',result)
    })
  });
}

export function GetFavouritesClinic(callback) {
  try {
    Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
      params = {
        url: Config.CLINIC_GET_FAVOURITE,
        method: 'GET',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: result,
        },
      };
      fetching(params, result => {
        callback('', result);
      });
    });
  } catch (e) {
    console.warn('error get favourites clinic' + e.message);
    getNotify('', 'Failed get data, try again');
  }
}

export function GetClinicDetails(id, callback){
  try {
    Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
      params = {
        url: Config.CLINIC_DETAILS+"/"+id,
        method: 'GET',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: result,
        },
      };
      fetching(params, result => {
        callback('', result);
      });
    });
  } catch (e) {
    console.warn('error GetClinicDetails' + e.message);
    getNotify('', 'Failed get data, try again');
  }
}

export function GetProcedureDetails(id, callback){
  try {
    Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
      params = {
        url: Config.CLINIC_PROCEDURE_DETAILS+"/"+id,
        method: 'GET',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: result,
        },
      };
      fetching(params, result => {
        callback('', result);
      });
    });
  } catch (e) {
    console.warn('error GetProcedureDetails' + e.message);
    getNotify('', 'Failed get data, try again');
  }
}

export function GetClinicType(callback){
  try {
    Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
      params = {
        url: Config.CLINIC_CLINIC_TYPE,
        method: 'GET',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: result,
        },
      };
      fetching(params, result => {
        callback('', result);
      });
    });
  } catch (e) {
    console.warn('error GetProcedureDetails' + e.message);
    getNotify('', 'Failed get data, try again');
  }
}

export function GetHealthTypeList(type, callback){
  try {
    Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
      params = {
        url: Config.USER_HEALT_TYPE_LIST+"?spending_type="+type,
        method: 'GET',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: result,
        },
      };
      fetching(params, result => {
        callback('', result);
      });
    });
  } catch (e) {
    console.warn('error GetProcedureDetails' + e.message);
    getNotify('', 'Failed get data, try again');
  }
}

export function GetAllMember(callback){
  try {
    Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
      params = {
        url: Config.USER_MEMBERLIST,
        method: 'GET',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: result,
        },
      };
      fetching(params, result => {
        callback('', result);
      });
    });
  } catch (e) {
    console.warn('error GetProcedureDetails' + e.message);
    getNotify('', 'Failed get data, try again');
  }
}

export function SendEClaim(params, callback){
  try {
    Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
      let myHeaders = new Headers();
      let formdata = new FormData();

      myHeaders.append('Authorization', result);
      formdata.append("user_id", params.user_id)
      formdata.append("service", params.service)
      formdata.append("merchant", params.merchant)
      formdata.append("file", {
        uri: params.file.uri,
        type: params.file.type,
        name: params.file.fileName
      })
      formdata.append("amount", params.amount)
      formdata.append("date", params.date)
      formdata.append("spending_type", params.spending_type)
      formdata.append("time", params.time);

      params = {
        url: Config.USER_CREATE_E_CLAIM,
        method: 'POST',
        header: myHeaders,
        body: formdata,
        mode: 'cors',
        cache: 'default',
        bodyType:'multipart'
      };

      fetching(params, result => {
        callback('', result);
      });
    });
  } catch (e) {
    getNotify('', 'Failed get data, try again');
  }
}

export function ResetPassword(param, callback) {
  Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
    params = {
      url: Config.AUTH_RESET_PASSWORD,
      method: 'POST',
      header: {
       'Content-Type': 'application/json',
        Authorization: result,
      },
      body: {
        email: param
      },
    };

    fetching(params, result => {
      callback('',result)
    })
  });
}
