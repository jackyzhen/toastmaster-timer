import React, { PureComponent } from "react";
import { View, Text, StyleSheet } from "react-native";
import Utils from "../utils";

export const STATES = {
  NORMAL: "NORMAL",
  GREEN: "GREEN",
  YELLOW: "YELLOW",
  RED: "RED"
};

export default class Clock extends PureComponent {
  static defaultProps = {
    elapsed: 0
  };

  _getStateStyle = () => {
    const { state } = this.props;
    switch (state) {
      case STATES.GREEN:
        return styles.green;
      case STATES.YELLOW:
        return styles.yellow;
      case STATES.RED:
        return styles.red;
      case STATES.NORMAL:
      default:
        return styles.normal;
    }
  };

  render() {
    const { elapsed, state } = this.props;
    return (
      <View style={[styles.container, this._getStateStyle(state)]}>
        <Text style={styles.elapsed}>{Utils.formatElapsed(elapsed)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  normal: {
    backgroundColor: "#A9B2B1"
  },
  green: {
    backgroundColor: "#00A86B"
  },
  yellow: {
    backgroundColor: "#F2DF74"
  },
  red: {
    backgroundColor: "#CD202C"
  },
  elapsed: {
    fontFamily: "Gotham",
    fontSize: 60,
    fontWeight: "bold",
    color: "#313131"
  }
});
