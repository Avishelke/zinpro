import React, { Component } from 'react';
import ChartView from 'react-native-highcharts';

class COUNTOFLESIONSPERSEVERITYTYPE extends Component {
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
            text: 'COUNT OF LESION PER SEVERITY and TYPE'
        },
        xAxis: {
            categories: ['SEVERE', 'MODERATE', 'LIGHT']
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
                stacking: 'normal'
            }
        },
        series: this.props.data
    };


    return <ChartView style={{ height: 300, backgroundColor: 'red' }} config={conf} />;
  }
}

export default COUNTOFLESIONSPERSEVERITYTYPE;
