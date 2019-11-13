import React from 'react';
import { PieChart } from 'react-native-svg-charts';
import { View, Text } from 'react-native';

class Pie extends React.PureComponent {

    state = {
        data: []
    }
    
    componentDidMount = () => {
        fetch('http://e5080d96.ngrok.io/get', { method: 'GET' })
           .then(response => response.json() )
           .then((responseJson) => {
               //console.log(responseJson);
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
    const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)
    const id = data.map((key, value) => (key.id))

    const pieData = id
    .filter((value) => value > 0)
    .map((value, index) => ({
        value,
        svg: {
            fill: randomColor(),
            onPress: () => console.log('press', index),
        },
        key: `pie-${index}`,
    }))

    return(
        <View>
            <PieChart
                style={ { height: 200 } }
                data={ pieData }
                svg={{ fill: randomColor }}>
                    </PieChart>
            <Text
                style={ { fontSize: 25, textAlign: 'center' } }>
                    Ids</Text>
        </View>
    )
}

}

export default Pie;