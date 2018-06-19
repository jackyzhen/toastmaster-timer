import React, { PureComponent } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { STATES } from "./Clock";
import Utils from "../utils";

export default class Times extends PureComponent {
  _getTimeDisplay = (duration, state) => {
    const { onTap } = this.props;
    let colourStyle;

    switch (state) {
      case STATES.GREEN:
        colourStyle = styles.green;
        break;
      case STATES.YELLOW:
        colourStyle = styles.yellow;
        break;
      case STATES.RED:
        colourStyle = styles.red;
        break;
    }

    return (
      <TouchableOpacity
        style={[styles.time, colourStyle]}
        onPress={onTap(state)}
      >
        <Text style={styles.text}>{Utils.formatTime(duration)}</Text>
      </TouchableOpacity>
    );
  };
  render() {
    const { GREEN, YELLOW, RED } = this.props;
    return (
      <View style={styles.container}>
        {this._getTimeDisplay(GREEN, STATES.GREEN)}
        {this._getTimeDisplay(YELLOW, STATES.YELLOW)}
        {this._getTimeDisplay(RED, STATES.RED)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
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
  text: {
    fontFamily: "Gotham",
    fontWeight: "bold",
    fontSize: 35,
    color: "#313131"
  },
  time: {
    padding: 10,
    paddingLeft: 20,
    flex: 1,
    alignItems: "center"
  }
});
