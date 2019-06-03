import React, { Component } from "react";
import { View, StyleSheet, Text, TextInput, ScrollView, TouchableHighlight } from "../../components/core";
import BottomButton from "../../components/BottomButton";
import { px2dp , THEME_COLOR} from "../../helpers/theme";

class Profile extends Component {


  navigateToChangePassword = () => {
    this.props.navigation.push('ChangePassword');
  }

  navigateToEditProfile = () => {
    this.props.navigation.push('EditProfile');
  }


  render() {
    const {
      container,
      header,
      inputbox,
    } = styles;
    return (
      <View style={container}>
        <ScrollView style={{ marginBottom: "20%",  width: "100%", height: "100%" }}>
         

          <TextInput placeholder={"First Name"} style={inputbox} />
          <TextInput placeholder={"Last Name"} style={inputbox} />
          <TextInput placeholder={"Email"} style={inputbox} />
          <TextInput
            placeholder={"Mobile"}
            style={[inputbox, { marginBottom: 20 }]}
          />

          <View style={{ borderWidth: 8, borderColor: "#EDEDED" }} />

          <View style={styles.linksCard}>

            <TouchableHighlight underlayColor={'white'} onPress={this.navigateToEditProfile}>
              <Text style={[styles.linksCardLinks]}>
                Edit Profile
              </Text>
            </TouchableHighlight>


            <View style={{ borderWidth: 0.8, borderColor: "#EDEDED" }} />

            <TouchableHighlight underlayColor={'white'} onPress={this.navigateToChangePassword}>
              <Text style={[styles.linksCardLinks]}>
                Change Password
            </Text>
            </TouchableHighlight>

            <View style={{ borderWidth: 0.8, borderColor: "#EDEDED" }} />
          </View>
        </ScrollView>
        <BottomButton text={"Update"} onPress={() => { }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  header: {
    height: 80,
    backgroundColor: THEME_COLOR,
    flexDirection: "row",
    display: "flex",
    marginBottom: "20%"
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
  },
  linksCard: {
    backgroundColor: "#fff",
    borderRadius: 5,
    borderColor: "#fff",
    height: px2dp(100),
    marginHorizontal: "4%",
    marginVertical: "2%"
  },
  linksCardLinks: {
    paddingLeft: 20,
    fontSize: px2dp(16),
    paddingVertical: 15
  }
});

export default Profile;
