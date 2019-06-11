import React, { Component } from "react";
import { ScrollView, View, StyleSheet, Text, TextInput, TouchableHighlight, Image, } from "./../../components/core";
import BottomButton from "./../../components/BottomButton";
import { ToastAndroid } from 'react-native';
import { THEME_COLOR } from "./../../helpers/theme";
import DefaultScreen from "../../hoc/DefaultScreen";
import { SHOW_ERROR_MESSAGE, SHOW_SUCCESS_MESSAGE } from '../../redux/actions';
import Rate from "../../components/Rate";
import ImagePicker from 'react-native-image-crop-picker';
import { db } from '../../helpers/db'
import ActionSheet from 'react-native-actionsheet';

class Insemination extends Component {

  date;

  selectedImageIndex;
  evaluationId;

  constructor(props) {
    super(props);
    this.date = new Date().toISOString().slice(0, 10);
    this.evaluationId = this.props.navigation.getParam('evaluationId')
  }

  toast() {
    ToastAndroid.show('Saved Sucess !', ToastAndroid.SHORT);
  }

  componentDidMount = () => {
    let evaluation_group_id = this.props.selectedEvaluationGroup;

    db.transaction((tx) => {
      tx.executeSql(`select * from gilt_assessor WHERE evaluation_group_id=?`, [this.evaluationId], (tx, r) => {
        let row = r.rows.item(0);
        if (row) {
          this.setState({ ...row, ...{ is_sync: 0 } });
        } else {
          const {
            floor, floor_comments, ventilation, ventilation_comments,
            feeders, feeders_comments, feed, feed_comments,
            hygiene, hygiene_comments, person_contact, person_contact_comments,
            gilt_growth, gilt_growth_comments, quarentine, quarentine_comments,
            fight, fight_comments, conformation, conformation_comments, id
          } = this.state;

          let query = `INSERT INTO gilt_assessor(
            floor,floor_comments,ventilation,ventilation_comments,feeders,feeders_comments,feed,feed_comments,hygiene,
            hygiene_comments,person_contact,person_contact_comments,gilt_growth,gilt_growth_comments,quarentine,
            quarentine_comments,fight,fight_comments,conformation,conformation_comments,is_active,is_sync,id,evaluation_group_id, DATE
            ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

          let params = [floor, floor_comments, ventilation, ventilation_comments, feeders, feeders_comments,
            feed, feed_comments, hygiene, hygiene_comments, person_contact, person_contact_comments,
            gilt_growth, gilt_growth_comments, quarentine, quarentine_comments, fight, fight_comments,
            conformation, conformation_comments, 1, 0, id, this.evaluationId, this.date
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
        tx.executeSql(`update gilt_assessor set ${index}= ? where id= ?`, [imaged, this.state.id], () => {
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
        tx.executeSql(`update gilt_assessor set ${index}= ? where id= ?`, [imaged, this.state.id], () => {
          this.setState({ [index]: imaged });
        })
      })

    });
  }


  state = {
    floor: 0,
    floor_comments: '',
    floor_image: '',
    ventilation: 0,
    ventilation_comments: '',
    ventilation_image: '',
    feeders: 0,
    feeders_comments: '',
    feeders_image: '',
    feed: 0,
    feed_comments: '',
    feed_image: '',
    hygiene: 0,
    hygiene_comments: '',
    hygiene_image: '',
    person_contact: 0,
    person_contact_comments: '',
    person_contact_image: '',
    gilt_growth: 0,
    gilt_growth_comments: '',
    gilt_growth_image: '',
    fight: 0,
    fight_comments: '',
    fight_image: '',
    quarentine: 0,
    quarentine_comments: '',
    quarentine_image: '',
    conformation: 0,
    conformation_comments: '',
    conformation_image: '',
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
    { label: "Hygiene Management", index: 'hygiene' },

    { label: "Floor Management", index: 'floor' },
    { label: "Air Management", index: 'ventilation' },
    { label: "Feeders Management", index: 'feeders' },
    { label: "Feed Management", index: 'feed' },
    { label: "Person Contact Management", index: 'person_contact' },
    { label: "Gilt Growth Management", index: 'gilt_growth' },
    { label: "Management Management", index: 'quarentine' },
    { label: "Fight Signs Management", index: 'fight' },
    { label: "Conformation Management", index: 'conformation' },


  ];

  updateValue = (key, value) => {
    this.setState({ [key]: value });
  }

  saveAssessor() {
    let query = `UPDATE gilt_assessor SET 
    floor= ?,floor_comments= ?,
    ventilation =?, ventilation_comments=?, 
    feeders= ?,feeders_comments= ?,
    feed =?, feed_comments=?, 
    hygiene= ?,hygiene_comments= ?,
    person_contact =?, person_contact_comments=?,
    gilt_growth= ?,gilt_growth_comments= ? ,
    quarentine= ?,quarentine_comments= ? ,
    fight= ?,fight_comments= ? ,
    conformation= ?,conformation_comments= ? ,

    is_active=?,
    is_sync=?
    WHERE id= ?`;

    const {
      floor, floor_comments,
      ventilation, ventilation_comments,
      feeders, feeders_comments,
      feed, feed_comments,
      hygiene, hygiene_comments,
      person_contact, person_contact_comments,
      gilt_growth, gilt_growth_comments,
      quarentine, quarentine_comments,
      fight, fight_comments,
      conformation, conformation_comments,
      id
    } = this.state;

    db.transaction((tx) => {
      tx.executeSql(query, [
        floor, floor_comments,
        ventilation, ventilation_comments,
        feeders, feeders_comments,
        feed, feed_comments,
        hygiene, hygiene_comments,
        person_contact, person_contact_comments,
        gilt_growth, gilt_growth_comments,
        quarentine, quarentine_comments,
        fight, fight_comments,
        conformation, conformation_comments,
        1, 0,
        id
      ], (tx, res) => {
        // this.props.syncData();
        this.toast();
        setTimeout(() => {
          // this.props.navigation.navigate('Assessor');
        }, 1000)
      }, (error) => {
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
        <BottomButton text={"Save"} onPress={() => { this.saveAssessor() }} />
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
