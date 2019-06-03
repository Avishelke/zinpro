import React, { Component } from "react";
import { ScrollView, View, StyleSheet, Text , Image} from "./../../../components/core";
import { THEME_COLOR } from "./../../../helpers/theme";
import { db } from '../../../helpers/db'
import ChartView from 'react-native-highcharts';
import CardSilder from 'react-native-cards-slider';

class Gilt extends Component {

    state = {
        date: '',
        evaluation_id: '',
        evaluations: [],
        open: false,
        length: false,
        graphdata: [],
        images: []
    };

    componentDidMount() {
        let id = this.props.navigation.getParam('id')
        db.transaction((tx) => {
            tx.executeSql(`select * from  gilt_assessor where id=?`, [id], (tx, results) => {

                if (results.rows.length > 0) {
                    let row = results.rows.raw()[0];
                    let images = [];
                    const { floor, ventilation, feeders, feed, hygiene, person_contact, gilt_growth, quarentine } = row;
                    
                    Object.keys(row).map((key) => {
                        if(key.includes('_image') && row[key]){
                            images.push(row[key]);
                        }
                    });

                    this.setState({ 
                        length: 1, 
                        graphdata: [floor, ventilation, feeders, feed, hygiene, person_contact, gilt_growth, quarentine],
                        images: images 
                    });
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
                type: 'spline',
                
            },
            title: {
                text: 'GILT ASSESSORS',
                color:'red'
            },
            xAxis: {
                categories: ['FLOOR', 'VENTILATION', 'FEEDERS', 'FEED', 'HYGIENE', 'PERSON CONTACT', 'GILT GROWTH', 'QUARANTINE']
            },
            yAxis: {
                title: {
                    text: 'SCORE'
                },
                labels: {
                    formatter: function () {
                        return this.value;
                    }
                    
                }
                
            },
         
            chart: {
    //   polar: true,
    //   type: 'line',
      backgroundColor:'white' 
},
            tooltip: {
                crosshairs: true,
                shared: true
            },
            plotOptions: {
                spline: {
                    marker: {
                        radius: 4,
                        lineColor: '#666666',
                        lineWidth: 1,
                        // backgroundColor:'red'
                    }
                }
            },
            series: [{
                lineWidth: 0,
                name: 'SCORE',
                marker: {
                    symbol: 'square'
                },
                data: this.state.graphdata
            }]
        };

        const { container, labelText} = styles;

        return (
            <ScrollView style={container}>



                {this.state.length > 0 && <ChartView style={{ height: 300, }} config={conf} />}
                {this.state.length === 0 && <View style={{ marginTop: 100, marginHorizontal: '5%' }}>
                    <Text style={{ textAlign: 'center' }}>No Data Found !!</Text>
                </View>}

                <CardSilder>
                    {this.state.images.map((i, k,v) => {
                        return <View key={k}>                             
                            <Image style={{height: 170}} source={{uri : i}} key={k} />
                            {/* <Text>Test</Text> */}
                             </View>
                    })}  

                        
                 </CardSilder>

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
