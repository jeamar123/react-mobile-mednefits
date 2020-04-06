import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import * as Core from '../core';

class Splash extends Component {

  async UNSAFE_componentWillMount() {
    setTimeout(() => {
      Core.AppStatus();
      // Core.NEW_AppStatus();
    }, 500);
    await AsyncStorage.removeItem('latitude');
    await AsyncStorage.removeItem('longitude');
    // console.log('removed latitude')
    // console.log('removed longitude')
  }

  render() {
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Logo />
      </Container>
    );
  }
}

export default Splash;


// import React, { Component } from 'react';
// import { StatusBar, AsyncStorage } from 'react-native';
// import { Container } from '../components/Container';
// import { Logo } from '../components/Logo';
// import * as Core from '../core';
// import { Popup } from '../components/common';

// class Splash extends Component {

//   constructor(props) {
//     super(props);

//     this.state = {
//       update: false
//     }
//   }

//   async componentWillMount() {
//     this.checkversion()
//   }

//   checkversion = async () => {
//     try {
//       version = await Core.CheckVersion()

//       this.setState({
//         update: true
//       })
//     } catch (e) {
//       setTimeout(() => {
//         Core.AppStatus()
//       }, 500);
//       await AsyncStorage.removeItem('latitude');
//       await AsyncStorage.removeItem('longitude');
//       console.log('removed latitude')
//       console.log('removed longitude')
//     }
//   }

//   render() {
//     return (
//       <Container>
//         <StatusBar backgroundColor="white" barStyle="dark-content" />
//         <Popup
//           kind="update-application"
//           isVisible={this.state.update}
//           title={"Your application is out of date"}
//           message={"Please click below button to update your application"}
//         />
//         <Logo />
//       </Container>
//     );
//   }
// }

// export default Splash;
