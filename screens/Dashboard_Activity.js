import React, {Component} from 'react';
import { ScrollView, View, Text, StyleSheet, RefreshControl } from 'react-native';
import Bar from '../src/components/Bar';
import Line from '../src/components/Line';
import PropTypes from 'prop-types';
import PieChartWithClickSlices from '../src/components/PieChartWithClickSlices';
import { LineChart } from 'react-native-svg-charts'


export default class Dashboard_Activity extends React.Component {
  static navigationOptions = {
    title: 'Dashboard',
  };

  static propTypes = {
    onListRefresh: PropTypes.bool.isRequired,
    onItemPress: PropTypes.func.isRequired,
    onPullDownRefresh: PropTypes.func.isRequired,
}

  state = {
    feedbacks: [],
    os: [],
    loading: false,
    smileys: [],
    refreshing: false
  };

  _getFeedbackData = async () => {
       componentDidMount = () => {
        fetch('http://10.24.24.120:8085/get/os2/android+ios', { method: 'GET' })
           .then(response => response.json() )
           .then((responseJson) => {
               this.setState({
                os: responseJson
               })
            })
            .catch((error) => {
               console.error(error);
            });
         }
         componentDidMount = () => {
          fetch('http://10.24.24.120:8085/get/linecount/smiley', { method: 'GET' })
             .then(response => response.json() )
             .then((responseJson) => {
                 this.setState({
                  smileys: responseJson
                 })
              })
              .catch((error) => {
                 console.error(error);
              });
           }
  };

  componentDidMount() {
    this._getFeedbackAmountPerMonth();
  }

  _getFeedbackAmountPerMonth = async () => {
    fetch('http://7bcc159e.ngrok.io/get/feedbacks', { method: 'GET' })
    .then(response => response.json() )
    .then((responseJson) => {
        this.setState({
         feedbacks: responseJson
        })
     })
     .catch((error) => {
        console.error(error);
     });
  }


  handleRefresh = () => {
    this.setState({refreshing: true});
    this._getFeedbackAmountPerMonth().then(() => {
      this.setState({refreshing: false});
    });
  };

  

  render() {
    const feedbacksToDisplay = this.state.feedbacks;
    console.log("New feedbacks :" + feedbacksToDisplay)
    return (
      <View style={{backgroundColor: '#fff'}}>
        <ScrollView
            refreshControl={
              <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={ () => this.handleRefresh() }
                  />
          }
          showsVerticalScrollIndicator={false}
          style={{backgroundColor: '#fff', borderRadius: 5}}
         >
          <View style={styles.panel}>
            <Text style={styles.text}>Feedback amount this week</Text>
            <Line 
              data={feedbacksToDisplay}
              onListRefresh={this.state.refreshing}
            />
          </View>
          <View style={styles.panel}>
            <Text style={styles.text}>OS distribution</Text>
            <Bar />
          </View>
          <View style={styles.panel}>
            <Text style={styles.text}>Satisfaction index</Text>
            <PieChartWithClickSlices />
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
