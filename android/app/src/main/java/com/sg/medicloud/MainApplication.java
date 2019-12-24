package com.sg.medicloud;

import android.app.Application;

import com.agontuk.RNFusedLocation.RNFusedLocationPackage;
import com.facebook.react.ReactApplication;
import com.smixx.fabric.FabricPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.ninty.system.setting.SystemSettingPackage;
import com.horcrux.svg.SvgPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.imagepicker.ImagePickerPackage;
import com.agontuk.RNFusedLocation.RNFusedLocationPackage;
import com.rnfs.RNFSPackage;
import com.reactnativedocumentpicker.ReactNativeDocumentPicker;
import org.reactnative.camera.RNCameraPackage;
import io.xogus.reactnative.versioncheck.RNVersionCheckPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.ninty.system.setting.SystemSettingPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.imagepicker.ImagePickerPackage;
import com.rnfs.RNFSPackage;
import com.reactnativedocumentpicker.ReactNativeDocumentPicker;
import org.reactnative.camera.RNCameraPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.horcrux.svg.SvgPackage;
import io.xogus.reactnative.versioncheck.RNVersionCheckPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import com.crashlytics.android.Crashlytics;
import io.fabric.sdk.android.Fabric;
import com.dylanvann.fastimage.FastImageViewPackage;


import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new RNVersionCheckPackage(),
        new MainReactPackage(),
        new FastImageViewPackage(),
        new FabricPackage(),
        new VectorIconsPackage(),
        new SystemSettingPackage(),
        new MapsPackage(),
        new ImagePickerPackage(),
        new RNFSPackage(),
        new ReactNativeDocumentPicker(),
        new RNCameraPackage(),
        new RNFusedLocationPackage(),
        new AsyncStoragePackage(),
        new ReactNativeOneSignalPackage(),
        new SvgPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    Fabric.with(this, new Crashlytics());
  }
}
