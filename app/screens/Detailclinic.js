import React, { Component } from 'react';
import { StatusBar, View, TouchableOpacity, Image, Linking, ScrollView } from 'react-native';
import {
  Container,
  Text,
  Tab,
  Tabs,
  TabHeading
} from 'native-base';
import Navbar from '../components/common/Navbar';
import { DetailClinic } from '../components/DetailClinic';
import * as Core from '../core';
import * as Config from '../config';
import { ButtonCall } from '../components/common/ButtonCall';
import RF from "react-native-responsive-fontsize";

class HistoryTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultData: [],
      DoctorList: [],
      procedure: [],
      openClinic: [],
      Telphone: '',
      Email: '',
      latMap: '',
      lngMap: '',
    };
  }

  componentWillMount() {
    Core.GetDetailClinic(this.props.clinic_id, (err, result) => {
      data =
        typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      console.warn(data.lattitude + ',' + data.longitude);
      this.setState({
        resultData: data,
        procedure: data.clinic_procedures,
        DoctorList: data.doctors,
        openClinic: data.open,
        Telphone: data.telephone,
        Email: data.email,
        latMap: data.lattitude,
        lngMap: data.longitude
      });
    });
  }

  headingOne() {
    icon = (this.state.index == '0') ? require('../../assets/apps/stethoscope.png') : require('../../assets/apps/stethoscope.png')

    return (
      <TabHeading
        style={{
          backgroundColor: '#7bd3f7',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Image
          source={icon}
          style={{ height: 20, resizeMode: 'center' }}
        />
        <Text
          fontFamily={Config.FONT_V2_BOLD}
          fontSize={5}
          style={{
            color: (this.state.index == '0') ? "#fff" : "#fff",
            fontSize: 13
          }}
        >
          Procedures
        </Text>
      </TabHeading>
    );
  }

  headingTwo() {
    icon = (this.state.index == '0') ? require('../../assets/apps/doctor.png') : require('../../assets/apps/doctor.png')

    return (
      <TabHeading
        style={{
          backgroundColor: '#7bd3f7',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Image
          source={icon}
          style={{ height: 20, resizeMode: 'center' }}
        />
        <Text
          fontFamily={Config.FONT_V2_BOLD}
          fontSize={5}
          style={{
            color: (this.state.index == '0') ? "#fff" : "#fff",
            fontSize: 13
          }}
        >
          Doctors
        </Text>
      </TabHeading>
    );
  }

  headingThree() {
    icon = (this.state.index == '0') ? require('../../assets/apps/first-aid-kit-2.png') : require('../../assets/apps/first-aid-kit-2.png')

    return (
      <TabHeading
        style={{
          backgroundColor: '#7bd3f7',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Image
          source={icon}
          style={{ height: 20, resizeMode: 'center' }}
        />
        <Text
          fontFamily={Config.FONT_V2_BOLD}
          fontSize={5}
          style={{
            color: (this.state.index == '0') ? "#fff" : "#fff",
            fontSize: 13
          }}
        >
          Information
        </Text>
      </TabHeading>
    );
  }

  headingFour() {
    icon = (this.state.index == '0') ? require('../../assets/apps/ambulance-2.png') : require('../../assets/apps/ambulance-2.png')

    return (
      <TabHeading

        style={{
          backgroundColor: '#7bd3f7',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <TouchableOpacity onPress={() => Linking.openURL('http://maps.google.com/maps?daddr=' + this.state.latMap + ',' + this.state.lngMap)}>
          <Image
            source={icon}
            style={{ height: 20, resizeMode: 'center' }}
          />
          <Text
            fontFamily={Config.FONT_V2_BOLD}
            fontSize={5}
            style={{
              color: (this.state.index == '0') ? "#fff" : "#fff",
              fontSize: 13
            }}
          >
            Direction
        </Text>
        </TouchableOpacity>
      </TabHeading>
    );
  }

  renderProcedure() {
    return this.state.procedure.map(Data => (
      <View
        key={Data.procedureid}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#fff',
          paddingTop: 15,
          paddingBottom: 15,
          marginBottom: 3,
          borderWidth: 2,
          borderColor: "#fff"
        }}
      >
        <View style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <Text
            style={{
              color: 'black',
              marginLeft: 15,
              fontFamily: Config.FONT_FAMILY_LIGHT,
              fontSize: RF(2.4),
              fontWeight: 'bold'
            }}
          >
            {Data.name}
          </Text><Text
            style={{
              color: 'black',
              marginLeft: 15,
              fontFamily: Config.FONT_FAMILY_LIGHT,
              fontSize: RF(1.7)
            }}
          >
            {Data.duration}
          </Text>
        </View>

        <Text style={{
          color: 'black',
          marginRight: 15,
          fontFamily: Config.FONT_FAMILY_LIGHT,
          fontSize: RF(2.4),
          fontWeight: 'bold'
        }}>
          {Data.price}
        </Text>
      </View>
    ));
  }

  renderDoctors() {
    return this.state.DoctorList.map(ListData => (
      <View
        key={ListData.doctor_id}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#fff',
          paddingTop: 15,
          paddingBottom: 15,
          marginBottom: 3,
          borderWidth: 2,
          borderColor: "#fff"
        }}
      >
        <Image
          source={{ uri: ListData.image_url }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 5,
            backgroundColor: '#fff',
            marginLeft: '3%'
          }} />
        <Text
          style={{
            color: 'black',
            marginTop: '3%',
            fontFamily: Config.FONT_FAMILY_LIGHT,
            fontSize: 16,
            fontWeight: 'bold'
          }}
        >
          {ListData.name}
        </Text>
        <Text />
        <Text />
        <Text />
        <View style={{ width: '30%', marginTop: '3%' }}>
          <ButtonCall onPress={() => Linking.openURL("tel:" + ListData.DocPhone)}>
            CALL
          </ButtonCall>
        </View>
      </View>
    ));
  }

  renderInformation() {
    return this.state.openClinic.map(Data => (
      <View
        key={Data.timeid}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#fff',
          paddingTop: 5,
          paddingBottom: 5,
          marginBottom: 2,
          borderWidth: 2,
          borderColor: "#fff"
        }}
      >
        <View style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <Text
            style={{
              color: 'black',
              marginLeft: 15,
              fontFamily: Config.FONT_FAMILY_LIGHT,
              fontSize: 12,
            }}
          >
            {Data.weeks}, {Data.starttime} - {Data.endtime}
          </Text>
        </View>
      </View>
    ));
  }

  renderContactInfo() {
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingTop: 5,
        paddingBottom: 5,
      }}
    >
      <View style={{
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <Text
          style={{
            color: 'black',
            marginLeft: 15,
            fontFamily: Config.FONT_FAMILY_LIGHT,
            fontSize: 12,
          }}
        >
          Phone : {this.state.Telphone}
        </Text>
        <Text
          style={{
            color: 'black',
            marginLeft: 15,
            fontFamily: Config.FONT_FAMILY_LIGHT,
            fontSize: 12,
          }}
        >
          Email : {this.state.Email}
        </Text>
      </View>
    </View>
  }

  renderDoctors() {
    return this.state.DoctorList.map(ListData => (
      <TouchableOpacity onPress={() => Linking.openURL("tel:" + ListData.DocPhone)}>
        <View
          key={ListData.doctor_id}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#fff',
            paddingTop: 15,
            paddingBottom: 15,
            marginBottom: 3,
            borderWidth: 2,
            borderColor: "#fff"
          }}
        >
          <Image
            source={{ uri: ListData.image_url }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 5,
              backgroundColor: '#fff',
              marginLeft: '3%'
            }} />
          <Text
            style={{
              color: 'black',
              marginTop: '3%',
              fontFamily: Config.FONT_FAMILY_LIGHT,
              fontSize: 16,
              fontWeight: 'bold'
            }}
          >
            {ListData.name}
          </Text>
          <Text />
          <Text />
          <Text />
          <View style={{ width: '30%', marginTop: '3%' }}>
            <ButtonCall onPress={() => Linking.openURL("tel:" + ListData.DocPhone)}>
              CALL
          </ButtonCall>
          </View>
        </View>
      </TouchableOpacity>
    ));
  }

  render() {
    console.warn("datanya" + (this.props.clinic_id))
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar leftNav="back" />
        <DetailClinic
          clinicid={this.state.resultData.clinic_id}
          clinicimage={this.state.resultData.image_url}
          clinicname={this.state.resultData.name}
          Address={this.state.resultData.address}
          CallPhon={this.state.resultData.telephone}
          favourite={this.state.resultData.favourite}
        />
        <Tabs
          tabBarUnderlineStyle={{ backgroundColor: 'transparent' }}
          tabBarBackgroundColor="#7bd3f7"
        >
          <Tab
            heading={this.headingOne()}
          >
            <ScrollView
              showHorizontalScrollIndicator={false}
              showVerticalScrollIndicator={false}
            >
              <View style={{ backgroundColor: '#EEEEEE' }}>
                <View
                  style={{ justifyContent: 'center', alignItems: 'flex-start', backgroundColor: '#B9F0F5' }}
                >
                  <Text
                    fontFamily={Config.FONT_FAMILY_ROMAN}
                    style={{
                      textAlign: 'center', fontSize: 12, marginStart: '2%', color: '#327EC2', paddingTop: 10,
                      paddingBottom: 10,
                    }}
                  >
                    Health Service Menu
              </Text>
                </View>
                {this.renderProcedure()}
              </View>
            </ScrollView>
          </Tab>
          <Tab
            heading={this.headingTwo()}
          >
            <ScrollView
              showHorizontalScrollIndicator={false}
              showVerticalScrollIndicator={false}
            >
              <View style={{ backgroundColor: '#EEEEEE' }}>
                <View
                  style={{ justifyContent: 'center', alignItems: 'flex-start', backgroundColor: '#B9F0F5' }}
                >
                  <Text
                    fontFamily={Config.FONT_FAMILY_ROMAN}
                    style={{
                      fontSize: 10, marginStart: '2%', color: '#327EC2', paddingTop: 10,
                      paddingBottom: 10,
                    }}
                  >
                    You may call our health partner to set appointment or walk in and present your e-card
              </Text>
                </View>
                {this.renderDoctors()}
              </View>
            </ScrollView>
          </Tab>
          <Tab
            heading={this.headingThree()}
          >
            <ScrollView
              showHorizontalScrollIndicator={false}
              showVerticalScrollIndicator={false}
            >
              <View style={{ backgroundColor: '#EEEEEE' }}>
                <View
                  style={{ justifyContent: 'center', alignItems: 'flex-start', backgroundColor: '#B9F0F5' }}
                >
                  <Text
                    fontFamily={Config.FONT_FAMILY_ROMAN}
                    style={{
                      fontSize: 10, marginStart: '2%', color: '#327EC2', paddingTop: 10,
                      paddingBottom: 10,
                    }}
                  >
                    Opening Times
              </Text>
                </View>
                {this.renderInformation()}
                <View
                  style={{ justifyContent: 'center', alignItems: 'flex-start', backgroundColor: '#B9F0F5' }}
                >
                  <Text
                    fontFamily={Config.FONT_FAMILY_ROMAN}
                    style={{
                      fontSize: 10, marginStart: '2%', color: '#327EC2', paddingTop: 10,
                      paddingBottom: 10,
                    }}
                  >
                    Contact Information
              </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    backgroundColor: '#fff',
                    paddingTop: 5,
                    paddingBottom: 5,
                  }}
                >
                  <View style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    marginBottom: 10
                  }}>
                    <Text
                      style={{
                        color: '#8c8b7f',
                        marginLeft: 15,
                        fontFamily: Config.FONT_FAMILY_LIGHT,
                        fontSize: 12,
                      }}
                    >
                      Phone
                  </Text>
                    <Text
                      style={{
                        color: 'black',
                        marginLeft: 15,
                        fontFamily: Config.FONT_FAMILY_LIGHT,
                        fontSize: 13,
                      }}
                    >
                      {this.state.Telphone}
                    </Text>
                  </View>
                  <View style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    marginBottom: 10
                  }}>
                    <Text
                      style={{
                        color: '#8c8b7f',
                        marginLeft: 15,
                        fontFamily: Config.FONT_FAMILY_LIGHT,
                        fontSize: 12,
                      }}
                    >
                      Email
                  </Text>
                    <Text
                      style={{
                        color: 'black',
                        marginLeft: 15,
                        fontFamily: Config.FONT_FAMILY_LIGHT,
                        fontSize: 13,
                      }}
                    >
                      {this.state.Email}
                    </Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </Tab>
          <Tab
            heading={this.headingFour()}
          >
            {/* <Content padder>{this.renderTransactionE_Claim()}</Content> */}
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default HistoryTransaction;
