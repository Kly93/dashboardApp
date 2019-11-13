import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';
import PropTypes from 'prop-types';

class FeedbackItem extends React.Component {
  static propTypes = {
    feedback: PropTypes.object.isRequired,
  };

  onPressItem = (item) => {
    const email = item.email;
    //console.log("onPress email with item: " + item.email);
    this.props.navigation.navigate('Detail', {item: item})
  }
  
  render() {
    const {feedback} = this.props;
    //console.log(feedback);
    return (
      <View>
        <ListItem
          key={feedback.id}
          title={feedback.feedback}
          topDivider
          rightSubtitle={feedback.time}
          subtitleStyle={{fontSize: 8}}
          titleStyle={{fontWeight: 'bold'}}
          onPress={() => this.onPressItem(feedback.id)}
        />
      </View>
    );

    

  }
}

export default FeedbackItem;
