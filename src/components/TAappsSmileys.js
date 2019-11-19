import React from 'react';
import {BarChart, XAxis, YAxis, Grid} from 'react-native-svg-charts';
import {View} from 'react-native';
import {Text} from 'react-native-svg';
import * as scale from 'd3-scale';

class TAappSmileys extends React.PureComponent {
  state = {
    data: [],
  };

  componentDidMount = () => {
    fetch('http://7cf324aa.ngrok.io/getAvgPerApp', {method: 'GET'})
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
    const app = data.map((key, index) => key.app);
    const avg = data.map((key, index) => key.avg);
    const yax = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    for (let i = 0; i < app.length; i++) {
      if (app[i] == '') {
        app[i] = '(No app)';
      }
    }

    const CUT_OFF = 20;
    const Labels = ({x, y, bandwidth, data}) =>
      data.map((value, index) => (
        <Text
          key={avg}
          x={x(index) + bandwidth / 2}
          y={value < CUT_OFF ? y(value) - 10 : y(value) + 15}
          fontSize={14}
          fill={value >= CUT_OFF ? 'white' : 'black'}
          alignmentBaseline={'middle'}
          textAnchor={'middle'}>
          {(value / 100).toFixed(2)}
        </Text>
      ));

    return (
      <View style={{flex: 1}}>
        <View
          style={{
            height: 250,
            width: 385,
            paddingLeft: 10,
            flexDirection: 'row',
          }}>
          <YAxis
            data={yax}
            style={{
              backgroundColor: 'turquoise',
              width: 25,
              paddingHorizontal: 5,
            }}
            svg={{fontSize: 9, fill: 'black'}}
            contentInset={{top: 22, bottom: 22}}
            formatLabel={(value, index) => value}
            numberOfTicks={10}
            yAccessor={({item, index}) => item}
            yMax={11}
          />

          <BarChart
            style={{width: 360}}
            data={avg}
            yMin={0}
            gridMin={0}
            gridMax={1100}
            //showGrid={true}
            svg={{fill: 'rgb(134, 65, 244)'}}>
            <Grid />
            <Labels />
          </BarChart>
        </View>

        <View style={{height: 90, width: 385, marginLeft: 25, marginTop: 10}}>
          <XAxis
            style={{height: 90, width: 360, alignSelf: 'flex-end'}}
            data={app}
            scale={scale.scaleBand}
            xAccessor={({item, index}) => item}
            formatLabel={(value, index) => value}
            labelStyle={{color: 'black'}}
            svg={{rotation: 70, originY: 28, y: 30}}
          />
        </View>
      </View>
    );
  }
}

export default TAappSmileys;