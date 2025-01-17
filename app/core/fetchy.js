/*
 * @author detatsatrio
 * @year 2018
 */

import { PermissionsAndroid, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { getAlert, getNotify } from './notify';
import * as Config from '../config';
import * as Core from './index';
import SystemSetting from 'react-native-system-setting'
import Geolocation from 'react-native-geolocation-service';
import Permissions from 'react-native-permissions';

const headerLogin = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

async function fetching(params, callback) {
  // await Core.CheckNetworkConnection(async connection => {
  try {
    // if (connection == 'none') {
    //   throw 'No Internet Connection';
    // } else if (connection == 'unknown') {
    //   throw 'Connection Unknown';
    // } else {
    await fetch(params.url, {
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
      .then(async response => response.json())
      .then(async res => {
        console.warn(res)
        if (!res.status) {
          // getAlert('', res.message);
          if (res.expired) {
            Actions.Login({ type: 'reset' });
          }
          callback(res);
        } else if (res.status) {
          callback(res);
        } else {
          callback(res)
          // getAlert('', 'Please try again...');
        }
      })
      .catch(error => {
        error = (typeof error.message !== 'undefined') ? error : error.message
        if (error == 'Network request failed') {
          error = 'Please check your connection'
        }
        callback("", error)
      });
    // }
  } catch (e) {
    Core.getNotify('', e);
    callback("", e)
  }
  // });
}

export async function LoginProcess(username, password, callback) {
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

    await fetching(params, async result => {
      if (!result.status) {
        // getNotify('', result.error_description);
        await callback(result);
      } else {
        // getNotify('', 'Success! Wait a second...');

        data = result.data;
        data_parse = typeof data == 'string' ? JSON.parse(data) : data;
        access_token = data_parse.access_token;

        params = {
          key: 'access_token',
          value: access_token,
        };

        await Core.SetDataLocal(params, async (err, result) => {
          if (result) {
            user_data = {
              key: 'user_id',
              value: String(data_parse.user_id),
            };

            await Core.SetDataLocal(user_data, async (err, result) => {
              console.log('result user_id key from login', result)
            });

            await callback('', true);
            // Actions.Home({ type: 'reset' });
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

export const UserDetail = async (callback) => {
  console.warn('UserDetail called in function')
  try {
    await Core.GetDataLocal(Config.ACCESS_TOKEN, async (err, result) => {
      console.warn('GetDataLocal called in function')
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
        await fetching(params, async result => {
          console.warn('done fetching in UserDetail');
          await callback('', result)
        });
        console.warn('fetching executed');
      }
    });
  } catch (e) {
    console.warn('error user detail' + e.message);
    getNotify('', 'Failed get data, try again');
  }
}

export const GetUpdateNotifStatus = async (callback) => {
  try {
    await Core.GetDataLocal(Config.ACCESS_TOKEN, async (err, result) => {
      params = {
        url: Config.UPDATE_NOTIF,
        method: 'GET',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: result,
        },
      };
      await fetching(params, async result => {
        await callback('', result);
      });
    });
  } catch (e) {
    console.warn('error ' + e.message);
    getNotify('', 'Failed, try again');
  }
}

export const GetBalance = async (callback) => {
  try {
    await Core.GetDataLocal(Config.ACCESS_TOKEN, async (err, result) => {
      params = {
        url: Config.USER_CREDITS,
        method: 'GET',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: result,
        },
      };
      await fetching(params, async result => {
        await callback('', result);
      });
    });
  } catch (e) {
    console.warn('error get balance' + e.message);
    getNotify('', 'Failed get data, try again');
  }
}

export const GetCoverageDates = async (callback) => {
  try {
    await Core.GetDataLocal(Config.ACCESS_TOKEN, async (err, result) => {
      params = {
        url: Config.USER_COVERAGE_DATES,
        method: 'GET',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: result,
        },
      };
      await fetching(params, async result => {
        await callback('', result);
      });
    });
  } catch (e) {
    console.warn('error get dates' + e.message);
    getNotify('', 'Failed get data, try again');
  }
}

export async function GetBalanceMedical(filter, callback) {
  await setTimeout(async function () {
    try {
      await Core.GetDataLocal(Config.ACCESS_TOKEN, async (err, result) => {
        params = {
          url: Config.USER_CREDITS + "?spending_type=medical&filter=" + filter,
          method: 'GET',
          header: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: result,
          },
        };
        await fetching(params, async result => {
          await callback('', result);
        });
      });
    } catch (e) {
      console.warn('error get balance' + e.message);
      getNotify('', 'Failed get data, try again');
    }
  }, 100);
}

export async function GetBalanceWellness(filter, callback) {
  await setTimeout(async function () {
    try {
      await Core.GetDataLocal(Config.ACCESS_TOKEN, async (err, result) => {
        params = {
          url: Config.USER_CREDITS + "?spending_type=wellness&filter=" + filter,
          method: 'GET',
          header: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: result,
          },
        };
        await fetching(params, async result => {
          await callback('', result);
        });
      });
    } catch (e) {
      console.warn('error get balance' + e.message);
      getNotify('', 'Failed get data, try again');
    }
  }, 100);
}


export async function GetHistoryTransaction(filter, callback) {
  await setTimeout(async function () {
    try {
      await Core.GetDataLocal(Config.ACCESS_TOKEN, async (err, result) => {
        params = {
          url: Config.USER_NETWORK_TRANSACTION + "?filter=" + filter,
          method: 'GET',
          header: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: result,
          },
        };
        await fetching(params, async result => {
          await callback('', result);
        });
      });
    } catch (e) {
      console.warn('error get history transaction' + e.message);
      getNotify('', 'Failed get data, try again');
    }
  }, 10);
}

export async function GetEClaimTransaction(filter, callback) {
  await setTimeout(async function () {
    try {
      await Core.GetDataLocal(Config.ACCESS_TOKEN, async (err, result) => {
        params = {
          url: Config.USER_ECLAIM_TRANSACTION + "?filter=" + filter,
          method: 'GET',
          header: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: result,
          },
        };
        await fetching(params, async result => {
          console.warn('GetEClaimTransaction')
          await callback('', result);
        });
      });
    } catch (e) {
      console.warn('error get Eclaim Transaction' + e.message);
      getNotify('', 'Failed get data, try again');
    }
  }, 100);
}

export function GetUserNetwork(tid, callback) {
  setTimeout(function () {
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
          // console.warn(result);
          callback(result);
        });
      });
    } catch (e) {
      console.warn('error get GetUserNetwork' + e.message);
      getNotify('', 'Failed get data, try again');
    }
  }, 100);
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

export async function GetBarcodeData(url, callback) {
  try {
    await Core.GetDataLocal(Config.ACCESS_TOKEN, async (err, result) => {
      params = {
        url: url,
        method: 'GET',
        header: {
          Authorization: result,
        },
      };

      // fetching(params, result => {
      //   console.warn(result);
      //   callback(result);
      // });

      await fetching(params, async result => {
        if (!result.error) {
          // getNotify('', result.error_description);
          await callback(result);
        } else {
          Core.getNotify('', 'Success!');

          data = result.data;
          data_parse = typeof data == 'string' ? JSON.parse(data) : data;
          check_in_id = data_parse.check_in_id;

          params = {
            key: 'check_in_id',
            value: check_in_id,
          };

          await Core.SetDataLocal(params, async (err, result) => {
            if (result) {
              await callback('', true);
              Core.getNotify('', 'Success');
              console.warn('Success Saving data');
              // Actions.Home({ type: 'reset' });
            } else {
              Core.getNotify('', 'Failed');
              console.warn('Failed Saving Data');
            }
          });
        }
      })

    });
  } catch (e) {
    console.warn(e.message);
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
      callback('', result)
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

export const GetClinicDetails = async (id, callback) => {
  try {
    console.warn('triggered GetClinicDetails')
    await Core.GetDataLocal(Config.ACCESS_TOKEN, async (err, result) => {
      params = {
        url: Config.CLINIC_DETAILS + "/" + id,
        method: 'GET',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: result,
        },
      };
      await fetching(params, async result => {
        console.warn('done GetClinicDetails');
        await callback('', result);
      });
    });
  } catch (e) {
    console.warn('error GetClinicDetails' + e.message);
    getNotify('', 'Failed get data, try again');
  }
}

export function GetProcedureDetails(id, callback) {
  try {
    Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
      params = {
        url: Config.CLINIC_PROCEDURE_DETAILS + "/" + id,
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

export const GetClinicType = async (callback) => {
  try {
    await Core.GetDataLocal(Config.ACCESS_TOKEN, async (err, result) => {
      params = {
        url: Config.CLINIC_CLINIC_TYPE,
        method: 'GET',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: result,
        },
      };
      await fetching(params, async result => {
        await callback('', result);
      });
    });
  } catch (e) {
    console.warn('error GetProcedureDetails' + e.message);
    getNotify('', 'Failed get data, try again');
  }
}

export function GetHealthTypeList(type, callback) {
  try {
    Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
      params = {
        url: Config.USER_HEALT_TYPE_LIST + "?spending_type=" + type,
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

export const GetAllMember = async (callback) => {
  try {
    await Core.GetDataLocal(Config.ACCESS_TOKEN, async (err, result) => {
      params = {
        url: Config.USER_MEMBERLIST,
        method: 'GET',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: result,
        },
      };
      await fetching(params, result => {
        callback('', result);
      });
    });
  } catch (e) {
    console.warn('error GetProcedureDetails' + e.message);
    getNotify('', 'Failed get data, try again');
  }
}

export const SendEClaim = async (params, callback) => {
  try {
    await Core.GetDataLocal(Config.ACCESS_TOKEN, async (err, result) => {
      let myHeaders = new Headers();
      let formdata = new FormData();

      myHeaders.append('Authorization', result);
      formdata.append("user_id", params.user_id)
      formdata.append("service", params.service)
      formdata.append("merchant", params.merchant)
      params.images.map((value, index) => {
        formdata.append("files[]", {
          uri: value.preview,
          type: value.filetype,
          name: value.filename
        })
      })
      formdata.append("amount", params.amount)
      formdata.append("claim_amount", params.claim_amount)
      formdata.append("date", params.date)
      formdata.append("spending_type", params.spending_type)
      formdata.append("time", params.time);
      formdata.append("currency_type", params.currency_type);
      formdata.append("currency_exchange_rate", params.currency_exchange_rate);

      params = {
        url: Config.USER_CREATE_E_CLAIM,
        method: 'POST',
        header: myHeaders,
        body: formdata,
        mode: 'cors',
        cache: 'default',
        bodyType: 'multipart'
      };

      console.warn(params);

      fetching(params, result => {
        console.warn(result)
        callback('', result);
      });

    });
  } catch (e) {
    getNotify('', 'Failed get data, try again');
  }
}

export function CheckEclaimVisit(param, callback) {
  Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
    params = {
      url: Config.USER_CHECK_E_CLAIM,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        Authorization: result,
      },
      body: param
    };

    fetching(params, result => {
      callback('', result)
    })
  });
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
      callback('', result)
    })
  });
}


export function GetDetailClinic(id, callback) {
  try {
    Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
      params = {
        url: Config.CLINIC_CLINIC_DETAILS + "/" + id,
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

export function Search(query) {
  return new Promise((resolve, reject) => {
    try {
      Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
        params = {
          url: Config.CLINIC_MAIN_SEARCH + "/?search=" + query,
          method: 'GET',
          header: {
            'Content-Type': 'application/json',
            Authorization: result,
          },
        };

        fetching(params, result => {
          resolve(result)
        })
      });
    } catch (e) {
      reject(e)
    }
  })
}

export function PayDirect(param, callback) {
  Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
    params = {
      url: Config.CLINIC_PAYMENT_DIRECT,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        Authorization: result,
      },
      body: param,
    };

    fetching(params, result => {
      callback('', result)
    })
  });
}

export function AddFavouriteClinic(param, callback) {
  Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
    params = {
      url: Config.CLINIC_SET_FAVOURITE,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        Authorization: result,
      },
      body: param,
    };

    fetching(params, result => {
      callback('', result)
    })
  });
}

/** Get Location User */
// function GetCurrentLocation(callback) {
//   navigator.geolocation.getCurrentPosition(
//     (position) => {
//       callback(position)
//     },
//     (error) => Common.getNotify("", error.message),
//     { enableHighAccuracy: false, timeout: 20000, maximumAge: 5000 },
//   );
// }

async function enableLocationDevice(callback) {
  try {
    console.warn('switch location');
    if (Platform.OS == "ios") {
      await Permissions.check('location').then(async response => {
        console.warn("response", response);
        if (response !== "authorized") {
          await Permissions.openSettings('location').then(async response => {
            console.warn(response);
            if (response) {
              callback('', true)
            } else {
              callback(false);
            }
          });
        } else {
          await callback('', true);
        }
      })


    } else {
      await SystemSetting.isLocationEnabled().then(async (enable) => {
        if (!enable) {
          await SystemSetting.switchLocation(async () => {
            console.warn('switch location successfully');
            // await GetLocation();
            return callback('', true);
          })
        } else {
          return callback('', true);
        }
      })
    }
  } catch (e) {
    console.warn(e.message + "error enableLocationDevice");
    callback(true);
  }
}

async function getEnablePermesssionLocation(callback) {
  await Permissions.request('location').then(response => {
    if (response !== "authorized") {
      callback(false);
    } else {
      callback('', true);
    }
  })
}

async function requestLocationPermission(callback) {
  console.warn('request permission')

  await Permissions.check('location').then(async response => {
    console.warn("response", response);
    if (response !== "authorized") {
      await getEnablePermesssionLocation(async function (error, result) {
        if (result) {
          await callback(result);
        } else {
          await callback(error);
        }
      })
    } else {
      await callback('', true);
    }
  })
  // const chckLocationPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
  // if (chckLocationPermission === PermissionsAndroid.RESULTS.GRANTED) {
  //   console.warn('already granted');
  //   // await enableLocationDevice();
  //   return true;
  // } else {
  //   try {
  //     const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         'title': 'Location Permission Device',
  //         'message': 'We need this permission to look for nearby location for clinic'
  //       }
  //     )
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.warn('granted');
  //       console.warn('You can use location');
  //       // await enableLocationDevice();
  //       // getNotify('', 'Location Permission Granted.');
  //       return true;
  //     } else {
  //       console.warn('location denied');
  //       getNotify('', 'Location Permission Denied.');
  //       return false;
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //     getNotify('', err);
  //     return false;
  //   }
  // }
}

export async function GetLocationPermission(callback) {
  console.warn('get location');
  await requestLocationPermission(async function (error, result) {
    console.warn('result permission', result);
    if (result) {
      callback('', result);
    } else {
      callback(error);
    }
  });
}

export async function checkLocationFirst(clinic_type_id, callback) {
  latitude = await Core.GetDataLocalReturnNew(Config.LATITUDE)
  longitude = await Core.GetDataLocalReturnNew(Config.LONGITUDE)

  if (!latitude || !longitude) {
    getNotify('', 'Waiting to get device location');
    return callback(false);
  } else {
    return callback('', true);
  }
}


export async function GetClinicMapList(clinic_type_id, callback) {
  // final code flow
  await enableLocationDevice(async function (error, result) {
    console.warn(error);
    console.warn(result);
    if (result) {
      console.warn('get location clinics')
      Geolocation.getCurrentPosition(
        async (position) => {
          console.warn('position', position);
          latitude = await {
            key: Config.LATITUDE,
            value: JSON.stringify(position.coords.latitude)
          }

          longitude = await {
            key: Config.LONGITUDE,
            value: JSON.stringify(position.coords.longitude)
          }

          await Core.SetDataLocal(latitude, (err, result) => {
            if (result) {
              // console.warn("Set a new latitude");
            }
          })

          await Core.SetDataLocal(longitude, (err, result) => {
            // Common.getNotify("","")
            if (result) {
              // console.warn("Set a new longitude");
            }
          })

          // getNotify('', 'Location request successful. (' + position.coords.latitude + ', ' + position.coords.longitude + ')');
          // query location
          await Core.GetDataLocal(Config.ACCESS_TOKEN, async (err, token) => {
            console.warn('querying location clinics')
            params = {
              url: Config.CLINIC_PAGE_NEARBY + "?lat=" + position.coords.latitude + "&lng=" + position.coords.longitude + "&type=" + clinic_type_id + "&page=1",
              method: 'GET',
              header: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: token,
              },
            };
            await fetching(params, async result => {
              if (result) {
                console.warn('Success! Wait a second...');
                console.warn(result);
                await callback('', result);

                dataClinicNearby = result.data;

                await Core.SetDataLocal(dataClinicNearby, async (err, result) => {
                  if (result) {
                    console.warn("Set a pin Point Data Nearby");
                  }
                });
              }
            });
          });
          return;
        },
        function (error) {
          console.warn(error);
          callback(error, '');
        },
        { enableHighAccuracy: true, timeout: 3000 },
      );
    } else {
      return callback(false);
    }
  });
}

export async function GetClinicMap(clinic_type_id, callback) {
  // try {
  latitude = await Core.GetDataLocalReturnNew(Config.LATITUDE)
  longitude = await Core.GetDataLocalReturnNew(Config.LONGITUDE)

  if (!latitude || !longitude) {
    console.warn('Waiting to get device location');
    getNotify('', 'Waiting to get device location');
    return false;
  } else {
    await enableLocationDevice(async function (error, result) {
      if (result) {
        // console.warn('latitude', latitude)
        // console.warn('longitude', longitude)
        Core.GetDataLocal(Config.ACCESS_TOKEN, async (err, result) => {
          params = {
            url: Config.CLINIC_NEARBY + "?lat=" + latitude + "&lng=" + longitude + "&type=" + clinic_type_id + "&page=1",
            method: 'GET',
            header: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: result,
            },
          };

          await fetching(params, async result => {
            if (result) {
              console.warn(result.data.clinics);
              await callback('', result.data.clinics);

              dataClinicNearbyMap = result.data.clinics;

              await Core.SetDataLocal(dataClinicNearbyMap, async (err, result) => {
                if (result) {
                  console.warn("Set a pin Point Data NearbyMap");
                }
              });
            }
          })
        });
      }
    })
  }
}

export function MainSearch(query) {
  return new Promise((resolve, reject) => {
    try {
      Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
        params = {
          url: Config.CLINIC_MAIN_SEARCH + "/?search=" + query,
          method: 'GET',
          header: {
            'Content-Type': 'application/json',
            Authorization: result,
          },
        };

        fetching(params, result => {
          resolve(result)
        })
      });
    } catch (e) {
      reject(e)
    }
  })
}

export async function paginateClinicResults(clinic_type_id, page, callback) {
  latitude = await Core.GetDataLocalReturnNew(Config.LATITUDE)
  longitude = await Core.GetDataLocalReturnNew(Config.LONGITUDE)

  await Core.GetDataLocal(Config.ACCESS_TOKEN, async (err, token) => {
    console.warn('querying location clinics paginate')
    params = {
      url: Config.CLINIC_PAGE_NEARBY + "?lat=" + latitude + "&lng=" + longitude + "&type=" + clinic_type_id + "&page=" + page,
      method: 'GET',
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    await fetching(params, async result => {
      console.warn(result);
      await callback('', result);
    });
  });
}

export function GetFamilyCoverage(callback) {
  Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
    params = {
      url: Config.FAMILY_COVERAGE,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        Authorization: result,
      }
    };

    fetching(params, result => {
      callback('', result)
    })
  });
}

export function SwitchAccount(param, callback) {
  Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
    params = {
      url: Config.ONE_TAP_LOGIN,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        Authorization: result,
      },
      body: param
    };

    fetching(params, result => {
      if (!result.error) {
        callback(result);
      } else {
        getNotify('', 'Success! Wait a second...');

        data = result.data;
        data_parse = typeof data == 'string' ? JSON.parse(data) : data;
        access_token = data_parse.access_token;

        params = {
          key: 'access_token',
          value: access_token,
        };

        console.log('data from switch', data)

        Core.SetDataLocal(params, async (err, result) => {
          if (result) {
            user_data = {
              key: 'user_id',
              value: String(data_parse.user_id),
            };

            await Core.SetDataLocal(user_data, async (err, result) => {
              console.log('result user_id key from login', result)
            });
            callback('', true);
            Actions.Home({ type: 'reset' });
          } else {
            getNotify('', 'Failed login, try again');
          }
        });
      }
    })
  });
}

export function CreatePayment(param, callback) {
  Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
    params = {
      url: Config.CLINIC_CREATE_PAYMENT,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        Authorization: result,
      },
      body: param,
    };

    fetching(params, result => {
      callback('', result)
    })
  });
}

export function CurrencyList(callback) {
  Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
    params = {
      url: Config.CURRENCY_LIST,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        Authorization: result,
      }
    };

    fetching(params, result => {
      callback('', result)
    })
  });
}

export function CancelVisit(param, callback) {
  Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
    params = {
      url: Config.CANCEL_VISIT,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        Authorization: result,
      },
      body: param,
    };

    fetching(params, result => {
      callback('', result)
    })
  });
}

export const ReceiptUpload = async (params, callback) => {
  try {
    await Core.GetDataLocal(Config.ACCESS_TOKEN, async (err, result) => {
      let myHeaders = new Headers();
      let formdata = new FormData();

      myHeaders.append('Authorization', result);
      formdata.append("transaction_id", params.transaction_id)
      params.images.map((value, index) => {
        formdata.append("files[]", {
          uri: value.preview,
          type: value.filetype,
          name: value.filename
        })
      })

      params = {
        url: Config.USER_UPLOAD_RECEIPT_BULK,
        method: 'POST',
        header: myHeaders,
        body: formdata,
        mode: 'cors',
        cache: 'default',
        bodyType: 'multipart'
      };

      console.warn(params);

      fetching(params, result => {
        console.warn(result)
        callback('', result);
      });

    });
  } catch (e) {
    getNotify('', 'Failed get data, try again');
  }
}

export const CancelVisiByClinic = async (check_in_id, callback) => {
  try {
    console.warn('triggered CancelVisiByClinic')
    await Core.GetDataLocal(Config.ACCESS_TOKEN, async (err, result) => {
      params = {
        url: Config.CANCEL_VISIT_BYCLINIC + "?check_in_id=" + check_in_id,
        method: 'GET',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: result,
        },
      };
      await fetching(params, async result => {
        console.warn('done CancelVisiByClinic');
        await callback('', result);
      });
    });
  } catch (e) {
    console.warn('error CancelVisiByClinic' + e.message);
    getNotify('', 'Failed get data, try again');
  }
}

// export function CancelVisiByClinic(check_in_id, callback) {
//   console.warn('triggered CancelVisiByClinic')
//   Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
//     params = {
//       url: Config.CANCEL_VISIT_BYCLINIC + "?check_in_id=" + check_in_id,
//       method: 'GET',
//       header: {
//         'Content-Type': 'application/json',
//         Authorization: result,
//       }
//     };

//     fetching(params, result => {
//       console.warn('done CancelVisiByClinic');
//       callback('', result)
//     })
//   });
// }