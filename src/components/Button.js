import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import Touchable from "./Touchable";

export default function Button(props) {
  return (
    <Touchable {...props} style={[styles.container, props.style]}>
      <View style={styles.center}>
        <View style={props.buttonStyle}>{props.icon}</View>
        <Text style={props.titleStyle}>{props.title.toUpperCase()}</Text>
      </View>
    </Touchable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingLeft: 30
  },
  center: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});
