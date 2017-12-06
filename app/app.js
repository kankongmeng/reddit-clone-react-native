'use strict';

import React, { Component } from 'react';
import { updateFocus, getCurrentRouteKey } from '@patwoz/react-navigation-is-focused-hoc';
import { Root, Tabs } from './config/router';

export default class App extends Component {
  render() {
    return (
      <Root
        onNavigationStateChange={(prevState, currentState) => {
          updateFocus(currentState)
        }}
      />
    );
  }
}
