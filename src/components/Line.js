import React from 'react';
import { LineChart, Grid } from 'react-native-svg-charts';
import { View, Text } from 'react-native';

class Line extends React.PureComponent {

state = {
    data: []
}

componentDidMount = () => {
    fetch('http://10.24.24.28:8080/get', { method: 'GET' })
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
    
    const { data } = this.state
    const smiley = data.map((key, value) => (key.smiley))

    return(
        <View>
            <LineChart
                style={ { height: 200 } }
                data={ smiley }
                svg={{ stroke: 'rgb(134, 65, 244)' }}>
                    <Grid/>
                    </LineChart>
            <Text
                style={ { fontSize: 25, textAlign: 'center' } }>
                    Smileys</Text>
        </View>
    )
}

}

export default Line;