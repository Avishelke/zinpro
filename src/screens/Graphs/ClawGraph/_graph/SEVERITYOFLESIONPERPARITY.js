import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, Text, Image } from 'react-native';
import ChartView from 'react-native-highcharts';

class SEVERITYOFLESIONPERPARITY extends Component {
  render() {
      
    const conf = {
      credits: {
            enabled: false
        },
        exporting: { enabled: false },
        chart: {
            type: 'bar'
        },
        title: {
            text: 'SEVERITY OF LESION PER PARITY'
        },
        xAxis: {
            categories: ['PARITY > 6', 'PARITY 6', 'PARITY 5',  "PARITY 4", 'PARITY 3' , 'PARITY 2', "PARITY 1"]
        },
        yAxis: {
            min: 0,
            title: null
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal',
                
            }
        },
        "series": this.props.data
    };


    return <ChartView style={{ height: 500, backgroundColor: 'red' }} config={conf} />;
  }
}

export default SEVERITYOFLESIONPERPARITY;
