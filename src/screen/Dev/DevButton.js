import React from 'react';
import {View, TouchableWithoutFeedback, StyleSheet, Text} from 'react-native';

export default class DevButton extends React.PureComponent {
  render() {
    const {onPress, style, title} = this.props;
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={[styles.btnContainer, style]}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  btnContainer: {
    width: 80,
    height: 40,
    backgroundColor: '#00f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    color: 'white',
  },
});
