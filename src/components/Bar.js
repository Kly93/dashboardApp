import React from 'react';
import { BarChart, Grid, XAxis } from 'react-native-svg-charts';
import { View } from 'react-native';
import * as scale from 'd3-scale'

class Bar extends React.PureComponent {

state = {
    countsOs: [],
};

componentDidMount = () => {
    const count = []
    fetch('http://9e9aada3.ngrok.io/get', { method: 'GET' })
       .then(response => response.json() )
       .then(foo => count.push(foo.ios))
       .then(foo2 => count.push(foo2.android))
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
    const smiley = countsOs.map((key, value) => (key.os))
    const data = [ 14, 80 ] 

    return(
        <View style={{ height: 200, padding: 20 }}>
           <BarChart
                    style={{ flex: 1 }}
                    data={data.os}
                    gridMin={0}
                    svg={{ fill: 'rgb(134, 65, 244)' }}
                    />
            <XAxis
                    style={{ marginTop: 10 }}
                    data={ data.os }
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