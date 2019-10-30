import React from 'react';
import { BarChart, XAxis } from 'react-native-svg-charts';
import { View } from 'react-native';
import * as scale from 'd3-scale';
import ajax from '../../ajax';

class Bar extends React.PureComponent {

state = {
    android: { android: [] },
    ios : { ios: [] }
};

async componentDidMount() {
    const android = ajax.getAllOSAndroid();
    this.setState({android : android});
  }

  async componentDidMount() {
    const ios = ajax.getAllOSiOS();
    this.setState({ios : ios});
  }

render() {
    osCount = []
    const { ios } = this.state
    const osIos = ios.map((key, index) => (key.ios))
    osCount.push(osIos)

    const { android } = this.state
    const osAndroid = android.map((key, index) => (key.android))
    osCount.push(osAndroid)

    const os = ["Android", "iOS"];

    return(
        <View style={{ height: 200, padding: 20 }}>
           <BarChart
                    style={{ flex: 1 }}
                    data={osCount}
                    gridMin={0}
                    svg={{ fill: 'rgb(134, 65, 244)' }}
                    />
            <XAxis
                    style={{ marginTop: 10 }}
                    data={ os }
                    scale={scale.scaleBand}
                    xAccessor={({ item, index }) => item}
                    formatLabel={ (value, index) => value }
                    labelStyle={ { color: 'black' } }
                    />
        </View>
    )
}

}

export default Bar;