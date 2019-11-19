import React from 'react';
import {LineChart, Grid, XAxis, YAxis} from 'react-native-svg-charts';
import {View} from 'react-native';
import * as shape from 'd3-shape';
import {Circle, G, Line, Rect, Text} from 'react-native-svg';
import * as scale from 'd3-scale';

class FeedbacksInLineChart extends React.PureComponent {
  state = {
    data: [],
  };

  componentDidMount = () => {
    fetch('http://7cf324aa.ngrok.io/get/feedbacks', {method: 'GET'})
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
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const Tooltip = ({x, y}) => (
      <G
        x={x(5) - 75 / 2}
        key={'tooltip'}
        onPress={() => console.log('tooltip clicked')}>
        <G y={50}>
          <Rect
            height={40}
            width={75}
            stroke={'grey'}
            fill={'white'}
            ry={10}
            rx={10}
          />
          <Text
            x={75 / 2}
            dy={20}
            alignmentBaseline={'middle'}
            textAnchor={'middle'}
            stroke={'rgb(52, 235, 149)'}>
            {`${data[5]}`}
          </Text>
        </G>
        <G x={75 / 2}>
          <Line y1={50 + 40} y2={y(data[5])} stroke={'grey'} strokeWidth={2} />
          <Circle
            cy={y(data[5])}
            r={6}
            stroke={'rgb(52, 235, 149)'}
            strokeWidth={2}
            fill={'white'}
          />
        </G>
      </G>
    );

    return (
      <View>
        <LineChart
          style={{height: 200, marginLeft: 10}}
          data={data}
          yMin={0}
          svg={{
            stroke: 'rgb(52, 235, 149)',
            strokeWidth: 2,
          }}
          contentInset={{top: 20, bottom: 10}}
          curve={shape.curveLinear}>
          <Grid />
          <Tooltip />
        </LineChart>
        <XAxis
          style={{}}
          data={months}
          formatLabel={(value, index) => value}
          xAccessor={({item, index}) => item}
          scale={scale.scaleBand}
          labelStyle={{color: 'black'}}
        />
        <YAxis
          data={data}
          yMin={0}
          style={{position: 'absolute', top: 0, bottom: 0, marginBottom: 20}}
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

export default FeedbacksInLineChart;