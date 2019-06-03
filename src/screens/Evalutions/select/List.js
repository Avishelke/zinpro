import React, { Component } from "react";
import { ScrollView, View, StyleSheet, Picker } from "../../../components/core";
import BottomButton from "../../../components/BottomButton";
import { THEME_COLOR } from "../../../helpers/theme";
import { SHOW_ERROR_MESSAGE } from "../../../redux/actions";
import DefaultScreen from "../../../hoc/DefaultScreen";
import { db } from '../../../helpers/db';
import { NavigationActions, StackActions } from 'react-navigation'
import { getValue } from "../../../helpers/arrayhelper";

class EvaluationForm extends Component {

  subs;

  componentDidMount() {
    this.subs = this.props.navigation.addListener("didFocus", () => {
        this.getAllGroups();
    });
  }

  componentWillUnmount() {
    this.subs.remove();
  }

  getAllGroups() {
    const {selectedFarm, selectedEvaluation} = this.props;

    db.transaction((tx) => {
      tx.executeSql(`select id, name  from groups where is_active= ? and farm_id=? and id not in (
        select group_id from evaluations_groups where evaluation_id=?)
        `, [1, selectedFarm, selectedEvaluation], (tx, results) => {
        this.setState({ groups: results.rows.raw()})
      })
    })
  }

  state = {
    groups: [],
    group_id: '',
    isFocused: false
  };

  navigateToAssessors = async () => {
    const actionToDispatch = NavigationActions.navigate({
      routeName: 'Assessors',
      action : { routeName: 'List'}
    });

    await this.props.navigation.popToTop();
    await this.props.navigation.dispatch(actionToDispatch);
  }

  saveEvaluation = () => {
    const {selectedEvaluation} = this.props;

    if(this.state.group_id){
      db.transaction((tx) => {
        tx.executeSql(`insert into evaluations_groups(evaluation_id, group_id, is_sync) values (?,?,?)` , [selectedEvaluation, this.state.group_id, 0], (r, sql) => {
          const insertId = getValue(sql, 'insertId');
          this.props.selectEvaluationGroup(insertId)
          this.props.syncData();
          this.navigateToAssessors()
        })
      })

    }else{
      this.props.showmessage(SHOW_ERROR_MESSAGE, 'Please Select Group');
    }
  }

  renderPicker = (label, value) => {
    let key = Math.random();
    return <Picker.Item label={label} value={value} key={key} />
  }

  render() {
    
    const {
      container,
      inputbox,
    } = styles;
    return (
      <View style={container}>
        <ScrollView style={{ marginBottom: "20%" }}>

        <Picker
            selectedValue={this.state.group_id}
            prompt={"Select Group"}
            style={[inputbox, { height: 50 }]}
            onValueChange={(itemValue, itemIndex) => {this.setState({ group_id: itemValue })}}
          >
            {this.renderPicker("Select Group", "")}
            {this.state.groups.map((item, key) => this.renderPicker(item.name ,item.id))}
          </Picker>

        </ScrollView>

        <BottomButton text={"Save"} onPress={this.saveEvaluation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%"
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
  inlineGroup: {
    flexDirection: "row", display: 'flex', marginHorizontal: 15
  },
  inputbox: {
    marginHorizontal: 15,
    height: 40,
    borderColor: "gray",
    borderWidth: 0,
    marginVertical: 10,
    borderBottomWidth: 1
  },
  inputboxInline: {
    marginRight: 15,
    height: 40,
    borderColor: "gray",
    borderWidth: 0,
    marginVertical: 10,
    borderBottomWidth: 1,
    flex: 1
  },
  inputboxInlineRight: {
    height: 40,
    borderColor: "gray",
    borderWidth: 0,
    marginVertical: 10,
    borderBottomWidth: 1,
    flex: 1,
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

export default DefaultScreen(EvaluationForm);
