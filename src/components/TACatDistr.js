import Pie from "react-native-pie";

import React from 'react';
import { PieChart } from 'react-native-svg-charts';
import { View, StyleSheet} from 'react-native';
import { VictoryPie } from 'victory-native';
import { Text } from 'react-native-svg';
import * as scale from 'd3-scale';

class TACatDistr extends React.PureComponent {

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


        return (

            <View style={{height: 400, width: 300}}>
                <VictoryPie
                    data={[
                        { x: "Feedback", y: feedb[0] },
                        { x: "Suggestion", y: sugg[0] },
                        { x: "Bug report", y: bugr[0] }
                    ]}
                    style={{labels: {
                        fontSize: 16, fontWeight: "bold"}}
                    }
                    labelRadius={({ innerRadius }) => innerRadius + 110 }
                    labels={({ datum }) => `${datum.x}:\n ${datum.y}`}
                    colorScale={["turquoise", "lavender", "gray"]}
                />

            </View>
      )
    }
  }
   
export default TACatDistr;