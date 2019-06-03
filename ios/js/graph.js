
function DRAWCLAWGRAPHS(jsondata) {
    var se = [];
    var p = [];

    jsondata.map(function (itte) {
        p.push(itte[1]);

        for(var jee = 0; jee< 14; jee++){
            var ke = jee + 2;
            se.push(itte[ke])
        }
    });

    var severtyLesion = [];
    var severtyLesionPer = [
        { 3: 0, 2: 0, 1: 0 },
        { 3: 0, 2: 0, 1: 0 },
        { 3: 0, 2: 0, 1: 0 },
        { 3: 0, 2: 0, 1: 0 },
        { 3: 0, 2: 0, 1: 0 },
        { 3: 0, 2: 0, 1: 0 },
        { 3: 0, 2: 0, 1: 0 }
    ];

    var data = [];
    //
    var severtiyData = [[], [], [], [], [], [], []];
    //
    var lesionCountSeries = [
        {
            name: 'No Lesion',
            y: 0,
            selected: true,
        },
        {
            name: 'Single',
            y: 0,
        },
        {
            name: 'Multiple',
            y: 0,
        },
    ];
    //
    var countOfLesionPerParityPerType = [
        {
            name: 'WL',
            data: [],
        },
        {
            name: 'CRK S/H',
            data: [],
        },
        {
            name: 'CRK H',
            data: [],
        },
        {
            name: 'CRK V',
            data: [],
        },
        {
            name: 'EROSION',
            data: [],
        },
        {
            name: 'LONG DC',
            data: [],
        },
        {
            name: 'LONG CL',
            data: [],
        },
    ];

    var LesionsPerTypeOfLesions = [];

    var severtiyOfLesionsPerTypeOfLesions = [
        {
            name: 'SEVERE',
            data: [],
        },
        {
            name: 'MODERATE',
            data: [],
        },
        {
            name: 'LIGHT',
            data: [],
        },
    ];
    //
    var numberOFEvaluatedSowPerParity = [
        {
            name: '1',
            y: 0,
        },
        {
            name: '2',
            y: 0,
        },
        {
            name: '3',
            y: 0,
        },
        {
            name: '4',
            y: 0,
        },
        {
            name: '5',
            y: 0,
        },
        {
            name: '6',
            y: 0,
        },
        {
            name: '7',
            y: 0,
        },
    ];

    var percentPerTypeOfLesion = [
        {
            name: 'WL',
            y: 0,
            drilldown: 'WL',
        },
        {
            name: 'CRK S/H',
            y: 0,
            drilldown: 'CRK S/H',
        },
        {
            name: 'CRK H',
            y: 0,
            drilldown: 'CRK H',
        },
        {
            name: 'CRK V',
            y: 0,
            drilldown: 'CRK V',
        },
        {
            name: 'EROSION',
            y: 0,
            drilldown: 'EROSION',
        },
        {
            name: 'LONG DC',
            y: 0,
            drilldown: 'LONG DC',
        },
        {
            name: 'LONG CL',
            y: 0,
            drilldown: 'LONG CL',
        },
    ];

    var severtyLesionPerParity = [{
        name: 'SEVERE',
        color:'red',
        data: []
    }, {
        name: 'MODERATE',
        color:'orange',
        data: []
    }, {
        name: 'LIGHT',
        color:'yellow',
        data: []
    }];

    var severtity = [];

    var length = se.length / 14;

    for (var lse = 0; lse < length; lse++) {
        var pd = parseInt(p[lse]);
        data.push([]);
        for (var j = 0; j < 14; j++) {
            var item = se[14 * lse + j];
            if(!isNaN(item) && item ){
                item = item;
            }else {
                item = 0;
            }

            if ([1, 2, 3].indexOf(item) > -1) {
                if (pd === 1) {
                    severtyLesionPer[0][item] += 1;
                } else if (pd == 2) {
                    severtyLesionPer[1][item] += 1;
                } else if (pd == 3) {
                    severtyLesionPer[2][item] += 1;
                } else if (pd == 4) {
                    severtyLesionPer[3][item] += 1;
                } else if (pd == 5) {
                    severtyLesionPer[4][item] += 1;
                } else if (pd == 6) {
                    severtyLesionPer[5][item] += 1;
                } else if (pd > 6) {
                    severtyLesionPer[6][item] += 1;
                }
            }
            data[lse].push(item);

            var l = (j / 2) % 7;
            var index = parseInt(l);
            severtiyData[index].push(item);
        }
    }

    for(var _i= 6 ; _i > -1; _i-- ){
        var item = severtyLesionPer[_i];
        severtyLesionPerParity[0].data.push(item[3]);
        severtyLesionPerParity[1].data.push(item[2]);
        severtyLesionPerParity[2].data.push(item[1]);
    }


    console.log(data);

    data.map(function(item, key){
        var sum = 0;

        item.map(function(i, k){
            sum = sum + (i > 0 ? 1 : 0);
        });

        if (sum === 1) {
            lesionCountSeries[1]['y'] = lesionCountSeries[1]['y'] + 1;
        } else if (sum === 0) {
            lesionCountSeries[0]['y'] = lesionCountSeries[0]['y'] + 1;
        } else if (sum > 1) {
            lesionCountSeries[2]['y'] = lesionCountSeries[2]['y'] + 1;
        }
    });

    severtiyData.map(function(item, k){
        var count = {};

        item.forEach(function(i){
            i = parseInt(i);
            if ([1, 2, 3].indexOf(i) > -1) {
                count[i] = (count[i] || 0) + 1;
            }
        });

        LesionsPerTypeOfLesions.push(count);

    });


    p.forEach(function (i) {
        if(i && !isNaN(i) && i > 0 && i< 8){
            i = parseInt(i)- 1;
            numberOFEvaluatedSowPerParity[i]['y'] += 1;
        }

    });

    //
    var LesionsPerTypeOfLesionsSum= LesionsPerTypeOfLesions.reduce(function(next, prev){
            return  next + Object.values(prev).reduce(function(p, n){ return p+n},0 )
        } , 0) / 100;

    LesionsPerTypeOfLesions.map(function(item, key){
        var item_1 = item[1] > 0 ? item[1] : 0
        var item_2 = item[2] > 0 ? item[2] : 0
        var item_3 = item[3] > 0 ? item[3] : 0

        severtiyOfLesionsPerTypeOfLesions[2].data.push(item_1);
        severtiyOfLesionsPerTypeOfLesions[1].data.push(item_2);
        severtiyOfLesionsPerTypeOfLesions[0].data.push(item_3);


        countOfLesionPerParityPerType[key]['data'] = [item_3, item_2, item_1];


        var sum =  Object.values(item).reduce(function(p, n){
            return p+n;
        }, 0 );

        percentPerTypeOfLesion[key]['y'] = sum / LesionsPerTypeOfLesionsSum;

    });


    renderlesionCountSeries(lesionCountSeries);
    renderNumberOFEvaluatedSowPerParity(numberOFEvaluatedSowPerParity);
    rendersevertiyOfLesionsPerTypeOfLesions(severtiyOfLesionsPerTypeOfLesions);


    renderCountOfLesionPerParityPerType(countOfLesionPerParityPerType);
    renderPercentPerTypeOfLesion(percentPerTypeOfLesion);
    rendeSevertyLesionPerParity(severtyLesionPerParity);

}


function renderlesionCountSeries(lesionCountSeries) {
    Highcharts.chart('highchart-container1', {
        credits: {
            enabled: false
        },
        exporting: { enabled: false },
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
        },
        title: {
            text: "LESION PER TYPE"
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
            data: lesionCountSeries
        }]
    });
}

function renderNumberOFEvaluatedSowPerParity(numberOFEvaluatedSowPerParity) {
    Highcharts.chart('highchart-container2', {
        credits: {
            enabled: false
        },
        exporting: { enabled: false },
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
        },
        title: {
            text: "NUMBER OF EVALUATED SOWS PER PARITY"
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
            data: numberOFEvaluatedSowPerParity
        }]
    });
}


function rendersevertiyOfLesionsPerTypeOfLesions(severtiyOfLesionsPerTypeOfLesions) {
    Highcharts.chart('highchart-container3', {
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
        series: severtiyOfLesionsPerTypeOfLesions
    });
}


function renderCountOfLesionPerParityPerType(countOfLesionPerParityPerType){
    Highcharts.chart('highchart-container4', {
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
            // colors:['red','orange','yellow'],
            //  categories: ['SEVERE', 'MODERATE', 'LIGHT'],
             categories: [{
    name: 'John',
    color:'red',
    // data: [5, 3, 4, 7, 2]
  }, {
    name: 'Jane',
    color:'orange'
    // data: [2, 2, 3, 2, 1]
  }, {
    name: 'Joe',
    color:'yellow'
    // data: [3, 4, 4, 2, 5]
  }]
       
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
        series: countOfLesionPerParityPerType
    });
}

function renderPercentPerTypeOfLesion(percentPerTypeOfLesion){
    Highcharts.chart('highchart-container5', {
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
                "data": percentPerTypeOfLesion
            }
        ]
    });
}

function rendeSevertyLesionPerParity(severtyLesionPerParity){
    Highcharts.chart('highchart-container6', {
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
                stacking: 'normal'
            }
        },
        "series": severtyLesionPerParity
    });
}