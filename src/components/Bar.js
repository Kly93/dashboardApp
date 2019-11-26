import React from 'react';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryVoronoiContainer, VictoryScatter, VictoryTooltip } from "victory-native";
import { View, Text } from 'react-native';
import * as scale from 'd3-scale';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';


class Bar extends React.PureComponent {

  static propTypes = {
    os: PropTypes.array.isRequired,
    onListRefresh: PropTypes.bool.isRequired,
    onPullDownRefresh: PropTypes.func.isRequired,
  };

   storeData = async () => {
    try {
      await AsyncStorage.setItem('@os', this.state.data)
    } catch (e) {
      console.error(e);
    }
  }

render() {
    const osCount = this.props.os
    const osAndroid = osCount.map( (item, index) => item.android)
    const osIos = osCount.map((item, index) => item.ios)

    return(
      <View>
        {osCount.length !== 0 ? (
        <VictoryChart
        theme={VictoryTheme.material}
        domain={{ x: [0, 3] }}
        
        >
        { osCount.length !== 0 ? (
        <VictoryBar
            labelComponent={<VictoryTooltip/>}
            barWidth={({ index }) => index * 2 + 75}
            style={{
              data: {
                fill: "#c43a31",
                stroke: "#000000",
                fillOpacity: 0.7,
                strokeWidth: 3
              }
            }}
            categories={{
                x: ["Android", "iOS"]
              }}
            data={[
                {x: "Android", y: osAndroid, label: osAndroid},
                {x: "iOS", y: osIos, label: osIos}
              ]}
        />
        ) : (
        <Text> No data to display </Text>
        )}
        </VictoryChart>
        ) :( 
          <Text></Text>
      )}
      </View>
    )
}

}

export default Bar;