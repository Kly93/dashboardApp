import React from 'react';
import { VictoryPie, VictoryChart, VictoryTheme } from "victory-native";
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

class PieChart extends React.PureComponent {

    static propTypes = {
        smileys: PropTypes.array.isRequired,
        onListRefresh: PropTypes.bool.isRequired,
        onPullDownRefresh: PropTypes.func.isRequired,
      };

render() {
    const smileys = this.props.smileys;
    console.log(smileys)
    const smileyRangeCount = smileys.map((item, index) => item.SmileyRange)

    return(
        <View>
            {smileys.length !== 0 ? (
            <VictoryChart
            theme={VictoryTheme.material}
            >
               
                <VictoryPie
                innerRadius={({ datum }) => datum.y * 20}
                data={[
                    {x: "Smiley Range 1", y: 25},
                    {x: "Smiley Range 2", y: 78},
                    {x: "Smiley Range 3", y: 96},
                    {x: "Smiley Range 4", y: 34},
                    {x: "Smiley Range 5", y: 98},
                ]}
                />
              
            </VictoryChart>
            ) : (
                <Text>No data available</Text>
            )}
        </View>
    )
}

}

export default PieChart;