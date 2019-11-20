import React, {Component} from 'react';
import { ScrollView, View, Text, StyleSheet, RefreshControl } from 'react-native';
import LineChart from '../src/components/LineChart';
import AsyncStorage from '@react-native-community/async-storage';


const apiHost = "http://10.24.24.20:8085/get";

export default class Dashboard_Activity extends React.Component {
  static navigationOptions = {
    title: 'Dashboard',
  };

  state = {
    feedbacksPerYear: [],
    feedbacksPerMonth: [],
    months: [],
    tooltipX: null,
    tooltipY: null,
    tooltipIndex: null,
    os: [],
    loading: false,
    smileys: [],
    refreshing: false
  };

  componentDidMount() {
    this._getFeedbackAmountPerMonth();
    this._getFeedbackAmountPerYear();
    this._getOsAmount();
    this._getSmileyRangeAmount();
  }

  _getFeedbackAmountPerMonth = async () => {
    fetch( apiHost + '/feedbacks/month', { method: 'GET' })
       .then(response => response.json() )
       .then((responseJson) => {
           this.setState({
            feedbacksPerMonth: responseJson
           })
        })
        .catch((error) => {
           console.error(error);
        });
     }

     _getFeedbackAmountPerYear = async () => {
      fetch( apiHost + '/feedbacks/year', { method: 'GET' })
         .then(response => response.json() )
         .then((responseJson) => {
             this.setState({
              feedbacksPerYear: responseJson
             })
          })
          .catch((error) => {
             console.error(error);
          });
       }

     _getOsAmount = async () => {
      fetch( apiHost + '/os2/android+ios', { method: 'GET' })
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

       _getSmileyRangeAmount = async () => {
        fetch( apiHost + '/linecount/smiley', { method: 'GET' })
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

  storeData = async () => {
    try {
      await AsyncStorage.setItem('@feedbackAmount', 'stored value')
    } catch (e) {
      console.error(e);
    }
  }

  handleRefresh = () => {
    this.setState({refreshing: true});
    this._getFeedbackAmountPerMonth();
    this._getOsAmount();
    this._getSmileyRangeAmount()
    .then(() => {
      this.setState({refreshing: false});
    });
  };

  render() {  
   const feedbacksPerYear = this.state.feedbacksPerYear;

    return (
      <View style={{backgroundColor: '#fff'}}>
        <ScrollView
            refreshControl={
              <RefreshControl
                    refreshing={ this.state.refreshing }
                    onRefresh={ () => this.handleRefresh() }
                  />
          } 
          showsVerticalScrollIndicator={false}
          style={{backgroundColor: '#fff', borderRadius: 5}}
         >
          <View style={styles.panel}>
            <Text style={styles.text}>Feedback amount this year</Text>
            <LineChart
            feedbacksPerYear={feedbacksPerYear}/>
          </View>
          <View style={styles.panel}>
            <Text style={styles.text}>OS distribution</Text>
          </View>
          <View style={styles.panel}>
            <Text style={styles.text}>Satisfaction index</Text>
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
