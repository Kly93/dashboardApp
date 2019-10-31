import React from 'react';
import { Text } from 'react-native';

class Sample extends React.PureComponent {

    state = {
        data: [] 
      };

      componentDidMount = () => {
        fetch('http://100.71.8.76:8085/get', { method: 'GET' })
           .then(response => response.json() )
           .then((responseJson) => {
               console.log(responseJson);
               this.setState({
                data: responseJson
               })
            })
            .catch((error) => {
               console.error(error);
            });
         }

    render() {
        const { data } = this.state;
        const foo = data.map((key, value) => key.feedback)
    
    return (
        <Text>{foo}</Text>
    );
    }
}

export default Sample;