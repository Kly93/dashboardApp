import React, {Component} from 'react';
import { ScrollView, View, Text, StyleSheet, RefreshControl } from 'react-native';
import Bar from '../src/components/Bar';
import FeedbacksInLineChart from '../src/components/FeedbacksInLineChart';
import PieChartWithClickSlices from '../src/components/PieChartWithClickSlices';
import AsyncStorage from '@react-native-community/async-storage';

const apiHost = "http://7a7333dc.ngrok.io/get";

export default class Dashboard_Activity extends React.Component {
  static navigationOptions = {
    title: 'Dashboard',
  };

  constructor(props) {    
    super(props)    
   Obj = new FeedbacksInLineChart();
 
  }

  state = {
    feedbacks: [],
    os: [],
    loading: false,
    smileys: [],
    refreshing: false
  };

  componentDidMount() {
    this._getFeedbackAmountPerMonth();
  }

  _getFeedbackAmountPerMonth = async () => {
    fetch( apiHost + '/feedbacks', { method: 'GET' })
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

  storeData = async () => {
    try {
      await AsyncStorage.setItem('@feedbackAmount', 'stored value')
    } catch (e) {
      console.error(e);
    }
  }


  handleRefresh = () => {
    this.setState({refreshing: true});
    this._getFeedbackAmountPerMonth().then(() => {
      this.setState({refreshing: false});
    });
  };

  render() {
    const feedbacksToDisplay = this.state.feedbacks;

    _updateFeedbacksForLine = () => {
      Obj._updateFeedbacksForLine(feedbacksToDisplay)
    }

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
            <FeedbacksInLineChart 
              feedbacks={feedbacksToDisplay}
              onListRefresh={this.state.refreshing}
              onPullDownRefresh={this.handleRefresh.bind(this)}
              data={feedbacksToDisplay}
              onListRefresh={this.state.refreshing}>
            </FeedbacksInLineChart>
            
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
