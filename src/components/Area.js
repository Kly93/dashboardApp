import React from 'react';
import { AreaChart, Grid } from 'react-native-svg-charts';
import { Text, View, Dimensions, StyleSheet, SafeAreaView } from 'react-native';
import moment from 'moment';
import { Circle } from 'react-native-svg';
import Tooltip from './Tooltip';

const { height } = Dimensions.get('window');

class Area extends React.PureComponent {
  state = {
    data: [],
    tooltipX: null,
    tooltipY: null,
    tooltipIndex: null,
  };

  componentDidMount = () => {
      // Replace with prod URL 
         fetch('http://9e9aada3.ngrok.io/get', { method: 'GET' })
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

    const { data, tooltipX, tooltipY, tooltipIndex } = this.state;
    const contentInset = { left: 10, right: 10, top: 10, bottom: 7 };

    const ChartPoints = ({ x, y, color }) =>
    data.map((item, index) => (
        <Circle
          key={index}
          cx={x(moment(item.time))}
          cy={y(index)}
          r={6}
          stroke={color}
          fill="white"
          onPress={() =>
            this.setState({
              tooltipX: moment(item.time),
              tooltipY: index,
              tooltipIndex: index,
            })
            }
        />
      ));

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          {data.length !== 0 ? (
            <AreaChart
              style={{ height: '70%' }}
              data={data}
              yAccessor={({ index }) => index }
              xAccessor={({ item }) => moment(item.time)}
              contentInset={contentInset}
              svg={{ fill: '#003F5A' }}
              numberOfTicks={10}
              yMin={0}
              yMax={70}
            >
              <Grid svg={{ stroke: 'rgba(151, 151, 151, 0.09)' }} belowChart={false} />
              <ChartPoints color="#003F5A" />
              <Tooltip
                tooltipX={tooltipX}
                tooltipY={tooltipY}
                color="#003F5A"
                index={tooltipIndex}
                dataLength={data.length}
              />
            </AreaChart>
          ) : (
            <View
              style={{
                height: '50%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: '#ccc',
                }}
              >
                There are no responses for this month.
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: height / 2,
    flex: 1,
  },
  heading: {
    fontSize: 25,
    textAlign: 'center',
  },
});

export default Area;