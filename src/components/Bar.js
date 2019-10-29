import React from 'react';
import { BarChart, XAxis } from 'react-native-svg-charts';
import { View } from 'react-native';
import * as scale from 'd3-scale';
import ajax from '../../ajax';

class Bar extends React.PureComponent {

state = {
    data: []
};

async componentDidMount() {
    const android = await ajax.getAllFeedbacks();
    console.log(android);
    this.setState({data : android});
  }

render() {
    // Count the amount of OS and display it
    const { data } = this.state;
    console.log(data);
    const osString = data.map((key, index) => (key.os))
    const osCount = osString.map((key, index) => (key.length))
    const os = ["Android", "iOS"];

    return(
        <View style={{ height: 200, padding: 20 }}>
           <BarChart
                    style={{ flex: 1 }}
                    data={osCount}
                    gridMin={0}
                    svg={{ fill: 'rgb(134, 65, 244)' }}
                    />
            <XAxis
                    style={{ marginTop: 10 }}
                    data={ os }
                    scale={scale.scaleBand}
                    xAccessor={({ item, index }) => item}
                    formatLabel={ (value, index) => value }
                    labelStyle={ { color: 'black' } }
                    />
        </View>
    )
}

}

export default Bar;