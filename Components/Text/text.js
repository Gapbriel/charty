/**
Text labeling.

@class TextLabel
@extends SimpleDataGroup
@constructor
@requires d3.chart,
          simpledatagroup

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define([
      'd3.chart',
      'simpledatagroup'
      ],
      function(d3) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3);
    });
  }
  else {
    /** Browser globals */
    return factory(d3);
  }
}(this, function(d3) {
  d3.chart('SimpleDataGroup').extend('Text', {
    /**
    Text label initializator

    @method
    */
    initialize : function(){

      var options = {
        /**
        Data bind for text labeling.
        Can depend on other elements, for instance,
        the rounded rectangles to form a label.

        @method
        @param {Object} d example = {
                                      data : [...]
                                    }
        */
        dataBind : function(d){

          var chart = this.chart();

          return this.selectAll('text').data(d.data);
        },
        /**
        Insert a svg:text element for each data input.

        @mehtod
        @chainable
        */
        insert : function(){
          return this.append('text');
        },
        events : {
          'enter' : function(){

              var chart = this.chart();

              return this.attr('x', function(d){
                            return chart.xscale.map(d.x,1)+(chart.xscale.band(1)/2);
                          })
                         .attr('y', function(d){
                            return chart.yscale.map(d.y);
                          })
                         .attr('text-anchor', 'middle')
                         .attr('dy', '0.35em')
                         .text(function(d) { return d.y; });
          },
          'update' : function(){

              var chart = this.chart();

              return this.attr('x', function(d){
                            return chart.xscale.map(d.x,1)+(chart.xscale.band(1)/2);
                          })
                         .attr('y', function(d){
                            return chart.yscale.map(d.y);
                          })
                         .text(function(d) { return d.y; });
          },
          'exit' : function(){

            return this.remove();
          }
        }
      };

      /**
      Layer creation
      */
      this.layer('texts', this.base.append('g') , options);

    }
  });
}));