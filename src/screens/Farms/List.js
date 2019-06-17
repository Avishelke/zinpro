import React, { Component } from "react";
import { StyleSheet, ScrollView, Alert } from "../../components/core";
import FarmItem from '../../components/FarmItem';
import { db } from '../../helpers/db'
import DefaultScreen from "../../hoc/DefaultScreen";
import { NavigationActions } from 'react-navigation'
import API from "../../apis";


class FarmList extends Component {

  state = {
    farms: [],
  }

  subs;

  componentDidMount() {
    this.subs = this.props.navigation.addListener("didFocus", () => {
      this.getAllFarms();
    });
  }

  componentWillUnmount() {
    this.subs.remove();
  }

  getAllFarms = () => {
    let query = 'select * from farms where is_active=?';

    db.transaction((tx) => {
      tx.executeSql(query, [1], (tx, results) => {
        this.setState({ farms: results.rows.raw() })
      })
    })
  }

  editFarm = (id) => {
    this.props.navigation.push('Form', { id, header: 'Edit Farm' });
  }

  navigateToEvaluation = async (farm_id) => {

    const actionToDispatch = NavigationActions.navigate({
      routeName: 'Evalutions',
      params: { farm_id }
    });

    await this.props.selectFarm(farm_id);
    await this.props.navigation.dispatch(actionToDispatch);

  }

  deleteFarm(id) {
    Alert.alert(
      'Confirm Delete',
      'Are you sure to delete this farm?',
      [
        { text: 'Cancel', onPress: () => { }, style: 'cancel' },
        {
          text: 'OK', onPress: () => {
            db.transaction((tx) => {
              tx.executeSql('update farms set is_active=?, is_sync=?  where id = ?', [0, 0, id], (tx, res) => {
                this.getAllFarms();
                tx.executeSql('select * evaluations where farm_id = ?', [id], (tx, row) => {
                  var evaluationId = row.rows.item(0);
                  tx.executeSql('update evaluations set is_active=?, is_sync=?  where farm_id = ?', [0, 0, id], (tx, results) => {
                    tx.executeSql('update claw_collection set is_active=?, is_sync=?  where evaluation_group_id = ?', [0, 0, evaluationId], (tx, results) => {
                      tx.executeSql('update cull_data set is_active=?, is_sync=?  where evaluation_group_id = ?', [0, 0, evaluationId], (tx, results) => {
                        tx.executeSql('update gestation_assessor set is_active=?, is_sync=?  where evaluation_group_id = ?', [0, 0, evaluationId], (tx, results) => {
                          tx.executeSql('update gilt_assessor set is_active=?, is_sync=?  where evaluation_group_id = ?', [0, 0, evaluationId], (tx, results) => {
                            tx.executeSql('update gilt_break_even set is_active=?, is_sync=?  where evaluation_group_id = ?', [0, 0, evaluationId], (tx, results) => {
                              tx.executeSql('update herd_census set is_active=?, is_sync=?  where evaluation_group_id = ?', [0, 0, evaluationId], (tx, results) => {
                                tx.executeSql('update insemination_assessor set is_active=?, is_sync=?  where evaluation_group_id = ?', [0, 0, evaluationId], (tx, results) => {
                                  tx.executeSql('update lactation_assessor set is_active=?, is_sync=?  where evaluation_group_id = ?', [0, 0, evaluationId], (tx, results) => {
                                    this.props.syncData();
                                  })
                                })
                              })
                            })
                          })
                        })
                      })
                    })
                  })
                })
                this.props.syncData();
              });
            })
          }
        },
      ],
      { cancelable: false }
    )
  }

  render() {
    const { container } = styles;

    return <ScrollView style={container}>
      {this.state.farms.map((farm, key) => {
        return <FarmItem
          onPressDetail={this.navigateToEvaluation}
          onPressDelete={() => this.deleteFarm(farm.id)}
          onPressEdit={this.editFarm}
          name={farm.name}
          id={farm.id}
          groupcount={farm.groups}
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

export default DefaultScreen(FarmList);
