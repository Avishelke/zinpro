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
        // { image: '', 'url': 'LesionScoring.pdf', label: 'Claw PDF', icon: 'ic_claw_graph' },
        { image: '', 'url': 'ClawAnatomy.pdf', label: 'Gilt PDF', icon: 'ic_cull_data' },
    ];

    navigateAssessorScreen = (route) => {
        this.toast()
        const { config, fs } = RNFetchBlob
        // let PictureDir = fs.dirs.PictureDir // this is the pictures directory. You can check the available directories in the wiki.
        let DownloadDir = fs.dirs.DownloadDir
        let date = new Date();

        switch (route) {
            case 'Claw PDF':
                RNFetchBlob.config({
                    fileCache: true,
                    addAndroidDownloads: {
                        notification: true,
                        useDownloadManager: true,
                        // Title of download notification
                        title: 'Great ! Download Success ! :O ',
                        // File description (not notification description)
                        description: 'An image file.',
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

            case 'Gilt PDF':
                RNFetchBlob.config({
                    fileCache: true,
                    addAndroidDownloads: {
                        notification: true,
                        useDownloadManager: true,
                        // Title of download notification
                        title: 'Great ! Download Success ! :O ',
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
        }
        //         const { config, fs } = RNFetchBlob
        // let PictureDir = fs.dirs.PictureDir // this is the pictures directory. You can check the available directories in the wiki.
        // let options = {
        //   fileCache: true,
        //   addAndroidDownloads : {
        //     useDownloadManager : true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
        //     notification : false,
        //     path:  PictureDir + "/me_"+Math.floor(date.getTime() + date.getSeconds() / 2), // this is the path where your downloaded file will live in
        //     description : 'Downloading image.'
        //   }
        // }
        // config(options).fetch('GET', "http://www.example.com/example.pdf").then((res) => {
        //   // do some magic here
        // })
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