import React, { Component } from "react";
import { StyleSheet, ScrollView, Alert } from "../../components/core";
import GroupItem from '../../components/GroupItem'
import { NavigationActions } from 'react-navigation'
import DefaultScreen from '../../hoc/DefaultScreen'
import {  db } from '../../helpers/db'
import API from "../../apis";


class GroupList extends Component {

  state = {
    groups: [],
  };

  selectedEvaluation;
  subs;

  componentDidMount() {
    this.subs = this.props.navigation.addListener("didFocus", () => {
      this.getAllGroups();
    });

  }

  componentWillUnmount() {
    this.subs.remove();
  }

  getAllGroups = () => {
    let query = `select g.name as group_name, f.name as farm_name, g.id as id from groups g inner join farms f on g.farm_id=f.id where g.is_active=?`;
    
    db.transaction((tx) => {
      tx.executeSql(query, [1], (tx, results)=> { 
        this.setState({groups: results.rows.raw()})
       })
    })
  }

  editGroup = (id) => {
    this.props.navigation.push('Form', { id , header: 'Edit Group'});
  }

  deleteGroup = (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure to delete this group?',
      [
        {text: 'Cancel', onPress: () => {}, style: 'cancel'},
        {text: 'OK', onPress: () => {

          db.transaction((tx) => {
            tx.executeSql('update groups set is_active=?, is_sync=?  where id = ?', [0, 0, id], () => {
              this.props.syncData();
              this.getAllGroups();
            });
          })
        }},
      ],
      { cancelable: false }
    )
  }

  render() {
    const {
      container,
    } = styles;
    return (
      <ScrollView style={container}>
        {this.state.groups.map((i, key) => {
          return <GroupItem 
          onPressDetail={() => {}}
          onPressDelete={this.deleteGroup}
          onPressEdit={this.editGroup}
          name={i.group_name}
          id={i.id}
          farmName={i.farm_name} key={key}  />;
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%"
  },
});

export default DefaultScreen(GroupList);
