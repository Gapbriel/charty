/**
Main Application

Testing chart drawing and data update
*/

require.config({
  baseUrl : '.',
  paths : {
    'chartsapi' : 'Api/chartsapi',
    'axis' : 'Components/Axis/axis',
    'bar' : 'Components/Bar/bar',
    'basechart' : 'Components/Base/basechart',
    'linearscale' : 'Components/Scales/linearscale',
    'ordinalscale' : 'Components/Scales/ordinalscale',
    'scalesfactory' : 'Components/Scales/scalesfactory',
    'xyaxis' : 'Composition/Axis/xyaxis',
    'yxyaxis' : 'Composition/Axis/yxyaxis',
    'barchart' : 'Composition/BarChart/barchart',
    'd3' : 'Libs/d3.v3',
    'd3.chart' : 'Libs/d3.chart',
    'accessor' : 'Utils/Accessor/accessor',
    'multipleinstancesmixin' : 'Composition/multipleinstancesmixin',
    'multipledatagroup' : 'Composition/multipledatagroup',
    'simpledatagroup' : 'Composition/simpledatagroup',
    'labeledtrianglechart' : 'Composition/LabeledTriangleChart/labeledtrianglechart',
    'triangle' : 'Components/Triangle/triangle',
    'textlabel' : 'Components/TextLabel/textlabel',
    'roundedrectangle' : 'Components/RoundedRectangle/roundedrectangle',
    'linechart' : 'Composition/LineChart/linechart',
    'line' : 'Components/Line/line',
    'circle' : 'Components/Circle/circle',
    'scatterplot' : 'Composition/Scatterplot/scatterplot',
    'donut' : 'Components/Donut/donut',
    'underscore' : 'Libs/underscore',
    'groupedbarchart' : 'Composition/GroupedBarChart/groupedbarchart',
    'jquery' : 'Libs/jquery-1.10.2'
  },
  shim:{
    'underscore' : {
      exports : '_'
    },
    'd3' : {
      exports :'d3'
    },
    'd3.chart' : {
      deps : ['d3'],
      exports : 'd3.chart'
    }
  }
});

requirejs(['chartsapi','accessor','underscore','jquery'],
function(ChartsApi, Accessor,_,$){

  "use strict";

  /**
  Data rendering examples.
  */
  var data1 = {
    z : '2011',
    color: 'blue',
    rh: 30,
    rw: 30,
    rc:'gray',
    data: [
      { x: 'A', y: 100, c : 'green', z: '2011'},
      { x: 'B', y: -40, c : 'blue', z: '2011'},
      { x: 'C', y: 60, c : 'red', z: '2011' }
    ]
  };

  var data2 = {
    z : '2012',
    color: 'red',
    data: [
      { x: 'A', y: 150 , z: '2012'},
      { x: 'B', y: 50 , z: '2012'},
      { x: 'C', y: 30, c:'yellow' , z: '2012' }
    ]
  };

  var data3 = {
    ir :  -100,
    or : -70,
    data : [
      {x : 200, c : 'blue'},
      {x : 300, c : 'red'},
      {x : 150, c : 'yellow'},
      {x :  50, c : 'green'}
    ]
  };

  /**
  Data for grouped bar chart

  Each x value will have an array of y-z pairs
  */
  var data4 = {
    data : [
      {x:'A', y : [
                      {y : '2011', z : 100},
                      {y : '2012', z : 150},
                      {y : '2013', z : 300}
                  ]
      },
      {x:'B', y : [
                      {y : '2011', z : 80},
                      {y : '2012', z : 60},
                      {y : '2013', z : 200}
                  ]},
      {x:'C', y : [
                      {y : '2011', z : 250},
                      {y : '2012', z : 20},
                      {y : '2013', z : 100}
                  ]}
    ]
  };

  var datagroup1 = [];
      datagroup1.push(data1);
      datagroup1.push(data2);

  var datagroup2 = [];
      datagroup2.push(data1);

  var datagroup3 = [];
      datagroup3.push(data3);

  var accessor1 = new Accessor(datagroup1);
  var accessor2 = new Accessor(datagroup2);
  var accessor3 = new Accessor(datagroup3);

  var myApi = new ChartsApi();

  var options1 = {
    chartName : 'BarChart',
    instances : 2,
    root : '#chart1',
    xAxis : 'ordinal',
    yAxis : 'linear',
    margin : {
      left : 50,
      top : 20,
      lfactor : 2,
      tfactor : 4.2
    }
  };

  var options2 = {
    chartName : 'LabeledTriangleChart',
    root : '#chart2',
    xAxis : 'ordinal',
    yAxis : 'linear',
    margin : {
      left : 50,
      top : 20,
      lfactor : 2,
      tfactor : 4.2
    }
  };

  var options3 = {
    chartName : 'LineChart',
    instances : 2,
    root : '#chart3',
    xAxis : 'ordinal',
    yAxis : 'linear',
    margin : {
      left : 50,
      top : 20,
      lfactor : 2,
      tfactor : 4.2
    }
  };

  var options4 = {
    chartName : 'Scatterplot',
    instances : 2,
    root : '#chart4',
    xAxis : 'ordinal',
    yAxis : 'linear',
    imgUrl : 'http://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/280px-PNG_transparency_demonstration_1.png',
    margin : {
      left : 50,
      top : 20,
      lfactor : 2,
      tfactor : 4.2
    }
  };

  var options5 = {
    chartName : 'Donut',
    instances : 1,
    root : '#chart5',
    imgUrl : 'http://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/280px-PNG_transparency_demonstration_1.png',
    ir : 150,
    or : 100,
    margin : {
      left : 50,
      top : 20,
      lfactor : 2,
      tfactor : 4.2
    }
  };

  var options6 = {
    chartName : 'GroupedBarChart',
    instances : 2,
    root : '#chart6',
    xAxis : 'ordinal',
    yAxis : 'linear',
    margin : {
      left : 50,
      top : 20,
      lfactor : 2,
      tfactor : 4.2
    }
  };

  /**
  Charts draw here.
  */
  var chart1 = myApi.chart(options1);
      chart1.draw(accessor1);

  var chart2 = myApi.chart(options2);
      chart2.draw(accessor2);

      data1.color = 'redline';
      data2.color = 'blueline';

  var chart3 = myApi.chart(options3);
      chart3.draw(accessor1);

      data1.color = 'red';
      data2.color = 'blue';

  var chart4 = myApi.chart(options4);
      chart4.draw(accessor1);

  var chart5 = myApi.chart(options5);
      chart5.draw(accessor3);

  /*var chart6 = myApi.chart(options6);
      chart6.draw(accessor1);*/

  /**
  Charts update here.
  */
  setTimeout(function(){

    data1 = {
      color: 'blue',
      rh: 30,
      rw: 30,
      rc:'gray',
      data: [
        { x: 'A', y: 100},
        { x: 'B', y: 40},
        { x: 'C', y: 60},
        { x: 'D', y: 80}
      ]
    };

    data2 = {
      color: 'red',
      r : 8,
      data: [
        { x: 'A', y: 150 },
        { x: 'B', y: 50 },
        { x: 'C', y: 30 },
        { x: 'D', y: 230 }
      ]
    };

    data3 = {
      ir :  -100,
      or : -70,
      data : [
        {x : 200, c : 'blue'},
        {x : 300, c : 'red'},
        {x : 150, c : 'yellow'},
        {x :  50, c : 'green'},
        {x : 400, c: 'gray'}
      ]
    };

    var datagroup4 = [];
        datagroup4.push(data1);
        datagroup4.push(data2);

    accessor1.setData(datagroup4);

    var datagroup5 = [];
        datagroup5.push(data1);

    var datagroup6 = [];
        datagroup6.push(data3);

    accessor2.setData(datagroup5);
    accessor3.setData(datagroup6);

    chart1.draw(accessor1);
    chart2.draw(accessor2);

    data1.color = 'redline';
    data2.color = 'blueline';

    chart3.draw(accessor1);

    data1.color = 'gray';
    data1.r = 12;
    data2.color = 'red';
    data2.r = 8;

    chart4.draw(accessor1);
    chart5.draw(accessor3);

  },3000);
});