import React, {Component} from 'react';
import {View, ActivityIndicator, StyleSheet, BackHandler} from 'react-native';
import ajax from '../ajax';
import FeedbackList from '../src/components/FeedbackList';
import FeedbackDetail from '../src/components/FeedbackDetail';

export default class FeedbackList_Activity extends React.Component {
  static navigationOptions = {
    title: 'Feedback results',
  };

  state = {
    feedbacks: [],
    currentFeedbackId: null,
    loading: false,
    page: 1,
    refreshing: false,
  };

  setCurrentFeedback = feadbackId => {
    this.setState({
      currentFeedbackId: feadbackId,
    });
  };

  currentFeedback = () => {
    return this.state.feedbacks.find(
      feedback => feedback.id === this.state.currentFeedbackId,
    );
  };

  unsetCurrentFeedback = () => {
    this.setState({
      currentFeedbackId: null,
    });
    return true;
  };

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true,
      },
      function() {
        this.state.feedbacks;
      },
    );
  };

  async componentDidMount() {
    const feedbacks = await ajax.getAllFeedbacks();
    console.log(feedbacks);
    this.setState({feedbacks});
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.unsetCurrentFeedback,
    );
  }

  render() {
    if (this.state.currentFeedbackId) {
      return (
        <View>
          <FeedbackDetail initialFeedbackData={this.currentFeedback()} />
        </View>
      );
    }
    const feedbacksToDisplay = this.state.feedbacks;
    if (feedbacksToDisplay.length > 0) {
      return (
        <View style={styles.mainContainer}>
          <FeedbackList
            feedbacks={feedbacksToDisplay}
            onItemPress={this.setCurrentFeedback}
            onListRefresh={this.state.refreshing}
            onPullDownRefresh={this.handleRefresh}
          />
        </View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#f8f9fa',
    padding: 10,
    height: '100%',
  },
});
