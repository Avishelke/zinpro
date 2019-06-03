import React, { Component } from "react";
import { StyleSheet, View, ScrollView, TextInput, Text, WebView, Platform } from "react-native";
import { db } from '../../helpers/db'
import DefaultScreen from "../../hoc/DefaultScreen";
import BottomButton from "./../../components/BottomButton";
import { SHOW_SUCCESS_MESSAGE } from "../../redux/actions";
const isAndroid= Platform.OS==='android'


class Zinpro extends Component {


  date;
  evaluation_group_id;

  componentDidMount = () => {
    // this.evaluation_group_id = this.props.selectedEvaluationGroup;
    this.evaluation_group_id = this.props.navigation.getParam('evaluationId');

    db.transaction((tx) => {
      tx.executeSql(`select * from herd_census WHERE evaluation_group_id=?`, [this.evaluationId], (tx, r) => {
        const { length, id } = r.rows;

        if (length > 0) {
          const { data, id } = r.rows.item(0);
          let sheet = JSON.parse(data);


          let updatedata = sheet.splice(0,7).concat([
            ["",""],
            ["Total",
              this.getFormual('SUM(B2:B8)'),this.getFormual('SUM(C2:C8)'),
              this.getFormual('SUM(D2:D8)'), this.getFormual('SUM(E2:E8)'),
              this.getFormual('SUM(F2:F8)')
            ],
            ["",""],
          ]);

          this.setState({ data: updatedata, id}, () => {
            setTimeout(() => {
              this.webView.postMessage(JSON.stringify(this.state.data));
            } , 1000);
          });
          
        }else{
          setTimeout(() => {
            this.webView.postMessage(JSON.stringify(this.state.data));
          } , 1000);
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
    data: [
      ["","MAX","2019-02-04","2019-02-05","2019-02-06","2019-02-07"],
      ["PARITY 1",13,"","","",""],["PARITY 2",12,"","","",""],["PARITY 3",9,"","","",""],["PARITY 4",6,"","","",""],
      ["PARITY 5",5,"","","",""],["PARITY 6",2,"","","",""],["PARITY >6","","","","",""],["",""],
      ["Total",
        this.getFormual('SUM(B2:B8)'),this.getFormual('SUM(C2:C8)'),
        this.getFormual('SUM(D2:D8)'), this.getFormual('SUM(E2:E8)'),
        this.getFormual('SUM(F2:F8)')
      ],
      ["",""],
    ],
    id: false
  };

  saveHerdCensus= () =>{

    const {data, tableMidHead} = this.state;
    let query = '';
    let args = []
    if(this.state.id === false){
      query = `INSERT INTO herd_census (data,date,is_sync,evaluation_group_id, is_active) VALUES (?,?,?,?,?)`;
      args = [JSON.stringify(data), this.date, 0 ,this.evaluation_group_id, 1];
    }else{
      query = `update herd_census set data=?, is_sync=? where id=?`;
      args = [JSON.stringify(data), 0 ,this.state.id];
    }


    db.transaction((tx) => {
      tx.executeSql(query, args, (tx, r) => {
        this.props.syncData();
        setTimeout(() => {
          // this.props.navigation.navigate('Assessor');
        } , 1000)
    });
  })

}

  
onMessage= (event) =>  {

  let data = JSON.parse(event.nativeEvent.data);

  this.setState({ data }, () => {
    this.saveHerdCensus();
  })

}



render() {

  return (
    <WebView
      source={{ uri: isAndroid ? 'file:///android_asset/herdcensus.html': './herdcensus.html' }}
      ref={(webView) => this.webView = webView}
      onMessage={this.onMessage}
      scalesPageToFit />
  );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  header: { height: 50, backgroundColor: "#89060D" },
  text: { textAlign: "center", fontWeight: "400" , color: "white"},
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: "#E7E6E1" },
  headerT: {
    paddingVertical: 20,
    fontSize: 20,
    textAlign: "center"
  },
});

export default DefaultScreen(Zinpro)
