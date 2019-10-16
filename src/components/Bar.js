import React from 'react';
import { BarChart, Grid, XAxis } from 'react-native-svg-charts';
import { View } from 'react-native';
import * as scale from 'd3-scale'

class Bar extends React.PureComponent {

state = {
    countsOs: [],
};

componentDidMount = () => {
    fetch('http://9e9aada3.ngrok.io/get', { method: 'GET' })
       .then(response => response.json() )
       .then((responseJson) => {
           console.log(responseJson);
           this.setState({
            countsOs: responseJson
           })
        })
        .catch((error) => {
           console.error(error);
        });
     }

render() {
    // Count the amount of OS and display it
    const { countsOs } = this.state;
    const osString = countsOs.map((key, index) => (key.os))
    const osCount = osString.map((key, index) => (key.length))

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
                    data={ osString }
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