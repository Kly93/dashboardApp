import React, { Component } from "react";
import { VictoryLine, VictoryChart, VictoryTheme } from "victory-native";
import { PropTypes } from 'prop-types';

class LineChart extends React.PureComponent {

static propTypes = {
    feedbacksPerMonth: PropTypes.object.isRequired,
    feedbacksPerYear: PropTypes.array.isRequired,
};

render() {
    const feedbacksCount = this.props.feedbacksPerYear;
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dataToDisplayArray= []
    const dataToDisplayJan = { x: month[0], y: feedbacksCount[0] }
    const dataToDisplayFeb = { x: month[1], y: feedbacksCount[1] }
    const dataToDisplayMar = { x: month[2], y: feedbacksCount[2] }
    const dataToDisplayApr = { x: month[3], y: feedbacksCount[3] }
    const dataToDisplayMay = { x: month[4], y: feedbacksCount[4] }
    const dataToDisplayJun = { x: month[5], y: feedbacksCount[5] }
    const dataToDisplayJul = { x: month[6], y: feedbacksCount[6] }
    const dataToDisplayAug = { x: month[7], y: feedbacksCount[7] }
    const dataToDisplaySep = { x: month[8], y: feedbacksCount[8] }
    const dataToDisplayOct = { x: month[9], y: feedbacksCount[9] }
    const dataToDisplayNov = { x: month[10], y: feedbacksCount[10] }
    const dataToDisplayDec = { x: month[11], y: feedbacksCount[11] }

    dataToDisplayArray.push(dataToDisplayJan)
    dataToDisplayArray.push(dataToDisplayFeb)
    dataToDisplayArray.push(dataToDisplayMar)
    dataToDisplayArray.push(dataToDisplayApr)
    dataToDisplayArray.push(dataToDisplayMay)
    dataToDisplayArray.push(dataToDisplayJun)
    dataToDisplayArray.push(dataToDisplayJul)
    dataToDisplayArray.push(dataToDisplayAug)
    dataToDisplayArray.push(dataToDisplaySep)
    dataToDisplayArray.push(dataToDisplayOct)
    dataToDisplayArray.push(dataToDisplayNov)
    dataToDisplayArray.push(dataToDisplayDec)
    console.log(dataToDisplayArray)
    return(
        <VictoryChart
        theme={VictoryTheme.material}
        >
        <VictoryLine
            style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc"}
            }}
            categories={{
                x: ["Jan", "Feb", "Mar", "Apr", "May"]
              }}
            data={dataToDisplayArray}
        />
            </VictoryChart>
            );
    }
}

export default LineChart;