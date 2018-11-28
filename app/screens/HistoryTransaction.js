import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Button,
  Tab,
  Tabs,
} from 'native-base';
import Navbar from '../components/common/Navbar';
import * as Core from '../core';

class HistoryTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idTransaction: '0',
      date: '',
      customerName: '',
      price: '',
      status: '',
    };
  }

  componentWillMount() {
    this.getDataTransaction();
  }

  getDataTransaction() {
    Core.GetHistoryTransaction((error, result) => {
      data =
        typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      console.warn(data);
      this.setState({
        idTransaction: data.transaction_id,
        date: data.date_of_transaction,
        customerName: data.customer,
        price: data.amount,
        status: data.type,
      });
    });
  }

  render() {
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar leftNav="back-home" title="History" />
        <Tabs
          tabBarUnderlineStyle={{ backgroundColor: 'transparant' }}
          tabBarBackgroundColor="#0392cf"
        >
          <Tab
            heading="In-Network Transactions"
            tabStyle={{ backgroundColor: '#0392cf' }}
            activeTabStyle={{ color: '#fff', backgroundColor: '#0392cf' }}
            activeTextStyle={{ color: '#fff', fontSize: 16 }}
            textStyle={{ color: '#fff', fontSize: 15 }}
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
                  <Text style={{}}>
                    Transaction #: {this.state.idTransaction}
                  </Text>
                  <Text style={{}}>{this.state.date}</Text>
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
            activeTabStyle={{ color: '#fff', backgroundColor: '#0392cf' }}
            activeTextStyle={{ color: '#fff', fontSize: 16 }}
            textStyle={{ color: '#fff', fontSize: 15 }}
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
