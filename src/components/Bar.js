import React from 'react';
import { Text, BarChart, XAxis } from 'react-native-svg-charts';
import { View } from 'react-native';
import * as scale from 'd3-scale';

class Bar extends React.PureComponent {

state = {
    data: []
};

componentDidMount = () => {
  fetch('http://100.71.8.76:8085/get', { method: 'GET' })
     .then(response => response.json() )
     .then((responseJson) => {
         console.log(responseJson);
         this.setState({
          data: responseJson
         })
      })
      .catch((error) => {
         console.error(error);
      });
   }

render() {
    const { data } = this.state
    const osString = data.map((key, index) => (key.os))
    const osCount = osString.map((key, index) => (key.length))

    return(
        <View>
           <BarChart
                    style={{ flex: 1 }}
                    data={ osCount }
                    gridMin={0}
                    svg={{ fill: 'rgb(134, 65, 244)' }}>
            </BarChart>
            <XAxis
            style={{ marginTop: 10 }}
            data={ osString }
            scale={scale.scaleBand}
            xAccessor={({ item, index }) => item}
            formatLabel={ (value, index) => value }
            labelStyle={ { color: 'black' } }>
            </XAxis>
        </View>
    )
}

}

export default Bar;