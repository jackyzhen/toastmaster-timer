import React, { PureComponent } from "react";
import { View, Text, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Utils from "../utils";
import Button from "./Button";
import Clock, { STATES } from "./Clock";

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
    red: SEC * 15
  };

  state = this.initialState;

  _handleReset = () => {
    const { timerId } = this.state;
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

  _getButtonTitle = () => {
    const { hasStarted, isRunning } = this.state;
    if (!hasStarted) return "Start";
    return isRunning ? "Pause" : "Resume";
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

  render() {
    const { hasStarted, elapsed, timerState } = this.state;
    return (
      <View>
        <View>
          <Button
            title={this._getButtonTitle()}
            titleStyle={styles.buttonText}
            onPress={this._handleTimer}
            buttonStyle={styles.button}
            icon={
              <MaterialIcons name="access-time" size={30} style={styles.icon} />
            }
          />
        </View>
        {hasStarted && (
          <View>
            <Button
              title="reset"
              titleStyle={styles.buttonText}
              onPress={this._handleReset}
              buttonStyle={styles.button}
              icon={
                <MaterialIcons name="refresh" size={30} style={styles.icon} />
              }
            />
          </View>
        )}
        <Clock elapsed={elapsed} state={timerState} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 18,
    backgroundColor: "#fff"
  },
  buttonText: {
    fontFamily: "Gotham",
    fontSize: 30
  }
});
