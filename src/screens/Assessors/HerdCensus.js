import React, { Component } from "react";
import { StyleSheet, View, ScrollView, TextInput, Text, WebView, Platform } from "react-native";
import DatePicker from 'react-native-datepicker'
import { db } from '../../helpers/db'
import { ToastAndroid } from 'react-native';

import DefaultScreen from "../../hoc/DefaultScreen";
import BottomButton from "./../../components/BottomButton";
import { SHOW_SUCCESS_MESSAGE } from "../../redux/actions";
const isAndroid = Platform.OS === 'android'


class HerdCensus extends Component {
  date;
  evaluation_group_id;

  componentDidMount = () => {
    // this.evaluation_group_id = this.props.selectedEvaluationGroup;
    this.evaluation_group_id = this.props.navigation.getParam('evaluationId');

    db.transaction((tx) => {
      tx.executeSql(`select * from herd_census WHERE evaluation_group_id=?`, [this.evaluation_group_id], (tx, r) => {
        const { length, id } = r.rows;

        if (length > 0) {
          const { data, id, date } = r.rows.item(0);
          let sheet = JSON.parse(data);
          this.setState({
            id: id, date: date,
            parity_1: sheet[1][1].toString(),
            parity_2: sheet[2][1].toString(),
            parity_3: sheet[3][1].toString(),
            parity_4: sheet[4][1].toString(),
            parity_5: sheet[5][1].toString(),
            parity_6: sheet[6][1].toString(),
            parity6: sheet[7][1].toString()
          });

          let updatedata = sheet.splice(0, 7).concat([
            ["", ""],
            ["Total",
              this.getFormual('SUM(B2:B8)'), this.getFormual('SUM(C2:C8)'),
              this.getFormual('SUM(D2:D8)'), this.getFormual('SUM(E2:E8)'),
              this.getFormual('SUM(F2:F8)')
            ],
            ["", ""],
          ]);

          this.setState({ data: updatedata }, () => {
            setTimeout(() => {
              // this.webView.postMessage(JSON.stringify(this.state.data));
            }, 1000);
          });

        } else {
          setTimeout(() => {
            // this.webView.postMessage(JSON.stringify(this.state.data));
          }, 1000);
        }
      });
    })
  }

  constructor(props) {
    super(props);
    this.webView = null;

    this.date = new Date().toISOString().slice(0, 10);
  }

  getFormual(formula) {
    return `=IF(${formula}=0,"",${formula})`
  }

  state = {
    parity_1: '',
    parity_2: '',
    parity_3: '',
    parity_4: '',
    parity_5: '',
    parity_6: '',
    parity6: '',

    data: [
      ["", "IDEAL", "2019-02-04", "2019-02-05", "2019-02-06", "2019-02-07"],
      ["PARITY 1", 13, "", "", "", ""], ["PARITY 2", 12, "", "", "", ""], ["PARITY 3", 9, "", "", "", ""], ["PARITY 4", 6, "", "", "", ""],
      ["PARITY 5", 5, "", "", "", ""], ["PARITY 6", 2, "", "", "", ""], ["PARITY >6", "", "", "", "", ""], ["", ""],
      ["Total",
        this.getFormual('SUM(B2:B8)'), this.getFormual('SUM(C2:C8)'),
        this.getFormual('SUM(D2:D8)'), this.getFormual('SUM(E2:E8)'),
        this.getFormual('SUM(F2:F8)')
      ],
      ["", ""],
    ],

    id: false,
    date: this.date
  };

  saveHerdCensus = () => {
    let herdData = [
      ["", "IDEAL", "2019-02-04", "2019-02-05", "2019-02-06", "2019-02-07"],
      ["PARITY 1", parseInt(this.state.parity_1), "", "", "", ""],
      ["PARITY 2", parseInt(this.state.parity_2), "", "", "", ""],
      ["PARITY 3", parseInt(this.state.parity_3), "", "", "", ""],
      ["PARITY 4", parseInt(this.state.parity_4), "", "", "", ""],
      ["PARITY 5", parseInt(this.state.parity_5), "", "", "", ""],
      ["PARITY 6", parseInt(this.state.parity_6), "", "", "", ""],
      ["PARITY >6", parseInt(this.state.parity6), "", "", "", ""], ["", ""],
      ["Total",
        this.getFormual('SUM(B2:B8)'), this.getFormual('SUM(C2:C8)'),
        this.getFormual('SUM(D2:D8)'), this.getFormual('SUM(E2:E8)'),
        this.getFormual('SUM(F2:F8)')
      ],
      ["", ""],
    ];

    let query = '';
    let args = []

    if (this.state.id === false) {
      query = `INSERT INTO herd_census (data,date,is_sync,evaluation_group_id, is_active) VALUES (?,?,?,?,?)`;
      args = [JSON.stringify(herdData), this.state.date, 0, this.evaluation_group_id, 1];
    } else {
      query = `update herd_census set data=?, date=?, is_sync=? where id=?`;
      args = [JSON.stringify(herdData), this.state.date, 0, this.state.id];
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

    this.setState({ data }, () => {
      this.saveHerdCensus();
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
      // <WebView
      //   source={{ uri: isAndroid ? 'file:///android_asset/herdcensus.html': './herdcensus.html' }}
      //   ref={(webView) => this.webView = webView}
      //   onMessage={this.onMessage}
      //   scalesPageToFit />
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

          <TextInput
            value={this.state.parity_1}
            placeholder={"PARITY-1 "}
            style={inputbox}
            keyboardType={'numeric'}
            onChangeText={(parity_1) => this.setState({ parity_1 })}
          />
          <TextInput
            value={this.state.parity_2}
            placeholder={"PARITY-2 "}
            style={inputbox}
            keyboardType={'numeric'}
            onChangeText={(parity_2) => this.setState({ parity_2 })}
          />
          <TextInput
            value={this.state.parity_3}
            placeholder={"PARITY-3 "}
            style={inputbox}
            keyboardType={'numeric'}
            onChangeText={(parity_3) => this.setState({ parity_3 })}
          />
          <TextInput
            value={this.state.parity_4}
            placeholder={"PARITY-4"}
            style={inputbox}
            keyboardType={'numeric'}
            onChangeText={(parity_4) => this.setState({ parity_4 })}
          />
          <TextInput
            value={this.state.parity_5}
            placeholder={"PARITY-5 "}
            style={inputbox}
            keyboardType={'numeric'}
            onChangeText={(parity_5) => this.setState({ parity_5 })}
          />
          <TextInput
            value={this.state.parity_6}
            editable={this.state._id ? false : true}
            keyboardType={'numeric'}
            onChangeText={(parity_6) => this.setState({ parity_6 })}
            placeholder={"PARITY-6"} style={inputbox}
          />
          <TextInput
            value={this.state.parity6}
            keyboardType={'numeric'}
            onChangeText={(parity6) => this.setState({ parity6 })}
            placeholder={"PARITY>6"} style={inputbox}
          />

        </ScrollView>

        <BottomButton text={"Save"} onPress={this.saveHerdCensus} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
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

export default DefaultScreen(HerdCensus)
