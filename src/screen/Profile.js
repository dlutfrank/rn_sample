import React from 'react';
import {Button} from 'react-native';

export default class ProfileScreen extends React.Component {
  render() {
    const {navigation} = this.props;
    return (
      <Button
        title="Go back to Home from profile"
        onPress={() => navigation.goBack()}
      />
    );
  }
}
