import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Picker, ToastAndroid } from "../../components/core";
import { db } from '../../helpers/db';
import AssessorsItem from "../../components/AssessorsItem";

class List extends Component {

  assessors = [
    { image: 'anatomy', 'url': 'ClawAnatomy.pdf', label: 'Gilt', _label: 'Gilt', icon: 'ic_gilt' },
    { image: 'definitions', 'url': 'MoreInfo.pdf', label: 'Insemination', _label: 'Insemination', icon: 'ic_insemination' },
    { image: 'scoring', 'url': 'LesionScoring.pdf', label: 'Gestation', _label: 'Gestation', icon: 'ic_gestation' },
    { image: 'userguide', 'url': 'FeetFirst_UserGuide.pdf', label: 'Lactation', _label: 'Lactation', icon: 'ic_lactation' },
    { image: 'userguide', 'url': 'FeetFirst_UserGuide.pdf', label: 'HerdProfile', _label: 'Herd Profile', icon: 'ic_herd_census' },
    { image: 'userguide', 'url': 'FeetFirst_UserGuide.pdf', label: 'SowReplacement', _label: 'SowReplacement', icon: 'ic_cull_data' },

    { image: 'userguide', 'url': 'FeetFirst_UserGuide.pdf', label: 'GiltBreakEven', _label: 'Gilt BreakEven', icon: 'ic_gilt_break_even' },
    { image: 'userguide', 'url': 'FeetFirst_UserGuide.pdf', label: 'ClawGraph', _label: 'Claw Graph', icon: 'ic_claw_graph' },
  ];

  state = {
    evaluationList: [],
    evaluationId: ''
  }

  componentDidMount() {
    db.transaction((tx) => {
      tx.executeSql('select * from evaluations where is_active=?', [1], (tx, results) => {
        // console.log("results.rows.raw()::::::", results.rows.raw());
        this.setState({ evaluationList: results.rows.raw() })
      })
    })
  }

  navigateAssessorScreen = (route) => {
    if (this.state.evaluationId) {
      this.props.navigation.navigate(route, { type: route, evaluatinId: this.state.evaluationId });
    } else {
      ToastAndroid.show('Please select evaluation', ToastAndroid.SHORT);
    }
  }

  renderPicker = (label, value) => {
    let key = Math.random();
    return <Picker.Item label={label} value={value} key={key} />
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{ marginBottom: '10%' }}>
          <Picker
            selectedValue={this.state.evaluationId}
            prompt={""}
            style={[styles.inputbox, { height: 50, width: '80%', marginLeft: '10%' }]}
            onValueChange={(itemValue, itemIndex) => { this.setState({ evaluationId: itemValue }) }}
          >
            {this.renderPicker("Select Evaluation", "")}
            {this.state.evaluationList.map((item, key) => this.renderPicker(item.first_name + ' ' + item.last_name, item.id))}
          </Picker>
          <View style={styles.listcontaner}>
            {
              this.assessors.map((info, key) => <AssessorsItem
                onPress={this.navigateAssessorScreen}
                key={key}
                label={info.label}
                _label={info._label}
                icon={info.icon} />)
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    marginTop: 20
  },
  listcontaner: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  inputbox: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    borderBottomWidth: 1
  }
});

export default List;
