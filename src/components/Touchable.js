import React, { PureComponent } from "react";
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  View
} from "react-native";

const LOLLIPOP = 21;

export default class TouchableItem extends PureComponent {
  static defaultProps = {
    delayPressIn: 0,
    pressColor: "rgba(0, 0, 0, .16)"
  };

  render() {
    if (Platform.OS === "android" && Platform.Version >= LOLLIPOP) {
      return (
        <TouchableNativeFeedback
          {...this.props}
          style={null}
          background={TouchableNativeFeedback.Ripple(
            this.props.pressColor,
            this.props.borderless
          )}
        >
          <View style={this.props.style}>{this.props.children}</View>
        </TouchableNativeFeedback>
      );
    } else {
      return (
        <TouchableOpacity {...this.props}>
          {this.props.children}
        </TouchableOpacity>
      );
    }
  }
}
