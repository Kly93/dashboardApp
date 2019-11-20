import React from 'react'
import { LineChart, Grid, XAxis, YAxis } from 'react-native-svg-charts'
import { View } from 'react-native';
import * as shape from 'd3-shape'
import { G, Circle, Line, Rect, Text } from 'react-native-svg'
import * as scale from 'd3-scale';
import PropTypes from 'prop-types';
import Tooltip from './Tooltip';

class FeedbacksInLineChart extends React.PureComponent {

    static propTypes = {
        feedbacksPerYear: PropTypes.array.isRequired,
        months: PropTypes.array.isRequired,
        tooltipX: PropTypes.object.isRequired,
        tooltipY: PropTypes.object.isRequired,
        tooltipIndex: PropTypes.object.isRequired,
        onListRefresh: PropTypes.bool.isRequired,
        onPullDownRefresh: PropTypes.func.isRequired,
      };

    render() {
        const {feedbacksPerYear, tooltipX, tooltipY, tooltipIndex} = this.props;

        const ChartPoints = ({ x, y }) => (
            feedbacksPerYear.map((item, index) =>
            <G x={ 75 / 2 }>
            <Circle
                cy={ y(feedbacksPerYear[ 5 ]) }
                r={ 6 }
                stroke={ 'rgb(134, 65, 244)' }
                strokeWidth={ 2 }
                fill={ 'white' }
                onPress={() =>
                    this.setState({
                      tooltipX: this.props.month,
                      tooltipY: item,
                      tooltipIndex: index,
                    }),
                    console.log('tooltip clicked')
                  }
            />
            </G>
            ));
            

        return (
            <View>
                <LineChart
                    style={{ height: 200, marginLeft: 10 }}
                    data={ this.props.feedbacksPerYear }
                    yMin={0}
                    svg={{
                        stroke: 'rgb(52, 235, 149)',
                        strokeWidth: 2,
                    }}
                    contentInset={{ top: 20, bottom: 10 }}
                    curve={ shape.curveLinear }>
                    <Grid/>     
                    <ChartPoints color="#003F5A"/> 
                    <Tooltip
                        tooltipX={tooltipX}
                        tooltipY={tooltipY}
                        color="#003F5A"
                        index={tooltipIndex}
                        dataLength={feedbacksPerYear.length}
                    />       
                </LineChart>
                <XAxis
                style={{ }}
                data={ this.props.months }
                formatLabel={ (value, index) => value }
                xAccessor={({ item, index }) => item}
                scale={scale.scaleBand}
                labelStyle={ { color: 'black' } }/>
                <YAxis
                    data={ this.props.feedbacksPerYear }
                    yMin={0}
                    style={ { position: 'absolute', top: 0, bottom: 0, marginBottom: 20 }}
                    contentInset={ { top: 10, bottom: 10 } }
                    svg={ {
                        fontSize: 8,
                        fill: 'black',
                        stroke: 'black',
                        strokeWidth: 0.5
                    } }
            ></YAxis>
             </View>
        )
    }

}

export default FeedbacksInLineChart;