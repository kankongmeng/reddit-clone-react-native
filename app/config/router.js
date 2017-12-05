import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Search from '../containers/search';
import PostForm from '../components/add-post';

export const MainStack = StackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      title: 'Posts',
    },
  }
});

export const Tabs = TabNavigator({
  Search: {
    screen: MainStack,
    navigationOptions: {
      tabBarLabel: 'Posts',
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />,
    },
  },
  PostForm: {
    screen: PostForm,
    navigationOptions: {
      tabBarLabel: 'PostForm',
      tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
    },
  },
});


export const Root = StackNavigator({
  Tabs: {
    screen: Tabs,
  }, }, {
  mode: 'modal',
  headerMode: 'none',
});
