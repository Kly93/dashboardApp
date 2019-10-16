import React, {Component} from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import Area from '../src/components/Area';
import Bar from '../src/components/Bar';
import Pie from '../src/components/Pie';

export default class Dashboard_Activity extends React.Component {
  static navigationOptions = {
    title: 'Dashboard',
  };

  render() {
    return (
          <View>
          <ScrollView>
          <View>
          <Text style={styles.text}>Dates</Text>
          <Area />
          </View>
          <View>
          <Text style={styles.text}>Mobile OS</Text>
          <Bar />
          </View>
          <View>
          <Text style={styles.text}>Smiley Range</Text>
          <Pie/>
          </View>
          </ScrollView>
          </View>
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
  text: {
    fontSize: 24,
    padding: 10,
    fontWeight: "bold",
  }
});
