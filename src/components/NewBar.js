import React from 'react';
import {BarChart, XAxis, YAxis, Grid} from 'react-native-svg-charts';
import {View} from 'react-native';
import {Text} from 'react-native-svg';
import * as scale from 'd3-scale';

class NewBar extends React.PureComponent {
  state = {
    data: [],
  };

  componentDidMount = () => {
    fetch('http://7cf324aa.ngrok.io/get/osdist', {method: 'GET'})
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
    
    //const yax = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

    let maxY = 0;

    for (let i = 0; i < count.length; i++){
        if (count[i] > maxY){
            maxY = count[i];
        }
    }

    //round to next ten
    maxY = Math.ceil((maxY+1)/10)*10;

    const CUT_OFF = 20;
    const Labels = ({x, y, bandwidth, data}) =>
      data.map((value, index) => (
        <Text
          key={count}
          x={x(index) + bandwidth / 2}
          y={value < CUT_OFF ? y(value) - 10 : y(value) + 15}
          fontSize={14}
          fill={value >= CUT_OFF ? 'white' : 'black'}
          alignmentBaseline={'middle'}
          textAnchor={'middle'}>
          {value}
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
            data={count}
            style={{
              backgroundColor: 'turquoise',
              width: 25,
              paddingHorizontal: 5,
            }}
            //yMin={0}
            contentInset={{top: 20, bottom: 20}}
            svg={{fontSize: 9, fill: 'black'}}
            formatLabel={(value, index) => value}
            numberOfTicks={5}
        
            yAccessor={({item, index}) => item}
          />

          <BarChart
            style={{width: 360}}
            data={count}
            //yMin={0}
            yMax={maxY}
            //gridMin={0}
            gridMax={10}
            //showGrid={true}
            contentInset={{top: 20, bottom: 20}}

            svg={{fill: 'rgb(134, 65, 244)'}}>
            <Grid />
            <Labels />
          </BarChart>
        </View>

        <View style={{height: 90, width: 385, marginTop: 10}}>
          <XAxis
            style={{height: 90, width: 360, alignSelf: 'flex-end'}}
            data={os}
            scale={scale.scaleBand}
            xAccessor={({item, index}) => item}
            formatLabel={(value, index) => value}
            labelStyle={{color: 'black'}}
          />
        </View>
      </View>
    );
  }
}

export default NewBar;