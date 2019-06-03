import React, { Component } from "react";
import { ScrollView, View, StyleSheet, Text, TextInput } from "react-native";
import BottomButton from "../../components/BottomButton";
import { THEME_COLOR } from "../../helpers/theme";

class ChangePassword extends Component {

  static navigationOptions = {
    title: 'Change Password',
    headerTitleStyle :{ color:'white'},
    headerStyle:{
        backgroundColor:THEME_COLOR,
    },
    headerTintColor: 'white'
};

  render() {
    const {
      container,
      inputbox,
    } = styles;
    return (
      <View style={container}>
        <ScrollView style={{ marginTop: "5%" }}>

          <TextInput placeholder={"Current Password"} style={inputbox} />
          <TextInput placeholder={"New Password"} style={inputbox} />
          <TextInput placeholder={"Confirm password"} style={inputbox} />
        </ScrollView>

        <BottomButton text={"Update"} onPress={() => {}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%"
  },
  labelText: {
    color: THEME_COLOR,
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 20
  },
  inputbox: {
    marginHorizontal: 20,
    height: 40,
    borderColor: "gray",
    borderWidth: 0,
    marginVertical: 10,
    borderBottomWidth: 1
  }
});

export default ChangePassword;
