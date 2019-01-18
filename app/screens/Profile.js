import React, { Component } from 'react';
import { StatusBar, View, TouchableOpacity, AsyncStorage } from 'react-native';
import { Container, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as Config from '../config';
import Navbar from '../components/common/Navbar';
import Icons from 'react-native-vector-icons/FontAwesome';
import ActionSheet from 'react-native-actionsheet'
import * as Core from '../core'

class RenderList extends Component{
  render(){
    return(
      <TouchableOpacity
        onPress={this.props.action}
        style={{
          backgroundColor: 'white',
          paddingTop: 15,
          paddingBottom: 15,
          marginBottom: 3
        }}
      >
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Text
            style={{
              color: 'black',
              marginLeft: 15,
              fontFamily: Config.FONT_FAMILY_LIGHT,
              fontSize: 14,
            }}
          >
            {this.props.title}
          </Text>
          <Icons
            name="angle-right"
            style={{
              color: '#0392cf',
              fontSize: 25,
              paddingRight: 15
            }}
          />
        </View>
      </TouchableOpacity>
    )
  }
}

class Profile extends Component {

  constructor(props){
    super(props)

    this.state = {
      isLoading: false
    }
  }

  showActionSheet = () => {
    this.ActionSheet.show()
  }

  async logoutProcess(index){
    if (index == 0) {
      try {
        await AsyncStorage.removeItem('access_token');
      }
      catch(exception) {
        Core.getNotify("","Failed logout, please try again")
      }
      finally{
        Actions.Login({
          type: 'reset',
        })
      }
    }
  }

  render() {
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Core.Loader
          isVisible={this.state.isLoading}
        />
        <Navbar leftNav="back" />
        <View style={{flex:1, backgroundColor: "#EEEEEE" }}>
          <View style={{marginTop: 50}}>
            <RenderList
              action={()=>Actions.ManageProfile()}
              title="Manage Profile"
            />
            <RenderList
              title="Update Password"
            />
            <RenderList
              title="Disable Profile"
            />
            <View style={{marginTop: 50}}>
              <RenderList
                action={this.showActionSheet}
                title="Logout"
              />
              <ActionSheet
                ref={o => this.ActionSheet = o}
                title={'You are about to logout?'}
                options={['Yes, please', 'Cancel']}
                cancelButtonIndex={1}
                destructiveButtonIndex={0}
                onPress={(index) => this.logoutProcess(index)}
              />
            </View>
          </View>
        </View>
      </Container>
    );
  }
}

export default Profile;
