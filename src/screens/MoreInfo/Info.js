import React, { Component } from "react";
import { StyleSheet, View, ScrollView, TouchableHighlight, Linking, Alert } from "../../components/core";
import RNFetchBlob from 'rn-fetch-blob'
import { ToastAndroid } from 'react-native';

import AssessorsItem from "../../components/AssessorsItem";
import { downloadFile } from "react-native-fs";
import Pdf from "react-native-pdf";

class List extends Component {

    constructor(props) {
        super(props);
    }

    toast() {
        ToastAndroid.show('Pdf Downloading Start', ToastAndroid.SHORT);
    }

    assessors = [
        { image: '', 'url': 'LesionScoring.pdf', label: 'Claw Evaluation Sheet', icon: 'ic_claw_graph' },
        { image: '', 'url': 'ClawAnatomy.pdf', label: 'Field Sheet', icon: 'ic_cull_data' },
        { image: '', 'url': 'ClawAnatomy.pdf', label: 'Claw Evaluation Assistance Sheet', icon: 'ic_claw_graph' },
    ];

    navigateAssessorScreen = (route) => {
        this.toast()
        const { config, fs } = RNFetchBlob
        // let PictureDir = fs.dirs.PictureDir // this is the pictures directory. You can check the available directories in the wiki.
        let DownloadDir = fs.dirs.DownloadDir
        let date = new Date();

        switch (route) {
            case 'Claw Evaluation Sheet':
                RNFetchBlob.config({
                    fileCache: true,
                    addAndroidDownloads: {
                        notification: true,
                        useDownloadManager: true,
                        // Title of download notification
                        title: 'Claw Evaluation Sheet',
                        // File description (not notification description)
                        description: 'An image file.',
                        mime: 'application/pdf',
                        // Make the file scannable  by media scanner
                        mediaScannable: true,
                    }

                })
                    .fetch('GET', "http://103.211.216.244/zepro-feet-first/pdfs/CLAWCOLLECTIONSHEET.pdf")
                    .then((res) => {
                        Alert.alert(
                            'File Status',
                            'PDF Download Successfully',
                            [
                                { text: 'OK', onPress: () => { } },
                            ],
                            { cancelable: false },
                        );
                    })

                break;

            case 'Field Sheet':
                RNFetchBlob.config({
                    fileCache: true,
                    addAndroidDownloads: {
                        notification: true,
                        useDownloadManager: true,
                        // Title of download notification
                        title: 'Field Sheet',
                        // File description (not notification description)
                        description: 'An image file.',
                        // mime: 'image/png',
                        mime: 'application/pdf',

                        // Make the file scannable  by media scanner
                        mediaScannable: true,
                    }
                })
                    .fetch('GET', "http://103.211.216.244/zepro-feet-first/pdfs/FIELDSHEET.pdf")
                    .then((res) => {
                        Alert.alert(
                            'File Status',
                            'PDF Download Successfully',
                            [
                                { text: 'OK', onPress: () => { } },
                            ],
                            { cancelable: false },
                        );
                    })
                break;

            case 'Claw Evaluation Assistance Sheet':
                RNFetchBlob.config({
                    fileCache: true,
                    addAndroidDownloads: {
                        notification: true,
                        useDownloadManager: true,
                        // Title of download notification
                        title: 'Claw Evaluation Assistance Sheet',
                        // File description (not notification description)
                        description: 'An image file.',
                        // mime: 'image/png',
                        mime: 'application/pdf',

                        // Make the file scannable  by media scanner
                        mediaScannable: true,
                    }
                })
                    .fetch('GET', "http://swinefarmassessor.com/pdfs/claw-lesion-guide.pdf")
                    .then((res) => {
                        Alert.alert(
                            'File Status',
                            'PDF Download Successfully',
                            [
                                { text: 'OK', onPress: () => { } },
                            ],
                            { cancelable: false },
                        );
                    })
                break;
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={{ marginBottom: '10%' }}>
                    <View style={styles.listcontaner}>
                        {
                            this.assessors.map((info, key) => <AssessorsItem
                                onPress={this.navigateAssessorScreen}
                                key={key}
                                _label={info.label}
                                label={info.label}
                                icon={info.icon} />)
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        marginTop: 20
    },
    listcontaner: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    }
});

export default List;