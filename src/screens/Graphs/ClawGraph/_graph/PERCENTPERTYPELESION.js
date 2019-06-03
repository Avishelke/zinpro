import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, Text, Image } from 'react-native';
import ChartView from 'react-native-highcharts';

class PERCENTPERTYPELESION extends Component {
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
            text: 'PERCENT PER TYPE OF LESION'
        },
        subtitle: null,
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: ''
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.0f}%'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.0f}%</b> of total<br/>'
        },
        "series": [
            {
                "name": "Browsers",
                "colorByPoint": true,
                "data": this.props.data
            }
        ]


    };


    return <ChartView style={{ height: 300, backgroundColor: 'red' }} config={conf} />;
  }
}

export default PERCENTPERTYPELESION;
