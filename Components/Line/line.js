/**
Line drawing.

@class Line
@extends SimpleDataGroup
@constructor
@requires d3,
          d3.chart,
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
  d3.chart('SimpleDataGroup').extend('Line', {
    /**
    Line initialization

    @method
    */
    initialize : function(){

      var defaults = {
        c : 'line-default'
      };

      var line = d3.svg.line();

      var pathBase = this.base;

      this.layer('lineslayer', pathBase, {
        /**
        Data bind for a line serie.
        Since a line is drawed using d3.line
        a datum must be defined. Can also have a color
        for the whole serie.

        @method
        @param {Object} d example = {
                                      color : 'redline'
                                      data : [
                                        {x : 'Jan', y: 200},
                                        ...
                                      ]
                                    }
        */
        dataBind : function(d){

          var chart = this.chart();
          chart.checkScales('Line');

          line.x(function(d) {
            return chart.xscale.map(d.x, 0);
          }).y(function(d) {
            return chart.yscale.map(d.y, 0);
          });

          chart.datum = d.data;
          chart.c = d.color;

          return this.selectAll('path').data([0]);

        },
        insert : function(){
          return this.append('path');
        },
        events : {
          'enter' : function(){

              var chart = this.chart();

              return this.datum(chart.datum)
                         .attr('class',(chart.c || defaults.c))
                         .attr('d',line);
          },
          'update':function(){

            var chart = this.chart();

            return this.datum(chart.datum)
                       .attr('class',(chart.c || defaults.c))
                       .attr('d',line);
          },
          'exit' : function(){
            return this.remove();
          }
        }
      });
    }
  });
 })
);