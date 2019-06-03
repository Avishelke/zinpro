import React, { Component } from "react";

import { View, StyleSheet, Text, TextInput, ImageBackground, TouchableHighlight, AsyncStorage, Image } from "../components/core";
import DefaultScreen from '../hoc/DefaultScreen';
import { getValue } from '../helpers/arrayhelper'
import { LOGIN_TOKEN } from '../helpers/constants'
import { CheckBox } from 'react-native-elements'

import API from '../apis';
import {
  SHOW_ERROR_MESSAGE,
} from '../redux/actions';

import { db } from '../helpers/db';

class Login extends Component {


  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      checked: false
    }
  }

  login = async () => {
    await this.props.showloader();

    API.login(this.state)
      .then(async (res) => {
        const { token, time } = res;

        if (token) {
          await AsyncStorage.setItem(LOGIN_TOKEN, token);
          await AsyncStorage.setItem('time', time);
          await AsyncStorage.setItem('IS_LOOGED_IN', 'true');

          let credential = {
            email: this.state.email,
            password: this.state.password,
          }
          AsyncStorage.setItem('credential', JSON.stringify(credential));

          const insertKeys = [
            'claw_collection',
            'cull_data',
            'evaluations',
            'evaluations_groups', 'farms',
            'field_sheet', 'gestation_assessor',
            'gilt_assessor', 'gilt_break_even',
            'groups', 'herd_census',
            'insemination_assessor', 'lactation_assessor'
          ];

          let insert = {
            0: `SELECT date('now'),`,
            1: `SELECT date('now'),`,
            2: `SELECT date('now'),`,
            3: `SELECT date('now'),`,
            4: `SELECT date('now'),`,
            5: `SELECT date('now'),`,
            6: `SELECT date('now'),`,
            7: `SELECT date('now'),`,
            8: `SELECT date('now'),`,
            9: `SELECT date('now'),`,
            10: `SELECT date('now'),`,
            11: `SELECT date('now'),`,
            12: `SELECT date('now'),`,
          };

          insertKeys.map((table, k) => {

            res.data[table].map((i, key) => {
              delete i.is_sync;
              let columns = Object.keys(i);

              if (key === 0) {
                insert[k] = `insert  OR REPLACE   into ${table} (` + columns.toString() + `, is_sync) values `;
              }

              insert[k] += `(`;

              for (let _k in i) {
                insert[k] += `'${(i[_k])}'` + ', '
              }

              insert[k] += ` 1),`;
            });

          })

          db.transaction((tx) => {
            tx.executeSql(insert[0].slice(0, -1), []);
            tx.executeSql(insert[1].slice(0, -1), []);
            tx.executeSql(insert[2].slice(0, -1), []);
            tx.executeSql(insert[3].slice(0, -1), []);
            tx.executeSql(insert[4].slice(0, -1), []);
            tx.executeSql(insert[5].slice(0, -1), []);
            tx.executeSql(insert[6].slice(0, -1), []);
            tx.executeSql(insert[7].slice(0, -1), []);
            tx.executeSql(insert[8].slice(0, -1), []);
            tx.executeSql(insert[9].slice(0, -1), []);
            tx.executeSql(insert[10].slice(0, -1), []);
            tx.executeSql(insert[11].slice(0, -1), []);
            tx.executeSql(insert[12].slice(0, -1), [], () => {
              this.props.navigation.navigate('Home');
            })
          }, (error) => {
            this.props.hideloader();
            console.log('transaction error: ' + error.message);
          }, () => {
            this.props.hideloader()
            this.props.navigation.navigate('Home');
          });
        } else {
          this.props.showmessage(SHOW_ERROR_MESSAGE, 'Invalid username or password');
        }
      })
      .catch((error) => {
        console.log(error);
        this.offlineLogin();
      })
  }

  offlineLogin = async () => {
    try {
      var temp = await AsyncStorage.getItem('credential');
      const credential = JSON.parse(temp);
      if (credential && credential.email == this.state.email && credential.password == this.state.password) {
        this.props.hideloader();
        await AsyncStorage.setItem('IS_LOOGED_IN', 'true');
        this.props.navigation.navigate('Home');
      } else {
        this.props.hideloader();
        let message = getValue(error, ['response', 'data', 'message'], 'Network Error');
        this.props.showmessage(SHOW_ERROR_MESSAGE, message);
      }
    } catch (error) {
      // Error retrieving data
      this.props.showmessage(SHOW_ERROR_MESSAGE, 'Invalid username or password');
    }
  };

  render() {
    const {
      container,
      flexContent,
      inputbox,
      botton,
      bottontext
    } = styles;
    return (
      <ImageBackground source={require('../../assets/back.jpg')} style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', padding: 5 }}>
        <Image source={require('../../assets/logo1.png')} style={{ top: -90 }} />
        <Text style={{ color: '#8A1212', fontSize: 20 }}>Registered Users Only</Text>
        <Text style={{ color: 'grey', fontSize: 18 }}>Enter your login information to access the site</Text>


        <View style={{ padding: 0, marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ alignItems: 'center', justifyContent: 'center', }}>
            <View style={{ justifyContent: 'center', marginTop: 10 }}>
              <Text style={{ color: '#8A1212', textAlign: 'left', }}>EMAIL</Text>
              <TextInput
                value={this.state.email}
                placeholder='Enter email address'

                onChangeText={(email) => this.setState({ email })}
                style={inputbox} />
            </View>

            <View style={{ justifyContent: 'center', marginTop: 10 }}>
              <Text style={{ color: '#8A1212', textAlign: 'left' }}>PASSWORD</Text>
              <TextInput
                value={this.state.password}
                secureTextEntry={true}
                onChangeText={(password) => this.setState({ password })}
                style={inputbox} />

            </View>
          </View>
          <TouchableHighlight
            underlayColor={'white'}
            onPress={this.login}>
            <View style={botton}>
              <Text style={bottontext}>Log in</Text>
            </View>
          </TouchableHighlight>
          <Text style={{ color: '#8A1212', margin: 5, textAlign: 'center' }}>Forgot Password</Text>
          <Text style={{ color: 'grey', margin: 5, textAlign: 'center' }}>©2019 Zinpro. All rights reserved.</Text>

          {/* <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}> */}
          {/* <CheckBox
              center             
              containerStyle={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
              checkedIcon='dot-circle-o'
              checkedColor='#8A1212'
              // uncheckedColor='#8A1212'
              uncheckedIcon='circle-o'
              backgroundColor='transparent'
              checked={this.state.checked}
              onPress={() => { this.setState({ checked: !this.state.checked }) }}
            /> */}
          {/* </View> */}

        </View>
      </ImageBackground>

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
    backgroundColor: "#1F94F4"
  },
  welcomebacktext: {
    color: "#1F94F4",
    fontSize: 25,
    textAlign: "center",
    marginVertical: 20
  },
  inputbox: {
    // marginHorizontal: 20,
    height: 50,
    minWidth: '80%',
    borderColor: "gray",
    borderWidth: 0,

    // marginVertical: 15,
    borderWidth: 2,
    backgroundColor: '#F5F5F5',
    borderRadius: 4,
    fontSize: 20

  },
  botton: {
    height: 50,
    minWidth: '90%',
    alignItems: "center",
    alignSelf: 'center',
    // marginTop: 70,
    borderRadius: 25,
    width: '50%',
    // top:50,
    justifyContent: "center",
    margin: 30,
    backgroundColor: '#8A1212'
  },
  bottontext: {
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
    color: "#FFF"
  },
  flexContent: {
    height: "33%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: '10%', width: '50%', marginHorizontal: '25%'
  },
});

export default DefaultScreen(Login);
