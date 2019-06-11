/* eslint react/no-did-mount-set-state: 0 */

import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, WebView, Platform } from 'react-native';
import { db } from '../../../helpers/db';
import RNFetchBlob from 'rn-fetch-blob';
import Button from '../../../components/Button';

const isAndroid = Platform.OS === 'android';

export default class App extends React.Component {
  evaluationId;
  constructor(props) {
    super(props);
    this.webView = null;
  }

  componentDidMount() {

    let id = this.props.navigation.getParam('id');
    this.evaluationId = this.props.navigation.getParam('evaluatinId');
    db.transaction((tx) => {
      tx.executeSql(`select * from claw_collection where evaluation_group_id=?`, [this.evaluationId], (tx, r) => {
        const { data } = r.rows.item(0);
        let cldata = JSON.parse(data);

        setTimeout(() => {
          this.webView.postMessage(JSON.stringify(Object.values(cldata)));
        }, 1000);
      })

    })
  }

  downloadReport = () => {
    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        notification: true,
        useDownloadManager: true,
        // Title of download notification
        title: 'claw-collection graph',
        // File description (not notification description)
        description: 'Graph report',
        mime: 'application/pdf',
        // Make the file scannable  by media scanner
        mediaScannable: true,
      }

    })
      .fetch('GET', "http://taskgrids.com/zinpro/claw-collection/report?evaluation_group_id=" + this.evaluationId)
      .then((res) => {
        Alert.alert(
          'File Status',
          'PDF Download Successfully',
          [
            { text: 'OK', onPress: () => { } },
          ],
          { cancelable: false },
        );
      })
  }


  render() {
    return (
      <View style={{flex: 1, flexDirection:'column'}}>
        <WebView
          source={{ uri: isAndroid ? 'file:///android_asset/clawgraph.html' : './clawgraph.html' }}
          ref={(webView) => this.webView = webView}
          onMessage={this.onMessage}
          scalesPageToFit />
        <Button text={"Download"} onPress={this.downloadReport} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ecf0f1',
  },
});
