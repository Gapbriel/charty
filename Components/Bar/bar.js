/**
Bar drawer. Takes only one data series as input.

@class Bar
@constructor
@extends SimpleDataGroup
@requires d3,
          d3.chart
          simpledatagroup

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  // Set up Backbone appropriately for the environment.
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['d3',
      'd3.chart',
      'simpledatagroup'],
      function(d3) {
        // Export global even in AMD case in case this script is loaded with others
        return factory(d3);
    });
  }
  else {
    // Browser globals
    return factory(d3);
  }
}(this, function(d3) {
  d3.chart('SimpleDataGroup').extend('Bar', {
    /**
    Bar initialization

    @method
    */
    initialize : function(){

      var pathBase = this.base;

      var defaults = {
        c : 'bar-default'
      };

      var options = {
        /**
        Data bind for a bar serie.
        Can have a color set for the whole serie, or
        each bar can have an own color defined.

        @method
        @param {Object} d example = {
                                       color : 'red',
                                       data = [
                                        {x : 'Jan', y : 200, c : 'red'}
                                       ]
                                    }
        */
        dataBind : function(d){

          var chart = this.chart();
          chart.checkScales('Bar');

          /**
          Sets color for the whole data serie.
          */
          chart.c = d.color;

          return this.selectAll('rect').data(d.data);
        },
        insert : function(){
          return this.append('rect');
        },
        events : {
          'enter' : function(){

                var chart = this.chart();

                this.attr("class", function(d){
                      return (d.c || chart.c || defaults.c);
                    })
                    .attr("x", function(d) { return chart.xscale.map(d.x, chart.factor)} )
                    .attr("width", chart.xscale.band(chart.factor))
                    .attr("y", function(d) {
                      return Math.min(chart.yscale.map(0),chart.yscale.map(d.y, chart.factor));
                    })
                    .attr("height", function(d) {
                      return Math.abs(chart.yscale.band(chart.h,d.y)-(chart.h-chart.yscale.map(0)))}
                    );
                return this;
          },
          'update' : function(){

                var chart = this.chart();

                this.attr("class", function(d){
                     return (d.c || chart.c || defaults.c);
                    })
                    .attr("x", function(d) { return chart.xscale.map(d.x, chart.factor)} )
                    .attr("width", chart.xscale.band(chart.factor))
                    .attr("y", function(d) {
                      return Math.min(chart.yscale.map(0),chart.yscale.map(d.y, chart.factor))
                    })
                    .attr("height", function(d) {
                      return Math.abs(chart.yscale.band(chart.h,d.y)-(chart.h-chart.yscale.map(0)))}
                      );
                return this;
          },
          'exit' : function(){
            return this.remove();
          }
        }
      };

      /**
      Default layer.
      */
      this.layer('barlayer', pathBase ,options);

    }
  });
 })
)