import React from "react";
import { View, TouchableHighlight, StyleSheet, Text } from "../components/core";
import {THEME_COLOR} from '../helpers/theme'

const BottomButton = props => {
  const BottomButtonStyle = StyleSheet.create({
    button: {
      alignItems: "center",
      backgroundColor: THEME_COLOR,
      padding: 10,
      borderRadius: 3,
      width: "94%",
      marginHorizontal: "3%",
      marginVertical: 5
    },
    text: {
      fontSize: 18,
      paddingVertical: 4,
      color: "white"
    },
    container: {
      position: "absolute",
      bottom: 0,
      alignSelf: "flex-end",
      width: "100%",
      backgroundColor: "#EDEDED"
    }
  });

  return (
    <View style={BottomButtonStyle.container}>
      <TouchableHighlight
        style={BottomButtonStyle.button}
        onPress={() => {
          props.onPress();
        }}
      >
        <Text style={BottomButtonStyle.text}> {props.text}</Text>
      </TouchableHighlight>
    </View>
  );
};

export default BottomButton;
