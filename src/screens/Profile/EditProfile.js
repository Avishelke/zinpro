import React, { Component } from "react";
import { ScrollView, View, StyleSheet, Text, TextInput } from "../../components/core";
import BottomButton from "../../components/BottomButton";
import { THEME_COLOR } from "../../helpers/theme";

class EditProfile extends Component {

  static navigationOptions = {
    title: 'Edit Profile',
    headerTitleStyle :{ color:'white'},
    headerStyle:{
        backgroundColor:THEME_COLOR,
    },
    headerTintColor: 'white'
};

  render() {
    const {
      container,
      header,
      labelText,
      inputbox,
    } = styles;
    return (
      <View style={container}>
        <ScrollView style={[container , { marginBottom: "20%" }]}>

          <TextInput placeholder={"Title"} style={inputbox} />

          <TextInput placeholder={"First Name"} style={inputbox} />
          <TextInput placeholder={"Last Name"} style={inputbox} />
          <TextInput placeholder={"Company"} style={inputbox} />
          <TextInput placeholder={"Email"} style={inputbox} />
          <TextInput placeholder={"Phone"} style={inputbox} />

          <Text style={labelText}>Address</Text>
          <TextInput
            placeholder={"Address"}
            style={[inputbox]}
            multiline={true}
            numberOfLines={5}
          />
          <TextInput placeholder={"Suite"} style={inputbox} />
          <TextInput placeholder={"City"} style={inputbox} />
          <View style={{ flexDirection: "row" }}>
            <TextInput placeholder={"State"} style={inputbox} />
            <TextInput placeholder={"Zipcode"} style={inputbox} />
          </View>
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
  header: {
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: THEME_COLOR
  },
  headertext: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "white"
  },
  welcomebacktext: {
    color: THEME_COLOR,
    fontSize: 25,
    marginVertical: 20,
    marginLeft: 20
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
  },
  botton: {
    height: 50,
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#1F94F4",
    justifyContent: "center",
    margin: 30
  },
  bottontext: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    color: "#1F94F4"
  }
});

export default EditProfile;
