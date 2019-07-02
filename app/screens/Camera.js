import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, ImageBackground, Platform, Dimensions, PermissionsAndroid } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';
import { Actions } from 'react-native-router-flux';
import Navbar from '../components/common/NavbarGrey';
import { Text } from '../common';
import * as Common from '../components/common';
import * as Core from '../core';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

const options = {
  title: 'Select Photo',
  customButtons: [{ name: 'fb', title: 'Choose Photo from gallery' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const PendingView = () => (
  <View
    style={{ justifyContent: 'center', alignItems: 'center', flex: 1, opacity: 0.3 }}
  >
    <ActivityIndicator size="large" color="#fff" />
  </View>
);

class Camera extends Component {
  constructor(props) {
    super(props);

    this.state = {
      torchMode: 'off',
      cameraType: 'back',
      preview: false,
      isLoading: false,
      flashMode: false,
      attachedPanel: false,
      shootType: 'single',
      images: [],
      previewState: 0,
      previewImage: false
    };

    this.renderCamera = this.renderCamera.bind(this)
    this.changeViewCamera = this.changeViewCamera.bind(this)
    this.leftNavCameraCallback = this.leftNavCameraCallback.bind(this)
  }

  takePicture = async () => {
    try {
      if (this.camera) {
        const options = {
          quality: 1.0,
          base64: false,
          orientation: "portrait",
          fixOrientation: true,
          skipProcessing: false,
        };
        const data = await this.camera.takePictureAsync(options);
        const maxHeight = Dimensions.get('window').height;
        const maxWidth = Dimensions.get('window').width;

        const ratio = Math.min(maxWidth / data.width, maxHeight / data.height);

        images = {
          preview: data.uri,
          previewHeight: data.height * ratio,
          previewWidth: data.width * ratio,
          filename: 'receipt' + this.props.claimdata.member + '.jpg',
          filetype: 'images/jpg'
        }

        if (this.state.images.length !== 4) {
          imagesdata = [...this.state.images, images]

          this.setState({
            images: (this.state.shootType == 'single') ? [images] : imagesdata,
            preview: true,
          })

          if (imagesdata.length == 4) {
            this.setPreview(4)
          }
        } else {
          Core.getNotify("", "Only 4 images can be upload")
        }

      }
    } catch (e) {
      console.warn(e.message);
      Core.getNotify("", "Failed to take picture")

    }
  }

  setPreview(ind) {
    this.state.images.map((value, index) => {
      if (index == ind - 1) {
        this.setState({
          preview: true,
          previewState: ind,
          previewImage: value.preview
        })
      } else {
        console.warn('gada pet preview' + ind + index);
      }
    })

  }

  retakeAction = () => {
    if (this.state.images.length == 4) {
      Core.getNotify("", "Only 4 images can be upload")
    } else {
      this.setState({
        preview: false
      })
    }
  }

  async requestPermission() {
    if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
      return result === PermissionsAndroid.RESULTS.GRANTED || result === true
    }
    return true;
  }

  onSwipeLeft(gestureState) {
    console.warn(gestureState);
    this.setState({ shootType: 'batch' });
  }

  onSwipeRight(gestureState) {
    console.warn(gestureState);
    this.setState({ shootType: 'single' });
  }

  onSwipe(gestureName, gestureState) {
    console.warn(gestureState);
    const { SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    this.setState({ shootType: (this.state.shootType == 'single') ? 'batch' : 'single' });
    switch (gestureName) {
      case SWIPE_LEFT:
        this.setState({ shootType: 'batch' });
        break;
      case SWIPE_RIGHT:
        this.setState({ shootType: 'single' });
        break;
    }
  }

  renderCamera = () => {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        captureAudio={false}
        flashMode={(!this.state.flashMode) ? RNCamera.Constants.FlashMode.off : RNCamera.Constants.FlashMode.on}
        permissionDialogTitle={'Permission to use camera'}
        permissionDialogMessage={'We need your permission to use your camera phone'}
      >
        {({ camera, status, recordAudioPermissionStatus }) => {

          if (status !== 'READY') this.requestPermission()

        }}
      </RNCamera>
    )
  }

  changeFlash = () => {
    if (!this.state.flashMode) {
      Core.getNotify("", "Flash is on")
    }

    this.setState({
      flashMode: !this.state.flashMode
    })

  }

  openGallery = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        images = {
          preview: response.uri,
          filename: response.fileName,
          filetype: response.type,
        }

        if (this.state.images.length !== 4) {
          this.setState({
            images: (this.state.shootType == 'single') ? [images] : [...this.state.images, images],
            preview: true
          })
        } else {
          Core.getNotify("", "Only 4 images can be upload")
        }
      }
    });
  }

  finishReceipt = () => {
    Core.getNotify("", "Receipt attached")

    this.setState({
      attachedPanel: true
    })
  }

  changeViewCamera(type) {
    this.setState({ shootType: type })

    if (type == 'single') {
      this.setState({ images: [] })
    }

    this.retakeAction()
  }

  previewCaption() {
    if (this.state.images.length > 0) {
      return (
        <View style={{ flex: 1 }}>
          {this.state.images.map((value, index) => (
            (this.state.shootType == 'single') ? (
              <View
                key={index}
                style={{ flex: 1 }}
              >
                <ImageBackground
                  source={{ uri: value.preview }}
                  style={styles.preview}
                />
              </View>
            ) : (<View />)
          ))}
        </View>
      )
    } else {
      return (
        <View>
          <Common.Texti>
            bye
          </Common.Texti>
        </View>
      )
    }

  }

  renderActionAlternative = () => {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        marginTop: 10
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 15, marginRight: 15 }}>
          {(this.state.previewState !== 0) ? (
            <TouchableOpacity
              onPress={() => this.setState({ previewState: 0 })}
              style={{
                width: 30,
                height: 30,
                borderRadius: 30 / 2,
                backgroundColor: "white",
                padding: 3,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                borderWidth: 1,
                borderColor: 'black',
                marginTop: 5,
              }}
            >
              <Icon type="Feather" name="camera" style={{ color: 'black', fontSize: 20, justifyContent: 'center' }} />
            </TouchableOpacity>
          ) : (
              <TouchableOpacity
                onPress={this.changeFlash}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 5,
                  marginLeft: 15
                }}>
                <ImageBackground
                  source={(this.state.flashMode) ? require("../../assets/apps/flash-active.png") : require("../../assets/apps/flash.png")}
                  style={{
                    width: 30,
                    height: 30
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
          <View style={{ flex: 1, alignItems: 'stretch', flexDirection: 'row', justifyContent: 'center' }}>
            <View style={{ width: 40, justifyContent: 'center', alignItems: 'center' }}>
              {(this.state.shootType == 'batch') ? (
                <View style={{ display: (this.state.previewState !== 0) ? 'none' : 'flex' }}>
                  <TouchableOpacity
                    onPress={() => this.changeViewCamera('single')}
                    style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Common.Texti
                      fontColor={(this.state.shootType !== 'single') ? "grey" : "#0392cf"}
                      fontSize={11}
                      style={{
                        paddingBottom: 5
                      }}
                    >
                      Single{" "}
                    </Common.Texti>
                  </TouchableOpacity>
                </View>
              ) : (<View />)}
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', width: 40 }}>
              {(this.state.previewState !== 0) ? (
                <TouchableOpacity
                  onPress={() => this.removeImage(this.state.previewState - 1)}
                  style={{
                    width: 30,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <ImageBackground
                    source={require('../../assets/delete-button.png')}
                    style={{
                      width: 30,
                      height: 30
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ) : (<View />)}
              {(this.state.shootType == 'single') ? (
                <View style={{ display: (this.state.previewState !== 0) ? 'none' : 'flex' }}>
                  <TouchableOpacity
                    onPress={() => this.changeViewCamera('single')}
                    style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Common.Texti
                      fontColor={(this.state.shootType !== 'single') ? "grey" : "#0392cf"}
                      fontSize={11}
                    >
                      Single{" "}
                    </Common.Texti>
                    <View style={{ width: 4, height: 4, borderRadius: 4 / 2, backgroundColor: '#0392cf', marginTop: 2 }} />
                  </TouchableOpacity>
                </View>
              ) : (
                  <View style={{ display: (this.state.previewState !== 0) ? 'none' : 'flex' }}>
                    <TouchableOpacity
                      onPress={() => this.changeViewCamera('batch')}
                      style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                      <Common.Texti
                        fontColor={(this.state.shootType !== 'batch') ? "grey" : "#0392cf"}
                        fontSize={11}
                      >
                        Batch{" "}
                      </Common.Texti>
                      <View style={{ width: 4, height: 4, borderRadius: 4 / 2, backgroundColor: '#0392cf', marginTop: 2 }} />
                    </TouchableOpacity>
                  </View>
                )}
            </View>
            <View style={{ width: 40, justifyContent: 'center', alignItems: 'center' }}>
              {(this.state.shootType == 'single') ? (
                <View>
                  <TouchableOpacity
                    onPress={() => this.changeViewCamera('batch')}
                    style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Common.Texti
                      fontColor={(this.state.shootType !== 'batch') ? "grey" : "#0392cf"}
                      fontSize={11}
                      style={{
                        paddingBottom: 5
                      }}
                    >
                      Batch{" "}
                    </Common.Texti>
                  </TouchableOpacity>
                </View>
              ) : (<View></View>)}
            </View>
          </View>
          {(this.state.images.length == 5) ? (
            <View />
          ) : (
              <TouchableOpacity
                onPress={this.openGallery}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 5,
                  marginRight: 15
                }}>
                <ImageBackground
                  source={require('../../assets/apps/gallery-round.png')}
                  style={{
                    width: 30,
                    height: 30
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
        </View>
        <View style={{ flex: 1, alignItems: 'stretch', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 15, marginRight: 15 }}>
          <View style={{ width: (this.state.previewState !== 0) ? 200 : 100, justifyContent: 'center' }}>
            <View style={{
              flex: 1,
              flexGrow: 2,
              flexDirection: 'row',
            }}>
              {((this.state.images.length > 0) && (this.state.shootType == 'batch') && (this.state.preview !== false)) ? (
                this.state.images.map((value, index) => (
                  <View
                    key={index}
                    style={{
                      flex: 1,
                      alignItems: 'flex-start',
                      paddingTop: 3,
                      position: (this.state.previewState !== 0) ? 'relative' : 'absolute',
                      zIndex: 5,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => this.setPreview(index + 1)}
                      style={{
                        alignItems: 'flex-end',
                        marginLeft: 5,
                      }}
                    >
                      <View style={{
                        width: 20,
                        height: 20,
                        borderRadius: 30 / 2,
                        backgroundColor: "#0392cf",
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: -5,
                        marginBottom: -10,
                        zIndex: 99,
                        display: (this.state.previewState !== 0) ? 'none' : 'flex'
                      }}>
                        <Common.Texti fontColor="#FFFFFF" fontSize={8}>{index + 1}</Common.Texti>
                      </View>
                      <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: (this.state.previewState !== 0) ? 10 : 0
                      }}>
                        <ImageBackground
                          source={{ uri: value.preview }}
                          style={[styles.preview, {
                            width: (this.state.previewState !== 0) ? 45 : 55,
                            height: (this.state.previewState !== 0) ? 45 : 55,
                            marginBottom: (this.state.previewState !== 0) ? 10 : 0,
                            borderWidth: (this.state.previewState == (index + 1)) ? 2 : 0, borderColor: (this.state.previewState == (index + 1)) ? "#0392cf" : "#FFFFFF"
                          }]}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                ))
              ) : (<View />)}
            </View>
          </View>
          <View style={{ width: 50, justifyContent: 'center', alignItems: 'center', display: (this.state.previewState !== 0) ? 'none' : 'flex' }}>
            {
              ((this.state.preview !== true) || (this.state.previewState == 0)) ? (
                <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
                  <Icon type="Feather" name="camera" style={{ color: 'white', fontSize: 26, justifyContent: 'center' }} />
                </TouchableOpacity>
              ) : (<View />)
            }
          </View>
          <View style={{ width: 100, justifyContent: 'center', alignItems: 'center' }}>
            {
              (this.state.images.length > 0) ?
                (
                  <TouchableOpacity
                    onPress={() => Actions.CameraPreview({ shootType: this.state.shootType, claimdata: Object.assign({}, { images: this.state.images }, this.props.claimdata) })}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: '4%'
                    }}>
                    <Common.Texti
                      fontColor={"grey"}
                      fontSize={18}
                    >
                      Finish
                  </Common.Texti>
                  </TouchableOpacity>
                ) : (
                  <Text
                    style={{
                      fontFamily: 'HelveticaNeue-Roman',
                      fontSize: 14,
                      color: '#FFFFFF',
                      marginRight: 15,
                      opacity: 0
                    }}
                  >
                    DONE
                </Text>
                )
            }
          </View>
        </View>
      </View>
    )
  }

  renderAction = () => {
    return (
      <View style={styles.actionPanel}>
        {/* <TouchableOpacity
          onPress={() => Actions.DetailEclaim({ claimdata: Object.assign({}, { images: this.state.images }, this.props.claimdata) })}
          style={{ width: "100%", backgroundColor: "#0392cf", justifyContent: 'center', alignItems: 'center', display: (this.state.attachedPanel) ? 'flex' : 'none', height: '20%' }}>
          <Icon
            type="SimpleLineIcons"
            name="check"
            style={{
              color: "#fff"
            }}
          />
        </TouchableOpacity> */}
        <View style={{
          flex: 1,
          justifyContent: 'space-between',
          flexDirection: 'row',
          display: (this.state.attachedPanel) ? 'none' : 'flex',
          paddingBottom: 5
        }}>
          <View style={{ alignItems: 'flex-start', paddingTop: 5 }}>
            {(this.state.previewState !== 0) ? (
              <TouchableOpacity
                onPress={() => this.setState({ previewState: 0 })}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30 / 2,
                  backgroundColor: "white",
                  padding: 3,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: 'black',
                  marginTop: 5,
                  marginLeft: 15
                }}
              >
                <Icon type="Feather" name="camera" style={{ color: 'black', fontSize: 20, justifyContent: 'center' }} />
              </TouchableOpacity>
            ) : (
                <TouchableOpacity
                  onPress={this.changeFlash}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 5,
                    marginLeft: 15
                  }}>
                  <ImageBackground
                    source={(this.state.flashMode) ? require("../../assets/apps/flash-active.png") : require("../../assets/apps/flash.png")}
                    style={{
                      width: 30,
                      height: 30
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )}
          </View>
          <View style={{ paddingTop: 5 }}>
            {((this.state.preview !== true) || (this.state.previewState == 0)) ? (
              <View style={{ paddingTop: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', display: (this.state.preview && (this.state.shootType == 'single')) ? 'none' : 'flex' }}>
                <TouchableOpacity
                  onPress={() => this.changeViewCamera('single')}
                  style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <Common.Texti
                    fontColor={(this.state.shootType !== 'single') ? "grey" : "#0392cf"}
                    fontSize={11}
                  >
                    Single{" "}
                  </Common.Texti>
                  {(this.state.shootType == 'single') ? (
                    <View style={{ width: 4, height: 4, borderRadius: 4 / 2, backgroundColor: '#0392cf', marginTop: 2 }} />
                  ) : (<View style={{ width: 4, height: 4, borderRadius: 4 / 2, marginTop: 2 }} />)}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.changeViewCamera('batch')}
                  style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <Common.Texti
                    fontColor={(this.state.shootType !== 'batch') ? "grey" : "#0392cf"}
                    fontSize={11}
                  >
                    Batch{" "}
                  </Common.Texti>
                  {(this.state.shootType == 'batch') ? (
                    <View style={{ width: 4, height: 4, borderRadius: 4 / 2, backgroundColor: '#0392cf', marginTop: 2 }} />
                  ) : (<View style={{ width: 4, height: 4, borderRadius: 4 / 2, marginTop: 2 }} />)}
                </TouchableOpacity>
              </View>
            ) : (
                <View style={{ paddingTop: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity
                    onPress={() => this.removeImage(this.state.previewState - 1)}
                    style={{
                      width: 30,
                      height: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <ImageBackground
                      source={require('../../assets/delete-button.png')}
                      style={{
                        width: 30,
                        height: 30
                      }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              )}
          </View>
          <View style={{ alignItems: 'flex-end', paddingTop: 5 }}>
            {(this.state.images.length == 5) ? (
              <View />
            ) : (
                <TouchableOpacity
                  onPress={this.openGallery}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 5,
                    marginRight: 15
                  }}>
                  <ImageBackground
                    source={require('../../assets/apps/gallery-round.png')}
                    style={{
                      width: 30,
                      height: 30
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )}
          </View>
        </View>
        <View style={{ width: "100%", justifyContent: 'space-between', flexDirection: 'row', display: (this.state.attachedPanel) ? 'none' : 'flex', alignItems: 'center', height: '75%', paddingLeft: 15 }}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={{ width: '40%' }}>
            <View style={{
              flex: 1,
              flexGrow: 2,
            }}>
              {((this.state.images.length > 0) && (this.state.shootType == 'batch') && (this.state.preview !== false)) ? (
                this.state.images.map((value, index) => (
                  <View
                    key={index}
                    style={{
                      flex: 1,
                      alignItems: 'flex-start',
                      paddingTop: 3,
                      position: (index == 0) ? 'relative' : 'absolute',
                      zIndex: 5
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => this.setPreview(index + 1)}
                      style={{
                        alignItems: 'flex-end',
                        marginLeft: 5,
                      }}
                    >
                      <View style={{
                        width: 20,
                        height: 20,
                        borderRadius: 30 / 2,
                        backgroundColor: "#0392cf",
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: -5,
                        marginBottom: -10,
                        zIndex: 99,
                      }}>
                        <Common.Texti fontColor="#FFFFFF" fontSize={8}>{index + 1}</Common.Texti>
                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <ImageBackground
                          source={{ uri: value.preview }}
                          style={[styles.preview, {
                            width: (this.state.previewState !== 0) ? 15 : 55,
                            height: (this.state.previewState !== 0) ? 15 : 55,
                            borderWidth: (this.state.previewState == (index + 1)) ? 2 : 0, borderColor: (this.state.previewState == (index + 1)) ? "#0392cf" : "#FFFFFF"
                          }]}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                ))
              ) : (<View />)}
            </View>
          </ScrollView>
          <View style={{ width: '33%', justifyContent: 'center', alignItems: 'center' }}>
            {
              ((this.state.previewState == 0)) ? (
                <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
                  <Icon type="Feather" name="camera" style={{ color: 'white', fontSize: 26, justifyContent: 'center' }} />
                </TouchableOpacity>
              ) : (<View />)
            }
          </View>
          <View style={{ width: '33%', justifyContent: 'center', alignItems: 'center' }}>
            {
              (this.state.images.length > 0) ?
                (
                  <TouchableOpacity
                    onPress={() => Actions.CameraPreview({ shootType: this.state.shootType, claimdata: Object.assign({}, { images: this.state.images }, this.props.claimdata) })}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: '4%'
                    }}>
                    <Common.Texti
                      fontColor={"grey"}
                      fontSize={18}
                    >
                      Finish
                  </Common.Texti>
                  </TouchableOpacity>
                ) : (
                  <Text
                    style={{
                      fontFamily: 'HelveticaNeue-Roman',
                      fontSize: 14,
                      color: '#FFFFFF',
                      marginRight: 15,
                      opacity: 0
                    }}
                  >
                    DONE
                </Text>
                )
            }
          </View>
        </View>
      </View>
    )
  }

  _closeSection() {
    return (
      <ImageBackground
        style={{ width: 30, height: 30 }}
        source={require('../../assets/close.png')}
      />
    )
  }

  removeImage(index) {
    arr = this.state.images
    remove = arr.splice(index, 1)

    Core.getNotify("", "image removed")

    if (this.state.images == 0) {
      this.setState({
        preview: false,
        previewState: 0
      })
    } else {
      this.setState({
        preview: true,
        previewState: index - 1
      })
    }
  }

  renderContainer() {
    if (((this.state.shootType == 'single') && (!this.state.preview)) || ((this.state.previewState == 0) && (this.state.shootType == 'batch'))) {
      return this.renderCamera()
    } else if ((this.state.preview !== false) && (this.state.shootType == 'batch')) {
      return (
        <ImageBackground
          source={{ uri: this.state.previewImage }}
          style={{ width: "100%", height: "100%" }}
        />
      )
    } else if (this.state.preview && (this.state.shootType == 'single')) {
      return (
        this.state.images.map((value, index) => (
          <ImageBackground
            source={{ uri: value.preview }}
            style={{ width: "100%", height: "100%" }}
          />
        ))
      )
    } else {
      return (
        this.state.images.map((value, index) => (
          <ImageBackground
            source={{ uri: value.preview }}
            style={{ width: "100%", height: "100%" }}
          />
        ))
      )
    }
  }

  leftNavCameraCallback = (callback) => {
    if (this.state.preview) {
      this.setState({
        preview: false,
        images: [],
        previewState: 0,
        previewImage: false
      })
    } else {
      Actions.pop()
    }
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
        <View style={{ zIndex: 99 }}>
          <Navbar
            leftNav="back-camera"
            title="Receipt Verification"
            subtitle="E-Claim"
            leftNavCameraCallback={this.leftNavCameraCallback}
          />
        </View>
        <View style={{ flex: 0.8, backgroundColor: '#efeff4' }}>
          {this.renderContainer()}
        </View>
        <View style={styles.actionPanel}>
          {this.renderActionAlternative()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  camera: {
    flex: 1,
    flexDirection: 'column'
  },
  preview: {
    width: 55,
    height: 55,
  },
  actionPanel: {
    flex: 0.23,
    backgroundColor: '#efeff4',
    // backgroundColor: 'red',
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  capture: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    backgroundColor: "#0392cf",
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Camera;
