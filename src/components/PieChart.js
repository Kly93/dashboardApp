import React from 'react';
import { VictoryPie, VictoryChart, VictoryTheme } from "victory-native";
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Svg from 'react-native-svg';

class PieChart extends React.PureComponent {

    static propTypes = {
        smileys: PropTypes.array.isRequired,
        onListRefresh: PropTypes.bool.isRequired,
        onPullDownRefresh: PropTypes.func.isRequired,
      };

render() {
    const smileys = this.props.smileys;
    const smileyRangeCount = smileys.map((item, index) => item.SmileyRange)

    return(
        <Svg width={400} height={400} viewBox="0 0 400 400" style={{ width: "100%", height: "auto" }}>            
            {smileys.length !== 0 ? (      
                <VictoryPie 
                standalone={false}
                events={[{
                    target: "data",
                    eventHandlers: {
                      onPress: () => {
                        return [
                          {
                            target: "data",
                            mutation: ({ style }) => {
                              return style.fill === "#c43a31" ? null : { style: { fill: "#c43a31" } };
                            }
                          }, {
                            target: "labels",
                            mutation: ({ text }) => {
                              return text === "clicked" ? null : { text: "clicked" };
                            }
                          }
                        ];
                      }
                    }
                  }]}
                style={{
                    data: {
                      stroke: "black",
                      opacity: ({ datum }) => (datum.y > 75 ? 1 : 0.4)
                    }
                  }}
                innerRadius={({ datum }) => datum.y }
                data={[
                    {x: "1", y: smileyRangeCount[0], labels: "Smiley Range 1" },
                    {x: "2", y: smileyRangeCount[1], labels: "Smiley Range 2"},
                    {x: "3", y: smileyRangeCount[2], labels: "Smiley Range 3"},
                    {x: "4", y: smileyRangeCount[3], labels: "Smiley Range 4"},
                    {x: "5", y: smileyRangeCount[4], labels: "Smiley Range 5"},
                    {x: "6", y: smileyRangeCount[5], labels: "Smiley Range 6"},
                    {x: "7", y: smileyRangeCount[6], labels: "Smiley Range 7"},
                    {x: "8", y: smileyRangeCount[7], labels: "Smiley Range 8"},
                    {x: "9", y: smileyRangeCount[8], labels: "Smiley Range 9"},
                    {x: "10", y: smileyRangeCount[9], labels: "Smiley Range 10"}
                ]}
                colorScale={[
                    "#D85F49",
                    "#F66D3B",
                    "#D92E1D",
                    "#D73C4C",
                    "#FFAF59",
                    "#E28300",
                    "#F6A57F"
                  ]}
                />
            ) : (
                <Text>No data available</Text>
            )}
        </Svg>
    )
}

}

export default PieChart;