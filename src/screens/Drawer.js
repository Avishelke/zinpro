import React, { Component } from "react";
import { NavigationActions, StackActions } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { store } from '../redux/store'
import { SELECT_EVALUATION } from '../redux/actions'

import { THEME_COLOR } from '../helpers/theme';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight, AsyncStorage
} from "../components/core";
import { LOGIN_TOKEN } from "../helpers/constants";
import { db } from "../helpers/db";

class Drawer extends Component {



  navigateToScreen = (route) => {

    const navigateAction = NavigationActions.navigate({
      routeName: route
    });

    this.props.navigation.closeDrawer()
    this.props.navigation.dispatch(navigateAction);

  };

  logout = () => {
    AsyncStorage.removeItem('IS_LOOGED_IN').then(() => {
      this.props.navigation.navigate('Login');
    });
    //   AsyncStorage.removeItem(LOGIN_TOKEN).then(() => {
        db.transaction((tx) => {
          tx.executeSql(`delete from claw_collection`),
          tx.executeSql(`delete from cull_data`),
          tx.executeSql(`delete from evaluations`),
          tx.executeSql(`delete from evaluations_groups`),
          tx.executeSql(`delete from farms`),
          tx.executeSql(`delete from field_sheet`),
          tx.executeSql(`delete from gestation_assessor`),
          tx.executeSql(`delete from gilt_assessor`),
          tx.executeSql(`delete from gilt_break_even`),
          tx.executeSql(`delete from groups`),
          tx.executeSql(`delete from herd_census`),
          tx.executeSql(`delete from insemination_assessor`),
          tx.executeSql(`delete from evaluations_groups`),
          tx.executeSql(`DELETE FROM sqlite_sequence`)
      }, 
      () => {}, 
      () => {this.props.navigation.navigate('Login')})
    // })
  }

  navigateToGroup = () => {
    store.dispatch({ type: SELECT_EVALUATION, payload: null });
    this.navigateToScreen('Groups');
  }

  navigateToEvaluations = () => {
    this.props.navigation.closeDrawer()
    this.props.navigation.dispatch(StackActions.popToTop());

    this.props.navigation.navigate(
      'Evalutions', {}, NavigationActions.navigate({ routeName: 'List' })
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <TouchableHighlight underlayColor={THEME_COLOR} onPress={() => { this.navigateToScreen('Groups') }}>
          <View style={styles.linkContainer}>
            <View >
              <Icon name={"list"} size={20} />
            </View>
            <Text style={styles.sectionHeadingStyle}>Groups</Text>
          </View>
        </TouchableHighlight> */}

        <TouchableHighlight underlayColor={THEME_COLOR} onPress={() => { this.navigateToScreen('Farms') }}>
          <View style={styles.linkContainer}>
            <View >
              <Icon name={"list"} size={20} />
            </View>
            <Text style={styles.sectionHeadingStyle}>Farms</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor={THEME_COLOR} onPress={() => { this.navigateToEvaluations() }}>
          <View style={styles.linkContainer}>
            <View >
              <Icon name={"list"} size={20} />
            </View>
            <Text style={styles.sectionHeadingStyle}>Evaluations</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor={THEME_COLOR} onPress={() => { this.navigateToScreen('Assessors') }}>
          <View style={styles.linkContainer}>
            <View >
              <Icon name={"list"} size={20} />
            </View>
            <Text style={styles.sectionHeadingStyle}>Assessors</Text>
          </View>
        </TouchableHighlight>



        <TouchableHighlight underlayColor={THEME_COLOR} onPress={() => { this.navigateToScreen('Graphs') }} >
          <View style={styles.linkContainer}>
            <View>
              <Icon name={"graphic-eq"} size={20} />
            </View>
            <Text style={styles.sectionHeadingStyle}>Graphs</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight underlayColor={THEME_COLOR} onPress={() => { this.navigateToScreen('MoreInfo') }} >
          <View style={styles.linkContainer}>
            <View>
              <Icon name={"help"} size={20} />
            </View>
            <Text style={styles.sectionHeadingStyle}>Academy</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight underlayColor={THEME_COLOR} onPress={this.logout} >
          <View style={styles.linkContainer}>
            <View>
              <Icon name={"power-settings-new"} size={20} />
            </View>
            <Text style={styles.sectionHeadingStyle}>Logout</Text>
          </View>
        </TouchableHighlight>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1
  },

  sectionHeadingStyle: {
    marginLeft: 20,
    fontWeight: "bold",
    fontSize: 20,

  },
  footerContainer: {
    padding: 20,
    backgroundColor: "lightgrey"
  },
  linkContainer: {
    flexDirection: "row",
    display: "flex",
    marginLeft: 20,
    marginVertical: 5,
    padding: 10
  },
  iconHeadingStyle: {
    marginLeft: 20,
    padding: 10
  }
});

export default Drawer;
