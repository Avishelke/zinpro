import React, { Component } from "react";
import { StyleSheet, ScrollView, Alert } from "../../../components/core";
import AssessItem from '../../../components/AssessItem';
import { db } from '../../../helpers/db'


class GiltList extends Component {

  state = {
    list: [],
  }

  componentDidMount() {
    let query = `select printf('%s %s', e.first_name, e.last_name) as name, gc.date,gc.id, f.name as farm_name, e.id as evaluatinId from cull_data gc 
    inner join evaluations e on e.id = gc.evaluation_group_id
    inner join farms f on f.id = e.farm_id
    where gc.is_active=?  order by gc.id DESC`;

    db.transaction((tx) => {
      tx.executeSql(query, [1], (tx, results) => {
        this.setState({ list: results.rows.raw() })
        console.log("results.rows.raw()::::::::::", results.rows.raw())
      })
    })
  }

  navigateToInfo = async (id, evaluatinId) => {
    this.props.navigation.navigate('Info', { id, evaluatinId })
  }

  render() {
    const { container } = styles;

    return <ScrollView style={container}>
      {this.state.list.map((i, key) => {
        return <AssessItem
          onPressDetail={this.navigateToInfo}
          item={i}
          key={key} />
      })}
    </ScrollView>
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%"
  },
});

export default GiltList;
