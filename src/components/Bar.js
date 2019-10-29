import React from 'react';
import { BarChart, XAxis } from 'react-native-svg-charts';
import { View } from 'react-native';
import * as scale from 'd3-scale'

class Bar extends React.PureComponent {

state = {
    countsOs: []
};

async componentDidMount() {
    const android = await ajax.getAllOsAndroid();
    console.log(android);
    this.setState({countsOs : android});
  }


  async componentDidMount() {
    const ios = await ajax.getAllOsIos();
    console.log(ios);
    this.setState({countsOs : ios});
  }


render() {
    // Count the amount of OS and display it
    const { countsOs } = this.state;

    //const osString = countsOs.map((key, index) => (key.os))
    //const osCount = osString.map((key, index) => (key.length))

    return(
        <View style={{ height: 200, padding: 20 }}>
           <BarChart
                    style={{ flex: 1 }}
                    data={countsOs}
                    gridMin={0}
                    svg={{ fill: 'rgb(134, 65, 244)' }}
                    />
            <XAxis
                    style={{ marginTop: 10 }}
                    data={ countsOs }
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