import React from 'react';
import { AreaChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';
import { Text, View, Dimensions, StyleSheet, SafeAreaView } from 'react-native';
import moment from 'moment';
import { Circle } from 'react-native-svg';
import Tooltip from './Tooltip';

const { height } = Dimensions.get('window');

class Area extends React.PureComponent {
  state = {
    data:  [],
    tooltipX: null,
    tooltipY: null,
    tooltipIndex: null,
  };

  componentDidMount = () => {
    fetch('http://10.30.0.120:8085/get/feedbacks', { method: 'GET' })
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
    const { data, tooltipX, tooltipY, tooltipIndex } = this.state;
    const months = ["Jan", "Feb"];
    const feedbackAmount = data.map((key, index) => key)
    const contentInset = { left: 10, right: 10, top: 10, bottom: 7 };

    const ChartPoints = ({ x, y, color }) =>
    data.length !== 0 ? (
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
    ) ) ) : (
    <Text>No Data available</Text>
    );

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          {data.length !== 0 ? (
            <AreaChart
              style={{ height: '100%' }}
              data={data}
              yAccessor={({ index }) => index }
              xAccessor={({ item }) => moment(item.time)}
              contentInset={contentInset}
              svg={{ fill: '#003F5A' }}
              numberOfTicks={10}
              yMin={0}
              yMax={50}
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
                There is no data available.
              </Text>
            </View>
          )}
        {data.length !== 0 ? (
            <YAxis
            data={ feedbackAmount }
            yMin={0}
            style={ { position: 'absolute', top: 0, bottom: 0}}
            svg={ {
                fontSize: 8,
                fill: 'black',
                stroke: 'black',
                strokeWidth: 0.5
            } }
            ></YAxis>
        ) : (
          <Text></Text>
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