import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './screens/Main';
import Profile from './screens/Profile';

const Routes = createAppContainer(
  createStackNavigator({
    Main: {
      screen: Main,
      navigationOptions: {
        title: 'DevRadar'
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        title: 'Perfil no Github'
      }
    },
  }, {
    defaultNavigationOptions: {
      headerTintColor: '#fff',
      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#7d40e7'
      }
    }
  }),
);

export default Routes;