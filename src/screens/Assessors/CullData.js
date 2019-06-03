import React, { Component } from "react";
import { StyleSheet, View, ScrollView, TextInput, Text, WebView, Platform } from "react-native";

import { db } from '../../helpers/db'
import { ToastAndroid } from 'react-native';

import DefaultScreen from "../../hoc/DefaultScreen";
import BottomButton from "./../../components/BottomButton";
import { SHOW_SUCCESS_MESSAGE } from "../../redux/actions";
import DatePicker from 'react-native-datepicker';

const isAndroid = Platform.OS === 'android';

class CullData extends Component {


  date;
  evaluation_group_id;

  constructor(props) {
    super(props);

    this.webView = null;
    this.date = new Date().toISOString().slice(0, 10);
  }

  state = {
    parity_1: '',
    parity_2: '',
    parity_3: '',
    parity_4: '',
    parity_5: '',
    parity_6: '',
    parity6: '',

    culled: '',
    sowp1p2: '',
    sowp2p3: '',
    sowp3p4: '',
    sowp4p5: '',

    data: [
      ['', 'MAX', '', '', '', ''],
      ['PARITY 1', '13', '2019-3-14', '', '', ''],
      ['PARITY 2', '12', '', '', '', ''],
      ['PARITY 3', '9', '', '', '', ''],
      ['PARITY 4', '6', '2019-3-14', '', '', ''],
      ['PARITY 5', '5', '', '', '', ''],
      ['PARITY 6', '2', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['Total',
        '=SUM(B2:B8)',
        '=SUM(C2:C8)',
        '=SUM(D2:D8)',
        '=SUM(E2:E8)',
        '=SUM(F2:F8)'],
      ['', '', '', '', '', ''],
      ['CULLED SOWS BEFORE P4',
        '=SUM(B2:B5)',
        '=SUM(C2:C5)',
        '=SUM(D2:D5)',
        '=SUM(E2:E5)',
        '=SUM(F2:F5)'],
      ['', '', '', '', '', ''],
      ['', '', 'DIFFERENCE', '', '', '=E12-C12'],
      ['', '', '', '', '', ''],
      ['LOST SOWS P1-P2', '', '=C2-C3', '=D2-D3', '=E2-E3', '=F2-F3'],
      ['LOST SOWS P2-P3', '', '=C3-C4', '=D3-D3', '=E3-E4', '=F3-F4'],
      ['LOST SOWS P3-P4', '', '=C4-C5', '=D4-D3', '=E4-E5', '=F4-F5'],
      ['LOST SOWS P4-P5', '', '=C5-C6', '=D5-D3', '=E5-E4', '=F5-F6']
    ],
    id: false,
    date: this.date
  };

  componentDidMount = () => {
    // this.evaluation_group_id = this.props.selectedEvaluationGroup;
    this.evaluation_group_id = this.props.navigation.getParam('evaluationId');

    db.transaction((tx) => {
      tx.executeSql(`select * from cull_data WHERE evaluation_group_id=?`, [this.evaluation_group_id], (tx, r) => {
        const { length, id } = r.rows;

        if (length > 0) {
          const { data, id, date } = r.rows.item(0);
          let sheet = JSON.parse(data);

          this.setState({
            id: id, date: date,
            parity_1: sheet[1][1],
            parity_2: sheet[2][1],
            parity_3: sheet[3][1],
            parity_4: sheet[4][1],
            parity_5: sheet[5][1],
            parity_6: sheet[6][1],
            parity6: sheet[7][1]
          });

          let updatedata = sheet.splice(0, 7).concat([
            ["", ""],
            ["Total", "=SUM(B2:B8)", "=SUM(C2:C8)", "=SUM(D2:D8)", "=SUM(E2:E8)", "=SUM(F2:F8)"], ["", ""],
            ["CULLED SOWS BEFORE P4", "=SUM(B2:B5)", "=SUM(C2:C5)", "=SUM(D2:D5)", "=SUM(E2:E5)", "=SUM(F2:F5)"],
            ["", ""], ["", "", "", "", "", ""], ["", ""],
            ["LOST SOWS P1-P2", "", "", "", "", "="],
            ["LOST SOWS P2-P3", "", "", "", "", ""],
            ["LOST SOWS P3-P4", "", "", "", "", ""],
            ["LOST SOWS P4-P5", "", "", "", "", ""]
          ]);

          this.setState({ data: updatedata }, () => {
            setTimeout(() => {
              // this.webView.postMessage(JSON.stringify(this.state.data));
            }, 1000);
          });

        } else {
          // setTimeout(() => {
          //   this.webView.postMessage(JSON.stringify(this.state.data));
          // }, 1000);
        }

      });
    })
  }

  getFormual(formula) {
    return `=IF(${formula}=0,"",${formula})`
  }

  saveCollection = () => {
    let query = '';
    let args = []

    let cullData = [
      ['', 'MAX', '', '', '', ''],
      ['PARITY 1', this.state.parity_1, '2019-3-14', '', '', ''],
      ['PARITY 2', this.state.parity_2, '', '', '', ''],
      ['PARITY 3', this.state.parity_3, '', '', '', ''],
      ['PARITY 4', this.state.parity_4, '2019-3-14', '', '', ''],
      ['PARITY 5', this.state.parity_5, '', '', '', ''],
      ['PARITY 6', this.state.parity_6, '', '', '', ''],
      ['PARITY>6', this.state.parity6, '', '', '', ''],
      ['Total',
        '=SUM(B2:B8)',
        '=SUM(C2:C8)',
        '=SUM(D2:D8)',
        '=SUM(E2:E8)',
        '=SUM(F2:F8)'],
      ['', '', '', '', '', ''],
      ['CULLED SOWS BEFORE P4',
        '=SUM(B2:B5)',
        '=SUM(C2:C5)',
        '=SUM(D2:D5)',
        '=SUM(E2:E5)',
        '=SUM(F2:F5)'],
      ['', '', '', '', '', ''],
      ['', '', 'DIFFERENCE', '', '', '=E12-C12'],
      ['', '', '', '', '', ''],
      ['LOST SOWS P1-P2', '', '=C2-C3', '=D2-D3', '=E2-E3', '=F2-F3'],
      ['LOST SOWS P2-P3', '', '=C3-C4', '=D3-D3', '=E3-E4', '=F3-F4'],
      ['LOST SOWS P3-P4', '', '=C4-C5', '=D4-D3', '=E4-E5', '=F4-F5'],
      ['LOST SOWS P4-P5', '', '=C5-C6', '=D5-D3', '=E5-E4', '=F5-F6']
    ]

    if (this.state.id === false) {
      query = `INSERT INTO cull_data (data,date,is_sync,evaluation_group_id, is_active) VALUES (?,?,?,?,?)`;
      args = [JSON.stringify(cullData), this.state.date, 0, this.evaluation_group_id, 1];

    } else {
      query = `update cull_data set data=?, is_sync=?,date=? where id=?`;
      args = [JSON.stringify(cullData), 0, this.state.date, this.state.id];
    }

    db.transaction((tx) => {
      tx.executeSql(query, args, (tx, r) => {
        this.props.syncData();
        ToastAndroid.show('Saved Sucess !', ToastAndroid.SHORT);

        setTimeout(() => {
          // this.props.navigation.navigate('Assessor');
        }, 1000)
      });
    })

  }

  onMessage = (event) => {

    let data = JSON.parse(event.nativeEvent.data);
    console.log("test::::::", data);

    this.setState({ data }, () => {
      this.saveCollection();
    })

  }

  render() {
    const {
      container,
      labelText,
      inputboxInline,
      inputboxInlineRight,
      inputbox,
      inlineGroup
    } = styles;
    return (
      <View style={container}>
        <ScrollView style={{ marginBottom: "20%" }}>

          <View style={{ marginTop: 10, marginBottom: 20 }} />
          <DatePicker
            style={{ width: 360 }}
            value={this.state.date}
            date={this.state.date}
            mode="date"
            // placeholder="select date"
            format="YYYY-MM-DD"
            // minDate="2016-05-01"
            // maxDate="2016-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 10,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 70

              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => { this.setState({ date: date }) }}
          />
          <View>

            <Text style={{ margin: 15 }}>
              IDEAL
            </Text>
            <TextInput
              value={this.state.parity_1}
              placeholder={"PARITY-1 (Ideal 13%) "}
              style={inputbox}
              keyboardType={'numeric'}
              onChangeText={(parity_1) => this.setState({ parity_1 })}
            />
            <TextInput
              value={this.state.parity_2}
              placeholder={"PARITY-2 (Ideal 12%) "}
              style={inputbox}
              keyboardType={'numeric'}
              onChangeText={(parity_2) => this.setState({ parity_2 })}
            />
            <TextInput
              value={this.state.parity_3}
              placeholder={"PARITY-3 (Ideal 9%) "}
              style={inputbox}
              keyboardType={'numeric'}
              onChangeText={(parity_3) => this.setState({ parity_3 })}
            />
            <TextInput
              value={this.state.parity_4}
              placeholder={"PARITY-4 (Ideal 6%)"}
              style={inputbox}
              keyboardType={'numeric'}
              onChangeText={(parity_4) => this.setState({ parity_4 })}
            />


            <TextInput
              value={this.state.parity_5}
              placeholder={"PARITY-5 (Ideal 5%) "}
              style={inputbox}
              keyboardType={'numeric'}
              onChangeText={(parity_5) => this.setState({ parity_5 })}
            />
            <TextInput
              value={this.state.parity_6}
              editable={this.state._id ? false : true}
              onChangeText={(parity_6) => this.setState({ parity_6 })}
              keyboardType={'numeric'}
              placeholder={"PARITY-6 (Ideal 2%)"} style={inputbox}
            />
            <TextInput
              value={this.state.parity6}
              editable={this.state._id ? false : true}
              onChangeText={(parity6) => this.setState({ parity6 })}
              keyboardType={'numeric'}
              placeholder={"PARITY>6 (Ideal 13%)"} style={inputbox}
            />
          </View>



          {/* <TextInput
            value={this.state.culled}
            editable={this.state._id ? false : true}
             onChangeText={(culled) => this.setState({ culled })}
            placeholder={"CULLED SOWS BEFORE P-4"} style={inputbox}
          />
          <TextInput
            value={this.state.sowp1p2}
            editable={this.state._id ? false : true}
             onChangeText={(sowp1p2) => this.setState({ sowp1p2 })}
            placeholder={"LOST SOWS P1-P2"} style={inputbox}
          />
          <TextInput
            value={this.state.sowp2p3}
            editable={this.state._id ? false : true}
             onChangeText={(sowp2p3) => this.setState({ sowp2p3 })}
            placeholder={"LOST SOWS P2-P3"} style={inputbox}
          />
          <TextInput
            value={this.state.sowp3p4}
            editable={this.state._id ? false : true}
             onChangeText={(sowp3p4) => this.setState({ sowp3p4 })}
            placeholder={"LOST SOWS P3-P4"} style={inputbox}
          />
          <TextInput
            value={this.state.sowp4p5}
            editable={this.state._id ? false : true}
             onChangeText={(sowp4p5) => this.setState({ sowp4p5 })}
            placeholder={"LOST SOWS P4-P5"} style={inputbox}
          /> */}
        </ScrollView>

        <BottomButton text={"Save"} onPress={this.saveCollection} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  // header: { height: 50, backgroundColor: "#89060D", },
  // text: { textAlign: "center", fontWeight: "400", color: "white" },
  // dataWrapper: { marginTop: -1 },

  // row: { height: 40, backgroundColor: "#E7E6E1" },
  // headerT: {
  //   paddingVertical: 20,
  //   fontSize: 20,
  //   textAlign: "center"
  // },
  inputbox: {
    marginHorizontal: 15,
    height: 40,
    borderColor: "gray",
    borderWidth: 0,
    marginVertical: 10,
    borderBottomWidth: 1
  },
  container: {
    width: "100%",
    height: "100%"
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
});

export default DefaultScreen(CullData)
