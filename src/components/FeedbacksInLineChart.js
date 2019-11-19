import React from 'react'
import { LineChart, Grid, XAxis, YAxis } from 'react-native-svg-charts'
import { View } from 'react-native';
import * as shape from 'd3-shape'
import { Circle, G, Line, Rect, Text } from 'react-native-svg'
import * as scale from 'd3-scale';
import PropTypes from 'prop-types';


class FeedbacksInLineChart extends React.PureComponent {

    static propTypes = {
        feedbacks: PropTypes.array.isRequired,
        month: PropTypes.array.isRequired,
        onListRefresh: PropTypes.bool.isRequired,
        onPullDownRefresh: PropTypes.func.isRequired,
      };

    render() {
        return (
            <View>
                <LineChart
                    style={{ height: 200, marginLeft: 10 }}
                    data={ this.props.feedbacks }
                    yMin={0}
                    svg={{
                        stroke: 'rgb(52, 235, 149)',
                        strokeWidth: 2,
                    }}
                    contentInset={{ top: 20, bottom: 10 }}
                    curve={ shape.curveLinear }
                >
                    <Grid/>             
                </LineChart>
                <XAxis
                style={{ }}
                data={ this.props.months }
                formatLabel={ (value, index) => value }
                xAccessor={({ item, index }) => item}
                scale={scale.scaleBand}
                labelStyle={ { color: 'black' } }/>
                <YAxis
                    data={ this.props.feedbacks }
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

export default FeedbacksInLineChart