import React, { Component } from "react";
import { ScrollView, View, StyleSheet, Text, TextInput, TouchableHighlight, Image } from "./../../components/core";
import BottomButton from "./../../components/BottomButton";
import { ToastAndroid } from 'react-native';
import { THEME_COLOR } from "./../../helpers/theme";
import DefaultScreen from "../../hoc/DefaultScreen";
import { SHOW_ERROR_MESSAGE, SHOW_SUCCESS_MESSAGE } from '../../redux/actions';
import Rate from "../../components/Rate";
import ImagePicker from 'react-native-image-crop-picker';
import { db } from '../../helpers/db'
import ActionSheet from 'react-native-actionsheet'

class Insemination extends Component {

  selectedImageIndex;

  date;
  evaluationId;
  constructor(props) {
    super(props);
    this.date = new Date().toISOString().slice(0, 10);
    this.evaluationId = this.props.navigation.getParam('evaluationId');
  }

  toast() {
    ToastAndroid.show('Saved Sucess !', ToastAndroid.SHORT);
  }

  componentDidMount = () => {

    let evaluation_group_id = this.props.selectedEvaluationGroup;

    db.transaction((tx) => {
      tx.executeSql(`select * from insemination_assessor WHERE evaluation_group_id=?`, [this.evaluationId], (tx, r) => {
        let row = r.rows.item(0);
        if (row) {
          this.setState({ ...row, ...{ is_sync: 0 } });
        } else {
          const {
            body_score_entry, body_score_entry_comments, light_signs, light_signs_comments, air, air_comments,
            temperature, temperature_comments, boar_stimulation, boar_stimulation_comments,
            human_stimulation, human_stimulation_comments, feed, feed_comments, management, management_comments, id, is_sync
          } = this.state;

          let query = `INSERT INTO insemination_assessor(
            body_score_entry, body_score_entry_comments, light_signs, light_signs_comments, air, air_comments,
            temperature, temperature_comments, boar_stimulation, boar_stimulation_comments,
            human_stimulation, human_stimulation_comments, feed, feed_comments, management, management_comments, id, is_sync,
            DATE,evaluation_group_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

          let params = [
            body_score_entry, body_score_entry_comments, light_signs, light_signs_comments, air, air_comments,
            temperature, temperature_comments, boar_stimulation, boar_stimulation_comments,
            human_stimulation, human_stimulation_comments, feed, feed_comments, management, management_comments,
            id, 0, this.date, this.evaluationId
          ];
          tx.executeSql(query, params, (tx, rs) => {

          }, (err) => {
            console.log("err::::::::::::::", err);
          })
        }
      })
    })

  }

  openImagePicker = () => {
    let index = this.selectedImageIndex;

    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      writeTempFile: false,
      includeBase64: true,
      compressImageQuality: 0.5
    }).then(image => {
      let imaged = `data:image/png;base64,${image.data}`;

      db.transaction((tx) => {
        tx.executeSql(`update insemination_assessor set ${index}= ? where id= ?`, [imaged, this.state.id], () => {
          this.setState({ [index]: imaged });
        })
      })

    });
  }

  openCameraPicker = () => {
    let index = this.selectedImageIndex;

    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      writeTempFile: false,
      includeBase64: true,
      compressImageQuality: 0.5
    }).then(image => {
      let imaged = `data:image/png;base64,${image.data}`;

      db.transaction((tx) => {
        tx.executeSql(`update insemination_assessor set ${index}= ? where id= ?`, [imaged, this.state.id], () => {
          this.setState({ [index]: imaged });
        })
      })

    });
  }

  state = {
    body_score_entry: 0,
    body_score_entry_comments: '',
    body_score_entry_image: '',
    light_signs: 0,
    light_signs_comments: '',
    light_signs_image: '',
    air: 0,
    air_comments: '',
    air_image: '',
    temperature: 0,
    temperature_comments: '',
    temperature_image: '',
    boar_stimulation: 0,
    boar_stimulation_comments: '',
    boar_stimulation_image: '',
    human_stimulation: 0,
    human_stimulation_comments: '',
    human_stimulation_image: '',
    feed: 0,
    feed_comments: '',
    feed_image: '',
    management: 0,
    management_comments: '',
    management_image: '',
    id: Math.floor(Math.random() * (999 - 100 + 1) + 100)
  };

  renderImageFlex(i) {
    if (this.state[i]) {
      return <View style={[
        styles.input,
        { height: 100, flex: 1, border: 0, marginLeft: 5 }
      ]}>
        <Image resizeMode={'stretch'} style={{ width: "100%", height: '100%' }} source={{ uri: `${this.state[i]}` }} />
      </View>
    } else {
      return <View></View>
    }
  }

  renderFormSection = (item, key) => {
    const { label, index } = item;
    const comment_i = `${index}_comments`;
    const image_i = `${index}_image`;

    return <View style={styles.sectionSeprator} key={key}>
      <Text style={styles.typeText}>{label}</Text>
      <View style={{ flexDirection: "row", display: "flex" }}>

        <Rate
          color={THEME_COLOR} numColor="#f60"
          value={this.state[index] ? this.state[index] : 0}
          onNumChange={(num) => { this.setState({ [index]: num }) }} />


        <TouchableHighlight onPress={() => {
          this.showActionSheet(image_i)
        }} style={styles.botton}>
          <Text style={styles.bottontext}>Upload Image</Text>
        </TouchableHighlight>


      </View>

      <View style={{ display: "flex", flexDirection: "row" }}>

        <TextInput
          value={this.state[comment_i]}
          placeholder={"Comments"}
          style={[styles.input, { flex: 3, height: 100 }]}
          multiline={true}
          numberOfLines={5}
          onChangeText={(v) => { this.setState({ [comment_i]: v }) }}
        />

        {this.renderImageFlex(image_i)}

      </View>
    </View>
  };

  fields = [
    { label: "BODY SCORE ENTRY", index: 'body_score_entry' },
    { label: "LIGHT", index: 'light_signs' },
    { label: "BODY SCORE END", index: 'air' },
    { label: "TEMPERATURE", index: 'temperature' },
    { label: "BOAR STIMULATION", index: 'boar_stimulation' },
    { label: "HUMAN STIMULATION", index: 'human_stimulation' },

    { label: "FEED", index: 'feed' },
    { label: "MANAGEMENT", index: 'management' }
  ];

  updateValue = (key, value) => {
    this.setState({ [key]: value });
  }

  saveAssessor() {
    let query = `UPDATE insemination_assessor SET body_score_entry= ?,body_score_entry_comments= ?,light_signs =?, light_signs_comments=?, air= ?,air_comments= ?,temperature =?, temperature_comments=?,human_stimulation= ?,human_stimulation_comments= ?, boar_stimulation= ?,boar_stimulation_comments= ?,feed =?, feed_comments=?,
    management= ?,management_comments= ?,
    is_active=? ,
    is_sync=?
    WHERE id= ?`;

    const {
      body_score_entry, body_score_entry_comments,
      light_signs, light_signs_comments, air, air_comments,
      temperature, temperature_comments,
      boar_stimulation, boar_stimulation_comments,
      human_stimulation, human_stimulation_comments,

      feed, feed_comments,
      management, management_comments,
      id
    } = this.state;

    db.transaction((tx) => {
      tx.executeSql(query, [
        body_score_entry, body_score_entry_comments,
        light_signs, light_signs_comments, air, air_comments,
        temperature, temperature_comments,
        boar_stimulation, boar_stimulation_comments,
        human_stimulation, human_stimulation_comments,

        feed, feed_comments,
        management, management_comments,
        1, 0,
        id
      ], () => {
        // this.props.syncData();
        this.toast();
        setTimeout(() => {
          // this.props.navigation.navigate('Assessor');
        }, 1000)
      }, (error) => {
        console.log("error::::::", error)
        this.props.showmessage(SHOW_ERROR_MESSAGE, 'Unable to Submit');
      });
    })
  }

  showActionSheet = (image_i) => {
    this.selectedImageIndex = image_i;
    this.ActionSheet.show()
  };

  handleActionSheetPress = (index) => {
    if (index === 0) {
      this.openImagePicker();
    } else if (index === 1) {
      this.openCameraPicker()
    }
  };

  render() {
    const { container, labelText } = styles;

    return (
      <View style={container}>
        <ActionSheet
          ref={o => this.ActionSheet = o}
          title={'Which one do you like ?'}
          options={['Choose From Gallery', 'Choose From Camera', 'Cancel']}
          cancelButtonIndex={2}
          onPress={this.handleActionSheetPress}
        />
        <ScrollView style={{ marginBottom: "20%" }}>

          {this.fields.map((item, key) => this.renderFormSection(item, key))}

        </ScrollView>
        <BottomButton text={"Save"} onPress={() => { this.saveAssessor(); }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%"
  },
  header: {
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: THEME_COLOR
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
  inputbox: {
    marginHorizontal: "5%",
    height: 60,
    borderColor: "gray",
    marginVertical: 10,
    borderWidth: 1,
    padding: 15
  },
  botton: {
    height: 40,
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: THEME_COLOR,
    justifyContent: "center",
    flex: 2,
    marginLeft: "5%"
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
    padding: 15
  },
  typeText: {
    fontSize: 20, marginBottom: 10,
    color: THEME_COLOR
  },
  sectionSeprator: {
    marginHorizontal: "5%",
    marginVertical: 20
  }
});

export default DefaultScreen(Insemination);
