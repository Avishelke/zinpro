import React, { Component } from "react";
import { StyleSheet, View, ScrollView, AsyncStorage } from "../../components/core";
import { getValue } from "../../helpers/arrayhelper";
// import RNFetchBlob from 'rn-fetch-blob'

import AssessorsItem from "../../components/AssessorsItem";

class List extends Component {

  state = {
    'evaluationId': 1
  }

  assessors = [
    { image: 'anatomy', 'url': 'ClawAnatomy.pdf', label: 'Gilt', _label: 'Gilt', icon: 'ic_gilt' },

    { image: 'definitions', 'url': 'MoreInfo.pdf', label: 'Insemination', _label: 'Insemination', icon: 'ic_insemination' },
    { image: 'scoring', 'url': 'LesionScoring.pdf', label: 'Gestation', _label: 'Gestation', icon: 'ic_gestation' },

    { image: 'userguide', 'url': 'FeetFirst_UserGuide.pdf', label: 'Lactation', _label: 'Lactation', icon: 'ic_lactation' },
    { image: 'userguide', 'url': 'FeetFirst_UserGuide.pdf', label: 'ClawEvaluation', _label: 'Claw Evaluation', icon: 'ic_claw_graph' },
    { image: 'userguide', 'url': 'FeetFirst_UserGuide.pdf', label: 'HerdProfile', _label: 'Herd Profile', icon: 'ic_herd_census' },
    { image: 'userguide', 'url': 'FeetFirst_UserGuide.pdf', label: 'SowReplacement', _label: 'Sow Replacement', icon: 'ic_cull_data' },
    { image: 'userguide', 'url': 'FeetFirst_UserGuide.pdf', label: 'GiltBreakEven', _label: 'Gilt BreakEven', icon: 'ic_gilt_break_even' },
    { image: 'userguide', 'url': 'FeetFirst_UserGuide.pdf', label: 'FarmInfo', _label: 'Farm Info', icon: 'ic_farm' },

    { image: 'userguide', 'url': 'FeetFirst_UserGuide.pdf', label: 'ZinproAcademy', _label: 'Zinpro Academy', icon: 'zinpro_data' }

  ];

  componentDidMount() {
    AsyncStorage.getItem("evaluationId").then((value) => {
      let id = JSON.parse(value)
      this.setState({ evaluationId: id });
    })
  }

  navigateAssessorScreen = (route) => {
    this.props.navigation.navigate(route, { evaluationId: this.state.evaluationId });
  }

  render() {

    return (
      <View style={styles.container}>
        <ScrollView style={{ marginBottom: '10%' }}
          showsVerticalScrollIndicator={false} >
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
  }
});

export default List;
