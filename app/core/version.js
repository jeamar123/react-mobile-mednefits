import { Linking } from 'react-native';
import VersionCheck from 'react-native-version-check';

export function CheckVersion(){
  return new Promise((resolve, reject) => {
    try {
      VersionCheck.needUpdate()
      .then(async res => {
        if (res.isNeeded) {
          resolve(Linking.openURL(await VersionCheck.getStoreUrl()))
        } else {
          reject('uptodate')
        }
      });
    } catch (e) {
      reject(e)
    }
  })
}
