import React, {Component} from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import Area from '../src/components/Area';
import Bar from '../src/components/Bar';
import Pie from '../src/components/Pie';
import Line from '../src/components/Line';
import PieChartWithClickSlices from '../src/components/PieChartWithClickSlices';
import SamplePieClick from '../src/components/SamplePieClick';



export default class Dashboard_Activity extends React.Component {
  static navigationOptions = {
    title: 'Dashboard',
  };

  render() {
    return (
          <View style={{ backgroundColor: '#ccc' }}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ margin: 5, backgroundColor: '#fff', borderRadius: 5 }}>
              <View>
              <Text style={styles.text}>Feedback amount this week</Text>
              <Line/>
              </View>              
              <View>
              <Text style={styles.text}>OS distribution</Text>
              <Bar/>
              </View>
              <View>
              <Text style={styles.text}>Satisfaction index</Text>
              <PieChartWithClickSlices/>
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
