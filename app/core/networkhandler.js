import React, { PureComponent } from 'react';
import NetInfo, { NetInfoState, useNetInfo, NetInfoSubscription } from "@react-native-community/netinfo";

export function CheckNetworkConnection(callback) {
  NetInfo.getConnectionInfo().then((connectionInfo) => {
    callback(connectionInfo.type)
  });
}
