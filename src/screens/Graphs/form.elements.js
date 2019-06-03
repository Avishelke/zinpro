import React from 'react'
import { TextInput, StyleSheet, View, Text } from '../../components/core'
import DatePicker from 'react-native-datepicker'
import {THEME_COLOR} from '../../helpers/theme';

export const TextArea = (props) => {

    const styles = StyleSheet.create({
        input: {
            marginHorizontal: "5%",
            height: 60,
            borderColor: "gray",
            marginVertical: 0,
            borderWidth: 1,
            padding: 15
        }
    });

    return <TextInput
        value={props.value}
        onChangeText={(value) => { props.onChangeText(value) }}
        placeholder={"Comments"}
        style={styles.input}
        multiline={true}
        numberOfLines={5}
    />
}

export const MyDatePicker = (props) => {

    const styles = StyleSheet.create({
        input: {
            marginHorizontal: "5%",
            height: 30,
            marginVertical: 0,
            padding: 15,
            width: "90%"
        }
    });

    return <DatePicker
        style={styles.input}
        date={props.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
        onDateChange={(date) => { props.onSelectDate(date) }}
    />
}

export const UploadImage = () => {
    const styles = StyleSheet.create({
        botton: {
            height: 50,
            alignItems: "center",
            borderWidth: 2,
            borderRadius: 5,
            borderColor: THEME_COLOR,
            justifyContent: "center",
            margin: 30
          },
          bottontext: {
            fontSize: 18,
            fontWeight: "700",
            textAlign: "center",
            color: THEME_COLOR
          }
    });

    return  <View style={styles.botton}>
    <Text style={styles.bottontext}>Upload Image</Text>
  </View>
}