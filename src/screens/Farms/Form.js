import React, { Component } from "react";
import { ScrollView, View, StyleSheet, Text, TextInput } from "../../components/core";
import BottomButton from "../../components/BottomButton";
import { ToastAndroid } from 'react-native';

import { THEME_COLOR } from "../../helpers/theme";
import { getValue } from "../../helpers/arrayhelper";
import FarmFormModel from '../../models/farm.form';
import { SHOW_ERROR_MESSAGE } from "../../redux/actions";
import DefaultScreen from "../../hoc/DefaultScreen";
import { db } from '../../helpers/db';
// import { MyDatePicker } from '../Assessors/form.elements';
import DatePicker from 'react-native-datepicker'


class EvaluationForm extends Component {

  componentDidMount() {
    let id = getValue(this.props.navigation, ['state', 'params', 'id'], '');
    var date = new Date().getDate()
    if (id) {
      db.transaction((tx) => {
        tx.executeSql(`SELECT *  FROM farms where id = ?`, [id], (tx, results) => {
          let row = results.rows.item(0);
          this.setState({ ...row, ...{ is_sync: 0 } })
        })
      })
    }
  }

  state = {
    id: '',
    location: '',
    name: '',
    noofsows: '',
    genetics: '',
    feedsupplier: '',
    notes: '',
    veterinarian: '',
    farm_manager: '',
    phone: '',
    email: '',
    created_at: '',
    created_by: '',
    updated_at: new Date().toISOString().slice(0, 10),
    is_sync: 0,
    is_active: 1
  };

  saveEvaluation = () => {
    let model = new FarmFormModel();
    model.load(this.state);

    if (model.save()) {
      db.transaction((tx) => {
        tx.executeSql(model.query, model.args, (res) => {
          ToastAndroid.show('Saved Sucess !', ToastAndroid.SHORT);
          this.props.syncData();
          this.props.navigation.navigate('List');
        }, (error) => {
          console.log("error::::::::", error);
          this.props.showmessage(SHOW_ERROR_MESSAGE, 'Unable to create');
        });
      })
    }
    else {
      this.props.showmessage(SHOW_ERROR_MESSAGE, model.getFirstError());
    }
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

          <TextInput
            value={this.state.name}
            editable={this.state._id ? false : true}
            onChangeText={(name) => this.setState({ name })}
            placeholder={"Farm Name"} style={inputbox} />
          <TextInput
            value={this.state.location}
            placeholder={"Location "}
            style={inputbox}
            onChangeText={(location) => this.setState({ location })}
          />
          <TextInput
            value={this.state.noofsows}
            placeholder={"Number of Sows "}
            style={inputbox}
            onChangeText={(noofsows) => this.setState({ noofsows })}
          />
          <TextInput
            value={this.state.genetics}
            placeholder={"Genetic "}
            style={inputbox}
            onChangeText={(genetics) => this.setState({ genetics })}
          />
          <TextInput
            value={this.state.feedsupplier}
            placeholder={"Feed Suplier "}
            style={inputbox}
            onChangeText={(feedsupplier) => this.setState({ feedsupplier })}
          />

          <DatePicker
            style={{ width: 360 }}
            value={this.state.created_at}

            date={this.state.created_at}
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
            onDateChange={(date) => { this.setState({ created_at: date }) }}
          />
          <TextInput
            value={this.state.notes}
            placeholder={"Notes "}
            style={inputbox}
            onChangeText={(notes) => this.setState({ notes })}
          />

          <TextInput
            value={this.state.farm_manager}
            placeholder={"Farm manager "}
            style={inputbox}
            onChangeText={(farm_manager) => this.setState({ farm_manager })}
          />
          <TextInput
            value={this.state.veterinarian}
            placeholder={"Farm veterinarian "}
            style={inputbox}
            onChangeText={(veterinarian) => this.setState({ veterinarian })}
          />
          <TextInput
            value={this.state.email}
            placeholder={"Email "}
            style={inputbox}
            onChangeText={(email) => this.setState({ email })}
          />
          <TextInput
            value={this.state.phone}
            placeholder={"Phone "}
            style={inputbox}
            onChangeText={(phone) => this.setState({ phone })}
          />



        </ScrollView>

        <BottomButton text={"Save"} onPress={this.saveEvaluation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%"
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
  inlineGroup: {
    flexDirection: "row", display: 'flex', marginHorizontal: 15
  },
  inputbox: {
    marginHorizontal: 15,
    height: 40,
    borderColor: "gray",
    borderWidth: 0,
    marginVertical: 10,
    borderBottomWidth: 1
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
  inputboxInlineRight: {
    height: 40,
    borderColor: "gray",
    borderWidth: 0,
    marginVertical: 10,
    borderBottomWidth: 1,
    flex: 1,
  },
  botton: {
    height: 50,
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#1F94F4",
    justifyContent: "center",
    margin: 30
  },
  bottontext: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    color: "#1F94F4"
  }
});

export default DefaultScreen(EvaluationForm);
