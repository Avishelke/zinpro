import React, { Component } from "react";
import { ScrollView, View, StyleSheet, Text, TextInput, Picker, AsyncStorage } from "../../components/core";
import { KeyboardAvoidingView } from 'react-native';
import { ToastAndroid } from 'react-native';
import DatePicker from 'react-native-datepicker'

import BottomButton from "../../components/BottomButton";
import { THEME_COLOR } from "../../helpers/theme";
import EvaluationFormModel from '../../models/evaluation.form';
import { SHOW_ERROR_MESSAGE } from "../../redux/actions";
import DefaultScreen from "../../hoc/DefaultScreen";
import { db } from '../../helpers/db';
import { NavigationActions } from 'react-navigation'
import API from "../../apis";
import { getValue } from "../../helpers/arrayhelper";

class EvaluationForm extends Component {

  componentDidMount() {
    //Get All Farns
    db.transaction((tx) => {
      tx.executeSql(`select id, name  from farms where is_active= ?`, [1], (tx, results) => {
        this.setState({ farms: results.rows.raw(), farm_id: results.rows.raw()[results.rows.raw().length - 1].id })
      })
    })

    let id = getValue(this.props.navigation, ['state', 'params', 'id'], '');

    if (id) {
      db.transaction((tx) => {
        tx.executeSql(`SELECT * FROM evaluations where id = ?`, [id], (tx, results) => {
          let row = results.rows.item(0);
          setTimeout(() => {
            this.setState({ ...row, ...{ is_sync: 0 } })
          }, 1000)
        })
      })
    }

  }

  state = {
    telephone: '',
    first_name: '',
    last_name: '',
    role: '',
    primary_email: '',
    secondary_email: '',
    address1_address: '',
    address1_suite: '',
    address1_city: '',
    address1_state: '',
    address1_zipcode: '',
    address2_address: '',
    address2_suite: '',
    address2_city: '',
    address2_state: '',
    address2_zipcode: '',
    is_sync: 0,
    farm_id: '',
    farms: [],
    consulation_date: new Date().toISOString().slice(0, 10)
  };

  navigateToSelect = async (evaluation_id) => {

    const actionToDispatch = NavigationActions.navigate({
      routeName: 'SelectGroup',
      params: { evaluation_id },
      action: { routeName: 'List' }
    });

    await this.props.selectEvaluation(evaluation_id);
    await this.props.selectFarm(this.state.farm_id);

    await this.props.navigation.dispatch(actionToDispatch);
  }

  saveEvaluation = () => {
    let model = new EvaluationFormModel();
    model.load(this.state);

    if (model.save()) {
      db.transaction((tx) => {
        tx.executeSql(model.query, model.args, (r, sql) => {
          const insertId = getValue(sql, 'insertId', false);

          if (insertId) {
            AsyncStorage.setItem('evaluationId', JSON.stringify(insertId));
            this.props.syncData();

            ToastAndroid.show('Saved Sucess !', ToastAndroid.SHORT);
            this.props.navigation.navigate('Assessor');
            this.navigateToSelect(insertId);

          } else {
            this.props.navigation.popToTop();

          }
        }, (error) => {
          this.props.showmessage(SHOW_ERROR_MESSAGE, 'Unable to create');
        });
      })
    } else {
      this.props.showmessage(SHOW_ERROR_MESSAGE, model.getFirstError());
    }
  }

  renderPicker = (label, value) => {
    let key = Math.random();
    return <Picker.Item label={label} value={value} key={key} />
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
        {/* <KeyboardAvoidingView> */}

        <ScrollView style={{ marginBottom: "20%" }}>

          <KeyboardAvoidingView behavior='padding'>

            <Picker
              selectedValue={this.state.farm_id ? this.state.farm_id : (this.state.farms.length > 0 ? this.state.farms[this.state.farms.length - 1].id : this.state.farm_id)}
              prompt={""}
              style={[inputbox, { height: 50 }]}
              onValueChange={(itemValue, itemIndex) => { this.setState({ farm_id: itemValue }) }}
            >
              {this.renderPicker("Select Farm", "")}
              {this.state.farms.map((item, key) => this.renderPicker(item.name, item.id))}
            </Picker>

            <DatePicker
              style={{ width: 360 }}
              value={this.state.consulation_date}
              date={this.state.consulation_date}
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
              onDateChange={(date) => { this.setState({ consulation_date: date }) }}
            />
            <TextInput
              value={this.state.first_name}
              onChangeText={(first_name) => this.setState({ first_name })}
              placeholder={"People Present"} style={[inputboxInline]} />
            <TextInput
              value={this.state.last_name}
              onChangeText={(last_name) => this.setState({ last_name })}
              placeholder={"Notes"} style={inputboxInlineRight} />


            {/* <TextInput
            value={this.state.telephone}
            onChangeText={(telephone) => this.setState({ telephone })}
            placeholder={"Telephone"} style={inputbox} /> */}

            {/* <TextInput
            value={this.state.role}
            onChangeText={(role) => this.setState({ role })}
            placeholder={"Role"} style={inputbox} />

       

          <Text style={labelText}>Emails</Text>
          <View style={inlineGroup}>
            <TextInput
              value={this.state.primary_email}
              onChangeText={(primary_email) => this.setState({ primary_email })}
              placeholder={"Primary"} style={inputboxInline} />
            <TextInput
              value={this.state.secondary_email}
              onChangeText={(secondary_email) => this.setState({ secondary_email })}
              placeholder={"Secondary"} style={inputboxInlineRight} />
          </View> */}

            {/* <Text style={labelText}>Address 1</Text>
          <TextInput
            value={this.state.address1_address}
            placeholder={"Address"}
            style={inputbox}
            // multiline={true}
            // numberOfLines={5}
            onChangeText={(address1_address) => this.setState({ address1_address })}
          />
          <TextInput
            onChangeText={(address1_suite) => this.setState({ address1_suite })}
            placeholder={"Suite"} style={inputbox} />
          <TextInput
            onChangeText={(address1_city) => this.setState({ address1_city })}
            placeholder={"City"} style={inputbox} />
          <View style={inlineGroup}>
            <TextInput
              onChangeText={(address1_state) => this.setState({ address1_state })}
              placeholder={"State"} style={inputboxInline} />
            <TextInput
              onChangeText={(address1_zipcode) => this.setState({ address1_zipcode })}
              placeholder={"Zipcode"} style={inputboxInlineRight} />
          </View>
          <Text style={labelText}>Address 2</Text>
          <TextInput
            placeholder={"Address"}
            style={inputbox}
            multiline={true}
            numberOfLines={5}
            onChangeText={(address2_address) => this.setState({ address2_address })}
          />
          <TextInput
            onChangeText={(address2_suite) => this.setState({ address2_suite })}
            placeholder={"Suite"} style={inputbox} />
          <TextInput
            onChangeText={(address2_city) => this.setState({ address2_city })}
            placeholder={"City"} style={inputbox} />
          <View style={inlineGroup}>
            <TextInput
              onChangeText={(address2_state) => this.setState({ address2_state })}
              placeholder={"State"} style={inputboxInline} />
            <TextInput
              onChangeText={(address2_zipcode) => this.setState({ address2_zipcode })}
              placeholder={"Zipcode"} style={inputboxInlineRight} />
          </View> */}
          </KeyboardAvoidingView>

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
