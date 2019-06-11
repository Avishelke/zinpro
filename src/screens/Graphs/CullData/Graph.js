import React, { Component } from "react";
import { ScrollView, View, StyleSheet, Text, Image } from "../../../components/core";
import { THEME_COLOR } from "../../../helpers/theme";
import ChartView from 'react-native-highcharts';
import { db } from '../../../helpers/db'
import RNFetchBlob from 'rn-fetch-blob';
import Button from '../../../components/Button';

class Gilt extends Component {
    evaluationId;
    state = {
        date: '',
        evaluation_id: '',
        evaluations: [],
        open: false,
        length: 0,
        series: [],
        images: []
    };

    componentDidMount() {
        let id = this.props.navigation.getParam('id');
        this.evaluationId = this.props.navigation.getParam('evaluatinId');
        db.transaction((tx) => {
            tx.executeSql(`select * from  cull_data where evaluation_group_id=?`, [this.evaluationId], (tx, results) => {

                if (results.rows.length > 0) {
                    let row = results.rows.raw()[0];

                    let json = JSON.parse(row.data);
                    // console.log("results.rows.length::::::::::::", json);

                    let series = [{
                        name: 'Ideal Zone',
                        data: []

                    }, { name: json[0][2], data: [] },
                    { name: json[0][3], data: [] }, {
                        name: json[0][4],
                        data: []

                    },
                    {
                        name: json[0][5],
                        data: []

                    }];

                    for (let i = 1; i < 8; i++) {
                        let row = json[i];
                        series[0].data.push(parseInt(row[1]))
                        series[1].data.push(parseInt(row[2]))
                        series[2].data.push(parseInt(row[3]))
                        series[3].data.push(parseInt(row[4]))
                        series[4].data.push(parseInt(row[5]))
                    }

                    console.log(series);
                    this.setState({ length: 1, series });
                } else {
                    this.setState({ length: 0 });
                }
            }, (error) => {
                console.log("error::::::::::::", error);
            })
        })
    }

    downloadReport = () => {
        RNFetchBlob.config({
            fileCache: true,
            addAndroidDownloads: {
                notification: true,
                useDownloadManager: true,
                // Title of download notification
                title: 'cull data graph',
                // File description (not notification description)
                description: 'Graph report',
                mime: 'application/pdf',
                // Make the file scannable  by media scanner
                mediaScannable: true,
            }

        })
            .fetch('GET', "http://taskgrids.com/zinpro/cull-data/report?evaluation_group_id=" + this.evaluationId)
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
    }


    render() {

        const conf = {
            credits: {
                enabled: false
            },
            exporting: { enabled: false },
            chart: {
                type: 'column'
            },
            title: {
                text: 'CULL DATA'
            },
            xAxis: {
                categories: [
                    'Parity 1',
                    'Parity 2',
                    'Parity 3',
                    'Parity 4',
                    'Parity 5',
                    'Parity 6',
                    'Parity >6'
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: false
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: this.state.series
        };

        const { container, labelText } = styles;

        return (
            <ScrollView style={container}>

                {this.state.length > 0 &&
                    <View>
                        <ChartView style={{ height: 400 }} config={conf} />
                        <Button text={"Download"} onPress={this.downloadReport} />
                    </View>
                }
                {this.state.length === 0 && <View style={{ marginTop: 100, marginHorizontal: '5%' }}>
                    <Text style={{ textAlign: 'center' }}>No Data Found !!</Text>
                </View>}

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: 'white'
    },
    labelText: {
        color: THEME_COLOR,
        fontSize: 20,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20
    },
    inputbox: {
        marginHorizontal: 15,
        height: 40,
        borderColor: "gray",
        borderWidth: 0,
        marginVertical: 30,
        borderBottomWidth: 1
    },
    selectlabel: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16
    },
    select: { marginVertical: 10, marginHorizontal: '5%', paddingVertical: 10, backgroundColor: THEME_COLOR }
});

export default Gilt;
