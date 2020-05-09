import React from 'react';
import {ScrollView} from 'react-native';
import {ListItem} from '../../ui/ListItem';

export default class Dev extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _goPage(pageName, params) {
    if (pageName) {
      const {navigation} = this.props;
      const {title = pageName} = params || {};
      navigation.navigate('DevDetail', {
        componentName: pageName,
        ...params,
        title,
      });
    }
  }

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <ListItem
          title="Demo"
          onPress={() => {
            this._goPage('Demo');
          }}
        />
        <ListItem
          title="scale demo"
          onPress={() => {
            this._goPage('ScaleView', {title: '缩放Demo'});
          }}
        />
      </ScrollView>
    );
  }
}
