import React, { Component } from "react";
import { ScrollView, View, StyleSheet, Text, Image } from "../../../components/core";
import { THEME_COLOR } from "../../../helpers/theme";
import ChartView from 'react-native-highcharts';
import { db } from '../../../helpers/db'


class Gilt extends Component {

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
        let id = this.props.navigation.getParam('id')
        db.transaction((tx) => {
            tx.executeSql(`select * from  gilt_break_even where id=?`, [id], (tx, results) => {

                if (results.rows.length > 0) {
                    let row = results.rows.raw()[0];

                    let json = JSON.parse(row.data);

                    let series = [{
                        name: "P1",
                        data: []
                
                    }, {
                        name: 'P2',
                        data: []
                
                    }, {
                        name:'P3',
                         data: []
                
                    }, {
                        name: 'P4',
                         data: []
                
                    },
                    {
                        name: 'P5',
                        data: []
                    }];

                    for (let i = 42; i < 48; i++) {
                        let row = json[i];
                        series[0].data.push(parseInt(row[1]))
                        series[1].data.push(parseInt(row[2]))
                        series[2].data.push(parseInt(row[3]))
                        series[3].data.push(parseInt(row[4]))
                        series[4].data.push(parseInt(row[5]))
                    }

                    this.setState({ length: 1, series});
                } else {
                    this.setState({ length: 0 });
                }
            })
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
                text: 'ACCUMULATED BENEFIT PER PARITY AND SOW WEANING CAPACITY COMPARED WITH GILT BREAKEVEN LINE'
            },
            xAxis: {
                categories: [
                    'P1',
                    'P2',
                    'P3',
                    'P4',
                    'P5',
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
                    '<td style="padding:0"><b>{point.y} %</b></td></tr>',
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



                {this.state.length > 0 && <ChartView style={{ height: 400 }} config={conf} />}
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
