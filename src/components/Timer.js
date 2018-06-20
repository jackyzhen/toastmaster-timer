import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import Buttons from "./Buttons";
import Clock, { STATES } from "./Clock";
import Times from "./Times";
import TimePicker from "./TimePicker";
import Utils from "../utils";

const SEC = 1000;
const MIN = SEC * 60;

export default class Timer extends PureComponent {
  initialState = {
    hasStarted: false,
    isRunning: false,

    elapsed: 0,
    start: 0,
    timerId: 0,
    GREEN: SEC * 5,
    YELLOW: SEC * 10,
    RED: SEC * 15,
    timerState: STATES.NORMAL,

    isModalVisible: false,
    modalSec: "00",
    modalMin: "00",
    modalState: STATES.GREEN
  };

  state = this.initialState;

  _handleReset = () => {
    const { timerId, hasStarted, GREEN, YELLOW, RED } = this.state;
    if (!hasStarted) return;

    clearInterval(timerId);
    this.setState({
      ...this.initialState,
      GREEN,
      YELLOW,
      RED
    });
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
    const { GREEN, YELLOW, RED } = this.state;
    if (elapsed < GREEN) {
      return STATES.NORMAL;
    }
    if (elapsed > GREEN && elapsed < YELLOW) {
      return STATES.GREEN;
    }
    if (elapsed > YELLOW && elapsed < RED) {
      return STATES.YELLOW;
    }
    return STATES.RED;
  };

  _setModalVisible = colour => () => {
    const { isModalVisible, GREEN, YELLOW, RED } = this.state;
    let mins, secs;
    switch (colour) {
      case STATES.GREEN:
        [mins, secs] = Utils.getMinAndSec(GREEN);
        break;
      case STATES.YELLOW:
        [mins, secs] = Utils.getMinAndSec(YELLOW);
        break;
      case STATES.RED:
        [mins, secs] = Utils.getMinAndSec(RED);
        break;
    }
    this.setState({
      isModalVisible: !isModalVisible,
      modalMin: mins,
      modalSec: secs,
      modalState: colour
    });
  };

  _hideModal = () => {
    this.setState({ isModalVisible: false });
  };

  _adjustedTimes(colour, green, yellow, red) {
    let [newGreen, newYellow, newRed] = [green, yellow, red];
    switch (colour) {
      case STATES.GREEN:
        if (newGreen >= newYellow) {
          newYellow = newGreen + MIN;
        }
        if (newYellow >= newRed) {
          newRed = newYellow + MIN;
        }
        break;
      case STATES.YELLOW:
        if (newGreen >= newYellow) {
          newGreen = newYellow - MIN <= 0 ? 0 : newYellow - MIN;
        }
        if (newYellow >= newRed) {
          newRed = newYellow + MIN;
        }
        break;
      case STATES.RED:
        if (newYellow >= newRed) {
          newYellow = newRed - MIN <= 0 ? 0 : newRed - MIN;
        }
        if (newGreen >= newYellow) {
          newGreen = newYellow - MIN <= 0 ? 0 : newYellow - MIN;
        }
        break;
    }
    return [newGreen, newYellow, newRed];
  }

  _updateTime = (colour, min, sec) => {
    const { modalMin, modalSec, GREEN, YELLOW, RED } = this.state;
    const newMin = min || modalMin;
    const newSec = sec || modalSec;
    const newDuration = Utils.getElapsedFromMinAndSec(newMin, newSec);
    let [newGreen, newYellow, newRed] = [GREEN, YELLOW, RED];
    switch (colour) {
      case STATES.GREEN:
        newGreen = newDuration;
        break;
      case STATES.YELLOW:
        newYellow = newDuration;
        break;
      case STATES.RED:
        newRed = newDuration;
        break;
    }
    [newGreen, newYellow, newRed] = this._adjustedTimes(
      colour,
      newGreen,
      newYellow,
      newRed
    );
    this.setState({
      GREEN: newGreen,
      YELLOW: newYellow,
      RED: newRed,
      isModalVisible: false
    });
  };

  render() {
    const {
      hasStarted,
      isRunning,
      elapsed,
      timerState,
      GREEN,
      YELLOW,
      RED,
      isModalVisible,
      modalState,
      modalSec,
      modalMin
    } = this.state;
    return (
      <View style={styles.container}>
        <Clock elapsed={elapsed} state={timerState} />
        <Times
          GREEN={GREEN}
          YELLOW={YELLOW}
          RED={RED}
          onTap={this._setModalVisible}
        />
        <Buttons
          hasStarted={hasStarted}
          isRunning={isRunning}
          handleTimer={this._handleTimer}
          handleReset={this._handleReset}
        />
        <TimePicker
          sec={modalSec}
          min={modalMin}
          isVisible={isModalVisible}
          colourState={modalState}
          toggle={this._hideModal}
          handleConfirm={this._updateTime}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
