import React from 'react';
import { View, StyleSheet} from 'react-native';
import { VictoryPie, VictoryLabel } from 'victory-native';
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
                        { x: "Feedback:\n"+feedb[0], y: feedb[0] },
                        { x: "Bug report:\n"+bugr[0], y: bugr[0] },
                        { x: "Suggestion:\n"+sugg[0], y: sugg[0] },
                    ]}
                    style={{labels: {
                        fontSize: 16, fontWeight: "bold"}}
                    }
                    padAngle={1}
                    innerRadius={30}
                    labelRadius={80}
                    colorScale={["turquoise", "lightgray", "lavender"]}
                />
                    {/* ({ innerRadius }) => innerRadius + 110  */}
            </View>
      )
    }
  }
   
export default TACatDistr;