#! /bin/bash

rm -rf node_modules/ &&
npm install &&
npx jetify &&
npx react-native run-android 
