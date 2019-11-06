import React from 'react';
import { PieChart } from 'react-native-svg-charts';
import { View} from 'react-native';
import { Text } from 'react-native-svg';
import * as scale from 'd3-scale';

class TACatDistro extends React.PureComponent {

    state = {
        data: []
    };
    
    componentDidMount = () => {
        fetch('http://7bcc159e.ngrok.io/get/catDistr', { method: 'GET' })
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

    render(){
        const { data } = this.state;
        console.log(data);

        const feedb = data.map((key, index) => (key.feedback));
        const sugg = data.map((key, index) => (key.suggestion));
        const bugr = data.map((key, index) => (key.bugreport));
        console.log(feedb);
        console.log(sugg);
        console.log(bugr);

        const pieData = [
            {
                key: 1,
                label: 'Feedback',
                amount: feedb[0],
                svg: { fill: '#600080' },
                arc: { outerRadius: '130%', cornerRadius: 10,  }
            },
            {
                key: 2,
                label: 'Suggestion',
                amount: sugg[0],
                svg: { fill: '#9900cc' }
            },
            {
                key: 3,
                label: 'Bug report',
                amount: bugr[0],
                svg: { fill: '#c61aff' }
            }
        ]
        console.log(pieData);


/*         const Labels = ({ slices, height, width }) => {
            return slices.map((slice, index) => {
                const { labelCentroid, pieCentroid, pieData } = slice;
                return (
                    <Text
                        key={index}
                        x={pieCentroid[ 0 ]}
                        y={pieCentroid[ 1 ]}
                        fill={'white'}
                        textAnchor={'middle'}
                        alignmentBaseline={'middle'}
                        fontSize={24}
                        stroke={'black'}
                        strokeWidth={0.2}
                    >
                        {pieData.label}
                    </Text>
                )
            })
        } */

        const CUT_OFF = 20
        const Labels = ({ x, y, bandwidth, pieData }) => (
            pieData.map((value, index) => (
                <Text
                    key={ amount }
                    x={ x(index) + (bandwidth / 2) }
                    y={ value < CUT_OFF ? y(value) - 10 : y(value) + 15 }
                    fontSize={ 14 }
                    fill={ value >= CUT_OFF ? 'white' : 'black' }
                    alignmentBaseline={ 'middle' }
                    textAnchor={ 'middle' }
                >
                    {value}
                </Text>
            ))
        )

        console.log(Labels);

        

        return(
            <View style={{height: 500, width: 385}}>
                <PieChart
                    style={{ height: 200 }}
                    valueAccessor={({ item }) => item.value}
                    outerRadius={'70%'}
                    innerRadius={10}
                    data={pieData}
                    labelRadius={50}
                    //valueAccessor={({ item, index }) => item}
                    >

                </PieChart>
            </View>

        )
    }
}

export default TACatDistro;