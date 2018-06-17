import React, { PureComponent } from "react";
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  ScrollView,
  StyleSheet,
  Picker
} from "react-native";

export default class TimePicker extends PureComponent {
  state = {
    min: 0,
    sec: 0
  };
  _getItems() {
    return Array(100)
      .fill()
      .map((v, i) => {
        return <Picker.Item label={i.toString()} value={i} key={i} />;
      });
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.isVisible}
        onRequestClose={() => {}}
      >
        <View style={{ marginTop: 22 }}>
          <View>
            <ScrollView style={styles.panel}>
              <Picker
                selectedValue={this.state.min}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ min: itemValue })
                }
                mode="dropdown"
              >
                {this._getItems()}
              </Picker>
            </ScrollView>
            <TouchableHighlight onPress={this.props.toggle}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
