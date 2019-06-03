import React, { Component } from "react";
import {
    ScrollView,
    View,
    StyleSheet,
    TextInput,
} from "../../../components/core";
import { Picker } from 'react-native'
import BottomButton from "../../../components/BottomButton";
import { THEME_COLOR } from "../../../helpers/theme";
import { getValue } from "../../../helpers/arrayhelper";
import { db } from "../../../helpers/db";
import DefaultScreen from '../../../hoc/DefaultScreen'
import GroupFormModel from '../../../models/group.form';
import { SHOW_ERROR_MESSAGE } from "../../../redux/actions";

class GroupForm extends Component {


    componentDidMount() {
        let farm_id = this.props.selectedFarm;
        this.setState({ farm_id });
    }

    renderPicker = (label, value) => {
        let key = Math.random();
        return <Picker.Item label={label} value={value} key={key} />
    }

    state = {
        name: "",
        size: "",
        type_of_animal: "",
        comments: "",
        farm_id: '',
        id: '',
        is_sync: 0,
    };

    saveGroup = () => {
        let model = new GroupFormModel();
        model.load(this.state);

        if (model.save()) {
            db.transaction((tx) => {
                tx.executeSql(model.query, model.args, (r) => {
                    this.props.syncData();
                    this.props.navigation.goBack();
                }, (error) => {
                    this.props.showmessage(SHOW_ERROR_MESSAGE, 'Unable to create');
                });
            })
        } else {
            this.props.showmessage(SHOW_ERROR_MESSAGE, model.getFirstError());
        }

    }

    animalTypes = [
        "Boars",
        "Grow-Finish",
        "Nursery",
        "Sows-Gestating",
        "Sows-Lactating",
        "Developing Gifts"
    ];

    render() {
        const { container, inputbox } = styles;
        return (
            <View style={container}>
                <ScrollView style={{ marginBottom: "20%" }}>

                    <TextInput
                        value={this.state.name}
                        onChangeText={(name) => this.setState({ name })}
                        placeholder={"Group Name"} style={inputbox} />

                    <TextInput
                        keyboardType='numeric'
                        value={this.state.size}
                        onChangeText={(size) => this.setState({ size: size.replace(/[^0-9]/g, '') })}
                        placeholder={"Group Size"} style={inputbox} />

                    <Picker
                        selectedValue={this.state.type_of_animal}
                        prompt={"Select type of Animal"}
                        style={[inputbox, { height: 50 }]}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ type_of_animal: itemValue })
                        }
                    >
                        {this.renderPicker("Select Type of Animal", "")}
                        {this.animalTypes.map((item, key) => this.renderPicker(item, item))}
                    </Picker>

                    <TextInput
                        value={this.state.comments}
                        onChangeText={(comments) => this.setState({ comments })}
                        placeholder={"Comments"}
                        style={[inputbox, { height: 60, marginTop: 30 }]}
                        multiline={true}
                        numberOfLines={5}
                    />
                </ScrollView>

                <BottomButton text={"Save"} onPress={this.saveGroup} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%"
    },
    labelText: {
        color: THEME_COLOR,
        fontSize: 20,
        marginTop: 20,
        marginBottom: 10,
        marginLeft: 20
    },
    inputbox: {
        marginHorizontal: 20,
        height: 40,
        borderColor: "gray",
        borderWidth: 0,
        marginVertical: 10,
        borderBottomWidth: 1
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

export default DefaultScreen(GroupForm);
