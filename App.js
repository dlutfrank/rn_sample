/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './src/screen/Home';
import Profile from './src/screen/Profile';
import Guide from './src/screen/Guide';
import Dev from './src/screen/Dev';
import DevDetail from './src/screen/Dev/DevDetail';

const Stack = createStackNavigator();

// const App: () => React$Node = () => {
const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Dev">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{title: 'Welcome'}}
          />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Guide" component={Guide} />
          <Stack.Screen name="Dev" component={Dev} />
          <Stack.Screen name="DevDetail" component={DevDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
