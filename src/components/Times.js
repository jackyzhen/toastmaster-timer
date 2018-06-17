import React, { PureComponent } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Utils from "../utils";
import { STATES } from "./Clock";

export default class Times extends PureComponent {
  _getTimeDisplay = (duration, state, handler, onTap) => {
    let colour;
    switch (state) {
      case STATES.GREEN:
        colour = styles.green;
        break;
      case STATES.YELLOW:
        colour = styles.yellow;
        break;
      case STATES.RED:
        colour = styles.red;
        break;
    }
    console.log(colour);
    return (
      <TouchableOpacity style={[styles.time, colour]} onPress={onTap}>
        <Text style={styles.text}>{Utils.formatTime(duration)}</Text>
      </TouchableOpacity>
    );
  };
  render() {
    const {
      green,
      yellow,
      red,
      onChangeGreen,
      onChangeYellow,
      onChangeRed,
      onTap
    } = this.props;
    return (
      <View style={styles.container}>
        {this._getTimeDisplay(green, STATES.GREEN, onChangeGreen, onTap)}
        {this._getTimeDisplay(yellow, STATES.YELLOW, onChangeYellow, onTap)}
        {this._getTimeDisplay(red, STATES.RED, onChangeRed, onTap)}
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
    fontSize: 40,
    color: "#313131"
  },
  time: {
    padding: 10,
    paddingLeft: 20,
    flex: 1,
    alignItems: "center"
  }
});
