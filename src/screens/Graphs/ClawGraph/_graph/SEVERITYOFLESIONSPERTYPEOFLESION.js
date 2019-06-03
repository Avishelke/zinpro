import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, Text, Image } from 'react-native';
import ChartView from 'react-native-highcharts';

class SEVERITYOFLESIONSPERTYPEOFLESION extends Component {
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
            text: 'SEVERITY OF LESIONS PER TYPE OF LESION'
        },
        xAxis: {
            categories: ['WL', 'CRK S/H', 'CRK H', 'CRK V', 'EROSION' ,'LONG DC' ,'LONG CL']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total fruit consumption'
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
            shared: true
        },
        plotOptions: {
            column: {
                stacking: 'percent'
            }
        },
        series: this.props.data
    };


    return <ChartView style={{ height: 300, backgroundColor: 'red' }} config={conf} />;
  }
}

export default SEVERITYOFLESIONSPERTYPEOFLESION;
