import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import Area from '../src/components/Area';
import Line from '../src/components/Line';
import Pie from '../src/components/Pie';

export default class Dashboard_Activity extends React.Component {
  static navigationOptions = {
    title: 'Dashboard',
  };

  render() {
    return (
        <ScrollView >
        <Area />
        <Line />
        <Pie/>
    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f6f9',
    padding: 11,
  },
});
