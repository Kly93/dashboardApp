import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {VictoryPie, VictoryLabel} from 'victory-native';

class TACatDistr extends React.PureComponent {
  state = {
    data: [],
  };

  componentDidMount = () => {
    fetch('http://7a7333dc.ngrok.io/get/catDistr', {method: 'GET'})
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          data: responseJson,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    const {data} = this.state;

    const feedb = data.map((key, index) => key.feedback);
    const sugg = data.map((key, index) => key.suggestion);
    const bugr = data.map((key, index) => key.bugreport);

    // calculate total count and then percentages
    const max = parseInt(feedb) + parseInt(sugg) + parseInt(bugr);
    const feP = ((parseInt(feedb) / max) * 100).toFixed(1);
    const suP = ((parseInt(sugg) / max) * 100).toFixed(1);
    const buP = ((parseInt(bugr) / max) * 100).toFixed(1);

    return (
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            flexDirection: 'column',
            width: 150,
            height: 400,
            paddingLeft: 10,
            paddingTop: 10,
          }}>
          <View style={styles.boxes}>
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: 'turquoise',
                marginTop: 7,
              }}
            />
            <Text style={styles.text}>Feedback {feP}%</Text>
          </View>
          <View style={styles.boxes}>
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: 'lightgray',
                marginTop: 7,
              }}
            />
            <Text style={styles.text}>Bug report {buP}%</Text>
          </View>
          <View style={styles.boxes}>
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: '#cc99ff',
                marginTop: 7,
              }}
            />
            <Text style={styles.text}>Suggestion {suP}%</Text>
          </View>
        </View>

        <View style={{height: 400, width: 300, marginLeft: -105}}>
          <VictoryPie
            data={[
              {x: ' ', y: feedb[0]},
              {x: ' ', y: bugr[0]},
              {x: ' ', y: sugg[0]},
            ]}
            padAngle={1}
            innerRadius={30}
            labelRadius={100}
            colorScale={['turquoise', 'lightgray', '#cc99ff']}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingLeft: 5,
  },
  boxes: {
    paddingBottom: 10,
    flexDirection: 'row',
    width: 450,
    height: 50,
  },
});

export default TACatDistr;
