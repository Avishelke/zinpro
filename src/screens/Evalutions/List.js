import React, { Component } from "react";
import { StyleSheet, ScrollView, Alert, AsyncStorage } from "../../components/core";
import EvaluationItem from '../../components/EvaluationItem';
import { db } from '../../helpers/db'
import DefaultScreen from "../../hoc/DefaultScreen";
import { NavigationActions, withNavigationFocus } from 'react-navigation'
import API from "../../apis";


class EvaluationList extends Component {

  state = {
    evaluations: [],
    isFocused: false
  }

  subs;

  componentDidMount() {
    this.subs = this.props.navigation.addListener("didFocus", () => {
      this.getAllEvaluations();
    });
  }

  componentWillUnmount() {
    this.subs.remove();
  }

  getAllEvaluations = () => {
    let query = `select printf('%s %s', e.first_name, e.last_name) as name,e.id,e.is_active, 
    e.consulation_date as date , f.id as farm_id 
    from evaluations e  inner join farms f on f.id=e.farm_id  where e.is_active=?`;

    db.transaction((tx) => {
      tx.executeSql(query, [1], (tx, results) => {
        this.setState({ evaluations: results.rows.raw(), isFocused: true })

        let id = this.state.evaluations.length > 0 ? this.state.evaluations[this.state.evaluations.length - 1].id : 0;
        AsyncStorage.setItem('evaluationId', JSON.stringify(id));
      })
    })
  }

  navigateToGroupList = async (evaluation_id, farm_id) => {
    await AsyncStorage.setItem('evaluationId', JSON.stringify(evaluation_id));
    await this.props.selectEvaluation(evaluation_id);
    await this.props.selectFarm(farm_id);
    await this.props.navigation.navigate("Assessors");
  }

  deleteEvaluation = (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure to delete this evaluation?',
      [
        { text: 'Cancel', onPress: () => { }, style: 'cancel' },
        {
          text: 'OK', onPress: () => {
            db.transaction((tx) => {
              tx.executeSql('update evaluations set is_active=?, is_sync=?  where id = ?', [0, 0, id], () => {
                this.props.syncData();
                this.getAllEvaluations();
              });
            })
          }
        },
      ],
      { cancelable: false }
    )
  }


  editEvaluation = (id) => {
    this.props.navigation.push('Form', { id, header: 'Edit Evaluation' });
  }

  render() {

    if (this.props.isFocused && !this.state.isFocused) {
      setTimeout(() => { this.getAllEvaluations() }, 500);
    }

    const { container } = styles;

    return <ScrollView style={container}>
      {this.state.evaluations.map((evaluation, key) => {
        return <EvaluationItem
          onPressDetail={this.navigateToGroupList}
          onPressDelete={this.deleteEvaluation}
          onPressEdit={this.editEvaluation}
          name={evaluation.name}
          id={evaluation.id}
          date={evaluation.date}
          farm_id={evaluation.farm_id}
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

export default DefaultScreen(withNavigationFocus(EvaluationList));
