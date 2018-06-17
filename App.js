import Expo from "expo";
import React, { PureComponent } from "react";
import { View, Platform, StatusBar, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Home from "./src/components/Home";

export default class App extends PureComponent {
  state = {
    loaded: false
  };

  componentWillMount() {
    this._load();
  }

  _load = async () => {
    await Expo.Font.loadAsync({
      Gotham: require("./assets/Gotham-Medium.otf"),
      ...MaterialIcons.font
    });

    global.requestAnimationFrame(() => {
      this.setState({ loaded: true });
    });
  };

  render() {
    if (!this.state.loaded) {
      return <Expo.AppLoading />;
    }

    return (
      <View style={styles.container}>
        <View style={styles.statusbar} />
        <Home />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  statusbar: {
    height: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#fff"
  }
});
