
/**
* Theme: Adminto Admin Template
* Author: Coderthemes
* Dashboard
*/

!function($) {
    "use strict";

    var Dashboard1 = function() {
    	this.$realData = []
    };

    //creates Bar chart
    Dashboard1.prototype.createBarChart  = function(element, data, xkey, ykeys, labels, lineColors) {
        Morris.Bar({
            element: element,
            data: data,
            xkey: xkey,
            ykeys: ykeys,
            labels: labels,
            hideHover: 'auto',
            resize: true, //defaulted to true
            gridLineColor: '#2f3e47',
            barSizeRatio: 0.2,
            gridTextColor: '#98a6ad',
            barColors: lineColors
        });
    },

    //creates line chart
    Dashboard1.prototype.createLineChart = function(element, data, xkey, ykeys, labels, opacity, Pfillcolor, Pstockcolor, lineColors) {
        Morris.Line({
          element: element,
          data: data,
          xkey: xkey,
          ykeys: ykeys,
          labels: labels,
          fillOpacity: opacity,
          pointFillColors: Pfillcolor,
          pointStrokeColors: Pstockcolor,
          behaveLikeLine: true,
          gridLineColor: '#2f3e47',
          hideHover: 'auto',
          resize: true, //defaulted to true
          pointSize: 0,
          gridTextColor: '#98a6ad',
          lineColors: lineColors
        });
    },

    //creates Donut chart
    Dashboard1.prototype.createDonutChart = function(element, data, colors) {
        Morris.Donut({
            element: element,
            data: data,
            resize: true, //defaulted to true
            colors: colors,
            backgroundColor: '#2f3e47',
            labelColor: '#fff'
        });
    },
    
    
    Dashboard1.prototype.init = function() {

        //creating bar chart
        var $barData  = [
            { y: '2017-10-02', a: 75 },
            { y: '2017-10-03', a: 42 },
            { y: '2017-10-04', a: 75 },
            { y: '2017-10-05', a: 38 },
            { y: '2017-10-06', a: 19 }
        ];
        this.createBarChart('morris-bar-example', $barData, 'y', ['a'], ['Statistics'], ['#188ae2']);

        //create line chart
        var $data  = [
            { y: '2017-10-02', a: 17, b: 20 },
            { y: '2017-10-03', a: 9, b: 12 },
            { y: '2017-10-04', a: 22, b: 4 },
            { y: '2017-10-05', a: 24, b: 12 },
            { y: '2017-10-06', a: 2, b: 17 }
          ];
        this.createLineChart('morris-line-example', $data, 'y', ['a','b'], ['Series A','Series B'],['0.9'],['#ffffff'],['#999999'], ['#10c469','#188ae2']);

        //creating donut chart
        var $donutData = [
                {label: "Severity 1", value: 12},
                {label: "Severity 2", value: 30}
            ];
        this.createDonutChart('morris-donut-example', $donutData, ['#ff8acc', '#5b69bc', "#35b8e0"]);
    },
    //init
    $.Dashboard1 = new Dashboard1, $.Dashboard1.Constructor = Dashboard1
}(window.jQuery),

//initializing 
function($) {
    "use strict";
    
}(window.jQuery);