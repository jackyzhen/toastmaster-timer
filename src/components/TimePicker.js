import React, { PureComponent } from "react";
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  ScrollView,
  StyleSheet,
  FlatList
} from "react-native";

import ConfirmCancel from "./ConfirmCancel";
import Utils from "../utils";

export default class TimePicker extends PureComponent {
  state = {};
  _getSeconds = () =>
    Array(12)
      .fill()
      .map((v, i) => ({ key: Utils.padString(`${i * 5}`, 2, "0") }));

  _getMinutes = () =>
    Array(21)
      .fill()
      .map((v, i) => ({ key: Utils.padString(`${i}`, 2, "0") }));

  componentWillReceiveProps({ sec, min }) {
    this.setState({ selectedSec: sec, selectedMin: min });
  }

  _onSelectSecond = selectedSec => () => {
    this.setState({ selectedSec });
  };

  _onSelectMinute = selectedMin => () => {
    this.setState({ selectedMin });
  };

  _renderSeconds = ({ item }) => {
    const { sec } = this.props;
    const { selectedSec } = this.state;
    const isHighlighted = selectedSec
      ? selectedSec === item.key
      : sec === item.key;
    return (
      <TouchableHighlight
        style={isHighlighted && styles.highlightedSec}
        onPress={this._onSelectSecond(item.key)}
        underlayColor="#501822"
      >
        <Text
          style={[
            styles.item,
            styles.second,
            isHighlighted && styles.highlightedText
          ]}
        >
          {item.key}
        </Text>
      </TouchableHighlight>
    );
  };

  _renderMinutes = ({ item }) => {
    const { min } = this.props;
    const { selectedMin } = this.state;
    const isHighlighted = selectedMin
      ? selectedMin === item.key
      : min === item.key;
    return (
      <TouchableHighlight
        style={isHighlighted && styles.highlightedMin}
        onPress={this._onSelectMinute(item.key)}
        underlayColor="#501822"
      >
        <Text
          style={[
            styles.item,
            styles.minute,
            isHighlighted && styles.highlightedText
          ]}
        >
          {item.key}
        </Text>
      </TouchableHighlight>
    );
  };

  render() {
    const { toggle, isVisible, colourState, handleConfirm } = this.props;
    const { selectedMin, selectedSec } = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={isVisible}
        onRequestClose={toggle}
      >
        <View style={styles.container}>
          <View style={styles.descriptions}>
            <Text style={styles.descriptionText}>{"M : S"}</Text>
          </View>
          <View style={styles.listsContainer}>
            <View style={styles.list}>
              <FlatList
                showsVerticalScrollIndicator={false}
                renderItem={this._renderMinutes}
                data={this._getMinutes()}
              />
            </View>
            <View style={styles.list}>
              <FlatList
                showsVerticalScrollIndicator={false}
                renderItem={this._renderSeconds}
                data={this._getSeconds()}
              />
            </View>
          </View>
          <ConfirmCancel
            onConfirm={() =>
              handleConfirm(colourState, selectedMin, selectedSec)
            }
            onCancel={toggle}
          />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  descriptionText: {
    flex: 1,
    textAlign: "center",
    fontFamily: "Gotham",
    fontWeight: "bold",
    fontSize: 30,
    color: "#fff"
  },
  list: {
    flex: 1
  },
  minute: {
    textAlign: "right",
    paddingRight: 5
  },
  second: {
    textAlign: "left",
    paddingLeft: 5
  },
  highlightedSec: {
    backgroundColor: "#cc3e56",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20
  },
  highlightedMin: {
    backgroundColor: "#cc3e56",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20
  },
  highlightedText: {
    color: "#fff"
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#772432"
  },
  descriptions: {
    flexDirection: "row"
  },
  listsContainer: {
    flexDirection: "row",
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20
  },
  item: {
    fontFamily: "Gotham",
    fontSize: 40,
    fontWeight: "bold",
    color: "#dfe2e2"
  }
});
