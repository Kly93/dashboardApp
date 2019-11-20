import React, {Component} from 'react';
import { ScrollView, View, Text, StyleSheet, RefreshControl } from 'react-native';
import Bar from '../src/components/Bar';
import FeedbacksInLineChart from '../src/components/FeedbacksInLineChart';
import PieChartWithClickSlices from '../src/components/PieChartWithClickSlices';
import AsyncStorage from '@react-native-community/async-storage';
import {Circle} from 'react-native-svg';
import Tooltip from '../src/components/Tooltip';

const apiHost = "http://10.24.24.20:8085/get";

export default class Dashboard_Activity extends React.Component {
  static navigationOptions = {
    title: 'Dashboard',
  };

  state = {
    feedbacksPerYear: [],
    feedbacksPerMonth: [],
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
    fetch( apiHost, { method: 'GET' })
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
    const {tooltipX, tooltipY, tooltipIndex} = this.state;
    const feedbacksPerYear = this.state.feedbacksPerYear;
    const feedbacksPerMonth = this.state.feedbacksPerMonth;
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const xAxis = []
    const osToDisplay = this.state.os;
    const smileysToDisplay = this.state.smileys;

    const ChartPoints = ({x, y, color}) =>
    feedbacksPerMonth.map((item, index) => (
        <Circle
          key={index}
          cx={x(moment(item.time))}
          cy={y(item.smiley)}
          r={6}
          stroke={color}
          fill="white"
          onPress={() =>
            this.setState({
              tooltipX: moment(item.time),
              tooltipY: item.smiley,
              tooltipIndex: index,
            })
          }
        />
      ));

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
           { this.state.feedbacksPerMonth.length > 0 ? ( 
            <FeedbacksInLineChart 
              yAccessor={({item}) => item.smiley}
              xAccessor={({item}) => moment(item.time)}
              feedbacksPerMonth={feedbacksPerMonth}
              months={months}
              onListRefresh={this.state.refreshing}
              onPullDownRefresh={this.handleRefresh}>
            <ChartPoints color="#003F5A" />
            <Tooltip
                tooltipX={tooltipX}
                tooltipY={tooltipY}
                color="#003F5A"
                index={tooltipIndex}
                dataLength={feedbacksPerMonth.length}
              />
            </FeedbacksInLineChart>
            ) : ( 
              <Text>No data available</Text>
              )}
          </View>
          <View style={styles.panel}>
            <Text style={styles.text}>OS distribution</Text>
           { this.state.os.length > 0 ? ( 
            <Bar 
              os={osToDisplay}
              onListRefresh={this.state.refreshing}
              onPullDownRefresh={this.handleRefresh}>
            </Bar>
            ) : (
              <Text>No data available</Text>
            )}
          </View>
          <View style={styles.panel}>
            <Text style={styles.text}>Satisfaction index</Text>
          { this.state.smileys.length > 0 ? ( 
            <PieChartWithClickSlices 
              smileys={smileysToDisplay}
              onListRefresh={this.state.refreshing}
              onPullDownRefresh={this.handleRefresh}>
            </PieChartWithClickSlices>
          ) : (
            <Text>No data available</Text>
          )}
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
