import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  WebView,
  Platform,
  ToastAndroid
} from "react-native";
import BottomButton from "./../../components/BottomButton";

import { db } from '../../helpers/db'
import DefaultScreen from "../../hoc/DefaultScreen";
import { SHOW_SUCCESS_MESSAGE } from "../../redux/actions";

const isAndroid= Platform.OS==='android'

class ClawCollection extends Component {

  state = {
    data: {},
    id: false
  }


  date;
  evaluation_group_id;
  evaluationId;
  constructor(props) {
    super(props);
    this.webView = null;

    this.date = new Date().toISOString().slice(0, 10);
    this.evaluationId = this.props.navigation.getParam('evaluationId');
  }

  componentDidMount = () => {
    this.evaluation_group_id = this.evaluationId;

    db.transaction((tx) => {
      tx.executeSql(`select * from claw_collection WHERE evaluation_group_id=?`, [this.evaluationId], (tx, r) => {
        const { length } = r.rows;

        if (length > 0) {
          const { data, id } = r.rows.item(0);

          this.setState({id, data}, () => {
            setTimeout(() => {
              this.webView.postMessage(data);
            }, 1000);
          })

        } else {
          setTimeout(() => {
            this.webView.postMessage(JSON.stringify({}));
          }, 1000);
        }
      });
    })
  }

  saveCollection = () => {

    let query = '';
    let args = []
    if (this.state.id === false) {
      query = `INSERT INTO claw_collection (data,date,is_sync,evaluation_group_id, is_active) VALUES (?,?,?,?,?)`;
      args = [JSON.stringify(this.state.data), this.date, 0, this.evaluation_group_id, 1];
    } else {
      query = `update claw_collection set data=?, is_sync=? where id=?`;
      args = [JSON.stringify(this.state.data), 0, this.state.id]
    }

    db.transaction((tx) => {
      tx.executeSql(query, args, (tx, r) => {
        this.props.syncData();
        ToastAndroid.show('Saved Sucess !', ToastAndroid.SHORT);
        setTimeout(() => {
          // this.props.navigation.navigate('Assessor');
        }, 500)
      });
    })

  }

  onMessage = (event) => {
    let data = Object.values(JSON.parse(event.nativeEvent.data));
    this.setState({ data }, () => {
      this.saveCollection();
    })
  }

  render() {

    return (
      <WebView
        source={{ uri: isAndroid ? 'file:///android_asset/clawcollection.html': './clawcollection.html' }}
        ref={(webView) => this.webView = webView}
        onMessage={this.onMessage}
        scalesPageToFit />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%"
  },
  excelrow: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 20
  },
  headerT: {
    paddingVertical: 20,
    fontSize: 20,
    textAlign: "center"
  },
  bordernonecolumn: {
    width: 60,
    height: 20
  },
  tabletopheader: {
    borderWidth: 2,
    borderBottomWidth: 1,
    width: 120,
    // borderBottomStyle: "dotted"
  }
});

export default DefaultScreen(ClawCollection);
