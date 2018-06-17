import React, { PureComponent } from "react";
import { createStackNavigator } from "react-navigation";
import Timer from "./Timer";
import Settings from "./Settings";

const RootStack = createStackNavigator(
  {
    Timer,
    Settings
  },
  {
    initialRouteName: "Timer",
    headerMode: "none"
  }
);

export default class Home extends PureComponent {
  render() {
    return <RootStack />;
  }
}
