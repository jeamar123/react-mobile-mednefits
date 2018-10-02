import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Left,
  Button,
  Title,
  Right,
  Tab,
  Tabs,
  TabHeading,
  Icon,
} from 'native-base';
import Icons from 'react-native-vector-icons/FontAwesome';

class HistoryTransaction extends Component {
  render() {
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Header style={{ backgroundColor: '#0392cf' }} hasTabs>
          <Left>
            <Button transparent>
              <Icons name="angle-left" style={{ color: '#fff' }} />
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Home</Text>
            </Button>
          </Left>
          <Body>
            <Title style={{ color: '#fff' }}>History</Title>
          </Body>
          <Right />
        </Header>
        <Tabs tabBarUnderlineStyle={{ backgroundColor: 'transparent' }}>
          <Tab
            heading="In-Network Transactions"
            tabStyle={{ backgroundColor: '#0392cf' }}
            activeTabStyle={{ backgroundColor: 'transparent' }}
            activeTextStyle={{
              fontWeight: 'bold',
              color: '#0392cf',
              fontSize: 17,
            }}
            textStyle={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}
          >
            <Content padder>
              <Card>
                <CardItem
                  bordered
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={{}}>Transaction #: IN74859204</Text>
                  <Text style={{}}>20 October 2017, 09:30am</Text>
                </CardItem>
                <CardItem>
                  <Body
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text>Filbert Tan</Text>
                    <Text>S$ 188.00</Text>
                  </Body>
                </CardItem>
                <CardItem
                  footer
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text>Status</Text>
                  <Button>
                    <Text>Pending</Text>
                  </Button>
                </CardItem>
              </Card>

              <Card>
                <CardItem
                  bordered
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={{}}>Transaction #: IN74859204</Text>
                  <Text style={{}}>20 October 2017, 09:30am</Text>
                </CardItem>
                <CardItem>
                  <Body
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text>Filbert Tan</Text>
                    <Text>S$ 188.00</Text>
                  </Body>
                </CardItem>
                <CardItem
                  footer
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text>Status</Text>
                  <Button>
                    <Text>Pending</Text>
                  </Button>
                </CardItem>
              </Card>

              <Card>
                <CardItem
                  bordered
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={{}}>Transaction #: IN74859204</Text>
                  <Text style={{}}>20 October 2017, 09:30am</Text>
                </CardItem>
                <CardItem>
                  <Body
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text>Filbert Tan</Text>
                    <Text>S$ 188.00</Text>
                  </Body>
                </CardItem>
                <CardItem
                  footer
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text>Status</Text>
                  <Button>
                    <Text>Pending</Text>
                  </Button>
                </CardItem>
              </Card>
            </Content>
          </Tab>
          <Tab
            heading="E-Claim Transactions"
            tabStyle={{ backgroundColor: '#0392cf' }}
            activeTabStyle={{ backgroundColor: 'transparent' }}
            activeTextStyle={{
              fontWeight: 'bold',
              color: '#0392cf',
              fontSize: 17,
            }}
            textStyle={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}
          >
            <Content padder>
              <Card>
                <CardItem
                  bordered
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={{}}>Claim #: IN74859204</Text>
                  <Text style={{}}>Claim Date: 20 October 2017</Text>
                </CardItem>
                <CardItem>
                  <Body
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text>Filbert Tan</Text>
                    <Text>S$ 188.00</Text>
                  </Body>
                </CardItem>
                <CardItem
                  footer
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text>Status</Text>
                  <Button>
                    <Text>Approved</Text>
                  </Button>
                </CardItem>
              </Card>

              <Card>
                <CardItem
                  bordered
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={{}}>Claim #: IN74859204</Text>
                  <Text style={{}}>Claim Date: 20 October 2017</Text>
                </CardItem>
                <CardItem>
                  <Body
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text>Filbert Tan</Text>
                    <Text>S$ 188.00</Text>
                  </Body>
                </CardItem>
                <CardItem
                  footer
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text>Status</Text>
                  <Button>
                    <Text>Approved</Text>
                  </Button>
                </CardItem>
              </Card>

              <Card>
                <CardItem
                  bordered
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={{}}>Transaction #: IN74859204</Text>
                  <Text style={{}}>20 October 2017, 09:30am</Text>
                </CardItem>
                <CardItem>
                  <Body
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text>Filbert Tan</Text>
                    <Text>S$ 188.00</Text>
                  </Body>
                </CardItem>
                <CardItem
                  footer
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text>Status</Text>
                  <Button>
                    <Text>Pending</Text>
                  </Button>
                </CardItem>
              </Card>
            </Content>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default HistoryTransaction;
