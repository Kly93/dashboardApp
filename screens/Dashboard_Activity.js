import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Area from '../src/components/Area';
import Line from '../src/components/Line';
import Pie from '../src/components/Pie';

export default class Dashboard_Activity extends React.Component {
  static navigationOptions = {
    title: 'Dashboard',
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.mainContainer}>
          <Area />
          <Line />
          <Pie />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#f6f6f6',
  },
});
