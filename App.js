/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Image} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import Dashboard_Activity from './screens/Dashboard_Activity';
import TextAnalytics_Activity from './screens/TextAnalytics_Activity';
import FeedbackList_Activity from './screens/FeedbackList_Activity';
import MorePage_Activity from './screens/MorePage_Activity';

const DashboardTab = createStackNavigator(
  {
    Dashboard: Dashboard_Activity,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#4a7bd0',
      },
      headerTintColor: '#fff',
      title: 'Dashboard',
    },
  },
);

const FeedbackListTab = createStackNavigator(
  {
    FeedbackList: FeedbackList_Activity,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#4a7bd0',
      },
      headerTintColor: '#FFFFFF',
      title: 'Feedback results',
    },
  },
);

const TextAnalyticsTab = createStackNavigator(
  {
    TextAnalytics: TextAnalytics_Activity,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#4a7bd0',
      },
      headerTintColor: '#FFFFFF',
      title: 'Text analytics',
    },
  },
);

const MorePageTab = createStackNavigator(
  {
    MorePage: MorePage_Activity,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#4a7bd0',
      },
      headerTintColor: '#FFFFFF',
      title: 'Profile',
    },
  },
);

const MainApp = createBottomTabNavigator(
  {
    Dashboard: DashboardTab,
    FeedbackList: FeedbackListTab,
    TextAnalytics: TextAnalyticsTab,
    MorePage: MorePageTab,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        if (routeName === 'Dashboard') {
          return (
            <Image
              source={require('./assets/dashboard.png')}
              style={{width: 20, height: 20}}
            />
          );
        } else if (routeName === 'FeedbackList') {
          return (
            <Image
              source={require('./assets/feedback.png')}
              style={{width: 20, height: 20}}
            />
          );
        } else if (routeName === 'TextAnalytics') {
          return (
            <Image
              source={require('./assets/analytics.png')}
              style={{width: 20, height: 20}}
            />
          );
        } else if (routeName === 'MorePage') {
          return (
            <Image
              source={require('./assets/more.png')}
              style={{width: 20, height: 20}}
            />
          );
        }
      },
    }),
    tabBarOptions: {
      activeTintColor: '#4a7bd0',
      inactiveTintColor: '#979797',
    },
  },
);

export default createAppContainer(MainApp);
