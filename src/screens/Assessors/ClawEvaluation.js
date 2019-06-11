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
  ToastAndroid,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
import BottomButton from "./../../components/BottomButton";
import { THEME_COLOR } from "../../helpers/theme";

import { db } from '../../helpers/db'
import DefaultScreen from "../../hoc/DefaultScreen";
import { SHOW_SUCCESS_MESSAGE } from "../../redux/actions";
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';

const isAndroid = Platform.OS === 'android'

class ClawCollection extends Component {

  state = {
    data: {},
    id: false,
    comment: '',
    image: ''
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
          const { data, id, image, comment } = r.rows.item(0);

          this.setState({ id, data }, () => {
            setTimeout(() => {
              this.webView.postMessage(JSON.stringify({ "data": data, "id": id }));
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
      query = `INSERT INTO claw_collection (data,date,is_sync,evaluation_group_id, is_active,image,comment) VALUES (?,?,?,?,?,?,?)`;
      args = [JSON.stringify(this.state.data), this.date, 0, this.evaluation_group_id, 1, this.state.image, this.state.comment];
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

  knowMore() {
    this.props.navigation.navigate('ZinproAcademy');
  }

  showActionSheet = () => {
    this.ActionSheet.show()
  };

  handleActionSheetPress = (index) => {
    if (index === 0) {
      this.openImagePicker();
    } else if (index === 1) {
      this.openCameraPicker()
    }
  };

  openImagePicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      writeTempFile: false,
      includeBase64: true,
      compressImageQuality: 0.5
    }).then(image => {
      let imaged = `data:image/png;base64,${image.data}`;
      this.setState({ image: imaged });
    });
  }

  openCameraPicker = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      writeTempFile: false,
      includeBase64: true,
      compressImageQuality: 0.5
    }).then(image => {
      let imaged = `data:image/png;base64,${image.data}`;
      this.setState({ image: imaged });
    });
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <ActionSheet
          ref={o => this.ActionSheet = o}
          title={'Which one do you like ?'}
          options={['Choose From Gallery', 'Choose From Camera', 'Cancel']}
          cancelButtonIndex={2}
          onPress={this.handleActionSheetPress}
        />
        <TouchableOpacity onPress={() => this.knowMore()}>
          <Text style={styles.text}>To know more click here</Text>
        </TouchableOpacity>
        <TouchableHighlight onPress={() => { this.showActionSheet() }} style={styles.botton}>
          <Text style={styles.bottontext}>Upload Image</Text>
        </TouchableHighlight>
        <TextInput
          value={this.state.comment}
          placeholder={"Comment"}
          style={[styles.input, { height: 40 }]}
          multiline={true}
          numberOfLines={2}
          onChangeText={(v) => { this.setState({ comment: v }) }}
        />
        <WebView
          source={{ uri: isAndroid ? 'file:///android_asset/clawcollection.html' : './clawcollection.html' }}
          ref={(webView) => this.webView = webView}
          onMessage={this.onMessage}
          scalesPageToFit />
      </View>
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
  },
  text: {
    color: 'blue',
    fontSize: 16,
    padding: 10,
    paddingLeft: 20
  },
  botton: {
    height: 30,
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: THEME_COLOR,
    justifyContent: "center",
    marginLeft: "5%",
    marginRight: '5%'
  },
  bottontext: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    color: THEME_COLOR
  },
  input: {
    height: 60,
    borderColor: "gray",
    marginVertical: 10,
    borderWidth: 1,
    margin: 20
  },
});

export default DefaultScreen(ClawCollection);
