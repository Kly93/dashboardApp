import React from 'react';
import {ScrollView, View, Text, StyleSheet, RefreshControl} from 'react-native';
import LineChart from '../src/components/LineChart';
import Bar from '../src/components/Bar';
import PieChart from '../src/components/PieChart';

const apiHost = 'http://195.113.246.108:8085/get';

export default class Dashboard_Activity extends React.Component {
  static navigationOptions = {
    title: 'Dashboard',
  };

  state = {
    feedbacksPerYear: [],
    months: [],
    os: [],
    loading: false,
    smileys: [],
    refreshing: false,
  };

  componentDidMount() {
    this._getFeedbackAmountPerYear();
    this._getOsAmount();
    this._getSmileyRangeAmount();
  }

  _getFeedbackAmountPerYear = async () => {
    fetch(apiHost + '/feedbacks/year', {method: 'GET'})
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          feedbacksPerYear: responseJson,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  _getOsAmount = async () => {
    fetch(apiHost + '/os2/android+ios', {method: 'GET'})
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          os: responseJson,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  _getSmileyRangeAmount = async () => {
    fetch(apiHost + '/linecount/smiley', {method: 'GET'})
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          smileys: responseJson,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  handleRefresh = () => {
    this.setState({refreshing: true});
    this._getOsAmount();
    this._getSmileyRangeAmount();
    this._getFeedbackAmountPerYear().then(() => {
      this.setState({refreshing: false});
    });
  };

  render() {
    console.disableYellowBox = true;
    const feedbacksPerYear = this.state.feedbacksPerYear;
    const os = this.state.os;
    const smileyRange = this.state.smileys;

    return (
      <View style={{backgroundColor: '#fff'}}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.handleRefresh()}
            />
          }
          showsVerticalScrollIndicator={false}
          style={{backgroundColor: '#fff', borderRadius: 5}}>
          <View style={styles.panel}>
            <Text style={styles.text}>Feedback amount this year</Text>
            <LineChart
              feedbacksPerYear={feedbacksPerYear}
              onListRefresh={this.state.refreshing}
              onPullDownRefresh={this.handleRefresh}
            />
          </View>
          <View style={styles.panel}>
            <Text style={styles.text}>OS distribution</Text>
            <Bar
              os={os}
              onListRefresh={this.state.refreshing}
              onPullDownRefresh={this.handleRefresh}
            />
          </View>
          <View style={styles.panel}>
            <Text style={styles.text}>Satisfaction index</Text>
            <PieChart
              smileys={smileyRange}
              onListRefresh={this.state.refreshing}
              onPullDownRefresh={this.handleRefresh}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    padding: 10,
    fontWeight: 'bold',
  },
  panel: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    elevation: 10,
    margin: 10,
  },
});
