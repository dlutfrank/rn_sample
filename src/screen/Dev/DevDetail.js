import React from 'react';
import {View, Text} from 'react-native';
import DevConfig from './DevRoute';
import {NavUtils} from '../../utils';

export default class DevDetail extends React.Component {
  constructor(props) {
    super(props);
    this.componentName = NavUtils.getParam(props, 'componentName');
    this.state = {};
  }

  _renderByName = (componentName) => {
    let component = DevConfig[componentName];
    if (component) {
      const {navigation} = this.props;
      component = React.createElement(component, {
        navigation,
      });
    }
    if (!component) {
      component = <Text>没有内容</Text>;
    }
    return component;
  };

  render() {
    const page = this._renderByName(this.componentName);
    return <View style={{flex: 1}}>{page}</View>;
  }
}
