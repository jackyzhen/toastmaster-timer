import * as React from "react";
import { View, TouchableHighlight, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function ConfirmCancel({ style, onConfirm, onCancel }) {
  return (
    <View style={[styles.container, style]}>
      <TouchableHighlight
        underlayColor="#501822"
        style={styles.leftButton}
        onPress={onCancel}
      >
        <MaterialIcons name="close" size={40} style={styles.cancel} />
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.rightButton}
        onPress={onConfirm}
        underlayColor="#501822"
      >
        <MaterialIcons name="check" size={40} style={styles.confirm} />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 50
  },
  cancel: {
    color: "#dfe2e2"
  },
  confirm: {
    color: "#cc3e56"
  },
  leftButton: {
    flex: 1,
    paddingLeft: 20,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  rightButton: {
    flex: 1,
    paddingRight: 20,
    alignItems: "flex-end",
    justifyContent: "center"
  },
  iContainer: {
    flex: 1
  }
});
