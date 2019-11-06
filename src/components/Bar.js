import React from 'react';
import { Grid, BarChart, XAxis, YAxis } from 'react-native-svg-charts';
import { View, Text } from 'react-native';
import * as scale from 'd3-scale';

class Bar extends React.PureComponent {

state = {
    data: []
};

componentDidMount = () => {
  fetch('http://7bcc159e.ngrok.io/get/os2/android+ios', { method: 'GET' })
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

render() {
    const osCount = []
    const { data } = this.state
    const osString = ["Android", "iOS"]
    const osCountAndroid = data.map((key, index) => key.android)
    const osCountiOS = data.map((key, index) => key.ios)
    osCount.push(osCountAndroid[0])
    osCount.push(osCountiOS[0])

    const CUT_OFF = 20
    const Labels = ({ x, y, bandwidth, data }) => (
        data.map((value, index) => (
            <Text
                key={ index }
                x={ x(index) + (bandwidth / 2) }
                y={ value < CUT_OFF ? y(value) - 10 : y(value) + 15 }
                fontSize={ 14 }
                fill={ value >= CUT_OFF ? 'white' : 'black' }
                alignmentBaseline={ 'middle' }
                textAnchor={ 'middle' }
            >
                {value}
            </Text>
        ))
    )

    return(
        <View >
          <BarChart
                yMin={0}
                style={{ height: 200, min: 0, marginLeft: 5 }}
                data={ osCount }
                svg={{ fill: 'rgb(134, 65, 244)' }}
                gridMin={0}
                >
            <Grid/>
            </BarChart>
            <XAxis
            style={{ marginTop: 10 }}
            data={ osString }
            scale={scale.scaleBand}
            xAccessor={({ item, index }) => item }
            formatLabel={ (value, index) => value }
            labelStyle={ { color: 'black' } }/>
            <YAxis
            style={{ marginBottom: 50 }}
            data={ osCount }
            yMin={0}
            style={ { position: 'absolute', top: 0, bottom: 20}}
            contentInset={ { top: 10, bottom: 10 } }
            svg={ {
                fontSize: 8,
                fill: 'black',
                stroke: 'black',
                strokeWidth: 0.5
            } }
            ></YAxis>
        </View>
    )
}

}

export default Bar;