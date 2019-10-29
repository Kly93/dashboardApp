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

  _getFeedbackData = async () => {
    const _feedbacks = await ajax.getAllFeedbacks();
    this.setState({feedbacks: _feedbacks});
  };

  handleRefresh = () => {
    this.setState({refreshing: true});
    this._getFeedbackData().then(() => {
      this.setState({refreshing: false});
    });
  };

  componentDidMount() {
    this._getFeedbackData();
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
            onPullDownRefresh={this.handleRefresh.bind(this)}
          />
        </View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#e0e2e2',
    padding: 10,
    height: '100%',
  },
});
