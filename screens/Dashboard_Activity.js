import React, {Component} from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import Bar from '../src/components/Bar';
import Line from '../src/components/Line';
import PieChartWithClickSlices from '../src/components/PieChartWithClickSlices';

export default class Dashboard_Activity extends React.Component {
  static navigationOptions = {
    title: 'Dashboard',
  };

  state = {
    refreshing: false
  };

  render() {
    return (
      <View style={{backgroundColor: '#fff'}}>
       
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
