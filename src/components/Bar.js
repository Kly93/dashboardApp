import React from 'react';
import {Grid, BarChart, XAxis, YAxis} from 'react-native-svg-charts';
import {View, Text} from 'react-native';
import * as scale from 'd3-scale';

class Bar extends React.PureComponent {
  state = {
    data: [],
  };

  componentDidMount = () => {
    fetch('http://7cf324aa.ngrok.io/get/os2/Android+iOS', {method: 'GET'})
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          data: responseJson,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    const {data} = this.state;
    const os = data.map((key, index) => key.os);
    const count = data.map((key, index) => key.count);

    const Labels = ({data}) =>
      data.map((value, index) => (
        <Text
          key={index}
          x={value}
          y={value}
          fontSize={20}
          fill={'white'}
          alignmentBaseline={'middle'}
          textAnchor={'middle'}>
          {value}
        </Text>
      ));

    return (
      <View>
        <BarChart
          yMin={0}
          style={{height: 200, min: 0, marginLeft: 5}}
          data={count}
          svg={{fill: 'rgb(134, 65, 244)'}}>
          <Grid />
        </BarChart>
        <XAxis
          style={{marginTop: 10}}
          data={os}
          scale={scale.scaleBand}
          xAccessor={({item, index}) => item}
          formatLabel={(value, index) => value}
          labelStyle={{color: 'black'}}
        />
        <YAxis
          data={count}
          yMin={0}
          style={{position: 'absolute', top: 0, bottom: 20}}
          contentInset={{top: 10, bottom: 10}}
          svg={{
            fontSize: 8,
            fill: 'black',
            stroke: 'black',
            strokeWidth: 0.5,
          }}></YAxis>
      </View>
    );
  }
}

export default Bar;