import React, { PureComponent } from 'react';
import { NetInfo } from 'react-native';

export function CheckNetworkConnection(callback){
  NetInfo.getConnectionInfo().then((connectionInfo) => {
    callback(connectionInfo.type)
  });
}
