import React from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from '../components/core';

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
    const { name, date, id, group_name, farm_name } = props.item;

    return <View style={row}>
        <TouchableHighlight underlayColor={"white"} onPress={() => { props.onPressDetail(id) }} style={leftblock}>
            <View >
                <Text style={fieldnametext}>{name}</Text>
                <Text style={grouptext}>Date - {date}</Text>
                <Text style={grouptext}> Farm:- {farm_name} 
                {/* Group:- {group_name} */}
                </Text>
            </View>
        </TouchableHighlight>
    </View>
}