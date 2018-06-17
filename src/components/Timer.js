import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import Buttons from "./Buttons";
import Clock, { STATES } from "./Clock";
import Times from "./Times";
import TimePicker from "./TimePicker";

const SEC = 1000;
const MIN = SEC * 60;

export default class Timer extends PureComponent {
  initialState = {
    hasStarted: false,
    isRunning: false,
    elapsed: 0,
    start: 0,
    timerId: 0,
    timerState: STATES.NORMAL,
    green: SEC * 5,
    yellow: SEC * 10,
    red: SEC * 15,
    isModalVisible: false
  };

  state = this.initialState;

  _handleReset = () => {
    const { timerId, hasStarted } = this.state;
    if (!hasStarted) return;

    clearInterval(timerId);
    this.setState(this.initialState);
  };

  _handleTimer = () => {
    const { hasStarted, isRunning, timerId, start, elapsed } = this.state;
    let nextIntervalId = timerId;
    let nextStart = start;

    if (isRunning) {
      clearInterval(timerId);
    } else {
      nextStart = new Date() - elapsed;
      nextIntervalId = setInterval(() => {
        const { start } = this.state;
        const newElapsed = new Date() - start;
        this.setState({
          elapsed: newElapsed,
          timerState: this._getTimerState(newElapsed)
        });
      }, 50);
    }

    this.setState({
      ...this.state,
      hasStarted: true,
      isRunning: !isRunning,
      timerId: nextIntervalId,
      start: nextStart
    });
  };

  _getTimerState = elapsed => {
    const { green, yellow, red } = this.state;
    if (elapsed < green) {
      return STATES.NORMAL;
    }
    if (elapsed > green && elapsed < yellow) {
      return STATES.GREEN;
    }
    if (elapsed > yellow && elapsed < red) {
      return STATES.YELLOW;
    }
    return STATES.RED;
  };

  _handleGreen = () => {};
  _handleYellow = () => {};
  _handleRed = () => {};

  _setModalVisible = () => {
    const { isModalVisible } = this.state;
    this.setState({ isModalVisible: !isModalVisible });
  };

  render() {
    const {
      hasStarted,
      isRunning,
      elapsed,
      timerState,
      green,
      yellow,
      red,
      isModalVisible
    } = this.state;
    return (
      <View style={styles.container}>
        <Clock elapsed={elapsed} state={timerState} />
        <Times
          green={green}
          yellow={yellow}
          red={red}
          onTap={this._setModalVisible}
          onChangeGreen={this._handleGreen}
          onChangeYellow={this._handleYellow}
          onChangeRed={this._handleRed}
        />
        <Buttons
          hasStarted={hasStarted}
          isRunning={isRunning}
          handleTimer={this._handleTimer}
          handleReset={this._handleReset}
        />
        <TimePicker isVisible={isModalVisible} toggle={this._setModalVisible} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
