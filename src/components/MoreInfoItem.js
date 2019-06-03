import React, { Component } from "react";
import {
    Image,
    StyleSheet,
    View,
    TouchableHighlight
} from "../components/core";

const MoreInfoItem = (props) => {
    const { image ,url} = props;

    return <View style={styles.container}>
        <TouchableHighlight
            onPress={() => { props.onPress(url) }}
            underlayColor={'white'} style={styles.info}>
            <Image
                resizeMode="contain"
                style={{ width: "100%", height: "100%" }}
                source={{ uri: image }}
            />
        </TouchableHighlight>
    </View>
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        marginHorizontal: "3%",
        width: "44%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    info: {
        width: "100%", height: 168 
    }
});

export default MoreInfoItem;
