/* eslint react/no-did-mount-set-state: 0 */

import * as React from 'react';
import { Text, View, StyleSheet, ScrollView , WebView, Platform} from 'react-native';
import { db } from '../../../helpers/db'
const isAndroid= Platform.OS==='android'


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.webView = null;
  }
  componentDidMount() {

    let id = this.props.navigation.getParam('id')
    db.transaction((tx) => {
        tx.executeSql(`select * from claw_collection where id=?`, [id], (tx, r) => {
        const { data} = r.rows.item(0);
        let cldata = JSON.parse(data); 
        
        setTimeout(() => {
          this.webView.postMessage(JSON.stringify(Object.values(cldata)));
        } , 1000);
        })

    })
  }

  render() {
    return (
      <WebView
        source={{ uri: isAndroid ? 'file:///android_asset/clawgraph.html': './clawgraph.html' }}
        ref={(webView) => this.webView = webView}
        onMessage={this.onMessage}
        scalesPageToFit />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ecf0f1',
  },
});
