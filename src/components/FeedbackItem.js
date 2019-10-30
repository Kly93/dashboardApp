import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {DataTable} from 'react-native-paper';

class FeedbackItem extends React.Component {
  static propTypes = {
    feedback: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired,
  };

  handlePress = () => {
    this.props.onPress(this.props.feedback.id);
  };

  checkOs = osText => {
    var text = osText;
    if (text.toLowerCase().indexOf('os') >= 0) {
      return (
        <Image
          source={require('../../assets/ios-icon.png')}
          style={styles.osLogo}
        />
      );
    } else if (text.toLowerCase().indexOf('android') >= 0) {
      return (
        <Image
          source={require('../../assets/android-icon.png')}
          style={styles.osLogo}
        />
      );
    }
  };

  showOnlyDate = date => {
    var text = date;
    var index = text.substr(11);

    return <Text>{index}</Text>;
  };

  render() {
    const {feedback} = this.props;
    console.log(feedback);
    return (
      <View style={styles.container}>
        <DataTable>
          <TouchableOpacity onPress={this.handlePress}>
            <DataTable.Row>
              <DataTable.Cell style={{paddingBottom: 20}}>
                {this.checkOs(feedback.os)}
              </DataTable.Cell>
              <DataTable.Cell>{feedback.feedback}</DataTable.Cell>
              <DataTable.Cell>
                {this.showOnlyDate(feedback.time)}
              </DataTable.Cell>
            </DataTable.Row>
          </TouchableOpacity>
        </DataTable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  osLogo: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },
});

export default FeedbackItem;
