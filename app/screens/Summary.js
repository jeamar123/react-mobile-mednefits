import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import {
  Container,
  Content,
  Left,
  Right,
  Card,
  CardItem,
  Text,
  Body,
} from 'native-base';
import { SummaryComp } from '../components/SummaryComp';
import styles from '../components/SummaryComp/styles';
import Navbar from '../components/common/Navbar';

class Summary extends Component {
  render() {
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar
          leftNav="null"
          title="Summary"
          subtitle="In-Network"
          rightNav="done"
        />
        <SummaryComp />
        <Content padder>
          <Card>
            <CardItem style={{ backgroundColor: '#fff' }}>
              <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text
                  style={{
                    marginTop: 10,
                    marginBottom: 14,
                    fontFamily: 'helvetica',
                  }}
                >
                  {(this.props.result.data.clinic_name) ? this.props.result.data.clinic_name : ""}
                </Text>
                <View
                  style={{ flexDirection: 'row', alignItems: 'flex-start' }}
                >
                  <Text style={styles.detailUp}>{(this.props.result.data.currency_symbol) ? this.props.result.data.currency_symbol : ""}</Text>
                  <Text style={styles.detail}>{(this.props.result.data.amount) ? this.props.result.data.amount : ""}</Text>
                </View>
              </Body>
            </CardItem>
            <CardItem cardBody>
              <Left>
                <Text
                  style={{
                    fontSize: 13,
                    marginTop: 20,
                    fontFamily: 'helvetica',
                  }}
                >
                  Service
                </Text>
              </Left>
              <Body />
              <Right style={{ marginRight: 10 }}>
                <Text
                  style={{
                    fontSize: 13,
                    marginTop: 20,
                    fontFamily: 'helvetica',
                  }}
                >
                  {(this.props.result.data.services) ? this.props.result.data.services : ""}
                </Text>
              </Right>
            </CardItem>
            <CardItem cardBody>
              <Left>
                <Text
                  style={{
                    fontSize: 13,
                    marginTop: 20,
                    fontFamily: 'helvetica',
                  }}
                >
                  Transaction Time
                </Text>
              </Left>
              <Body />
              <Right style={{ marginRight: 10 }}>
                <Text
                  style={{
                    fontSize: 13,
                    marginTop: 20,
                    fontFamily: 'helvetica',
                  }}
                >
                  {(this.props.result.data.transaction_time) ? this.props.result.data.transaction_time : ""}
                </Text>
              </Right>
            </CardItem>
            <CardItem cardBody>
              <Left>
                <Text
                  style={{
                    fontSize: 13,
                    marginTop: 20,
                    fontFamily: 'helvetica',
                  }}
                >
                  Trans-ID
                </Text>
              </Left>
              <Body />
              <Right style={{ marginRight: 10 }}>
                <Text
                  style={{
                    fontSize: 13,
                    marginTop: 20,
                    fontFamily: 'helvetica',
                  }}
                >
                  {(this.props.result.data.transation_id) ? this.props.result.data.transation_id : ""}
                </Text>
              </Right>
            </CardItem>
            <View style={{ marginBottom: 10 }} />
          </Card>
        </Content>
      </Container>
    );
  }
}
export default Summary;
