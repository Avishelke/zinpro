import React from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from '../components/core';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { px2dp } from "../helpers/theme";

export default (props) => {

    const EvaluationItemStyle = StyleSheet.create({
        row: {
            height: 80,
            display: "flex",
            paddingVertical: 25,
            flexDirection: "row",
            marginHorizontal: "5%",
            justifyContent: "center",
            alignItems: "center",
            borderBottomWidth: 1,
            borderColor: "#BEBEBE"
        },
        leftblock: {
            flex: 5
        },
        fieldnametext: {
            fontWeight: "700",
            fontSize: 18
        },
        grouptext: {
            fontSize: 12,
            fontWeight: "200",
        }
    });

    const { row, leftblock, fieldnametext, grouptext } = EvaluationItemStyle;
    const { name, groupcount, id } = props;

    return <View style={row}>
        <TouchableHighlight underlayColor={"white"} onPress={() => { props.onPressDetail(id) }} style={leftblock}>
            <View >
                <Text style={fieldnametext}>{name}</Text>
                {/* <Text style={grouptext}>Groups - {groupcount}</Text> */}
            </View>
        </TouchableHighlight>
        <Icon
            onPress={() => { props.onPressEdit(id) }}
            name={"edit"} size={px2dp(20)} color="black" style={{ paddingHorizontal: 6 }} />

        <Icon
            onPress={() => { props.onPressDelete(id) }}
            name={"delete"} size={px2dp(20)} color="black" style={{ paddingHorizontal: 6 }} />
    </View>
}