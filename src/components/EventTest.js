import React from 'react';
import { VictoryBar } from "victory-native";
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

class EventTest extends React.PureComponent {


render() {
  
return(
    <View>
        <VictoryBar
            data={[
            {x: 1, y: 2, label: "A"},
            {x: 2, y: 4, label: "B"},
            {x: 3, y: 7, label: "C"},
            {x: 4, y: 3, label: "D"},
            {x: 5, y: 5, label: "E"},
            ]}
            events={[
            {
                target: "data",
                eventHandlers: {
                onClick: () => {
                    return [{
                    target: "labels",
                    mutation: (props) => {
                        return props.text === "clicked" ?
                        null : { text: "clicked" }
                    }
                    }];
                }
                }
            }
            ]}
        />
  </View>
    )
}
}

export default EventTest;