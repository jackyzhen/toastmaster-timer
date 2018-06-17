import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Button from "./Button";

export default class Timer extends PureComponent {
  static defaultProps: {
    hasStarted: false,
    isRunning: false
  };

  _getButtonTitle = () => {
    const { hasStarted, isRunning } = this.props;
    if (!hasStarted) return "Start";
    return isRunning ? "Pause" : "Resume";
  };

  render() {
    const { handleTimer, handleReset } = this.props;
    return (
      <View style={styles.buttons}>
        <Button
          style={[styles.button, styles.topLeft]}
          title={this._getButtonTitle()}
          titleStyle={styles.buttonText}
          onPress={handleTimer}
          iconStyle={styles.icon}
          icon={
            <MaterialIcons name="access-time" size={30} style={styles.icon} />
          }
        />
        <Button
          style={[styles.button, styles.topRight]}
          title="reset"
          titleStyle={styles.buttonText}
          onPress={handleReset}
          iconStyle={styles.icon}
          icon={<MaterialIcons name="refresh" size={30} style={styles.icon} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    borderRadius: 18,
    backgroundColor: "#fff"
  },
  button: {
    flex: 0.5,
    backgroundColor: "#004165"
  },
  buttons: {
    flexDirection: "row"
  },
  buttonText: {
    fontFamily: "Gotham",
    fontSize: 30,
    color: "#fff",
    padding: 10
  }
});
