import React, { Component } from "react";

import {View ,  StyleSheet, Image}from '../components/core';

class RegisterSuccess extends Component{

    navigateToLogin  = () => {
        this.props.navigation.navigate('Login')
    };

    render(){
        return <View style = {styles.container}>
            <Image
                resizeMode={'contain'}
                source={require("./../../assets/splash.jpg")}
                style={{width: "100%",height: "100%",resizeMode:"stretch"}}
            />
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        alignItems: 'center'
    }
});

export default RegisterSuccess;