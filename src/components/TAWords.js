 import React from 'react';
import { AreaChart, Grid } from 'react-native-svg-charts';
import { Text, View, Dimensions, StyleSheet, SafeAreaView } from 'react-native';
import moment from 'moment';
import { Circle } from 'react-native-svg';
import Tooltip from './Tooltip';

//
// This doesn't work since the server won't return anything with the url
//


class TAWords extends React.PureComponent {
    
  state = {
    data: []
  };

  componentDidMount = () => {
      fetch('http://7bcc159e.ngrok.io/getAnData', { method: 'GET' })
        .then(response => response.json() )
        .then((responseJson) => {
            this.setState({
              data: responseJson
            })
          })
          .catch((error) => {
            console.error(error);
          });
      }


  render(){
      const { data } = this.state;
      //console.log(data);

      const word = data.map((key, index) => (key.word));
      const count = data.map((key, index) => (key.count));

      return(
        <View>
        <FlatList
          data={this.props.feedbacks}
        />
        </View>
      );
      }
    }

export default TAWords; 