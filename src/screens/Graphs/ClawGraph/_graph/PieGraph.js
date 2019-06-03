import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, Text, Image } from 'react-native';
import ChartView from 'react-native-highcharts';

class LesionCount extends Component {
  render() {
    const conf = {
      credits: {
        enabled: false,
      },
       exporting: { enabled: false },
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
      },
      title: {
        text: this.props.title,
      },
      tooltip: {
        pointFormat: '<b>{point.percentage:.1f}%</b>',
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false,
          },
          showInLegend: true,
        },
      },
      series: [{
            name: 'Brands',
            colorByPoint: true,
            data: this.props.data
        }]
    };


    return <ChartView style={{ height: 300}} config={conf} />;
  }
}

export default LesionCount;
