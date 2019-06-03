import React, { Component } from "react";
import { StyleSheet, ScrollView, Alert } from "../../components/core";
import Item from './_group/Item'
import DefaultScreen from '../../hoc/DefaultScreen'
import { db } from '../../helpers/db'
import { NavigationActions, } from 'react-navigation'

class GroupList extends Component {

    state = {
        groups: [],
    };

    selectedEvaluation;

    componentDidMount() {
        this.selectedEvaluation = this.props.selectedEvaluation;
        this.getAllGroups();
    }

    navigateToAssessors = async () => {
        
        const actionToDispatch = NavigationActions.navigate({
          routeName: 'Assessors',
          action : { routeName: 'List'}
        });
    
        await this.props.navigation.popToTop();
        await this.props.navigation.dispatch(actionToDispatch);
      }

    getAllGroups = () => {
        
        let query = `select g.id as id, f.name as farm_name, g.name as group_name from evaluations_groups eg 
    inner join groups g on g.id=eg.group_id 
    inner join farms f on f.id=g.farm_id 
    where eg.evaluation_id=? and f.is_active=1 and g.is_active=1 and eg.is_active=1`;

        db.transaction((tx) => {
            tx.executeSql(query, [this.selectedEvaluation], (tx, results) => {
                this.setState({ groups: results.rows.raw() })
            })
        })
    }

    onTapGroup = (id) => {
        db.transaction((tx) => {
            tx.executeSql(`select id from evaluations_groups where group_id=? and evaluation_id=?`, [id, this.selectedEvaluation], (tx, results) => {
                let row = results.rows.raw()[0];
                if(row){
                    this.props.selectEvaluationGroup(row.id)

                    this.navigateToAssessors()
                }
            })
        })
    }

    render() {
        const {
            container,
        } = styles;
        return (
            <ScrollView style={container}>
                {this.state.groups.map((i, key) => {
                    return <Item
                        onPressDetail={this.onTapGroup}
                        name={i.group_name}
                        id={i.id}
                        farmName={i.farm_name} key={key} />;
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
