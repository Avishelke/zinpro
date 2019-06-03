import React from "react";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    borderRadius: 4,
    flexDirection: "row",
    overflow: "hidden",
    height: 40,
    flex: 1
  },

  btn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  btnText: {
    color: "white",
    textAlign: "center"
  },

  num: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  numText: {
    textAlign: "center"
  }
});

class Spinner extends React.Component {
  state = {
    min: 0,
    max: 3,
    num: 0
  };

  componentWillReceiveProps(nextProps) {
  
    if (nextProps.value !== undefined) {
      this.setState({
        num: nextProps.value
      });
    }
  }

  _onNumChange(num) {
    if (this.props.onNumChange) this.props.onNumChange(num);
  }

  _increase = () => {
    if (this.state.max > this.state.num) {
      var num = this.state.num + 1;
      this.setState({
        num: this.state.num + 1
      });

      this._onNumChange(num);
    }
  };

  _decrease = () => {
    if (this.state.min < this.state.num) {
      var num = this.state.num - 1;
      this.setState({
        num: num
      });

      this._onNumChange(num);
    }
  };

  render() {
    return (
      <View
        style={[
          styles.container,
          {
            borderColor: this.props.showBorder
              ? this.props.color
              : "transparent"
          },
          { width: this.props.width }
        ]}
      >
        <TouchableOpacity
          style={[
            styles.btn,
            { backgroundColor: this.props.color },
            {
              borderColor: this.props.showBorder
                ? this.props.color
                : "transparent"
            },
            { height: this.props.height }
          ]}
          onPress={this._decrease}
        >
          <Text
            style={[
              styles.btnText,
              {
                color: this.props.buttonTextColor,
                fontSize: this.props.btnFontSize
              }
            ]}
          >
            -
          </Text>
        </TouchableOpacity>
        <View
          style={[
            styles.num,
            {
              borderColor: this.props.showBorder
                ? this.props.color
                : "transparent",
              backgroundColor: this.props.numBgColor,
              height: this.props.height
            }
          ]}
        >
          <Text
            style={[
              styles.numText,
              { color: this.props.numColor, fontSize: this.props.fontSize }
            ]}
          >
            {this.state.num}
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.btn,
            { backgroundColor: this.props.color },
            {
              borderColor: this.props.showBorder
                ? this.props.color
                : "transparent"
            },
            { height: this.props.height }
          ]}
          onPress={this._increase}
        >
          <Text
            style={[
              styles.btnText,
              {
                color: this.props.buttonTextColor,
                fontSize: this.props.btnFontSize
              }
            ]}
          >
            +
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Spinner;
