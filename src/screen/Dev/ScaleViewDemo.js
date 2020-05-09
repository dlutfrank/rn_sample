import React from 'react';
import {View, StyleSheet, PanResponder} from 'react-native';
import logger from '../../common/logger';
import DevButton from './DevButton';

const CIRCLE_SIZE = 100;
const SENSITY = 0.8;
export default class ScaleView extends React.Component {
  constructor(props) {
    super(props);
    this.originDistance = 1;
    this.originScale = 1.0;
    this.originRotate = 0.0;

    this.pressed = false;

    this.state = {
      scale: this.originScale,
      rotate: this.originRotate,
    };
    this.touchPoint = {};

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderStart: this._handlePanResponderStart,
      onPanResponderEnd: this._handlePanResponderEnd,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderRelease,
      onPanResponderTerminate: this._handlePanResponderTerminate,
    });
  }

  _handleStartShouldSetPanResponder = () => true;

  _handleMoveShouldSetPanResponder = () => true;

  _handlePanResponderGrant = () => {};

  _handlePanResponderStart = (event, gestureState) => {
    this._logEvents('===start===', event, gestureState);
    const {identifier, locationX, locationY} = event.nativeEvent;
    const {numberActiveTouches = 0} = gestureState;
    this.touchPoint[+identifier] = {
      x: locationX,
      y: locationY,
    };
    if (numberActiveTouches <= 0) {
      return;
    }
    if (numberActiveTouches > 1) {
      const idens = Object.keys(this.touchPoint);
      if (idens.length < 2) {
        return;
      }
      const {x: x0, y: y0} = this.touchPoint[idens[0]];
      const {x: x1, y: y1} = this.touchPoint[idens[1]];
      this.originDistance = Math.sqrt(
        (x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0),
      );
    }
  };

  _handlePanResponderMove = (event, gestureState) => {
    this._logEvents('===move===', event, gestureState);
    const {identifier, locationX: x1, locationY: y1} = event.nativeEvent;
    const {numberActiveTouches = 0} = gestureState;
    this.touchPoint[+identifier] = {
      x: x1,
      y: y1,
    };
    if (numberActiveTouches <= 0) {
      return;
    }
    if (numberActiveTouches > 1) {
      const idens = Object.keys(this.touchPoint);
      if (idens.length < 2) {
        return;
      }
      const other = idens.find((iden) => +iden !== +identifier);
      if (other === undefined) {
        return;
      }
      const {x: x0, y: y0} = this.touchPoint[+other];
      const distance = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
      logger.info(
        `originScale: ${this.originScale}, origin:${this.originDistance}, current:${distance}`,
      );
      const {scale: oldScale} = this.state;
      const scale = (this.originScale * distance) / this.originDistance;
      if (Math.abs(oldScale - scale) < SENSITY) {
        this.setState({scale});
      }
    }
  };

  _handlePanResponderEnd = (event, gestureState) => {
    this._logEvents('===end===', event, gestureState);
  };

  _handlePanResponderRelease = (event, gestureState) => {
    this._logEvents('===Release===', event, gestureState);
    const {identifier} = event.nativeEvent;
    delete this.touchPoint[identifier];
    const {scale} = this.state;
    this.originScale = scale;
  };

  _handlePanResponderTerminate = (event, gestureState) => {
    this._logEvents('===Terminate===', event, gestureState);
  };

  _logEvents = (tag, event, gestureState) => {
    logger.info(tag);
    const {changedTouches, touches, ...restEvent} = event.nativeEvent || {};
    logger.info(`${tag}-event, ${JSON.stringify(restEvent)}`);
    // logger.info(`${tag}-gesture, ${JSON.stringify(gestureState)}`);
  };

  _layoutRect = (event) => {
    const layout = event.nativeEvent.layout;
    const {x, y, width, height} = layout || {};
    logger.info(`x: ${x}, y: ${y}, w: ${width}, h: ${height}`);
  };

  render() {
    const {scale, rotate} = this.state;
    logger.info(`render, scale: ${scale}`);
    return (
      <View style={{flex: 1}}>
        <View style={styles.container} {...this._panResponder.panHandlers}>
          <View
            style={[
              styles.circle,
              {
                transform: [{scale}],
              },
            ]}
          />
          <View
            onStartShouldSetResponder={() => true}
            onMoveShouldSetResponder={() => true}
            onLayout={this._layoutRect}
            style={[
              styles.rect,
              {
                transform: [{rotate: `${rotate}rad`}],
              },
            ]}
          />
        </View>
        <DevButton
          title="缩放"
          style={styles.btn}
          onPress={() => {
            logger.info(`touch: ${scale}`);
            this.setState({
              scale: scale * 1.2,
            });
          }}
        />
        <DevButton
          title="刷新"
          style={styles.rbtn}
          onPress={() => {
            logger.info(`refresh: ${scale}`);
            this.forceUpdate();
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    backgroundColor: 'yellow',
    borderRadius: CIRCLE_SIZE / 2,
    // position: 'absolute',
    // left: 50,
    // top: 50,
  },
  rect: {
    width: CIRCLE_SIZE * 2,
    height: CIRCLE_SIZE,
    backgroundColor: 'green',
  },
  container: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    position: 'absolute',
    bottom: 20,
    left: 50,
  },
  rbtn: {
    position: 'absolute',
    bottom: 20,
    right: 50,
  },
});
