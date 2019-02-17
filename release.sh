#! /bin/bash

bundlefile="android/app/src/main/assets/index.android.bundle"
drawablefile="android/app/src/main/res/drawable-hdpi"

if [ -f "$bundlefile" ]
then
	rm -rf android/app/src/main/assets/index.android.bundle android/app/src/main/assets/index.android.bundle.meta
  echo "file bundle terhapus"
fi

react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

if [ -e "$drawablefile" ]
then
  rm -rf android/app/src/main/res/drawable-*
  echo "folder drawable terhapus"
fi

cd android && ./gradlew assembleRelease
